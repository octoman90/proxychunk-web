export { default as getPrettyTimeDelta } from "./getPrettyTimeDelta"

export function ip2Number(ip: string): number {
	return ip.split(".").reduce((ipInt, octet) => (ipInt << 8) + parseInt(octet, 10), 0) >>> 0
}

export function range(n: number): number[] {
	return [...Array(n).keys()]
}
