<script lang="ts">
	import { setStore } from "../../../stores/setStore";
	import { page } from "$app/stores";
	import { redirect } from "@sveltejs/kit";

	let set: {
		id: string;
		name: string;
		data: [string, string, number][];
	} | null = null;

	setStore.subscribe((value) => {
		set = value.filter((v: { id: string }) => v.id !== $page.url.pathname.split("/")[2])[0];
		if (!set) return redirect(308, "/set");
	});
</script>

<svelte:head>
	<title>RLM | Specific set</title>
</svelte:head>
<div class="flex justify-between">
	<h1 class="text-3xl font-bold">Set name</h1>
	<a href="/set/edit/" class="btn btn-primary">Edit</a>
</div>
