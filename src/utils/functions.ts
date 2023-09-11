export function showModal(selector: string) {
	const d: HTMLDialogElement | null = qs(`${selector}`) as HTMLDialogElement;
	if (d) d.showModal();
}

function qs(selector: string, root: Document | HTMLElement = document) {
	return root.querySelector(selector);
}
