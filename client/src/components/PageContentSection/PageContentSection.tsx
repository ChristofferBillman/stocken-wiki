import ReactMarkdown from 'react-markdown'
import PageContentLink from './PageContentLink'

interface Props {
	markdown: string
}

export function PageContentSection({markdown}: Props) {
	return (
		<ReactMarkdown components={{a: PageContentLink}}>
			{markdown}
		</ReactMarkdown>
	)
}
