// External dependencies
import { useNavigate, useParams } from 'react-router-dom'

// Internal dependencies
import { Column, Filler, Row } from '../components/common/Layout'
import { History, Restore } from '../assets/Icons'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import PageContentSection from '../components/PageContentSection'
import PageInfoSection from '../components/PageInfoSection'

import { useEffect, useState } from 'react'
import useToast from '../contexts/ToastContext'
import UserAPI from '../network/UserAPI'
import User from '../types/User'
import { getTimeSince } from '../util/getLastEditedTime'
import PageHistoryAPI from '../network/PageHistoryAPI'
import PageRecord, {initialPageRecord} from '../types/PageRecord.ts'

export default function HistoricalPage() {

	const { id, version } = useParams()
	const toast = useToast()

	const [pageRecord, setPageRecord] = useState(initialPageRecord)
	const [editor, setEditor] = useState<User>({ name: 'user_missing', _id: '0'})
	const [loading, setLoading] = useState(true)

	const navigate = useNavigate()

	useEffect(() => {
		PageHistoryAPI.record(id, Number(version),
			async pageRecord => {
				setPageRecord(pageRecord)
				console.log(pageRecord)
				getEditor(pageRecord)
			},
			() => {
				toast('Failed to load page', 'error')
			})
	}, [])

	const getEditor = (page: PageRecord) => {

		console.log(page.author)
		const id = page.author

		UserAPI.byId(id,
			user => {
				setEditor(user)
				setLoading(false)
			},
			err => {
				setLoading(false)
				toast(err, 'error')
			})
	}

	const getEditMillis = () => {
		return pageRecord.time
	}

	const handleRestore = () => {
		toast('This feature is not yet implemented.', 'warn')
	}

	if (loading) return <Skeleton />

	return (
		<>
			<Row style={{ alignItems: 'center', width: '800px', margin: '0 auto' }}>
				<h5> This revision was made {getTimeSince(getEditMillis())} by {editor.name}</h5>
				<Filler />

				<Button
					outline
					text='Restore this version'
					icon={<Restore color='var(--black)' />}
					onClick={handleRestore}
				/>
				<Button
					outline
					text='Back to History'
					icon={<History color='var(--black)' />}
					onClick={() => navigate('/page/history/' + id)}
				/>
			</Row>

			<Card style={{ margin: '0 auto' }}>
				<Row>
					<Column style={{ width: '400px' }}>
						<PageContentSection markdown={pageRecord.page.content} />
					</Column>
					<Column style={{ width: '300px' }}>
						<PageInfoSection infoSection={pageRecord.page.infoSection} />
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