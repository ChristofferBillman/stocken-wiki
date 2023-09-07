import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/common/Input'
import Card from '../components/common/Card'
import { Column, Row } from '../components/common/Layout'
import Button from '../components/common/Button'
import UserAPI from '../network/UserAPI'
import useToast from '../contexts/ToastContext.tsx'
import useUser from '../contexts/UserContext.tsx'

export default function ChangeUsername() {

	const [username, setUsername] = useState('')

	const navigate = useNavigate()
	const toast = useToast()
	const { setUser } = useUser()

	const onSubmit = () => {
		UserAPI.updateUser({ name: username },
			user => {
				setUser({ name: user.name, _id: user._id })
				navigate('/settings')
				toast('Username changed.', 'success')
			},
			err => toast(err, 'error'))
	}

	return (
		<Row className='fillAvailable' style={{ alignItems: 'center', justifyContent: 'center' }}>
			<Column style={{padding: 0}}>
				<h1>Change Username</h1>
				<Card style={{ width: '300px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
					<Input
						placeholder='New username'
						name='name'
						value={username}
						setValue={e => setUsername(e.target.value)}
					/>

					<Button
						text='Change Username'
						color='var(--primary)'
						onClick={onSubmit}
					/>
				</Card>
			</Column>
		</Row>
	)
}
