import { Link, Outlet, useNavigate } from 'react-router-dom'

import { Plus, Cogwheel } from '../../assets/Icons'
import Button from '../common/Button'
import { Filler, Row } from '../common/Layout'

import SearchBar from '../SearchBar'

export function Navbar() {

	const navigate = useNavigate()

	return (
		<>
			<Row style={{alignItems: 'center'}}>
				<Link
					to='/'
					style={{color: 'var(--black)', textDecoration: 'none'}}
				>
					wiki.stocken
				</Link>

				<SearchBar/>

				<Filler/>
				<Button
					text='New Page'
					color='var(--primary)'
					icon={<Plus/>}
					onClick={() => navigate('/page/create')}
				/>
				<Button
					outline
					textColor='var(--gray)'
					icon={<Cogwheel color='var(--gray)'/>}
					onClick={() => navigate('/settings')}
				/>
			</Row>

			<Outlet/>
		</>
	)
}
