import { useState } from 'react'

export default function useStaticMarkdown(markdown: any): [string, React.Dispatch<React.SetStateAction<string>>] {
	const [markdownState, setMarkdown] = useState('')

	if(markdownState == '') {
		fetch(markdown).then(res => res.text()).then(md => setMarkdown(md))
	}
	return [markdownState, setMarkdown]
}