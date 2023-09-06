import { useState } from 'react'

import style from './Image.module.css'

export default function Image({ src, alt, children }: any) {

	const [loading, setLoading] = useState(true)

	return (
		<>
			<div className={`${style.load} loader`} style={{display: loading ? 'block' : 'none'}}/>
			<img
				src={src}
				alt={alt}
				style={{display: loading ? 'none' : 'block', width: '100%'}}
				onLoad={() => setLoading(false)}
			>
				{children}
			</img>
		</>
	)
}