import { useState, useContext, Dispatch, SetStateAction, createContext} from 'react'

interface User {
	id: string
	username: string
}

const defaultUser: User = {
	id: 'NOID',
	username: 'JaneDoe'
}

interface UserContext {
	user: User | null
	setUser: Dispatch<SetStateAction<User>>
}

// Create context
const userContext = createContext<UserContext>({
	user: defaultUser,
	setUser: (prevState: SetStateAction<User>) => prevState
})

interface Props {
	children: JSX.Element[] | JSX.Element
}
// Setup and export provider
export function UserContextProvider({children}: Props): JSX.Element {

	const [user, setUser] = useState(defaultUser)

	return (
		<userContext.Provider value={{user, setUser}}>
			{children}
		</userContext.Provider>
	)
}

// Export custom hook for using this context.
export default function useUser() {
	return useContext(userContext)
}

