import { useReducer } from 'react'

// External Dependencies
import { useNavigate } from 'react-router-dom'

// Internal Dependencies
import { Column, Filler, Row } from '../components/common/Layout'
import { Floppy, Trash } from '../assets/Icons'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import PageContentEditor from '../components/PageContentEditor'
import PageInfoEditor from '../components/PageInfoEditor'
import PageAPI from '../network/PageAPI'
import useToast from '../contexts/ToastContext'
import useUser from '../contexts/UserContext'
import pageReducer, { initalPage } from '../reducers/PageReducer'
import { Edit } from '../types/Page'

export default function PageCreator() {
	const navigate = useNavigate()

	const [page, dispatch] = useReducer(pageReducer, initalPage)

	const toast = useToast()
	const {user} = useUser()

	const title = page.content.split('\n')[0].replace('#','')

	const onSubmit = () => {
		const edit: Edit = {userId: user._id, time: Date.now()}
		const history = [...page.meta.history, edit]
		
		const pageWithEdit = {...page, meta: { history }}
		
		PageAPI.create(pageWithEdit,
			() => {
				toast('Successfully added page', 'success')
				navigate(-1)
			},
			() => toast('Cannot submit empty page.', 'error'))
	}
	
	return (
		<>
			<Row style={{ alignItems: 'center', maxWidth: 'var(--page-max-width)', margin: '0 auto'}}>
				<h4 style={{color: 'var(--gray)'}}> Creating: {title} </h4>
				<Filler />
				
				<Button
					outline
					text='Discard & Exit'
					icon={<Trash color='var(--black)'/>}
					onClick={() => navigate(-1)}
				/>
				<Button
					text='Submit'
					icon={<Floppy color='var(--white)' />}
					color='var(--primary)'
					onClick={onSubmit}
				/>
			</Row>

			<Card style={{border: 'dashed 1.5px var(--gray)', margin: '0 auto'}}>
				<Row>
					<Column style={{ width: '400px'}}>
						<PageContentEditor page={page} dispatch={dispatch} />
					</Column>
					<Column>
						<PageInfoEditor page={page} dispatch={dispatch} />
					</Column>
				</Row>
			</Card>
		</>
	)
}
