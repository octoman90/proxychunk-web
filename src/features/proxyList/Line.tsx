import { getPrettyTimeDelta } from "../../utils"
import { IProxy } from "../../types"
import { useMemo } from "react"

type Props = {
	proxy: IProxy
}

export default function ProxyList({ proxy }: Props) {
	const timeDiff = useMemo(() => getPrettyTimeDelta(new Date(proxy.updatedAt)), [proxy.updatedAt])

	return (
		<div className="proxy-list-line">
			<div>{proxy.address}</div>
			<div>{proxy.speed ? proxy.speed + "s" : ""}</div>
			<div>{timeDiff}</div>
		</div>
	)
}
