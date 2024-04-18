import axios from "redaxios"
import type { Proxy } from "types"

type GetProxiesRes = {
	page: number
	proxies: Proxy[]
	totalPages: number
}

type PostProxiesReq = {
	addresses: [string, string]
	ports: [number, number]
	schemes: Set<string>
}

type PostLoginReq = {
	accessCode?: string
}

const a = axios.create({
	baseURL: process.env.REACT_APP_API_ENDPOINT,
	withCredentials: true,
})

export const api = {
	getProxies: async (page: number = 0, goodOnly: boolean = true): Promise<GetProxiesRes> => {
		return a
			.get("/proxies", {
				withCredentials: true,
				params: {
					goodOnly,
					order: "asc",
					orderBy: "uptime",
					page,
				},
			})
			.then((response: { data: GetProxiesRes }) => response.data)
	},

	postProxies: async ({ addresses, ports, schemes }: PostProxiesReq): Promise<{}> => {
		const body = { schemes: Array.from(schemes), addresses, ports }
		return a.post("/proxies", body)
	},

	login: async ({ accessCode }: PostLoginReq = {}): Promise<{}> => {
		const body = { accessCode }
		return a.post("/login", body)
	},
}
