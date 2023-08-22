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
import { useState } from 'react'
import ConfirmationModal from '../components/common/ConfirmationModal'
import IPage from '../types/Page'

const infoSection = {	
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

const initalPage = {
	id: 1,
	content: '# Test',
	infoSection: infoSection,
	meta: {
		history: [{user: 'Popkrull', time: 1692709017399 }]
	}
}

export default function Page() {

	const { id } = useParams()
	const [md, _] = useStaticMarkdown(Test)

	const [page, setPage] = useState<IPage>(initalPage)

	const navigate = useNavigate()

	//const {data, loading, error}: FetchRequest<unknown> = useFetch<unknown>('fetch/that/will/fail/' + id)

	//if(error) return <p>Something went wrong</p>

	//if(loading) return <Spinner/>

	const [modalVisible, setModalVisibility] = useState(false)

	const getLastEditor = () => {
		return page.meta.history[page.meta.history.length-1].user
	}

	const getLastEditMillis = () => {
		return page.meta.history[page.meta.history.length-1].time
	}

	return (
		<>
			<ConfirmationModal
				prompt='Are you sure you want to delete this page?'
				text='This is an irreversible action.'
				visible={modalVisible}
				onCancel={() => setModalVisibility(false)}
				onConfirm={() => navigate(-1)}
			/>
			<Row style={{ alignItems: 'center', width: '800px', margin: '0 auto' }}>
				<h5> Last edited {getLastEditedTime(getLastEditMillis())} by {getLastEditor()} </h5>
				<Filler />
				<Button
					outline
					text='Edit'
					onClick={() => navigate('/page/edit/' + id)}
					icon={<Pencil color='var(--black)' />}
				/>
				<Button
					outline
					text='Delete'
					icon={<Trash color='var(--black)' />}
					onClick={() => setModalVisibility(true)}
				/>
				<Button outline text='History' icon={<History color='var(--black)' />} />
			</Row>

			<Card style={{margin: '0 auto'}}>
				<Row>
					<Column style={{ width: '400px' }}>
						<PageContentSection markdown={page.content} />
					</Column>
					<Column style={{ width: '300px' }}>
						<PageInfoSection infoSection={page.infoSection} />
					</Column>
				</Row>
			</Card>
		</>
	)
}

const getLastEditedTime = (lastEdit: number): string => {
	const date = new Date(lastEdit)
	const now = new Date()

	const diffInMs = now.getTime() - date.getTime()

	const seconds = Math.round(diffInMs/1000)
	const minutes = Math.round(diffInMs/(1000 * 60))
	const hours = Math.round(diffInMs/(1000 * 60 * 60))

	if(seconds < 60) {
		return `${seconds} seconds ago`
	}
	if(minutes < 60) {
		return `about ${minutes} min ago`
	}
	if(hours < 24) {
		return `about ${hours} hours ago}`
	}
	return date.getFullYear() +   '-' + date.getMonth() + '-' + date.getDate()
}