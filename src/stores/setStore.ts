import { writable } from "svelte/store";

export const setStore = writable(JSON.parse(localStorage.getItem("sets") || "[]"));

setStore.subscribe((value) => {
	localStorage.setItem("sets", JSON.stringify(value));
});
