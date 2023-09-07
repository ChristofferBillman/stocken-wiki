import { CSSProperties } from 'react'

interface Props {
	style?: CSSProperties
}

export function Divider({ style }: Props) {
	return (
		<div style={{...{
			height: '1.5px',
			background: 'var(--border)',
			margin: '1rem 0 1rem 0'
		}, ...style}}
		/>
	)
}