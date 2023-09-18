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
<div class="flex flex-col gap-2">
	<div class="flex justify-between items-center">
		<h1 class="text-3xl font-bold">Sets</h1>
		<a href="/set/create" class="btn btn-primary">Create</a>
	</div>
	<div class="grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] grid-fit gap-2 md:gap-4">
		{#each sets as set}
			<a href="/set/{set.id}" class="card w-full bg-base-200 text-base-content group">
				<div class="card-body items-center text-center">
					<h2 class="card-title group-hover:underline">{set.name}</h2>
					<p>{set.data.length}</p>
				</div>
			</a>
		{/each}
	</div>
</div>
