import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/common/Input'
import Card from '../components/common/Card'
import { Row } from '../components/common/Layout'
import Button from '../components/common/Button'
import UserAPI from '../network/UserAPI'
import useToast from '../contexts/ToastContext.tsx'

export default function Signup() {

	const [password1, setPassword1] = useState('')
	const [password2, setPassword2] = useState('')

	const navigate = useNavigate()
	const toast = useToast()

	const onSubmit = () => {
		if(password1 !== password2) {
			toast('Passwords don\'t match', 'error')
			return
		}
		UserAPI.changePassword(password1,
			() => {
				navigate('/settings')
				toast('Password changed.', 'success')
			},
			err => toast(err, 'error'))
	}

	return (
		<Row className='fillAvailable' style={{ alignItems: 'center', justifyContent: 'center' }}>
			<Card style={{ width: '300px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
				<h1>Change Password</h1>

				<Input
					placeholder='New password'
					name='name'
					value={password1}
					setValue={e => setPassword1(e.target.value)}
				/>
				<Input
					placeholder='Confirm new password'
					name='password'
					type='password'
					value={password2}
					setValue={e => setPassword2(e.target.value)}
				/>

				<Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
					<Button
						text='Change Password'
						color='var(--primary)'
						onClick={onSubmit}
					/>
				</Row>
			</Card>
		</Row>
	)
}
