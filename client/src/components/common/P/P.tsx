import style from './P.module.css'
import { ReactNode } from 'react'
interface Props {
	loading?: boolean
	children?: ReactNode
}
export default function P({ loading, children }: Props) {

	if(loading) return (
		<div className={`${style.p} loader`}/>
	)

	return (
		<p>{children}</p>
	)
}