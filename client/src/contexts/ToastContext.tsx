import { useState, useContext, createContext } from 'react'
import Toast from '../components/common/Toast'

export type ToastType = 'success' | 'error' | 'warn' | 'info'
// Create context
// eslint-disable-next-line @typescript-eslint/no-empty-function
const toastContext = createContext((message: string, type: ToastType) => { })

interface Props {
	children: JSX.Element[] | JSX.Element
}
// Setup and export provider
export function ToastContextProvider({ children }: Props): JSX.Element {

	const [opacity, setOpacity] = useState(0)
	const [message, setMessage] = useState('')
	const [type, setType] = useState<ToastType>('info')

	const setToast = (message: string, type: ToastType) => {
		setType(type)
		setMessage(message)
		setOpacity(1)

		setTimeout(() => setOpacity(0), 5000)
	}

	return (
		<toastContext.Provider value={setToast}>
			<Toast
				message={message}
				type={type}
				opacity={opacity}
			/>
			{children}
		</toastContext.Provider>
	)
}

// Export custom hook for using this context.
export default function useToast() {
	return useContext(toastContext)
}

