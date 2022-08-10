import { IProxy } from "../../types"
import { num2Word } from "../../utils"
import { useMemo } from "react"

type Props = {
	proxy: IProxy
}

export default function ProxyList({ proxy }: Props) {
	const timeDiff = useMemo(() => {
		const delta = +new Date() - +new Date(proxy.updatedAt)

		if (delta < 4e4) {
			return "Just now"
		}

		const minutes = Math.round(delta / 6e4)
		if (minutes < 50) {
			return `${minutes} ${num2Word(minutes, ["minute", "minutes"])} ago`
		}

		const hours = Math.round(delta / 3.6e6)
		if (hours < 20) {
			return `${hours} ${num2Word(hours, ["hour", "hours"])} ago`
		}

		const days = Math.round(delta / 8.64e7)
		if (1 === days) {
			return "yesterday"
		}

		return `${days} ${num2Word(days, ["day", "days"])} ago`
	}, [proxy.updatedAt])

	return (
		<div className="proxy-list-line">
			{window.innerHeight > window.innerWidth
				? <div>{proxy.scheme}://{proxy.address}:{proxy.port}</div>
				: <>
					<div>{proxy.scheme}</div>
					<div>{proxy.address}</div>
					<div>{proxy.port}</div>
				</>
			}
			<div>
				{"speed" in proxy
					? proxy.speed.toFixed(2)
					: ""
				}
			</div>
			<div>{timeDiff}</div>
		</div>
	)
}
