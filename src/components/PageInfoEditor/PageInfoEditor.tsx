import style from './PageInfoEditor.module.css'

import { Row } from '../common/Layout'
import Input from '../common/Input'
import Button from '../common/Button'
import { Plus } from '../../assets/Icons'

import { PageInfoReducerAction, PageInfoReducerType } from './PageInfoReducer'

import InfoSection, { InfoSectionStatistic } from '../../types/InfoSection'

interface Props {
	infoSection: InfoSection
	dispatch: React.Dispatch<PageInfoReducerAction>
}

export function PageInfoEditor({ infoSection, dispatch }: Props) {

	const onStatisticChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({type: PageInfoReducerType.SET_STATISTIC, payload: e})
	}

	return (
		<>
			{/* Map through all fields and create inputs for them */}
			{infoSection.data?.map(field => (
				<StatisticEditor
					key={field.key}
					stat={field}
					setter={onStatisticChange}
				/>
			))}
			<Row style={{justifyContent: 'center', padding: 0}}>
				<Button outline text='Add Field' icon={<Plus color='var(--black)'/>}/>
			</Row>
		</>
	)
}

interface StatisticProps {
	stat: InfoSectionStatistic
	setter: (arg0: React.ChangeEvent<HTMLInputElement>) => void
}

function StatisticEditor({ stat, setter }: StatisticProps) {
	return (
		<Row className={style.statisticEditorRow}>
			<h4>{stat.key}</h4>
			<Input name={stat.key} value={stat.value} setValue={setter}/>
		</Row>
	)
}
