const BASE_URL = import.meta.env.VITE_WIKI_BACKEND_URL

enum Method {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE'
}

export async function post<T> (
	obj: any,
	url: string,
	onSuccess: (arg0: T) => void,
	onError: (arg0: string) => void,
) {
	request(obj, url, onSuccess, onError, Method.POST)
}
export async function get<T> (
	url: string,
	onSuccess: (arg0: T) => void,
	onError: (arg0: string) => void,
) {
	internalGet(url, onSuccess, onError, Method.GET)
}
export async function del<T> (
	obj: any,
	url: string,
	onSuccess: (arg0: T) => void,
	onError: (arg0: string) => void,
) {
	request(obj, url, onSuccess, onError, Method.DELETE)
}
export async function put<T> (
	obj: any,
	url: string,
	onSuccess: (arg0: T) => void,
	onError: (arg0: string) => void,
) {
	request(obj, url, onSuccess, onError, Method.PUT)
}

async function request<T>(
	obj: any,
	url: string,
	onSuccess: (arg0: T) => void,
	onError: (arg0: string) => void,
	method: Method
) {
	fetch(BASE_URL + url, {
		method,
		credentials: 'include',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(obj)
	})
		.then(async (res) => {
			if(res.status == 401) {
				window.location.href = '/#/login'
				return
			}
			if (res.status >= 400) {
				onError(await res.text())
			}
			if (res.status >= 200 && res.status < 300) {
				onSuccess(await res.json())
			}
		})
		.catch(e => {
			console.log(e)
			onError('There was a problem:' + e)
		})
}

async function internalGet<T>(
	url: string,
	onSuccess: (arg0: T) => void,
	onError: (arg0: string) => void,
	method: Method
) {
	fetch(BASE_URL + url, {
		method,
		credentials: 'include',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
		}
	})
		.then(async (res) => {
			if(res.status == 401) {
				window.location.href = '/#/login'
				return
			}
			if (res.status >= 400) {
				onError(await res.text())
			}
			if (res.status >= 200 && res.status < 300) {
				onSuccess(await res.json())
			}
		})
		.catch(e => {
			console.log(e)
			onError('There was a problem:' + e)
		})
}

