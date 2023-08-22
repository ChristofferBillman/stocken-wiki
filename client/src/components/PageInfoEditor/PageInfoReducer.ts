/* eslint-disable @typescript-eslint/no-non-null-assertion */
import InfoSection, { InfoSectionStatistic } from '../../types/InfoSection'

export interface PageInfoReducerAction {
	type: PageInfoReducerType,
	payload: React.ChangeEvent<HTMLInputElement> | InfoSectionStatistic
}

export enum PageInfoReducerType {
	SET_STATISTIC,
	NEW_STATISTIC,
	DELETE_STATISTIC,
	SET_METADATA
}

export default function pageInfoReducer(state: InfoSection, action: PageInfoReducerAction): InfoSection {
	const {type, payload} = action

	switch (type) {
	case PageInfoReducerType.SET_STATISTIC: {
		// Check that user passed a payload that actually has a key.
		if(!('target' in payload)) {
			throw new Error('Invalid payload passed to pageInfoReducer. SET_STATISTIC action type must have a payload with field "target"')
		}

		// Create copy of the array to make react understand that state has mutated,
		// since objects are comapred by reference instead of by value in js.
		const copy = [...state.data]
		
		// We uniquely identitfy inputs by the naming shceme "index_K" or "index_V"
		// depending on what order in the array it is, and if it's the key or value.
		const [i, field] = payload.target.name.split('_')
		// Cast the index-part of the identifier to number.
		const index = i as unknown as number

		// We have now narrowed our search for the correct element in the array of statistics.
		// There are two fields in a statistic, so we need to figure out if its the key or
		// value that is supposed to be set.
		if(field == 'V') {
			// Set value.
			copy[index].value = payload.target.value
		}
		else {
			// Set key.
			copy[index].key = payload.target.value
		}
		
		// Update state.
		return {
			...state,
			data: copy
		}
	}
	case PageInfoReducerType.NEW_STATISTIC: {
		// Check that user passed a payload that actually has a key.
		if(!('key' in payload)) {
			throw new Error('Invalid payload passed to pageInfoReducer. ' + type + ' action type must be passed a InfoSectionStatistic')
		}

		const copy = [...state.data]

		copy.push({key: payload.key, value: ''})

		return {
			...state,
			data: copy
		}
	}
	case PageInfoReducerType.DELETE_STATISTIC: {
		// Check that user passed a payload that actually has a key.
		if(!('key' in payload)) {
			throw new Error('Invalid payload passed to pageInfoReducer. ' + type + ' action type must be passed a InfoSectionStatistic')
		}

		let copy = [...state.data]

		copy = copy.filter(stat => stat.key !== payload.key)
		
		return {
			...state,
			data: copy
		}
	}
	case PageInfoReducerType.SET_METADATA:
		// Check that user passed a payload that actually has a key.
		if(!('target' in payload)) {
			throw new Error('Invalid payload passed to pageInfoReducer. SET_STATISTIC action type must have a payload with field "target"')
		}

		return {
			...state,
			[payload.target.name]: payload.target.value
		}
	}
}