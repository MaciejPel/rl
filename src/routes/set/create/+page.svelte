<script lang="ts">
	import { setStore } from "../../../stores/setStore";
	import TranslationRow from "./TranslationRow.svelte";

	let name = "Test set";
	let rows: [string, string, number][] = [["", "", 0]];

	function formSubmit(e: SubmitEvent) {
		e.preventDefault();
		const filteredRows = rows.filter((e) => e[0] && e[1]);
		if (name && filteredRows.length) {
			setStore.update((p) => [...p, { id: crypto.randomUUID(), name, data: filteredRows }]);
		}
	}

	function appendRow() {
		rows = [...rows, ["", "", 0]];
		const objDiv = document.querySelector("body");
		setTimeout(() => {
			if (objDiv) objDiv.scrollIntoView({ behavior: "smooth", block: "end" });
		}, 50);
	}

	function removeRow(idx: number) {
		rows = rows.filter((_, i) => i !== idx);
	}
</script>

<form on:submit={formSubmit} class="min-h-[calc(100lvh-5.25rem)] form-control gap-2 relative">
	<input
		type="text"
		name="name"
		bind:value={name}
		class="input font-bold bg-neutral-700"
		placeholder="Set name"
	/>
	{#each rows as row, idx}
		<TranslationRow {idx} bind:sourceValue={row[0]} bind:targetValue={row[1]} {removeRow} />
	{/each}
	<div class="absolute right-0 bottom-0 join">
		<button type="button" class="btn btn-success join-item" on:click={appendRow}>Add</button>
		<input type="submit" value="Submit" class="btn btn-primary join-item" />
	</div>
</form>
