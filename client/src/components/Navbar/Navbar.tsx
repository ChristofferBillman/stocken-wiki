import { Link, Outlet, useNavigate } from 'react-router-dom'

import { Plus, Person, Arrow } from '../../assets/Icons'
import Button from '../common/Button'
import { Filler, Row } from '../common/Layout'
import useUser from '../../contexts/UserContext'
import UserAPI from '../../network/UserAPI'

import useToast from '../../contexts/ToastContext'
import SearchBar from '../SearchBar'

export function Navbar() {

	const navigate = useNavigate()
	const { reset } = useUser()
	const toast = useToast()

	const handleSignout = () => {
		UserAPI.logout(
			() => {
				reset()
				navigate('/login')
				toast('You have been signed out.', 'info')
			},
			err => toast(err, 'error')
		)
	}

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
				<Button outline icon={<Person color="var(--gray)"/>}/>
				<Button
					outline
					text='Sign out'
					textColor='var(--gray)'
					icon={<Arrow color='var(--gray)'/>}
					onClick={handleSignout}
				/>
			</Row>

			<Outlet/>
		</>
	)
}
