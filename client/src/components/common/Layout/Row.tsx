import CSSstyle from './Layout.module.css'

interface Props {
    children: JSX.Element[] | JSX.Element
    style?: React.CSSProperties
	className?: string,
	id?: string,
	forwardRef?: React.RefObject<HTMLDivElement>
}

export function Row({children, style, className, id, forwardRef}: Props) {
	return (
		<div className={`${CSSstyle.row} ${CSSstyle.defaultPadding} ${className}`}
			style={style} id={id} ref={forwardRef}
		>
			{children}
		</div>
	)
}
