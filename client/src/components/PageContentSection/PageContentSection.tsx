import ReactMarkdown from 'react-markdown'
import PageContentLink from './PageContentLink'
import Image from '../common/Image'

interface Props {
	markdown: string
}

export function PageContentSection({markdown}: Props) {
	return (
		<ReactMarkdown components={{a: PageContentLink, img: Image}}>
			{markdown}
		</ReactMarkdown>
	)
}
