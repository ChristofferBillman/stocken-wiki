import { useReducer, useState } from 'react'

// External Dependencies
import { useNavigate, useParams } from 'react-router-dom'

// Internal Dependencies
import { Column, Filler, Row } from '../components/common/Layout'
import { Floppy, Trash } from '../assets/Icons'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import PageContentEditor from '../components/PageContentEditor'
import InfoSection from '../types/InfoSection'
import PageInfoEditor from '../components/PageInfoEditor'
import pageInfoReducer from '../components/PageInfoEditor/PageInfoReducer'

// Imports related to debug-markdown
import useStaticMarkdown from '../hooks/useStaticMarkdown'
import Test from '../Test.md'
import ConfirmationModal from '../components/common/ConfirmationModal'

const initialInfoSection: InfoSection = {
	data: [{
		key: 'Title',
		value: 'Stocken'
	},
	{
		key: 'Description',
		value: 'Stocken'
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

export default function PageEditor() {
	const { id } = useParams()

	// This is a bit broken since this state is mutated in PageInfoEditor.
	// It persists even if you have pressed Discard & Exit.
	// This is only even temporary, so its fine for now until it's
	// replaced with real logic.
	const [md, setMd] = useStaticMarkdown(Test)
	const navigate = useNavigate()

	const [infoSection, dispatch] = useReducer(pageInfoReducer, initialInfoSection)
	const [modalVisible, setModalVisibility] = useState(false)

	const title =  md.split('\n')[0].replace('#','')
	
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
			
			<Row style={{ alignItems: 'center', width: '886px', margin: '0 auto'}}>
				<h4 style={{color: 'var(--gray)'}}> Editing: {title} </h4>
				<Filler />
				
				<Button
					outline
					text='Discard & Exit'
					icon={<Trash color='var(--black)'/>}
					onClick={() => setModalVisibility(true)}
				/>
				<Button
					text='Save Changes'
					icon={<Floppy color='var(--white)' />}
					color='var(--primary)'
				/>
			</Row>

			<Card style={{border: 'dashed 1.5px var(--gray)', margin: '0 auto'}}>
				<Row>
					<Column style={{ width: '400px'}}>
						<PageContentEditor value={md} setValue={setMd} />
					</Column>
					<Column>
						<PageInfoEditor infoSection={infoSection} dispatch={dispatch} />
					</Column>
				</Row>
			</Card>
		</>
	)
}
