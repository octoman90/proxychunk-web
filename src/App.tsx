import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import AdminPage from './views/Admin'
import HomePage from './views/Home'
import './App.scss'

export default function App() {
	return <>
		<Router>
			<header>
				<Link to="/">ProxyChunk</Link>
			</header>
			<Switch>
				<Route path="/admin">
					<AdminPage />
				</Route>
				<Route path="/">
					<HomePage />
				</Route>
			</Switch>
			<footer>
				<a href="https://github.com/octoman90/ProxyChunk" target="_blank" rel="noreferrer">Star this project on Github</a>
				<a href="https://github.com/octoman90/proxyshiva" target="_blank" rel="noreferrer">Powered by Proxyshiva</a>
				<Link to="/admin">Control panel</Link>
			</footer>
		</Router>
		<Toaster />
	</>
}
