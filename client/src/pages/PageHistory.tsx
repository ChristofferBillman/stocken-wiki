// External dependencies
import {useNavigate, useParams} from 'react-router-dom'

// Internal dependencies
import {Column, Filler, Row} from '../components/common/Layout'
import Card from '../components/common/Card'

import { useEffect, useState } from 'react'
import useToast from '../contexts/ToastContext'
import UserAPI from '../network/UserAPI'
import { getTimeSince } from '../util/getLastEditedTime'
import PageHistoryAPI from '../network/PageHistoryAPI.ts'
import PageRecord, { initialPageRecord } from '../types/PageRecord.ts'
import Button from '../components/common/Button'
import { History } from '../assets/Icons'

export default function PageHistory() {

	const { id } = useParams()
	const toast = useToast()
	const navigate = useNavigate()

	const [history, setHistory] = useState([initialPageRecord])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		PageHistoryAPI.history(id,
			async history => {
				setHistory(history)
				console.log(history)
				setLoading(false)
			},
			() => {
				toast('Failed to load page history', 'error')
			})
	}, [])

	if (loading) return <Skeleton />

	if(history.length == 0) return <p>This page has no history yet.</p>

	const title = history[history.length - 1].page.content.split('\n')[0].replace('#','')

	return (
		<div style={{ margin: '0 auto', maxWidth: 'var(--page-max-width)' }}>
			<h5> Version History of {title} </h5>
			<Row style={{ alignItems: 'center', padding: '1rem 0 1rem 0' }}>
				<Filler/>
				<Button
					outline
					text='Back to Page'
					onClick={() => navigate('/page/' + id)}
				/>
			</Row>

			<Card style={{ margin: '0 auto' }}>
				<Row style={{ width: 'var(--page-max-width', boxSizing: 'border-box' }}>
					<Column style={{ padding: 0 }}>
						{history.map((record: PageRecord) => <PageRecordListItem key={record.time} record={record}/>)}
					</Column>
				</Row>
			</Card>
		</div>
	)
}
interface EditListItemProps {
	record: PageRecord
}
function PageRecordListItem({record}: EditListItemProps): JSX.Element {

	const [user, setUser] = useState('')
	const navigate = useNavigate()

	useEffect(() => {
		UserAPI.byId(record.author,
			user => setUser(user.name),
			() => setUser('Not Found'))
	})

	return (
		<Row style={{alignItems: 'center', padding: 0, flexWrap: 'wrap'}}>
			<h4>{user}</h4>
			<p style={{margin: 0}}>{getTimeSince(record.time)}</p>
			<Button
				text='View this version'
				outline
				icon={<History color={'var(--black)'}/>}
				onClick={() => navigate('/page/history/' + record.page._id + '/' + record.versionNumber)}
			/>
		</Row>
	)
}

function Skeleton(): JSX.Element {
	return (
		<Card style={{ margin: '0 auto', width: '812px', height: '300px', marginTop: '75px' }}>
			<p></p>
		</Card>
	)
}