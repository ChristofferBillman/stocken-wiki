import { useContext, Dispatch, SetStateAction, createContext} from 'react'
import User from '../types/User'
import useLocalStorage from '../hooks/useLocalStorage'

interface UserContext {
	user: User
	setUser: Dispatch<SetStateAction<User | undefined>>
}

// Create context
const userContext = createContext<UserContext>({
	user: {_id: 'NOID', name: 'no_name'},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setUser: () => {}
})

interface Props {
	children: JSX.Element[] | JSX.Element
}
// Setup and export provider
export function UserContextProvider({children}: Props): JSX.Element {

	const [user, setUser] = useLocalStorage('user','unset')

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

