// External dependencies
import { CSSProperties } from 'react'

// Styling
import CSSstyle from './Card.module.css'

interface Props {
	children: JSX.Element[] | JSX.Element
	style?: CSSProperties
	onClick?: () => void
	className?: string
	loading?: boolean
	forwardRef?: any
}

export function Card({children, onClick, style, className, loading, forwardRef}: Props) {

	// If card has onClick prop, it should respond as such for the user,
	// i.e. having hover effects.
	const clickableStyle = onClick ? CSSstyle.cardClickable : ''

	if(loading) return (
		<div className={`${CSSstyle.card} ${clickableStyle} ${className} loader`} style={style}/>
	)

	return (
		<div ref={forwardRef} className={`${CSSstyle.card} ${clickableStyle} ${className}`} style={style} onClick={onClick}>
			{children}
		</div>
	)
}
