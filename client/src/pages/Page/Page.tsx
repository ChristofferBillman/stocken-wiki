// External dependencies
import { useNavigate, useParams } from 'react-router-dom'

// Internal dependencies
import { Column, Row } from '../../components/common/Layout'
import { Pencil, Trash, History } from '../../assets/Icons'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'
import PageContentSection from '../../components/PageContentSection'
import PageInfoSection from '../../components/PageInfoSection'

import { useEffect, useState } from 'react'
import ConfirmationModal from '../../components/common/ConfirmationModal'
import IPage from '../../types/Page'
import PageAPI from '../../network/PageAPI'
import useToast from '../../contexts/ToastContext'
import UserAPI from '../../network/UserAPI'
import User from '../../types/User'
import { initalPage } from '../../reducers/PageReducer'
import P from '../../components/common/P'

import style from './Page.module.css'

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
	}, [id])

	const getLastEditor = (page: IPage) => {
		console.log(page)
		if (page.authors.length === 0) {
			setLoading(false)
			return
		}
		const id = page.authors[page.authors.length - 1]
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

	return (
		<>
			<ConfirmationModal
				prompt='Are you sure you want to delete this page?'
				text='This is an irreversible action.'
				visible={modalVisible}
				onCancel={() => setModalVisibility(false)}
				onConfirm={handleDelete}
			/>
			<div style={{ margin: '0 auto', maxWidth: 'var(--page-max-width)' }}>
				<P loading={loading}>
						Last edited by {lastEditor.name}
				</P>
				<Row className={style.buttonsRow}>
					<Button
						outline
						text='Edit'
						onClick={() => navigate('/page/edit/' + id)}
						icon={<Pencil color='var(--black)' />}
						loading={loading}
					/>
					<Button
						outline
						text='Delete'
						icon={<Trash color='var(--black)' />}
						onClick={() => setModalVisibility(true)}
						loading={loading}
					/>
					<Button
						outline
						text='History'
						icon={<History color='var(--black)' />}
						onClick={() => navigate('/page/history/' + id)}
						loading={loading}
					/>
				</Row>

				<Card style={{ margin: '0 auto', width: 'var(--page-max-width)', minHeight: '100vh' }}>
					<Row className={style.pageContainer}>
						<Column style={{flex: 4, padding: 0}} loading={loading}>
							<PageContentSection markdown={page.content} />
						</Column>
						<Column style={{flex: 3, padding: 0}} loading={loading}>
							<PageInfoSection infoSection={page.infoSection} />
						</Column>
					</Row>
				</Card>
			</div>
		</>
	)
}