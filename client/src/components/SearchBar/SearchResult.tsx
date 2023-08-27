import { Row } from '../common/Layout'
import style from './SearchBar.module.css'

import Page from '../../types/Page'
import { PageIcon } from '../../assets/Icons'

interface Props {
	page: Page
}

export function SearchResult({page}: Props) {

	const title = page.content.replace(/^#+\s/, '').split('\n')[0]
	const description = page.content.replace(/^#+\s/, '').split('\n')[1]

	return (
		<a href={`/page/${page._id}`}>
			<Row id={style.searchResult} style={{alignItems: 'center'}}>
				<div>
					<PageIcon color='var(--black)'/>
				</div>
				<h4>{title}</h4>
				<p className={style.descriptionText}>{description}</p>
			</Row>
		</a>
	)
}