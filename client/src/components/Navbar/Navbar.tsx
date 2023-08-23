import { useState } from 'react'

import { Link, Outlet, useNavigate } from 'react-router-dom'

import { Plus, Search, Person, Arrow } from '../../assets/Icons'
import Button from '../common/Button'
import Input from '../common/Input'
import { Filler, Row } from '../common/Layout'
import useUser from '../../contexts/UserContext'
import useToast from '../../contexts/ToastContext'
import UserAPI from '../../network/UserAPI'

export function Navbar() {

	const [searchQuery, setSearchQuery] = useState('')
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

				<Input 
					placeholder='Search Everything'
					style={{width: '400px'}}
					value={searchQuery}
					name='Search'
					setValue={e => setSearchQuery(e.target.value)}
				/>
				
				<Button outline icon={<Search color='var(--primary)'/>}/>
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
