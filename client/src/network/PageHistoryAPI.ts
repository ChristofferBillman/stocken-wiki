import PageRecord from '../types/PageRecord.ts'
import { get } from './common/http'

async function history(pageId: string | undefined, onSuccess: (arg0: PageRecord[]) => void, onError: (arg0: string) => void) {
	idGuard(pageId)
	get(`/page/history/${pageId}`, onSuccess, onError)
}

async function record(pageId: string | undefined, version: number | undefined, onSuccess: (arg0: PageRecord) => void, onError: (arg0: string) => void) {
	idGuard(pageId)
	if(version == undefined) {
		throw new Error('Revision of page record was undefined. Please provide a valid revision number.')
	}
	get(`/page/history/${pageId}/${version}`, onSuccess, onError)
}

function idGuard(id: string | undefined) {
	if(!id) throw new Error('Tried to make request with a undefined or null page id')
}

const PageHistoryAPI = {
	history,
	record
}

export default PageHistoryAPI