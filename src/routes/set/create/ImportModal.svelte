<script lang="ts">
	export let processSet = (rd: string, wd: string, content: string) => {};

	let wd = "\\t";
	let rd = "\\n";
	let content = "";
</script>

<dialog id="import-modal" class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Import</h3>
		<form class="form-control gap-2">
			<input type="text" class="input input-bordered" bind:value={wd} />
			<input type="text" class="input input-bordered" bind:value={rd} />
			<textarea class="textarea textarea-bordered" bind:value={content} />
		</form>
		<div class="modal-action">
			<form method="dialog">
				<button on:click={() => processSet(rd, wd, content)} class="btn btn-primary">Import</button>
			</form>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
