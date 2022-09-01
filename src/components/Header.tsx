import { Link } from "react-router-dom"
import classes from "./styles/Header.module.scss"

export default function Header() {
	return (
		<header className={classes.root}>
			<Link to="/">ProxyChunk</Link>
		</header>
	)
}
