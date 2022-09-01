import { api } from "app/api"
import { ip2Number } from "utils"
import { useReducer } from "react"
import classes from "./styles/SubmissionForm.module.scss"
import toast from "react-hot-toast"

const schemes = ["http", "https", "socks4", "socks5"]

type Form = {
	addresses: [string, string]
	ports: [number, number]
	schemes: Set<string>
}

export default function SubmissionForm() {
	const [inputIPRange, toggleInputIPRange] = useReducer<(s: boolean) => boolean>(s => !s, false)
	const [inputPortRange, toggleInputPortRange] = useReducer<(s: boolean) => boolean>(s => !s, false)
	const [form, patchForm] = useReducer<(state: Form, patch: object) => Form>((state, patch) => ({ ...state, ...patch }), {
		addresses: ["127.0.0.1", "127.0.0.1"] as [string, string],
		ports: [8080, 8080] as [number, number],
		schemes: new Set([schemes[0]]) as Set<string>,
	})

	function toggleScheme(scheme: string) {
		const newSchemes = form.schemes

		if (newSchemes.has(scheme)) {
			if (1 === newSchemes.size) {
				return // It can't be an empty set
			}

			newSchemes.delete(scheme)
		} else {
			newSchemes.add(scheme)
		}

		patchForm({ schemes: newSchemes })
	}

	function setAddress(index: number, value: string) {
		const newAddresses = form.addresses

		newAddresses[index] = value

		if (!inputIPRange) {
			newAddresses[1] = newAddresses[0]
		} else if (ip2Number(newAddresses[0]) > ip2Number(newAddresses[1]) && 0 !== ip2Number(newAddresses[index])) {
			newAddresses[1 - index] = newAddresses[index]
		}

		patchForm({ addresses: newAddresses })
	}

	function setPort(i: number, value: string) {
		const ports = form.ports

		ports[i] = Number(value)

		if (!inputPortRange) {
			ports[1] = ports[0]
		} else if (ports[0] > ports[1]) {
			ports[1 - i] = ports[i]
		}

		patchForm({ ports })
	}

	function submit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		api.postProxies(form)
		toast("Thank you! Suggested proxies will be saved and checked soon.")
	}

	return (
		<form className={classes.root} onSubmit={submit}>
			<div className={classes.header}>Add proxies</div>
			<div className={classes.schemes}>
				{schemes.map((scheme) => (
					<label key={scheme}>
						<input
							checked={form.schemes.has(scheme)}
							onChange={() => toggleScheme(scheme)}
							type="checkbox"
						/>
						{scheme.toUpperCase()}
					</label>
				))}
			</div>
			<div className={classes.ipRangeInputs}>
				<label>
					<input
						checked={inputIPRange}
						onChange={toggleInputIPRange}
						type="checkbox"
					/>
					IP range
				</label>
				<input
					onChange={({ target: t }) => setAddress(0, t.value)}
					type="text"
					value={form.addresses[0]}
				/>
				<span> — </span>
				<input
					disabled={!inputIPRange}
					onChange={({ target: t }) => setAddress(1, t.value)}
					type="text"
					value={form.addresses[1]}
				/>
			</div>
			<div className={classes.ipRangeInputs}>
				<label>
					<input
						checked={inputPortRange}
						onChange={toggleInputPortRange}
						type="checkbox"
					/>
					Port range
				</label>
				<input
					onChange={({ target: t }) => setPort(0, t.value)}
					type="number"
					value={form.ports[0]}
				/>
				—
				<input
					disabled={!inputPortRange}
					onChange={({ target: t }) => setPort(1, t.value)}
					type="number"
					value={form.ports[1]}
				/>
			</div>
			<button>Submit</button>
		</form>
	)
}
