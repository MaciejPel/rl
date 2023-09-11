<script lang="ts">
	import { setStore } from "../../../stores/setStore";
	import CompactRow from "../../../components/CompactRow.svelte";
	import DeleteModal from "../../../components/DeleteModal.svelte";
	import { showModal } from "../../../utils/functions";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";

	interface Set {
		id: string;
		name: string;
		data: [string, string, number][];
	}

	let setId: string | null = null;
	let set: Set | null = null;

	function onRowSave(idx: number | null, src: string, tgt: string) {
		if (idx === null || !set) return;
		set.data[idx] = [src, tgt, set.data[idx][2]];
		setStore.update((value: Set[]) => {
			if (!set) return value;
			value[value.findIndex((v) => v.id === setId)] = set;
			return value;
		});
	}

	function onSetDelete(id: string | null) {
		setStore.update((value: Set[]) => {
			if (!set) return value;
			return value.filter((v) => v.id !== id);
		});
	}

	$: setId = $page.url.pathname.split("/")[2];

	$: setStore.subscribe((value: Set[]) => {
		set = value.filter((v) => v.id === setId)[0];
	});

	$: if (!set) goto("/set");
</script>

<svelte:head>
	<title>RLM | Specific set</title>
</svelte:head>
<div class="flex flex-col gap-2">
	<div class="flex items-center justify-between">
		<h1 class="text-3xl font-bold">{set?.name}</h1>
		<div class="join">
			<button
				class="btn btn-error join-item"
				on:click={() => {
					showModal("#delete-modal");
				}}
			>
				Delete
			</button>
			<a href="/set/{setId}/edit" class="btn btn-primary join-item">Edit</a>
			<a href="/set/{setId}/learning-mode" class="btn btn-success join-item">Learning mode</a>
		</div>
	</div>
	<div class="flex flex-col gap-2">
		{#if set?.data.length}
			{#each set.data as s, idx}
				<CompactRow {idx} source={s[0]} target={s[1]} {onRowSave} />
			{/each}
		{/if}
	</div>
</div>
<DeleteModal id={setId} name={set?.name} {onSetDelete} />
