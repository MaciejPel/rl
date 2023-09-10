<script lang="ts">
	import { setStore } from "../../../stores/setStore";
	import { page } from "$app/stores";
	import CompactRow from "../../../components/CompactRow.svelte";
	import { goto } from "$app/navigation";

	let setId: string | null = null;
	let set: {
		id: string;
		name: string;
		data: [string, string, number][];
	} | null = null;

	$: setId = $page.url.pathname.split("/")[2];

	$: setStore.subscribe((value) => {
		set = value.filter((v: { id: string }) => v.id === setId)[0];
		if (!set) return goto("/set");
	});
</script>

<svelte:head>
	<title>RLM | Specific set</title>
</svelte:head>
<div class="flex flex-col gap-2">
	<div class="flex items-center justify-between">
		<h1 class="text-3xl font-bold">{set?.name}</h1>
		<div class="join">
			<button class="btn btn-error join-item">Delete</button>
			<a href="/set/{setId}/edit" class="btn btn-primary join-item">Edit</a>
			<a href="/set/{setId}/learning-mode" class="btn btn-success join-item">Learning mode</a>
		</div>
	</div>
	<div class="flex flex-col gap-2">
		{#if set?.data.length}
			{#each set.data as s}
				<CompactRow source={s[0]} target={s[1]} />
			{/each}
		{/if}
	</div>
</div>
