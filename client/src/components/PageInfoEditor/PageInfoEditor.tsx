import style from './PageInfoEditor.module.css'

import { Row } from '../common/Layout'
import Input from '../common/Input'
import Button from '../common/Button'
import { Plus, Trash } from '../../assets/Icons'

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
			{/*
				A bit of a hacky fix to use index as key, but since
				the keys of the actual state is dynamic, it will change.
			 */}
			{infoSection.data?.map((stat, index) => (
				<StatisticEditor
					key={index}
					name={index}
					stat={stat}
					setter={onStatisticChange}
					dispatch={dispatch}
				/>
			))}

			<Row style={{justifyContent: 'center', padding: 0}}>
				<Button
					outline
					text={infoSection.data.length === 0 ? 'Add info box' : 'Add Field'}
					icon={<Plus color='var(--black)'/>}
					onClick={() => dispatch({type: PageInfoReducerType.NEW_STATISTIC, payload: {key: 'test', value: ''}})}
				/>
			</Row>
			
			{infoSection.data.length === 0 && <EmptyState/>}
		</>
	)
}

function EmptyState() {
	// Lmao I can't with these hard-coded values. xddd.
	return (
		<h5
			style={{width: 375 + 'px', textAlign: 'center'}}
		>
			An info box contains statistics and quick info about the thing being written about.
		</h5>
	)
}

interface StatisticProps {
	stat: InfoSectionStatistic
	setter: (arg0: React.ChangeEvent<HTMLInputElement>) => void
	name: number
	dispatch: React.Dispatch<PageInfoReducerAction>
}

function StatisticEditor({ stat, setter, name, dispatch }: StatisticProps) {
	return (
		<Row className={style.statisticEditorRow}>
			<Input name={name + '_K'} value={stat.key} setValue={setter} style={{width: '100px'}}/>
			<Input name={name + '_V'} value={stat.value} setValue={setter} style={{width: '150px'}}/>
			<Button 
				outline
				icon={<Trash color='var(--black)'/>}
				onClick={() => dispatch({type: PageInfoReducerType.DELETE_STATISTIC, payload: stat})}
			/>
		</Row>
	)
}
