import { useState } from 'react'
import Card from '../components/common/Card'
import Input from '../components/common/Input'
import { Row } from '../components/common/Layout'
import Button from '../components/common/Button'
import { Arrow, Plus } from '../assets/Icons'
import { useNavigate } from 'react-router-dom'
import UserAPI from '../network/UserAPI'

export default function Login() {

	const [name, setName] = useState('')
	const [password, setPassword] = useState('')

	const [error, setError] = useState('')

	const navigate = useNavigate()

	const onSubmit = () => {
		UserAPI.login(name, password, () => navigate('/'), err => setError(err))
	}

	return (
		<Row style={{ alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
			<Card style={{ width: '300px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
				<div>
					<h1 style={{ margin: 0 }}>stocken.wiki</h1>
					<h2>Log in</h2>
				</div>
				<Input
					placeholder='Name'
					name='name'
					value={name}
					setValue={e => setName(e.target.value)}
				/>
				<Input
					placeholder='Password'
					name='password'
					value={password}
					setValue={e => setPassword(e.target.value)}
				/>
				
				<Row style={{alignItems: 'center', justifyContent: 'space-between'}}>
					<Button
						text='Login'
						color='var(--primary)'
						icon={<Arrow/>}
						onClick={onSubmit}
					/>

					<Button
						text='Sign Up'
						outline
						icon={<Plus color='var(--black)'/>}
						onClick={() => navigate('/signup')}
					/>
				</Row>

				<p>{error}</p>
			</Card>
		</Row>
	)
}