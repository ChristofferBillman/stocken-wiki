import User from '../types/User'
import { post, get } from './common/http'

async function signup(name: string, password: string, onSuccess: (arg0: User) => void, onError: (arg0: string) => void) {
	post<User>({ name, password }, '/user', onSuccess, onError)
}

async function login(name: string, password: string, onSuccess: (arg0: User) => void, onError: (arg0: string) => void) {
	post<User>({ name, password }, '/login', onSuccess, onError)
}
async function logout(onSuccess: (arg0: User) => void, onError: (arg0: string) => void) {
	get<User>('/logout', onSuccess, onError)
}
async function byId(id: string, onSuccess: (arg0: User) => void, onError: (arg0: string) => void) {
	get<User>('/user/'+ id, onSuccess, onError)
}

const UserAPI = {
	signup,
	login,
	logout,
	byId
}
export default UserAPI