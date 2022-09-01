import "master.scss"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { StrictMode } from "react"
import { Toaster } from "react-hot-toast"
import AdminPage from "views/Admin"
import Footer from "components/Footer"
import Header from "components/Header"
import HomePage from "views/Home"
import ReactDOM from "react-dom"

ReactDOM.render(
	<StrictMode>
		<BrowserRouter>
			<Header />
			<main>
				<Switch>
					<Route path="/admin">
						<AdminPage />
					</Route>
					<Route path="/">
						<HomePage />
					</Route>
				</Switch>
			</main>
			<Footer />
			<Toaster />
		</BrowserRouter>
	</StrictMode>,
	document.getElementById("root")
)
