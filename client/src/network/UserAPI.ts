import { post } from './common/http'

async function signup(name: string, password: string, onSuccess: (arg0: any) => void, onError: (arg0: string) => void) {
	post<any>({ name, password }, '/user', onSuccess, onError)
}

async function login(name: string, password: string, onSuccess: (arg0: any) => void, onError: (arg0: string) => void) {
	post<any>({ name, password }, '/login', onSuccess, onError)
}

const UserAPI = {
	signup,
	login
}
export default UserAPI