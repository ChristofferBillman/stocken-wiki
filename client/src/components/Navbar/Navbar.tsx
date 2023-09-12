import { Link, Outlet, useNavigate } from 'react-router-dom'

import { Plus, Cogwheel, Cross, Reorder } from '../../assets/Icons'
import Button from '../common/Button'
import { Filler, Row } from '../common/Layout'

import SearchBar from '../SearchBar'
import style from './Navbar.module.css'
import { useState } from 'react'

export function Navbar() {

	const navigate = useNavigate()

	const [menuOpen, setMenuOpen] = useState(false)

	return (
		<>
			<Row className={style.navbar}>
				<Row className={style.topBar}>
					<Link
						to='/'
						style={{color: 'var(--black)', textDecoration: 'none'}}
					>
						wiki.stocken
					</Link>
					<Button
						outline
						icon={<Reorder color='var(--gray)'/>}
						className={style.closeButton}
						onClick={() => setMenuOpen(!menuOpen)}
					/>
				</Row>

				<SearchBar/>

				<Filler/>
				<Row className={`${style.optionsContainer} ${ menuOpen ? style.open : style.closed}`}>
					<Button
						outline
						icon={<Cross color='var(--gray)'/>}
						className={style.closeButton}
						onClick={() => setMenuOpen(!menuOpen)}
					/>
					<Button
						text='New Page'
						color='var(--primary)'
						icon={<Plus/>}
						onClick={() => {
							setMenuOpen(false)
							navigate('/page/create')
						}}
					/>
					<Button
						outline
						textColor='var(--gray)'
						icon={<Cogwheel color='var(--gray)'/>}
						onClick={() => {
							setMenuOpen(false)
							navigate('/settings')
						}}
					/>
				</Row>
			</Row>

			<Outlet/>
		</>
	)
}
