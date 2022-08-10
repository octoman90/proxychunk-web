import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { IProxy } from '../../types'

interface ProxyListState {
	proxies: {[key:string]: IProxy}
}

const initialState: ProxyListState = {
	proxies: {}
}

export const proxyListSlice = createSlice({
	name: 'proxyList',
	initialState,
	reducers: {
		// insertProxies: (state, action: PayloadAction<IProxy[]>) => {
		// 	action.payload.forEach((proxy) => {
		// 		state.proxies[`${proxy.scheme}://${proxy.address}:${proxy.port}`] = proxy
		// 	})
		// },

		reinsertProxies: (state, action: PayloadAction<IProxy[]>) => {
			state.proxies = {}
			action.payload.forEach((proxy) => {
				state.proxies[`${proxy.scheme}://${proxy.address}:${proxy.port}`] = proxy
			})
		}
	}
})

export const { reinsertProxies } = proxyListSlice.actions

export const selectProxies = (state: RootState) => state.proxyList.proxies

export default proxyListSlice.reducer
