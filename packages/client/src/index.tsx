import "master.scss"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { StrictMode } from "react"
import { Toaster } from "react-hot-toast"
import AdminPage from "views/Admin"
import Footer from "components/Footer"
import Header from "components/Header"
import HomePage from "views/Home"
import ReactDOM from "react-dom/client"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
	.render(
		<StrictMode>
			<BrowserRouter>
				<Header />
				<main>
					<Routes>
						<Route path="/" Component={HomePage} />
						<Route path="/admin" Component={AdminPage} />
					</Routes>
				</main>
				<Footer />
				<Toaster />
			</BrowserRouter>
		</StrictMode>
	)
