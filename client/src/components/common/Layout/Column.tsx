import CSSstyle from './Layout.module.css'

interface Props {
    children?: JSX.Element[] | JSX.Element
    style?: React.CSSProperties
    padding?: boolean
	loading?: boolean
}

export function Column({children, style, padding = true, loading}: Props) {

	const paddingStyle = padding ? CSSstyle.defaultPadding : ''

	if(loading) return (
		<div className={`${CSSstyle.column} ${paddingStyle} ${CSSstyle.loading} loader`} style={style}/>
	)
	return (
		<div className={`${CSSstyle.column} ${paddingStyle}`} style={style}>
			{children}
		</div>
	)
}
