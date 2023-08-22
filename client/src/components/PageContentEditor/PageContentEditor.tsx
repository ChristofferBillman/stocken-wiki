import { useRef } from 'react'

import CSSStyle from './PageContentEditor.module.css'

import useAutosizeTextArea from '../../hooks/useAutosizeTextarea'

interface Props {
	value: string,
	setValue: React.Dispatch<React.SetStateAction<string>>
}

export function PageContentEditor({ value, setValue }: Props) {
	const textAreaRef = useRef<HTMLTextAreaElement>(null)
  
	useAutosizeTextArea(textAreaRef.current, value)

	return (
		<textarea
			className={CSSStyle.editor}
			onChange={e => setValue(e.target?.value)}
			ref={textAreaRef}
			rows={2}
			value={value}
			placeholder='Click here and start typing to add content...'
		/>
	)
}
