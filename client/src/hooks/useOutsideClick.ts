import React, { useEffect } from 'react'

export default function useOutsideClick(ref: React.MutableRefObject<any>, onClick: () => void) {
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent)=> {
			if (ref.current && !ref.current.contains(e.target)) {
				onClick()
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [ref])
}