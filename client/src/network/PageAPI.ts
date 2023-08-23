import Page from '../types/Page'
import { post, put, del, get } from './common/http'

async function all(onSuccess: (arg0: Page[]) => void, onError: (arg0: string) => void) {
	get('/page', onSuccess, onError)
}

async function byId(pageId: string | undefined, onSuccess: (arg0: Page) => void, onError: (arg0: string) => void) {
	idGuard(pageId)
	get('/page/' + pageId, onSuccess, onError)
}

async function create(pageData: Page, onSuccess: (arg0: unknown) => void, onError: (arg0: string) => void) {
	post(pageData, '/page', onSuccess, onError)
}

async function update(pageId: string | undefined, pageData: Page, onSuccess: (arg0: unknown) => void, onError: (arg0: string) => void) {
	idGuard(pageId)
	put(pageData, `/page/${pageId}`, onSuccess, onError)
}

async function remove(pageId: string | undefined, onSuccess: (arg0: unknown) => void, onError: (arg0: string) => void) {
	idGuard(pageId)
	del({}, `/page/${pageId}`, onSuccess, onError)
}

function idGuard(id: string | undefined) {
	if(!id) throw new Error('Tried to make request with a undefined or null page id')
}

const PageAPI = {
	create,
	update,
	remove,
	all,
	byId
}

export default PageAPI