export default function HederLine() {
	return (
		<div className="proxy-list-line header">
			{ window.innerHeight > window.innerWidth
				? <>
					<div>Address</div>
					<div>Speed</div>
					<div>Last check</div>
				</>
				: <>
					<div>Scheme</div>
					<div>Address</div>
					<div>Port</div>
					<div>Speed</div>
					<div>Last check</div>
				</>
			}
		</div>
	)
}
