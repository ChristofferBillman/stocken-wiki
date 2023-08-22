import { useReducer, useState } from 'react'

// External Dependencies
import { useNavigate } from 'react-router-dom'

// Internal Dependencies
import { Column, Filler, Row } from '../components/common/Layout'
import { Floppy, Trash } from '../assets/Icons'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import PageContentEditor from '../components/PageContentEditor'
import InfoSection from '../types/InfoSection'
import PageInfoEditor from '../components/PageInfoEditor'
import pageInfoReducer from '../components/PageInfoEditor/PageInfoReducer'
import Page from '../types/Page'
import PageAPI from '../network/PageAPI'
import useToast from '../contexts/ToastContext'

const initialInfoSection: InfoSection = {
	data: []
}

export default function PageCreator() {
	const navigate = useNavigate()

	const [infoSection, dispatch] = useReducer(pageInfoReducer, initialInfoSection)
	const [markdown, setMarkdown] = useState('')

	const toast = useToast()

	const title = markdown.split('\n')[0].replace('#','')

	const onSubmit = () => {
		const page: Page = {
			_id: 'null',
			content: markdown,
			infoSection: infoSection,
			meta: {
				history: []
			}
		}
		PageAPI.create(page,
			() => {
				toast('Successfully added page', 'success')
				navigate(-1)
			},
			err => toast(err, 'error'))
	}
	
	return (
		<>
			<Row style={{ alignItems: 'center', width: '886px', margin: '0 auto'}}>
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
						<PageContentEditor value={markdown} setValue={setMarkdown} />
					</Column>
					<Column>
						<PageInfoEditor infoSection={infoSection} dispatch={dispatch} />
					</Column>
				</Row>
			</Card>
		</>
	)
}
