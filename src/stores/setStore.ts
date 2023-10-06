import { writable } from "svelte/store";
import { browser } from "$app/environment";

export const setStore = writable(JSON.parse(browser ? localStorage.getItem("sets") || "[]" : "[]"));

setStore.subscribe((value) => {
	if (browser) localStorage.setItem("sets", JSON.stringify(value));
});
