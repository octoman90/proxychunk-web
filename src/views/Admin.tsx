import { useState } from 'react'

import ProxyList from '../features/proxyList/ProxyList'
import SubmissionForm from '../features/submissionForm/SubmissionForm'
import LoginForm from '../features/loginForm/LoginForm'

export default function App() {
	const [loggedIn, setLoggedIn] = useState(false)

	return (
		<div className={`App${window.innerHeight > window.innerWidth ? ' mobile' : ''}`}>
			{
				loggedIn
				? <>
					<ProxyList goodOnly={ false } />
					<SubmissionForm />
				</>
				: <LoginForm loginHandler={(l: boolean) => setLoggedIn(l)} />
			}
		</div>
	)
}
