<script lang="ts">
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import { setStore } from "../../../../stores/setStore";
	import { getRandomIdx, shuffle } from "../../../../utils/functions";

	interface Set {
		id: string;
		name: string;
		data: [string, string, number, number][];
	}

	let set: Set | null = null;
	let currIdx = 0;
	let isAnswered = false;
	let answer: string | number | null;

	function findExampleAnswers() {
		if (!set) return [];
		let exampleAnswers = [currIdx];
		while (exampleAnswers.length < 4) {
			const r = getRandomIdx(set.data as []);
			if (!exampleAnswers.includes(r)) exampleAnswers.push(r);
		}
		exampleAnswers = shuffle(exampleAnswers as []);
		return exampleAnswers;
	}

	onMount(() => {
		setStore.subscribe((value: Set[]) => {
			set = value.filter((v) => v.id === $page.params.id)[0];
		});
		if (!set) goto("/set");
	});
</script>

<div class="flex justify-center items-center h-full">
	<div class="card w-[44rem] bg-base-200 shadow-xl">
		<div class="card-body gap-8">
			{#if set}
				<h2 class="card-title">{set.data[currIdx][1]}</h2>
				{#if set.data[currIdx][2] === 0}
					<div class="grid grid-cols-2 gap-2">
						{#each findExampleAnswers() as answerIdx, idx}
							<button
								type="button"
								class="btn btn-outline normal-case font-medium justify-start"
								class:btn-success={isAnswered && answerIdx === currIdx}
								on:click={() => {
									[isAnswered, answer] = [true, answerIdx];
									setTimeout(() => {
										[isAnswered, answer] = [false, null];
									}, 5000);
								}}
							>
								<span>{idx + 1}</span>
								<span>{set.data[answerIdx][0]}</span>
							</button>
						{/each}
					</div>
				{/if}
			{/if}
		</div>
	</div>
</div>
