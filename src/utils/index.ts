export { default as getPrettyTimeDelta } from "./getPrettyTimeDelta"

export function ip2Number(ip: string): number {
	return ip.split(".").reduce((ipInt, octet) => (ipInt << 8) + parseInt(octet, 10), 0) >>> 0
}

export function range(low: number, high?: number): number[] {
	return high ? Array.from({ length: high - low }, (_, k) => k + low) : Array.from({ length: low }, (_, k) => k)
}
