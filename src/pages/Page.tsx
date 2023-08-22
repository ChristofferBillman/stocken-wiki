// External dependencies
import { useNavigate, useParams } from 'react-router-dom'

// Internal dependencies
import { Column, Filler, Row } from '../components/common/Layout'
import { Pencil, Trash, History } from '../assets/Icons'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import PageContentSection from '../components/PageContentSection'
import PageInfoSection from '../components/PageInfoSection'

// Debug markdown
import Test from '../Test.md'
import useStaticMarkdown from '../hooks/useStaticMarkdown'

const infoSection = {	
	meta: {
		author: 'Mee'
	},
	data: [{
		key: 'Title',
		value: 'Some title'
	},{
		key: 'Description',
		value: 'Hello there!'
	},
	{
		key: 'Capital',
		value: 'Stocken'
	},
	{
		key: 'Area',
		value: '400 000 00 sq.m'
	},
	{
		key: 'Religion',
		value: 'Agnostic'
	}]
}

export default function Page() {

	const { id } = useParams()
	const [md, _] = useStaticMarkdown(Test)

	const navigator = useNavigate()

	//const {data, loading, error}: FetchRequest<unknown> = useFetch<unknown>('fetch/that/will/fail/' + id)

	//if(error) return <p>Something went wrong</p>

	//if(loading) return <Spinner/>

	return (
		<>
			<Row style={{ alignItems: 'center', width: '800px', margin: '0 auto' }}>
				<h4> Breadcrumb -&gt; Hello -&gt; Again </h4>
				<Filler />
				<Button
					outline
					text='Edit'
					onClick={() => navigator('/page/edit/' + id)}
					icon={<Pencil color='var(--black)' />}
				/>
				<Button outline text='Delete' icon={<Trash color='var(--black)' />} />
				<Button outline text='History' icon={<History color='var(--black)' />} />
			</Row>

			<Card style={{margin: '0 auto'}}>
				<Row>
					<Column style={{ width: '400px' }}>
						<PageContentSection markdown={md} />
					</Column>
					<Column style={{ width: '300px' }}>
						<PageInfoSection infoSection={infoSection} />
					</Column>
				</Row>
			</Card>
		</>
	)
}
