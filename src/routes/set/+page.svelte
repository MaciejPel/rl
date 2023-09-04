<script lang="ts">
	import { setStore } from "../../stores/setStore";

	let sets: {
		id: string;
		name: string;
		data: [string, string, number][];
	}[] = [];

	setStore.subscribe((value) => {
		sets = value;
	});
</script>

<svelte:head>
	<title>RLM | Sets</title>
</svelte:head>
<div class="flex justify-between">
	<h1 class="text-3xl font-bold">Sets</h1>
	<a href="/set/create" class="btn btn-primary">Create</a>
</div>
<div class="grid grid-cols-3 gap-4">
	{#each sets as set}
		<a
			href="/set/{set.id}"
			class="card w-full bg-neutral text-neutral-content group hover:underline"
		>
			<div class="card-body items-center text-center">
				<h2 class="card-title">{set.name}</h2>
				<p>{set.data.length}</p>
			</div>
		</a>
	{/each}
</div>
