import style from './PageContentSection.module.css'

import InfoSection, { InfoSectionField } from '../../types/InfoSection'
import { Row } from '../common/Layout'

interface Props {
	infoSection: InfoSection
}

export function PageInfoSection({infoSection}: Props) {
	return (
		<div>
			<h2>{infoSection.Title}</h2>
			<p>{infoSection.Description}</p>

			{infoSection.fields.map(field => <Statistic key={field.key} field={field}/> )}
		</div>
	)
}

interface StatisticProps {
	field: InfoSectionField
}
function Statistic({field}: StatisticProps) {
	return (
		<>
			<Row
				style={{width: '100%', justifyContent: 'space-between', padding: 0}}
			>
				<h4> {field.key} </h4>
				<h4> {field.value} </h4>
			</Row>
			<div className={style.divider}></div>
		</>
	)
}
