import { api } from "app/api"
import { useEffect, useState } from "react"
import classes from "./styles/LoginForm.module.scss"
import toast from "react-hot-toast"

type Params = {
	loginHandler: (l: boolean) => any
}

export default function LoginForm(params: Params) {
	const [accessCode, setAccessCode] = useState("")

	useEffect(() => {
		api.login()
			.then(() => {
				params.loginHandler(true)
			})
			.catch(() => {
				params.loginHandler(false)
			})
	}, [params])

	function loginHandler(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		api.login({ accessCode })
			.then(() => {
				params.loginHandler(true)
			})
			.catch((error) => {
				params.loginHandler(false)

				if (401 === error.status) {
					toast("Couldn't log in: entered access code is invalid")
				} else {
					toast("Couldn't log in: " + error.statusText)
				}
			})
	}

	return (
		<form className={classes.root} onSubmit={loginHandler}>
			<label>Enter your access code to proceed:</label>
			<input
				onChange={e => setAccessCode(e.target.value)}
				type="password"
				value={accessCode}
			/>
			<button>Log in</button>
		</form>
	)
}
