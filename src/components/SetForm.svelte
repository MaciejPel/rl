<script lang="ts">
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { setStore } from "../stores/setStore";
	import { onMount } from "svelte";
	import { showModal } from "../utils/functions";
	import TranslationRow from "./TranslationRow.svelte";
	import ImportModal from "./ImportModal.svelte";

	interface Set {
		id: string;
		name: string;
		data: [string, string, number, number][];
	}

	let set: Set | null = null;
	let mode: "create" | "edit" | null = null;

	function setSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!set || !set.name) return;
		const filteredRows = set.data.filter((e) => e[0] && e[1]);
		if (set.name && filteredRows.length) {
			if (mode === "edit")
				setStore.update((p) => {
					console.log(p);
					const setIndex = p.findIndex((obj: Set) => obj.id === set!.id);
					p[setIndex] = { ...p[setIndex], set };
					return p;
				});
			else if (mode === "create") setStore.update((p) => [...p, set]);
			goto(`/set/${set.id}`);
		}
	}

	function appendRow() {
		if (!set?.data) return;
		set.data = [...set.data, ["", "", 0, 0]];
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
		set.data = [["", "", 0, 0]];
	}

	function processImportSet(rd: string, wd: string, content: string) {
		if (!set) return;
		rd = rd === "\\n" ? "\n" : rd;
		wd = wd === "\\t" ? "\t" : wd;
		const tmp: [string, string, number, number][] = content.split(rd).map((c) => {
			const [s, t] = c.split(wd);
			return [s, t, 0, 0];
		});
		set.data = [...set.data, ...tmp];
		content = "";
	}

	onMount(() => {
		const route = $page.route.id?.split("/");
		if (route?.includes("create")) {
			mode = "create";
			set = {
				id: crypto.randomUUID(),
				name: "",
				data: [["", "", 0, 0]]
			};
		} else if (route?.includes("edit")) {
			mode = "edit";
			setStore.subscribe((value: Set[]) => {
				set = value.filter((v) => v.id === $page.params.id)[0];
			});
		} else goto("/set");
		if (!set) goto("/set");
	});
</script>

<svelte:head>
	<title>
		{mode === "edit" ? `Edit ${set?.name}` : mode === "create" ? "New set" : "Loading"} | RLM</title
	>
</svelte:head>
<form on:submit={setSubmit} class="min-h-[calc(100lvh-5.25rem)] form-control gap-2 relative pb-16">
	{#if set}
		<input
			type="text"
			bind:value={set.name}
			class="input font-bold bg-base-200"
			placeholder="Set name"
			required
		/>
		{#each set.data as row, idx}
			<TranslationRow {idx} bind:sourceValue={row[0]} bind:targetValue={row[1]} {removeRow} />
		{/each}
		<div class="fixed w-full bg-base-300 bottom-0 left-0 flex justify-center items-center">
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
						value={mode === "edit" ? "Update" : "Create"}
						class="btn btn-primary join-item"
						disabled={!set.name || set.data.length < 2 || !set.data[0][0] || !set.data[0][1]}
					/>
				</div>
			</div>
		</div>
	{/if}
</form>
<ImportModal processSet={processImportSet} />
