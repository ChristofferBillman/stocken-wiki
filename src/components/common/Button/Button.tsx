import style from './Button.module.css'

interface Props {
	text?: string
	icon?: JSX.Element
	color?: string
	outline?: boolean
	onClick?: () => void
}

export function Button({ icon, text, color = 'var(--white)', outline = false, onClick }: Props) {

	const outlineStyle = outline ? style.outline : ''

	const textColor = color == 'var(--white)' ? style.darktext : style.lighttext

	return (
		<button
			className={`${style.btn} ${outlineStyle}`}
			style={{ background: color }}
			onClick={onClick}
		>
			{icon}

			{text &&
				<span className={`${style.text} ${textColor}`}>
					{text}
				</span>}
		</button>
	)
}