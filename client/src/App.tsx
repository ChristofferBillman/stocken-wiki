// Import and use global css
import './App.css'

// React Router
import { Routes, Route, HashRouter } from 'react-router-dom'

// Components
import Navbar from './components/Navbar'

// Pages
import Home from './pages/Home'
import Page from './pages/Page/Page.tsx'
import PageEditor from './pages/PageEditor/PageEditor.tsx'
import PageCreator from './pages/PageCreator/PageCreator.tsx'
import Login from './pages/Login'
import Signup from './pages/Signup'
import HistoricalPage from './pages/HistoricalPage.tsx'
import { UserContextProvider } from './contexts/UserContext'
import { ToastContextProvider } from './contexts/ToastContext'
import PageHistory from './pages/PageHistory'
import { ThemeContextProvider } from './contexts/ThemeContext.tsx'
import Settings from './pages/Settings.tsx'
import ChangePassword from './pages/ChangePassword.tsx'
import ChangeUsername from './pages/ChangeUsername.tsx'

export default function App() {
	return (
		<HashRouter>
			<UserContextProvider>
				<ThemeContextProvider>
					<ToastContextProvider>
						<Routes>
							<Route element={<Navbar/>}>
								<Route path='/' element={<Home/>}/>

								<Route path='/settings' element={<Settings />}/>
								<Route path='settings/changePassword' element={<ChangePassword/>}/>
								<Route path='settings/changeUsername' element={<ChangeUsername/>}/>

								<Route path='/page/:id' element={<Page/>}/>
								<Route path='/page/edit/:id' element={<PageEditor/>}/>
								<Route path='/page/create' element={<PageCreator/>}/>
								<Route path="/page/history/:id" element={<PageHistory />} />
								<Route path="/page/history/:id/:version" element={<HistoricalPage />} />
							</Route>
							<Route index path='/login' element={<Login/>}/>
							<Route path='/signup' element={<Signup/>}/>
						</Routes>
					</ToastContextProvider>
				</ThemeContextProvider>
			</UserContextProvider>
		</HashRouter>
	)
}
