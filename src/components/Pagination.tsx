import { range } from "utils"
import classes from "./styles/Pagination.module.scss"

type Params = {
	current: number
	pages: number
	setPage: (arg0: number) => any
}

export default function Pagination({ current, pages, setPage }: Params) {
	if (2 > pages) {
		return null
	}

	const available = pages < 7
		? range(pages)
		: range(Math.max(current - 3, 0), Math.min(current + 4, pages))

	return (
		<div className={classes.root}>
			{0 < current &&
				<button onClick={() => setPage(0)} children="I<" />
			}
			{available.map((n) => (
				<button
					disabled={n === current}
					key={n}
					onClick={() => setPage(n)}
				>
					{n + 1}
				</button>
			))}
			{pages > (current + 1) &&
				<button onClick={() => setPage(pages - 1)} children=">I" />
			}
		</div>
	)
}
