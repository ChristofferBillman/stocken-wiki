import { useEffect } from 'react'
// From some guy on Medium.
// https://medium.com/@oherterich/creating-a-textarea-with-dynamic-height-using-react-and-typescript-5ed2d78d9848

const useAutosizeTextArea = (
	textAreaRef: HTMLTextAreaElement | null,
	value: string
) => {

	useEffect(() => {
		if (textAreaRef) {
			const scrollPos = window.scrollY
			textAreaRef.style.height = '0px'
			const scrollHeight = textAreaRef.scrollHeight
			textAreaRef.style.height = scrollHeight + 'px'
			window.scroll(0, scrollPos)
		}
	}, [textAreaRef, value])
}

export default useAutosizeTextArea