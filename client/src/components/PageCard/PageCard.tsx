import CSSStyle from './PageCard.module.css'

import { useNavigate } from 'react-router-dom'

import Page from '../../types/Page'
import Card from '../common/Card'
import { Column } from '../common/Layout'
import PlaceholderImg from '../../assets/img/placeholder.jpg'
import { useMemo } from 'react'

interface Props {
    page: Page
}

export function PageCard({page}: Props) {

	const navigate = useNavigate()

	const {title, description} = useMemo(() => getTitleAndDescription(page), [page])

	return (
		<Card onClick={() => navigate('/page/' + page._id)}>
			<CardImage src={PlaceholderImg}/>
			<Column style={{width: '300px'}}>
				<h4>{title}</h4>
				<p>{description}</p>
			</Column>
		</Card>
	)
}

function getTitleAndDescription(page: Page): {title: string, description: string} {
	const markdown = page.content

	const lines = markdown.split(/\r?\n/)

	const title = lines[0].replace('#','')
	const description = lines[1]
	return {title, description}
}

interface CardImageProps {
    src: string
}

function CardImage({src}: CardImageProps) {
	return <img className={CSSStyle.image} src={src}/>
}
