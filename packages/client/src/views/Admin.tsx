import { useState } from "react"
import LoginForm from "components/LoginForm"
import ProxyList from "components/ProxyList"
import SubmissionForm from "components/SubmissionForm"

export default function App() {
	const [loggedIn, setLoggedIn] = useState<boolean>(false)

	if (!loggedIn) {
		return (
			<LoginForm loginHandler={l => setLoggedIn(l)} />
		)
	}

	return (
		<>
			<ProxyList goodOnly={false} />
			<SubmissionForm />
		</>
	)
}
