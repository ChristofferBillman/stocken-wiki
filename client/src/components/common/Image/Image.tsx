import { useState } from 'react'

import style from './Image.module.css'

export default function Image({ src, alt, children }: any) {

	const [loading, setLoading] = useState(true)
	const [galleryVisible, setGalleryVisible] = useState(false)

	return (
		<>
			<div className={`${style.load} loader`} style={{display: loading ? 'block' : 'none'}}/>
			<img
				src={src}
				alt={alt}
				style={{display: loading ? 'none' : 'block', width: '100%'}}
				onLoad={() => setLoading(false)}
				onClick={() => setGalleryVisible(true)}
			>
				{children}
			</img>
			<div className={style.gallery} style={{display: galleryVisible ? 'block' : 'none'}} onClick={() => setGalleryVisible(false)}>
				<img
					className={style.fullscreenImg}
					style={{display: loading ? 'none' : 'block'}}
					src={src}
					alt={alt}
				>
					{children}
				</img>
			</div>
		</>
	)
}