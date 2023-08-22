import CSSstyle from './Layout.module.css'

interface Props {
    children?: JSX.Element[] | JSX.Element
    style?: React.CSSProperties
    padding?: boolean
}

export function Column({children, style, padding = true}: Props) {

	const paddingStyle = padding ? CSSstyle.defaultPadding : ''

	return (
		<div className={`${CSSstyle.column} ${paddingStyle}`} style={style}>
			{children}
		</div>
	)
}
