import style from './PageContentSection.module.css'

import InfoSection, { InfoSectionStatistic } from '../../types/InfoSection'
import { Row } from '../common/Layout'

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
	if(stat.key == 'Description') return <h2>{stat.value}</h2>
	
	return (
		<>
			<Row
				style={{width: '100%', justifyContent: 'space-between', padding: 0}}
			>
				<h4> {stat.key} </h4>
				<h4> {stat.value} </h4>
			</Row>
			<div className={style.divider}></div>
		</>
	)
}
