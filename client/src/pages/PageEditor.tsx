import { useEffect, useReducer, useState } from 'react'

// External Dependencies
import { useNavigate, useParams } from 'react-router-dom'

// Internal Dependencies
import { Column, Filler, Row } from '../components/common/Layout'
import { Cross, Floppy, Trash } from '../assets/Icons'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import PageContentEditor from '../components/PageContentEditor'
import PageInfoEditor from '../components/PageInfoEditor'

import ConfirmationModal from '../components/common/ConfirmationModal'
import PageAPI from '../network/PageAPI'
import useToast from '../contexts/ToastContext'
import useUser from '../contexts/UserContext'
import pageReducer, { PageReducerType, initalPage } from '../reducers/PageReducer'
import Page, { Edit } from '../types/Page'

export default function PageEditor() {
	const { id } = useParams()
	const {user} = useUser()

	// TODO: Consider making these one state with one reducer.
	const [page, dispatch] = useReducer(pageReducer, initalPage)
	const [refencePage, setRefencePage] = useState(initalPage)

	const [modalVisible, setModalVisibility] = useState(false)

	const [error, setError] = useState(false)

	const navigate = useNavigate()
	const toast = useToast()

	useEffect(() => {
		PageAPI.byId(id,
			page => {
				setRefencePage(page)
				dispatch({type: PageReducerType.SET_STATE, payload: page})
			},
			err => toast(err, 'error'))
	},[])

	const onSubmit = () => {
		if(!user || !id) {
			toast('Something went wrong when submitting edits.', 'error')
			return
		}

		const edit: Edit = {userId: user._id, time: Date.now()}
		const history = [...page.meta.history, edit]
		
		const pageWithEdit = {...page, meta: { history }}

		PageAPI.update(id, pageWithEdit,
			() => {
				toast('Page edited', 'success')
				navigate(-1)
			},
			err => toast(err, 'error'))
	}

	const title = page.content.split('\n')[0].replace('#','')
	
	if(error) return <h1>Something went wrong.</h1>

	return (
		<>
			<ConfirmationModal
				prompt='You have unsaved changes.'
				text='Do you want to discard them?'
				visible={modalVisible}
				onCancel={() => setModalVisibility(false)}
				onConfirm={() => navigate(-1)}
				confirmText='Discard & Exit'
			/>
			
			<Row style={{ alignItems: 'center', maxWidth: 'var(--page-max-width)', margin: '0 auto'}}>
				<h4 style={{color: 'var(--gray)'}}> Editing: {title} </h4>
				<Filler />
				
				{!hasChanged(refencePage, page) ? 
					<Button
						outline
						text='Discard Changes'
						icon={<Trash color='var(--black)'/>}
						onClick={() => setModalVisibility(true)}
					/>
					:
					<Button
						outline
						text='Cancel'
						onClick={() => navigate(-1)}
					/>
				}
				<Button
					text='Save Changes'
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

// Might be laggy in the future when pages get really long.
// This runs every time a user types in an input.
// We'll see...
function hasChanged(reference: Page, changed: Page) {
	return reference.content === changed.content &&
		JSON.stringify(reference.infoSection) == JSON.stringify(changed.infoSection)
}