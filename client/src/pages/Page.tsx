// External dependencies
import { useNavigate, useParams } from 'react-router-dom'

// Internal dependencies
import { Column, Filler, Row } from '../components/common/Layout'
import { Pencil, Trash, History } from '../assets/Icons'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import PageContentSection from '../components/PageContentSection'
import PageInfoSection from '../components/PageInfoSection'

import { useEffect, useState } from 'react'
import ConfirmationModal from '../components/common/ConfirmationModal'
import IPage from '../types/Page'
import PageAPI from '../network/PageAPI'
import useToast from '../contexts/ToastContext'
import Spinner from '../components/common/Spinner'

const infoSection = {
	data: [{
		key: 'Title',
		value: 'Some title'
	}, {
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

const initalPage: IPage = {
	_id: '1',
	content: '# Test',
	infoSection: infoSection,
	meta: {
		history: [{ user: 'JaneDoe', time: 1692709017399 }]
	}
}

export default function Page() {

	const { id } = useParams()

	const [page, setPage] = useState<IPage>(initalPage)
	const toast = useToast()

	const [loading, setLoading] = useState(true)

	useEffect(() => {
		PageAPI.byId(id!,
			async page => {
				setPage(page)
				setLoading(false)
				toast('Loaded page!', 'success')
			},
			() => {
				toast('Failed to load page', 'error')
			})
	}, [])

	const navigate = useNavigate()

	const [modalVisible, setModalVisibility] = useState(false)

	const getLastEditor = () => {
		if (page.meta.history.length === 0) {
			return 'user_missing'
		}
		return page.meta.history[page.meta.history.length - 1].user
	}

	const getLastEditMillis = () => {
		if (page.meta.history.length === 0) {
			return 0
		}
		return page.meta.history[page.meta.history.length - 1].time
	}

	if (loading) return <Skeleton />

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

			<Card style={{ margin: '0 auto' }}>
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

function Skeleton(): JSX.Element {
	return (
		<Card style={{ margin: '0 auto', width: '812px', height: '300px', marginTop: '75px' }}>
			<p></p>
		</Card>
	)
}

const getLastEditedTime = (lastEdit: number): string => {
	const date = new Date(lastEdit)
	const now = new Date()

	const diffInMs = now.getTime() - date.getTime()

	const seconds = Math.round(diffInMs / 1000)
	const minutes = Math.round(diffInMs / (1000 * 60))
	const hours = Math.round(diffInMs / (1000 * 60 * 60))

	if (seconds < 60) {
		return `${seconds} seconds ago`
	}
	if (minutes < 60) {
		return `about ${minutes} min ago`
	}
	if (hours < 24) {
		return `about ${hours} hours ago`
	}
	return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
}