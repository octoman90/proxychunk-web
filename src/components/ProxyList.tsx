import { api } from "app/api"
import { getPrettyTimeDelta } from "utils"
import { Link } from "react-router-dom"
import { useEffect, useState, useMemo } from "react"
import classes from "./styles/ProxyList.module.scss"
import Pagination from "./Pagination"
import type { Proxy } from "types"

type Params = {
	goodOnly: boolean
}

function ProxyLine({ address, speed, updatedAt, uptime }: Proxy) {
	const timeDiff = useMemo(() => getPrettyTimeDelta(new Date(updatedAt)), [updatedAt])

	return (
		<div className={classes.line}>
			<div>{address}</div>
			<div>{100 * (uptime ?? 0) + "%"}</div>
			<div>{speed ? speed + "s" : ""}</div>
			{window.innerWidth > 999 &&
				<div>{timeDiff}</div>
			}
		</div>
	)
}

export default function ProxyList({ goodOnly }: Params) {
	const [page, setPage] = useState<number>(0)
	const [proxies, setProxies] = useState<{ pages: number, list: Proxy[] }>({ pages: 0, list: [] })

	useEffect(() => {
		api.getProxies(page, goodOnly)
			.then(({ proxies, totalPages }) => {
				setProxies({
					list: proxies,
					pages: totalPages,
				})
			})
	}, [page, goodOnly])

	return (
		<div className={classes.root}>
			{0 < proxies.list.length
				? <>
					<div className={classes.list}>
						<div className={classes.headerLine}>
							<div>Address</div>
							<div>Uptime</div>
							<div>Speed</div>
							<div>Last check</div>
						</div>
						{proxies.list.map((p) => (
							<ProxyLine key={p.address} {...p} />
						))}
					</div>
					<Pagination pages={proxies.pages} current={page} setPage={setPage} />
				</>
				: <div>
					Ain't nobody here but us chickens! Proxies can be added to the pool at the <Link to="/admin">control panel</Link>.
				</div>
			}
		</div>
	)
}
