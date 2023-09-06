import style from './PageContentSection.module.css'

import InfoSection, { InfoSectionStatistic } from '../../types/InfoSection'
import {Column, Row} from '../common/Layout'
import Image from '../common/Image'

interface Props {
	infoSection: InfoSection
}

export function PageInfoSection({infoSection}: Props) {
	return (
		<div>
			{infoSection.data.map(stat => <Statistic key={stat.key} stat={stat}/> )}
		</div>
	)
}

interface StatisticProps {
	stat: InfoSectionStatistic
}
function Statistic({stat}: StatisticProps) {
	if(stat.key == 'Title') return <h1>{stat.value}</h1>
	if(stat.key == 'Description') return <h2 style={{marginBottom: '1rem'}}>{stat.value}</h2>

	if(stat.type == 'image') return (
		<>
			<Column style={{padding: '0'}}>
				<h4> {stat.key} </h4>
				<Image src={stat.value} alt='img'/>
			</Column>
			<div className={style.divider}></div>
		</>
	)

	return (
		<>
			<Row
				style={{ justifyContent: 'space-between', padding: 0}}
			>
				<h4> {stat.key} </h4>
				<h4> {stat.value} </h4>
			</Row>
			<div className={style.divider}></div>
		</>
	)
}