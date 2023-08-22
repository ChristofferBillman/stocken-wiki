import Page from '../types/Page'
import { post, put, del, get } from './common/http'

async function all(onSuccess: (arg0: Page[]) => void, onError: (arg0: string) => void) {
	get('/page', onSuccess, onError)
}

async function byId(id: string, onSuccess: (arg0: Page) => void, onError: (arg0: string) => void) {
	get('/page/' + id, onSuccess, onError)
}

async function create(pageData: Page, onSuccess: (arg0: unknown) => void, onError: (arg0: string) => void) {
	post(pageData, '/page', onSuccess, onError)
}

async function update(pageId: string, pageData: Page, onSuccess: (arg0: unknown) => void, onError: (arg0: string) => void) {
	put(pageData, `/page/${pageId}`, onSuccess, onError)
}

async function remove(pageId: string, onSuccess: (arg0: unknown) => void, onError: (arg0: unknown) => void) {
	del({}, `/page/${pageId}`, onSuccess, onError)
}

const PageAPI = {
	create,
	update,
	remove,
	all,
	byId
}

export default PageAPI