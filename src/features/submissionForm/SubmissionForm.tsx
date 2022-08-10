import { useState } from 'react'
import toast from 'react-hot-toast'

import './SubmissionForm.scss'
import { api } from '../../app/api'
import { ip2Number } from '../../utils'

const schemes = ['http', 'https', 'socks4', 'socks5']

function PortCheckbox({ scheme, checkedSchemes, onChange }: { scheme: string, checkedSchemes: Set<string>, onChange: (scheme: string) => void }) {
	const id = `${scheme}-checkbox`

	return (
		<div>
			<input type="checkbox" id={id} checked={checkedSchemes.has(scheme)} onChange={() => onChange(scheme)} />
			<label htmlFor={id}>{scheme.toUpperCase()}</label>
		</div>
	)
}

export default function SubmissionForm() {
	const [inputIPRange, setInputIPRange] = useState(false)
	const [inputPortRange, setInputPortRange] = useState(false)
	const [formData, setFormData] = useState({
		schemes: new Set([schemes[0]]) as Set<string>,
		addresses: ['127.0.0.1', '127.0.0.1'] as [string, string],
		ports: [8080, 8080] as [number, number]
	})

	function toggleRangeInput(type: string) {
		if (type === 'address') {
			setInputIPRange(!inputIPRange) // Toggle
			setAddress(1, formData.addresses[0]) // Reset last address in range to the first one
		} else if (type === 'port') {
			setInputPortRange(!inputPortRange) // Toggle
			setPort(1, formData.ports[0]) // Reset last port in range to the first one
		}
	}

	function toggleScheme(scheme: string) {
		let newSchemes = formData.schemes

		if (newSchemes.has(scheme)) {
			if (newSchemes.size === 1) return // It can't be an empty set
			newSchemes.delete(scheme)
		} else {
			newSchemes.add(scheme)
		}

		setFormData({
			...formData,
			schemes: newSchemes
		})
	}

	function setAddress(index: number, value: string) {
		let newAddresses = formData.addresses

		newAddresses[index] = value

		if (!inputIPRange) {
			newAddresses[1] = newAddresses[0]
		} else if (ip2Number(newAddresses[0]) > ip2Number(newAddresses[1]) && 0 !== ip2Number(newAddresses[index])) {
			newAddresses[1 - index] = newAddresses[index]
		}

		setFormData({
			...formData,
			addresses: newAddresses
		})
	}

	function setPort(index: number, value: string | number) {
		let newPorts = formData.ports

		newPorts[index] = 'string' === typeof value ? parseInt(value) : value

		if (!inputPortRange) {
			newPorts[1] = newPorts[0]
		} else if (newPorts[0] > newPorts[1]) {
			newPorts[1 - index] = newPorts[index]
		}

		setFormData({
			...formData,
			ports: newPorts
		})
	}

	function submit() {
		api.postProxies(formData)
		toast('Thank you! Suggested proxies will be saved and checked soon.')
	}

	return (
		<form className={`submission-form${window.innerHeight > window.innerWidth ? ' mobile' : ''}`} onSubmit={e => { e.preventDefault(); submit() }}>
			<div className="submission-form-title header">Suggest proxies</div>
			<div className="scheme-form">
				{ schemes.map((scheme) => (
					<PortCheckbox scheme={scheme} checkedSchemes={formData.schemes} onChange={toggleScheme} key={scheme} />
				))}
			</div>
			<div>
				<input type="checkbox" id="ip-range-checkbox" checked={inputIPRange} onChange={() => toggleRangeInput('address')} />
				<label htmlFor="ip-range-checkbox">IP range</label>
				<br />
				<input type="text" value={formData.addresses[0]} onChange={e => setAddress(0, e.target.value)} />
				<span> — </span>
				<input type="text" disabled={!inputIPRange} value={formData.addresses[1]} onChange={e => setAddress(1, e.target.value)} />
			</div>
			<div>
				<input type="checkbox" id="port-range-checkbox" checked={inputPortRange} onChange={() => toggleRangeInput('port')} />
				<label htmlFor="port-range-checkbox">Port range</label>
				<br />
				<input type="number" value={formData.ports[0]} onChange={e => setPort(0, e.target.value)} />
				<span> — </span>
				<input type="number" disabled={!inputPortRange} value={formData.ports[1]} onChange={e => setPort(1, e.target.value)} />
			</div>
			<button className="form-submit-button">Submit</button>
		</form>
	)
}
