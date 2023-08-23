import { Dispatch, useRef } from 'react'

import CSSStyle from './PageContentEditor.module.css'

import useAutosizeTextArea from '../../hooks/useAutosizeTextarea'
import Page from '../../types/Page'

import { PageReducerAction, PageReducerType } from '../../reducers/PageReducer'

interface Props {
	page: Page,
	dispatch: Dispatch<PageReducerAction>
}

export function PageContentEditor({ page, dispatch }: Props) {
	const textAreaRef = useRef<HTMLTextAreaElement>(null)
  
	useAutosizeTextArea(textAreaRef.current, page.content)

	return (
		<textarea
			className={CSSStyle.editor}
			onChange={e => dispatch({type: PageReducerType.SET_CONTENT, payload: e.target?.value})}
			ref={textAreaRef}
			rows={2}
			value={page.content}
			placeholder='Click here and start typing to add content...'
		/>
	)
}
