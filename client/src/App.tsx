// Import and use global css
import './App.css'

// React Router
import { Routes, Route, BrowserRouter } from 'react-router-dom'

// Components
import Navbar from './components/Navbar'

// Pages
import Home from './pages/Home'
import Page from './pages/Page'
import PageEditor from './pages/PageEditor'
import PageCreator from './pages/PageCreator'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { UserContextProvider } from './contexts/UserContext'
import { ToastContextProvider } from './contexts/ToastContext'

export default function App() {
	return (
		<BrowserRouter>
			<UserContextProvider>
				<ToastContextProvider>
					<Routes>
						<Route element={<Navbar/>}>
							<Route index path='/' element={<Home/>}/>
							<Route path='/page/:id' element={<Page/>}/>
							<Route path='/page/edit/:id' element={<PageEditor/>}/>
							<Route path='/page/create' element={<PageCreator/>}/>
						</Route>
						<Route path='/login' element={<Login/>}/>
						<Route path='/signup' element={<Signup/>}/>
					</Routes>
				</ToastContextProvider>
			</UserContextProvider>
		</BrowserRouter>
	)
}