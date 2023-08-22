// External dependencies
import { CSSProperties } from 'react'

// Styling
import CSSstyle from './Card.module.css'

interface Props {
  children: JSX.Element[] | JSX.Element
  style?: CSSProperties
  onClick?: () => void
  className?: string,
  forwardRef?: any
}

export function Card({children, onClick, style, className, forwardRef}: Props) {

	// If card has onClick prop, it should respond as such for the user,
	// i.e. having hover effects.
	const clickableStyle = onClick ? CSSstyle.cardClickable : ''

	return (
		<div ref={forwardRef} className={`${CSSstyle.card} ${clickableStyle} ${className}`} style={style} onClick={onClick}>
			{children}
		</div>
	)
}
