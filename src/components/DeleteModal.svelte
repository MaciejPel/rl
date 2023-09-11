<script lang="ts">
	export let id: string | null = "";
	export let name: string = "";
	export let onSetDelete = (id: string | null) => {};
	let [confirm, confirmValue] = [`sudo delete set ${name}`, ""];
</script>

<dialog id="delete-modal" class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg mb-1">Delete set</h3>
		<form class="form-control">
			<label for="confirm">
				Type-in <span class="text-error font-mono font-medium bg-base-300 px-1 rounded-sm">
					{confirm}
				</span>
			</label>
			<input id="confirm" type="text" class="input input-bordered" bind:value={confirmValue} />
		</form>
		<div class="modal-action mt-2">
			<form method="dialog" class="join">
				<button class="btn join-item" on:click={() => (confirmValue = "")}>Cancel</button>
				<button
					on:click={() => onSetDelete(id)}
					class="btn btn-error join-item"
					disabled={confirm !== confirmValue}>Delete</button
				>
			</form>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
