import { writable } from "svelte/store";

export const setStore = writable(JSON.parse(localStorage.getItem("sets") || "[]"));

setStore.subscribe((sets) => {
	localStorage.setItem("sets", JSON.stringify(sets));
	console.log(sets);
});
