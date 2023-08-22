import CSSStyle from './PageCard.module.css'

import { useNavigate } from 'react-router-dom'

import Page from '../../types/Page'
import Card from '../common/Card'
import { Column } from '../common/Layout'
import PlaceholderImg from '../../assets/img/placeholder.jpg'

interface Props {
    page: Page
}

export function PageCard({page}: Props) {

	const navigate = useNavigate()
	return (
		<Card onClick={() => navigate('/page/' + page.id)}>
			<CardImage src={PlaceholderImg}/>
			<Column style={{width: '300px'}}>
				<h4>{page.title}</h4>
				<p>{page.description}</p>
			</Column>
		</Card>
	)
}

interface CardImageProps {
    src: string
}

function CardImage({src}: CardImageProps) {
	return <img className={CSSStyle.image} src={src}/>
}
