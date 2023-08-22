import InfoSection from '../../types/InfoSection'

export interface PageInfoReducerAction {
	type: PageInfoReducerType,
	payload: React.ChangeEvent<HTMLInputElement>
}

export enum PageInfoReducerType {
	SET_STATISTIC,
	SET_METADATA
}

export default function pageInfoReducer(state: InfoSection, action: PageInfoReducerAction): InfoSection {
	const {type, payload} = action

	switch (type) {
	case PageInfoReducerType.SET_STATISTIC: {
		// Create copy of the array to make react understand that state has mutated,
		// since objects are comapred by reference instead of by value in js.
		const copy = [...state.data]
		
		// Find the element that has the same name as key of this input.
		const index = copy.findIndex(entry => (entry.key == payload.target.name))
		
		// Set new value of this input.
		copy[index].value = payload.target.value
		
		// Update state.
		return {
			...state,
			data: copy
		}
	}
	case PageInfoReducerType.SET_METADATA:
		return {
			...state,
			[payload.target.name]: payload.target.value
		}
	}
	throw new Error('Invalid reducer action. Type was "' + type + '" which is not a valid type.')
}
