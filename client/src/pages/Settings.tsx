// External dependencies
import { useNavigate, useParams } from 'react-router-dom'

// Internal dependencies
import { Column, Row } from '../components/common/Layout'
import Card from '../components/common/Card'
import useToast from '../contexts/ToastContext'
import useUser from '../contexts/UserContext'
import { Arrow, Moon, Pencil, Sun } from '../assets/Icons'
import Button from '../components/common/Button'
import Divider from '../components/common/Divider'
import { useThemeContextSetter } from '../contexts/ThemeContext'
import UserAPI from '../network/UserAPI'

export default function Settings() {
	const { user, reset } = useUser()
	const toast = useToast()

	const setTheme = useThemeContextSetter()
	const navigate = useNavigate()

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
			<Row style={{ alignItems: 'center', maxWidth: 'var(--page-max-width)', margin: '0 auto' }}>
				<h1>Settings</h1>
			</Row>

			<Card style={{ margin: '0 auto', width: 'var(--page-max-width)', minHeight: '100vh' }}>
				<Column>
					<Row style={{alignItems: 'center', justifyContent: 'space-between'}}>
						<Column style={{padding: 0, gap: '0.25rem'}}>
							<h4>Username</h4>
							<h5>Your username is used to log in, and is also visible to other users.</h5>
						</Column>
						<Row style={{padding: 0, alignItems: 'center'}}>
							<h5>{user.name}</h5>
							<Button
								outline
								icon={<Pencil color='var(--black)'/>}
								onClick={() => toast('This feature is not yet implemented.', 'warn')}
							/>
						</Row>
					</Row>

					<Row style={{alignItems: 'center', justifyContent: 'space-between'}}>
						<Column style={{padding: 0, gap: '0.25rem'}}>
							<h4>Password</h4>
							<h5>Used to log in. If you forget your password, you need to contact admin.</h5>
						</Column>
						<Button
							outline
							text='Change Password'
							icon={<Pencil color='var(--black)'/>}
							onClick={() => navigate('/settings/changePassword')}
						/>
					</Row>

					<Row>
						<Button
							outline
							text='Sign Out'
							icon={<Arrow color='var(--black)'/>}
							onClick={handleSignout}
						/>
					</Row>

					<Divider style={{margin: '0 1rem 0 1rem'}}/>

					<Row style={{alignItems: 'center', justifyContent: 'space-between'}}>
						<Column style={{padding: 0, gap: '0.25rem'}}>
							<h4>Theme</h4>
							<h5>Controls how the website is viewed for you.</h5>
						</Column>
						<Row style={{padding: 0}}>
							<Button
								outline
								icon={<Sun color='var(--black)'/>}
								onClick={() => setTheme('light')}
							/>
							<Button
								outline
								icon={<Moon color='var(--black)'/>}
								onClick={() => setTheme('dark')}
							/>
						</Row>
					</Row>
				</Column>
			</Card>
		</>
	)
}
