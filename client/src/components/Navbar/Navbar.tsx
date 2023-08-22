import { useState } from 'react'

import { Link, Outlet, useNavigate } from 'react-router-dom'

import { Plus, Search, Person, Cogwheel } from '../../assets/Icons'
import Button from '../common/Button'
import Input from '../common/Input'
import { Filler, Row } from '../common/Layout'
import SearchAPI from '../../network/SearchAPI'
import Page from '../../pages/Page'
import Toast from '../common/Toast'
import useToast from '../../contexts/ToastContext'
import SearchBar from '../SearchBar'

export function Navbar() {

	const [searchQuery, setSearchQuery] = useState('')
	const navigate = useNavigate()

	const toast = useToast()
	
	const search = (str: string) => {
		let query = str.trim()
		if (query.length > 0) {
			SearchAPI.search(query, pages => {
				console.log(pages)
			}
			, err => toast(err, 'error'));
	}
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
				<Button outline icon={<Cogwheel color='var(--gray)'/>}/>
			</Row>

			<Outlet/>
		</>
	)
}
