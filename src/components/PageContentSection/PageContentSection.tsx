import ReactMarkdown from 'react-markdown'

interface Props {
	markdown: string
}

export function PageContentSection({markdown}: Props) {
	return (
		<ReactMarkdown>
			{markdown}
		</ReactMarkdown>
	)
}
