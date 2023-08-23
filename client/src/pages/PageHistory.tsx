// External dependencies
import { useParams } from 'react-router-dom'

// Internal dependencies
import { Column, Row } from '../components/common/Layout'
import Card from '../components/common/Card'

import { useEffect, useState } from 'react'
import IPage, { Edit } from '../types/Page'
import PageAPI from '../network/PageAPI'
import useToast from '../contexts/ToastContext'
import { initalPage } from '../reducers/PageReducer'
import UserAPI from '../network/UserAPI'
import { getTimeSince } from '../util/getLastEditedTime'

export default function PageHistory() {

	const { id } = useParams()
	const toast = useToast()

	const [page, setPage] = useState<IPage>(initalPage)
	const [loading, setLoading] = useState(true)

	console.log(page)

	useEffect(() => {
		PageAPI.byId(id,
			async page => {
				setPage(page)
				setLoading(false)
			},
			() => {
				toast('Failed to load page', 'error')
			})
	}, [])

	const title = page.content.split('\n')[0].replace('#','')

	if (loading) return <Skeleton />

	return (
		<>
			<Row style={{ alignItems: 'center', maxWidth: 'var(--page-max-width)', margin: '0 auto' }}>
				<h5> Changes to {title} </h5>
			</Row>

			<Card style={{ margin: '0 auto' }}>
				<Row>
					<Column style={{ width: '400px' }}>
						{page.meta.history.map((edit: Edit) => <EditListItem key={edit.time} edit={edit}/>)}
					</Column>
					<Column style={{ width: '300px', alignItems: 'center' }}>
						<h5>Empty Currently!</h5>
					</Column>
				</Row>
			</Card>
		</>
	)
}
interface EditListItemProps {
	edit: Edit
}
function EditListItem({edit}: EditListItemProps): JSX.Element {

	const [user, setUser] = useState('')

	useEffect(() => {
		UserAPI.byId(edit.userId,
			user => setUser(user.name),
			() => setUser('Not Found'))
	})

	return (
		<Row style={{alignItems: 'center', padding: 0}}>
			<h4>{user}</h4>
			<p>{getTimeSince(edit.time)}</p>
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