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

export default function App() {
	return (
		<BrowserRouter>
			<Navbar/>
			<Routes>
				<Route path='/' element={<Home/>}/>
				<Route path='/page/:id' element={<Page/>}/>
				<Route path='/page/edit/:id' element={<PageEditor/>}/>
			</Routes>
		</BrowserRouter>
	)
}