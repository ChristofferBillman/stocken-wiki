import { CSSProperties, useRef } from 'react'
import CSSstyle from './Modal.module.css'
import Card from '../Card'
import { Filler, Row } from '../Layout'
import Button from '../Button'
import useOutsideClick from '../../../hooks/useOutsideClick'

interface Props {
	style?: CSSProperties
	prompt: string
	text?: string
	confirmText?: string
	cancelText?: string
	onCancel: () => void
	onConfirm: () => void
	visible: boolean
}

export function ConfirmationModal({ prompt, onCancel, onConfirm, visible, text, cancelText, confirmText}: Props) {

	const ref = useRef(null)
	useOutsideClick(ref, onCancel)

	const visibleStyle = visible ? CSSstyle.visible : CSSstyle.hidden
	return (
		<div className={`${CSSstyle.backdrop} ${visibleStyle}`}>
			<Card className={CSSstyle.modal} forwardRef={ref}>
				<h2>{prompt}</h2>
				<h5>{text}</h5>
				<Filler/>
				<Row>
					<Button outline text={cancelText ? cancelText : 'Cancel'} onClick={onCancel}/>
					<Filler/>
					<Button color='var(--red)' text={confirmText ? confirmText : 'Confirm'} onClick={onConfirm}/>
				</Row>
			</Card>
		</div>
	)
}