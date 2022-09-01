import { Link } from "react-router-dom"
import classes from "./styles/Footer.module.scss"

const links = [
	{
		href: "https://github.com/octoman90/proxychunk-web",
		label: "Star this project on Github",
	},
	{
		href: "https://github.com/octoman90/proxyshiva",
		label: "Powered by proxyshiva",
	},
	{
		href: "/admin",
		label: "Control panel",
	},
]

export default function Footer() {
	return (
		<footer className={classes.root}>
			{links.map(({ href, label }) => (
				/^http/.test(href)
					? <a key={href} href={href} target="_blank" rel="noreferrer">{label}</a>
					: <Link key={href} to={href}>{label}</Link>
			))}
		</footer>
	)
}
