import { useEffect, useState } from 'react'
import PageCard from '../components/PageCard'
import { Row } from '../components/common/Layout'
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
		<>
			<h1 style={{marginBottom: '1rem'}}>All Pages</h1>
			<Row style={{ flexWrap: 'wrap', gap: '2rem', padding: 0 }}>
				{pages.map(page => <PageCard key={page._id} page={page}/>)}
			</Row>
		</>
	)
}
