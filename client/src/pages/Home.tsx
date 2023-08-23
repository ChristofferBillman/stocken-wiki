import { useEffect, useState } from 'react'
import PageCard from '../components/PageCard'
import { Column, Row } from '../components/common/Layout'
import Page from '../types/Page'
import PageAPI from '../network/PageAPI'

export default function Home() {

	const [pages, setPages] = useState<Page[]>([])
	const [error, setError] = useState('')

	useEffect(() => {
		PageAPI.all(pages => setPages(pages), err => setError(err))
	},[])

	if(error != '') return (
		<>
			<h1>An error occured:</h1>
			<h5>{error}</h5>
		</>
	)

	return (
		<Row style={{
			maxWidth: 'var(--page-max-width)',
			boxSizing: 'border-box',
			padding: '2rem',
			justifyContent: 'space-between',
			gap: '2rem',
			margin: '0 auto'
		}}>
			<Column style={{padding: 0, flex: 1}}>
				<h1>Recently Edited</h1>
				{pages.map(page => <PageCard key={page._id} page={page}/>)}
			</Column>
			<Column style={{padding: 0, flex: 1}}>
				<h1>New Pages</h1>
				{pages.map(page => <PageCard key={page._id} page={page}/>)}
			</Column>
		</Row>
	)
}
