import { IProxy } from '../../types'
import { num2Word } from '../../utils'

function SpeedDiv({ speed }: { speed: number }) {
	let formattedSpeed: string

	if (speed < 0) {
		formattedSpeed = 'Bad'
	} else {
		formattedSpeed = speed.toFixed(2) + 'ms'
	}

	return <div>{ formattedSpeed }</div>
}

function TimeDiffDiv({ updatedAt }: { updatedAt: Date }) {
	const delta = +new Date() - +new Date(updatedAt)
	const formatted = (() => {
		if (delta < 4e4){
			return 'Just now'
		}

		let minutes = Math.round(delta / 6e4)
		if (minutes < 50){
			return `${minutes} ${num2Word(minutes, ['minute', 'minutes'])} ago`
		}

		let hours = Math.round(delta / 3.6e6)
		if (hours < 20){
			return `${hours} ${num2Word(hours, ['hour', 'hours'])} ago`
		}

		let days = Math.round(delta / 8.64e7)
		if (1 === days){
			return 'yesterday'
		}

		return `${days} ${num2Word(days, ['day', 'days'])} ago`
	})()

	return <div>{ formatted }</div>
}

export default function ProxyList({ proxy }: { proxy: IProxy }) {
	return (
		<div className="proxy-list-line">
			{
				window.innerHeight > window.innerWidth
				? <div>{ proxy.scheme }://{ proxy.address }:{ proxy.port }</div>
				: (
					<>
						<div>{ proxy.scheme }</div>
						<div>{ proxy.address }</div>
						<div>{ proxy.port }</div>
					</>
				)
			}
			<SpeedDiv speed={ proxy.speed } />
			<TimeDiffDiv updatedAt={ proxy.updatedAt }/>
		</div>
	)
}
