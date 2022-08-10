import ProxyList from '../features/proxyList/ProxyList'

export default function App() {
	return (
		<div className={`App${window.innerHeight > window.innerWidth ? ' mobile' : ''}`}>
			<ProxyList goodOnly={ true } />
		</div>
	)
}
