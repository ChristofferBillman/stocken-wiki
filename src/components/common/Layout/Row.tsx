import CSSstyle from './Layout.module.css'

interface Props {
    children: JSX.Element[] | JSX.Element
    style?: React.CSSProperties
	className?: string
}

export function Row({children, style, className}: Props) {
	return (
		<div className={`${CSSstyle.row} ${CSSstyle.defaultPadding} ${className}`}
			style={style}
		>
			{children}
		</div>
	)
}
