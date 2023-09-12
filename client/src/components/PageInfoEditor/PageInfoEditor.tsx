import style from './PageInfoEditor.module.css'

import {DragDropContext, Draggable} from 'react-beautiful-dnd'

import {Row} from '../common/Layout'
import Input from '../common/Input'
import Button from '../common/Button'
import {Plus, Reorder, Trash} from '../../assets/Icons'

import {PageReducerAction, PageReducerType} from '../../reducers/PageReducer'

import {InfoSectionStatistic} from '../../types/InfoSection'
import Page from '../../types/Page'
import {StrictModeDroppable} from '../common/StrictModeDroppable.tsx'
import {memo, useState} from 'react'

interface Props {
	page: Page
	dispatch: React.Dispatch<PageReducerAction>
}

interface StatisticListProps {stats: InfoSectionStatistic[]}

export function PageInfoEditor({ page, dispatch}: Props) {

	function onDragEnd(result: any) {
		dispatch({type: PageReducerType.REORDER_STATISTIC, payload: result})
	}

	// eslint-disable-next-line react/prop-types
	const StatisticList = memo(function StatisticList({ stats }: StatisticListProps) {

		// eslint-disable-next-line react/prop-types
		return stats.map((stat: InfoSectionStatistic, index: number) => (
			<StatisticEditor
				index={index}
				key={index}
				name={index}
				stat={stat}
				dispatch={dispatch}
			/>
		))
	})

	return (
		<>
			{/* Map through all fields and create inputs for them */}
			{/*
				A bit of a hacky fix to use index as key, but since
				the keys of the actual state is dynamic, it will change.
			 */}
			<DragDropContext onDragEnd={onDragEnd}>
				<StrictModeDroppable droppableId="list">
					{provided => (
						<div ref={provided.innerRef} {...provided.droppableProps}>
							<StatisticList stats={page.infoSection.data}/>
							{provided.placeholder}
						</div>
					)}
				</StrictModeDroppable>
			</DragDropContext>

			<Row style={{justifyContent: 'center', padding: 0}}>
				<Button
					outline
					text={page.infoSection.data.length === 0 ? 'Add info box' : 'Add Field'}
					icon={<Plus color='var(--black)'/>}
					onClick={() => dispatch({type: PageReducerType.NEW_STATISTIC, payload: {key: '', value: '', type: 'text'}})}
				/>
				{page.infoSection.data.length !== 0 ?
					<Button
						outline
						text='Add Image'
						icon={<Plus color='var(--black)'/>}
						onClick={() => dispatch({type: PageReducerType.NEW_STATISTIC, payload: {key: '', value: '', type: 'image'}})}
					/>
					:
					<></>
				}

			</Row>
			
			{page.infoSection.data.length === 0 && <EmptyState/>}
		</>
	)
}

function EmptyState() {
	// Lmao I can't with these hard-coded values. xddd.
	return (
		<h5
			style={{ textAlign: 'center' }}
		>
			An info box contains statistics and quick info about the thing being written about.
		</h5>
	)
}

interface StatisticProps {
	stat: InfoSectionStatistic
	name: number
	dispatch: React.Dispatch<PageReducerAction>
	index: number
}

function StatisticEditor({ stat, name, dispatch, index }: StatisticProps) {

	/*
	Duplicating state is an antipattern and kinda strange.
	It is however necessary since triggering the SET_STATISTIC state change mutates the
	entire page state, causing the entire draggable list to re-render.
	This sucks because it causes the input you are typing in to lose focus every time
	you type a letter. Therefore, we copy the state in page to this state, that is
	being used in the inputs. This makes so that the entire list does not have to
	re-rendered on input change. The page state is then updated on input blur.
	*/
	const [value, setValue] = useState(stat.value)
	const [key, setKey] = useState(stat.key)

	return (
		<Draggable draggableId={stat.id} index={index}>
			{provided => (
				<div
					className={style.statisticEditorRow}
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<Input
						name={name + '_K'}
						placeholder='Title'
						value={key}
						setValue={e => setKey(e.target.value)}
						style={{ width: '100%'}}
						onBlur={e => dispatch({type: PageReducerType.SET_STATISTIC, payload: e})}
					/>
					<Input
						name={name + '_V'}
						placeholder={stat.type === 'image' ? 'Image Link' : 'Value'}
						value={value}
						setValue={e => setValue(e.target.value)}
						style={{ width: '100%'}}
						onBlur={e => dispatch({type: PageReducerType.SET_STATISTIC, payload: e})}
					/>
					<Button
						outline
						icon={<Trash color='var(--black)'/>}
						onClick={() => dispatch({type: PageReducerType.DELETE_STATISTIC, payload: stat})}
					/>
					<Button
						outline
						icon={<Reorder color='var(--black)'/>}
					/>
				</div>
			)}
		</Draggable>
	)
}