export function showModal(selector: string) {
	const d: HTMLDialogElement | null = qs(`${selector}`) as HTMLDialogElement;
	if (d) d.showModal();
}

export function qs(selector: string, root: Document | HTMLElement = document): HTMLElement | null {
	return root.querySelector(selector);
}

export function getRandomIdx(arr: []) {
	return Math.floor(Math.random() * arr.length);
}

export function shuffle(arr: []) {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}

	return arr;
}
