import CSSstyle from './Toast.module.css'
import Card from '../Card'
import { ToastType } from '../../../contexts/ToastContext'
import { Info, Cross, Check } from '../../../assets/Icons'

interface Props {
	message: string
	type: ToastType
	opacity: number
}

export function Toast({ message, type = 'info', opacity }: Props) {
	return (
		<Card className={`${getStyle(type)} ${CSSstyle.toast}`} style={{opacity}}>
			{getIcon(type)}
			<p>{message}</p>
		</Card>
	)
}

function getStyle(type: ToastType): string {
	switch(type) {
	case 'info': return CSSstyle.info
	case 'error': return CSSstyle.error
	case 'success': return CSSstyle.success
	case 'warn': return CSSstyle.warn
	}
}

function getIcon(type: ToastType): JSX.Element {
	switch(type) {
	case 'info': return <Info color='var(--primary)'/>
	case 'error': return <Cross color='#ff4242'/>
	case 'success': return <Check color='#2e8a22'/>
	case 'warn': return <Info color='#ffc34c'/>
	}
}