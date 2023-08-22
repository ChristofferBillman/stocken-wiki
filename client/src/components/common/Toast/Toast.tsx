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
		<Card className={`${CSSstyle.toast} ${CSSstyle[type]}`} style={{opacity}}>
			{getIcon(type)}
			<p>{message}</p>
		</Card>
	)
}

function getIcon(type: ToastType): JSX.Element {
	switch(type) {
	case 'info': return <Info color='var(--primary)'/>
	case 'error': return <Cross color='#ff4242'/>
	case 'success': return <Check color='#6eff5b'/>
	case 'warn': return <Info color='#ffc34c'/>
	}
}