import { useEffect } from 'react'
import toast from 'react-hot-toast'

import './LoginForm.scss'
import { api } from '../../app/api'

export default function LoginForm(params: {loginHandler: (l: boolean) => void}) {
	useEffect(() => {
		api.login()
			.then(() => {
				params.loginHandler(true)
			})
			.catch(() => {
				params.loginHandler(false)
			})
	}, [params])

	function loginHandler(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		const accessCode = (event.target as HTMLFormElement).querySelector('input')?.value

		api.login({accessCode})
			.then(() => {
				params.loginHandler(true)
			})
			.catch((error) => {
				params.loginHandler(false)
				if (error.message.includes('401')) {
					toast(`Couldn't log in: entered access code is invalid`)
				} else {
					toast(`Couldn't log in: ${error.message}`)
				}
			})
	}

	return (
		<form className="login-form" onSubmit={loginHandler}>
			<label>Enter your access code to proceed:</label>
			<input type="password"></input>
			<button>Log in</button>
		</form>
	)
}

