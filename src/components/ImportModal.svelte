<script lang="ts">
	export let processSet = (rd: string, wd: string, content: string) => {};

	let [wd, rd] = ["\\t", "\\n"];
	let [wdValue, rdValue] = [wd, rd];
	let content = "";
</script>

<dialog id="import-modal" class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg mb-1">Import</h3>
		<form class="form-control gap-2">
			<div class="flex flex-col">
				<label for="wd">Word Delimeter</label>
				<input id="wd" type="text" class="input input-bordered" bind:value={wdValue} />
			</div>
			<div class="flex flex-col">
				<label for="rd">Row Delimeter</label>
				<input id="rd" type="text" class="input input-bordered" bind:value={rdValue} />
			</div>
			<div class="flex flex-col">
				<label for="content">Import content</label>
				<textarea id="content" class="textarea textarea-bordered" bind:value={content} />
			</div>
		</form>
		<div class="modal-action mt-2">
			<form method="dialog">
				<button
					on:click={() => {
						processSet(rdValue, wdValue, content);
						[wdValue, rdValue, content] = [wd, rd, ""];
					}}
					class="btn btn-primary">Import</button
				>
			</form>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
