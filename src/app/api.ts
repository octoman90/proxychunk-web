import axios from 'redaxios'

import { IProxy } from '../types'

export const api = {
	getProxies: async (page: number = 0, goodOnly: boolean = true): Promise<{page: number, totalPages: number, proxies: IProxy[]}> => {
		return axios.get(
			`${process.env.REACT_APP_API_ENDPOINT}/proxies?page=${page}&goodOnly=${goodOnly}`,
			{ withCredentials: true }
		).then(response => response.data)
	},

	postProxies: async ({schemes, addresses, ports}: {schemes: Set<string>, addresses: [string, string], ports: [number, number]}): Promise<any> => {
		return await axios.post(
			`${process.env.REACT_APP_API_ENDPOINT}/proxies`,
			{ schemes: Array.from(schemes), addresses, ports },
			{ withCredentials: true }
		)
	},

	login: async ({accessCode}: {accessCode?: string} = {}): Promise<any> => {
		return axios.post(
			`${process.env.REACT_APP_API_ENDPOINT}/login`,
			{ accessCode },
			{ withCredentials: true }
		)
	},
}
