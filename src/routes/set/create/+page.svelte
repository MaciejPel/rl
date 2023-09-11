<script lang="ts">
	import { setStore } from "../../../stores/setStore";
	import ImportModal from "../../../components/ImportModal.svelte";
	import TranslationRow from "../../../components/TranslationRow.svelte";
	import { showModal } from "../../../utils/functions";
	import { goto } from "$app/navigation";

	let name = "Test set";
	let rows: [string, string, number][] = [["", "", 0]];

	function setSubmit(e: SubmitEvent) {
		e.preventDefault();
		const filteredRows = rows.filter((e) => e[0] && e[1]);
		if (name && filteredRows.length) {
			setStore.update((p) => [...p, { id: crypto.randomUUID(), name, data: filteredRows }]);
		}
		goto("/set");
	}

	function appendRow() {
		rows = [...rows, ["", "", 0]];
		setTimeout(() => {
			window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
		}, 400);
	}

	function removeRow(idx: number) {
		rows = rows.filter((_, i) => i !== idx);
	}

	function clearRows() {
		rows = [["", "", 0]];
	}

	function processSet(rd: string, wd: string, content: string) {
		rd = rd === "\\n" ? "\n" : rd;
		wd = wd === "\\t" ? "\t" : wd;
		const tmp: [string, string, number][] = content.split(rd).map((c) => {
			const [s, t] = c.split(wd);
			return [s, t, 0];
		});
		rows = [...rows, ...tmp];
	}
</script>

<form on:submit={setSubmit} class="min-h-[calc(100lvh-5.25rem)] form-control gap-2 relative pb-16">
	<input
		type="text"
		name="name"
		bind:value={name}
		class="input font-bold bg-base-200"
		placeholder="Set name"
	/>
	{#each rows as row, idx}
		<TranslationRow {idx} bind:sourceValue={row[0]} bind:targetValue={row[1]} {removeRow} />
	{/each}
	<div class="fixed w-full bg-base-200 bottom-0 left-0 flex justify-center items-center">
		<div class="container flex justify-between py-2 px-16">
			<div class="join">
				<button type="button" class="btn btn-error join-item" on:click={clearRows}>
					Clear all
				</button>
				<button
					type="button"
					class="btn btn-info join-item"
					on:click={() => showModal("#import-modal")}
				>
					Import
				</button>
			</div>
			<div class="join">
				<button type="button" class="btn btn-info join-item" on:click={appendRow}>Add row</button>
				<input type="submit" value="Create" class="btn btn-primary join-item" />
			</div>
		</div>
	</div>
</form>
<ImportModal {processSet} />
