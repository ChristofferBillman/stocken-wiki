import style from './PageInfoEditor.module.css'

import { Row } from '../common/Layout'
import Input from '../common/Input'
import Button from '../common/Button'
import { Plus } from '../../assets/Icons'

import InfoSection, { InfoSectionField } from '../../types/InfoSection'

interface Props {
	infoSection: InfoSection
	setInfoSection: React.Dispatch<InfoSection>
}

export function PageInfoEditor({ infoSection, setInfoSection }: Props) {
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInfoSection({
			...infoSection,
			[e.target.name]: e.target.value
		})
		return e.target.value
	}

	// Quite inefficient but should work.
	const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Create copy of the array to make react understand that state has mutated,
		// since objects are comapred by reference instead of by value in js.
		const copy = [...infoSection.fields]
		
		// Find the element that has the same name as key of this input.
		const index = copy.findIndex(entry => (
			entry.key == e.target.name
		))
		
		// Set new value of this input.
		copy[index].value = e.target.value
		
		// Update state.
		setInfoSection({
			...infoSection,
			fields: copy
		})
		return e.target.value
	}

	return (
		<>
			{/* Adapt the other values in InfoSection for use with StatisticEditor. */}
			<StatisticEditor
				field={{key: 'Title', value: infoSection.Title}}
				setter={onChange}
			/>

			<StatisticEditor
				field={{key: 'Description', value: infoSection.Description}}
				setter={onChange}
			/>

			{/* Map through all fields and create inputs for them */}
			{infoSection.fields?.map(field => (
				<StatisticEditor
					key={field.key}
					field={field}
					setter={onFieldChange}
				/>
			))}
			<Row style={{justifyContent: 'center', padding: 0}}>
				<Button outline text='Add Field' icon={<Plus color='var(--black)'/>}/>
			</Row>
		</>
	)
}

interface StatisticProps {
	field: InfoSectionField
	setter: (arg0: React.ChangeEvent<HTMLInputElement>) => string
}

function StatisticEditor({ field, setter }: StatisticProps) {
	return (
		<Row className={style.statisticEditorRow}>
			<h4>{field.key}</h4>
			<Input name={field.key} value={field.value} setValue={setter}/>
		</Row>
	)
}
