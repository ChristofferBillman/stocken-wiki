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
import UserAPI from '../network/UserAPI'
import User from '../types/User'
import { initalPage } from '../reducers/PageReducer'
import { getTimeSince } from '../util/getLastEditedTime'

export default function Page() {

	const { id } = useParams()
	const toast = useToast()

	const [page, setPage] = useState<IPage>(initalPage)
	const [lastEditor, setLastEditor] = useState<User>({ name: 'user_missing', _id: '0'})
	const [loading, setLoading] = useState(true)
	const [modalVisible, setModalVisibility] = useState(false)

	const navigate = useNavigate()

	useEffect(() => {
		PageAPI.byId(id,
			async page => {
				setPage(page)
				getLastEditor(page)
			},
			() => {
				toast('Failed to load page', 'error')
			})
	}, [])

	const getLastEditor = (page: IPage) => {
		console.log(page)
		if (page.meta.history.length === 0) {
			setLoading(false)
			return
		}
		const id = page.meta.history[page.meta.history.length - 1].userId
		console.log(id)

		UserAPI.byId(id,
			user => {
				setLastEditor(user)
				setLoading(false)
			},
			err => {
				setLoading(false)
				toast(err, 'error')
			})
	}

	const handleDelete = () => {
		PageAPI.remove(id,
			() => {
				toast('Page deleted', 'success')
				navigate(-1)
			},
			err => {
				toast(err, 'error')
			})
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
				onConfirm={handleDelete}
			/>
			<Row style={{ alignItems: 'center', width: '800px', margin: '0 auto' }}>
				<h5> Last edited {getTimeSince(getLastEditMillis())} by {lastEditor.name}</h5>
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
				<Button
					outline
					text='History'
					icon={<History color='var(--black)' />}
					onClick={() => navigate('/page/history/' + id)}
				/>
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