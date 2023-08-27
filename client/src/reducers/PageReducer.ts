import Page from '../types/Page'

export interface PageReducerAction {
	type: PageReducerType,
	// eslint-disable-next-line
	payload: any
}

export enum PageReducerType {
	SET_STATE,
	SET_CONTENT, 
	SET_INFOSECTION,
	SET_STATISTIC,
	NEW_STATISTIC,
	DELETE_STATISTIC,
	LOG_EDIT,
	REORDER_STATISTIC
}

export default function pageReducer(state: Page, action: PageReducerAction): Page {
	const { type, payload } = action

	switch (type) {
	case PageReducerType.SET_STATISTIC: {
		// Create copy of the array to make react understand that state has mutated,
		// since objects are comapred by reference instead of by value in js.
		const infoSection = [...state.infoSection.data]

		// We uniquely identitfy inputs by the naming shceme "index_K" or "index_V"
		// depending on what order in the array it is, and if it's the key or value.
		const [i, field] = payload.target.name.split('_')
		// Cast the index-part of the identifier to number.
		const index = i as unknown as number

		// We have now narrowed our search for the correct element in the array of statistics.
		// There are two fields in a statistic, so we need to figure out if its the key or
		// value that is supposed to be set.
		if (field == 'V') {
			// Set value.
			infoSection[index].value = payload.target.value
		}
		else {
			// Set key.
			infoSection[index].key = payload.target.value
		}

		// Update state.
		return {
			...state,
			infoSection: { data: infoSection }
		}
	}
	case PageReducerType.NEW_STATISTIC: {
		const infoSection = [...state.infoSection.data]

		infoSection.push({ key: payload.key, value: '', type: payload.type, id: Math.random().toString()})

		return {
			...state,
			infoSection: { data: infoSection }
		}
	}
	case PageReducerType.DELETE_STATISTIC: {

		let infoSection = [...state.infoSection.data]

		infoSection = infoSection.filter(stat => stat.key !== payload.key)

		return {
			...state,
			infoSection: { data: infoSection }
		}
	}
	case PageReducerType.SET_INFOSECTION: {
		return {
			...state,
			infoSection: payload
		}
	}
	case PageReducerType.SET_STATE: {
		return payload
	}
	case PageReducerType.LOG_EDIT: {

		const history = [...state.meta.history, payload]

		return {
			...state,
			meta: { history }
		}
	}
	case PageReducerType.SET_CONTENT: {
		return {
			...state,
			content: payload
		}
	}
	case PageReducerType.REORDER_STATISTIC: {
		if (!payload.destination) {
			return state
		}

		if (payload.destination.index === payload.source.index) {
			return state
		}

		const copy = [...state.infoSection.data]
		const [removed] = copy.splice(payload.source.index, 1)
		copy.splice(payload.destination.index, 0, removed)

		return {
			...state,
			infoSection: {
				data: copy
			}
		}
	}
	}
}

export const initalPage: Page = {
	_id: '1',
	content: '',
	infoSection: { data: [] },
	meta: {
		history: []
	}
}