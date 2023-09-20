<script lang="ts">
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { setStore } from "../../../../stores/setStore";
	import { showModal } from "../../../../utils/functions";
	import TranslationRow from "../../../../components/TranslationRow.svelte";
	import ImportModal from "../../../../components/ImportModal.svelte";

	interface Set {
		id: string;
		name: string;
		data: [string, string, number][];
	}

	let setId: string | null = null;
	let set: Set | null = null;

	function setSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!set) return;
		const filteredRows = set.data.filter((e) => e[0] && e[1]);
		if (!set.name || filteredRows.length === 0) return;
		if (set.name && filteredRows.length) {
			setStore.update((p) => [
				...p,
				{ id: crypto.randomUUID(), name: set!.name, data: filteredRows }
			]);
		}
		goto($page.url.pathname.split("/").slice(0, -1).join("/"));
	}

	function appendRow() {
		if (!set?.data) return;
		set.data = [...set.data, ["", "", 0]];
		setTimeout(() => {
			window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
		}, 400);
	}

	function removeRow(idx: number) {
		if (!set?.data) return;
		set.data = set.data.filter((_, i) => i !== idx);
	}

	function clearRows() {
		if (!set?.data) return;
		set.data = [["", "", 0]];
	}

	function processSet(rd: string, wd: string, content: string) {
		if (!set) return;
		rd = rd === "\\n" ? "\n" : rd;
		wd = wd === "\\t" ? "\t" : wd;
		const tmp: [string, string, number][] = content.split(rd).map((c) => {
			const [s, t] = c.split(wd);
			return [s, t, 0];
		});
		set.data = [...set.data, ...tmp];
		content = "";
	}

	$: setId = $page.params.id;

	$: setStore.subscribe((value: Set[]) => {
		set = value.filter((v) => v.id === setId)[0];
	});

	$: if (!set) goto("/set");
</script>

<svelte:head>
	<title>{set?.name} | Edit | RLM</title>
</svelte:head>
<form on:submit={setSubmit} class="min-h-[calc(100lvh-5.25rem)] form-control gap-2 relative pb-16">
	{#if set}
		<input
			type="text"
			name="name"
			bind:value={set.name}
			class="input font-bold bg-base-200"
			placeholder="Set name"
			required
		/>
		{#each set.data as row, idx}
			<TranslationRow {idx} bind:sourceValue={row[0]} bind:targetValue={row[1]} {removeRow} />
		{/each}
		<div class="fixed w-full bg-base-200 bottom-0 left-0 flex justify-center items-center">
			<div class="container flex justify-between py-2 px-2 md:px-16">
				<div class="join">
					<button type="button" class="btn btn-error join-item" on:click={clearRows}>
						Clear all
					</button>
					<button type="button" class="btn btn-info join-item" on:click={appendRow}>Add row</button>
				</div>
				<div class="join">
					<button
						type="button"
						class="btn btn-info join-item"
						on:click={() => showModal("#import-modal")}
					>
						Import
					</button>
					<input
						type="submit"
						value="Update"
						class="btn btn-primary join-item"
						disabled={!set.name || set.data.length === 0 || !set.data[0][0] || !set.data[0][1]}
					/>
				</div>
			</div>
		</div>
	{/if}
</form>
<ImportModal {processSet} />
