export interface SVGOptions {
	onCompleted?: (name: string, icon: string | undefined)  => void,
	onError?: (error: string) => void
}