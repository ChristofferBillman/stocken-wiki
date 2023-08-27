import Page from './Page'
import {initalPage} from '../reducers/PageReducer.ts'

export default interface PageRecord {
	page: Page
	versionNumber: number
	time: number
	author: string
}

export const initialPageRecord = {
	page: initalPage,
	versionNumber: 0,
	time: 0,
	author: 'test'
}