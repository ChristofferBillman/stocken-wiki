import { CSSProperties } from 'react'
import CSSstyle from './Input.module.css'

interface Props {
    placeholder?: string
    style?: CSSProperties
	value: string
	setValue: (arg0: React.ChangeEvent<HTMLInputElement>) => void
	name: string
}

export function Input({placeholder, value, setValue, name, style}: Props) {
	return (
		<input
			style={style}
			className={CSSstyle.input}
			placeholder={placeholder}
			value={value}
			name={name}
			onChange={e => setValue(e)}
		/>
	)
}
