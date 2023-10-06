import type { HandleServerError } from "@sveltejs/kit";

export const handleError: HandleServerError = ({ error, event }) => {
	const err = error as { message: string };
	const is404 = err.message.includes("Not found");
	console.log(err);

	return {
		message: is404 ? "Page you are looking for does not exist" : "Unknown error",
		code: is404 ? "404" : "Unknown"
	};
};
