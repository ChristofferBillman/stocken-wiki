import style from './Button.module.css'

interface Props {
	text?: string
	icon?: JSX.Element
	color?: string
	outline?: boolean
	textColor?: string
	onClick?: () => void
	loading?: boolean
}

export function Button({ icon, text, textColor, color = 'var(--white)', outline = false, onClick, loading }: Props) {

	const outlineStyle = outline ? style.outline : ''

	const textColorStyle = color == 'var(--white)' ? style.darktext : style.lighttext

	if(loading) return (
		<button className={`${style.btn} loader`} style={{zIndex: -1}}>
			<span className={`${style.text}`} style={{opacity: 0, paddingLeft: '24px'}}>
				{text}
			</span>
		</button>
	)

	return (
		<button
			className={`${style.btn} ${outlineStyle}`}
			style={{ background: color }}
			onClick={onClick}
		>
			{icon}

			{text &&
				<span className={`${style.text} ${textColorStyle}`} style={{color: textColor}}>
					{text}
				</span>}
		</button>
	)
}