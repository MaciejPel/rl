<script lang="ts">
	export let idx: number | null = null;
	export let onRowSave = (idx: number | null, src: string, tgt: string) => {};
	export let [source, target] = ["", ""];
	let [sourceValue, targetValue] = [source, target];
	let editMode = false;
</script>

<div class="flex gap-4 justify-between bg-base-200 hover:bg-base-300 rounded-xl p-4">
	<div class="flex flex-col md:flex-row justify-between gap-2 md:gap-4 grow-[3]">
		<input
			type="text"
			bind:value={sourceValue}
			class="bg-transparent grow border-y-2 border-t-transparent {editMode
				? 'border-b-base-content'
				: 'border-b-transparent'}"
			disabled={!editMode}
		/>
		<div class="flex self-stretch h-full grow">
			<hr class="border-none h-auto self-stretch w-[2px] rounded-full bg-base-content" />
		</div>
		<input
			type="text"
			bind:value={targetValue}
			class="bg-transparent grow-[2] border-y-2 border-t-transparent {editMode
				? 'border-b-base-content'
				: 'border-b-transparent'}"
			disabled={!editMode}
		/>
	</div>
	<div class="flex gap-2 justify-end self-center grow-[1]">
		{#if editMode}
			<button
				class="btn btn-sm btn-error fill-white"
				on:click={() => ([editMode, sourceValue, targetValue] = [false, source, target])}
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6">
					<path
						fill-rule="evenodd"
						d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
		{/if}
		<button
			class="btn btn-sm btn-primary fill-white"
			on:click={() => {
				editMode = !editMode;
				if (!editMode) onRowSave(idx, sourceValue, targetValue);
			}}
		>
			{#if editMode}
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6">
					<path
						fill-rule="evenodd"
						d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
						clip-rule="evenodd"
					/>
				</svg>
			{:else}
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6">
					<path
						d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"
					/>
				</svg>
			{/if}
		</button>
	</div>
</div>
