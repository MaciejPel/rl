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
	let answer: string | number | null = null;
	let other = findOtherAnswers();
	let stack: [number, number][] = [];

	function findOtherAnswers() {
		if (!set) return [];
		let exampleAnswers = [currIdx];
		while (exampleAnswers.length < 4) {
			const r = getRandomIdx(set.data as []);
			if (!exampleAnswers.includes(r)) exampleAnswers.push(r);
		}
		exampleAnswers = shuffle(exampleAnswers as []);
		return exampleAnswers;
	}

	function updateSet() {
		if (!set) return;
		setStore.update((p) => {
			const setIndex = p.findIndex((obj: Set) => obj.id === set!.id);
			p[setIndex] = { ...p[setIndex], set };
			return p;
		});
	}

	function onKeyDown(e: KeyboardEvent) {
		let v = null;
		switch (e.keyCode) {
			case 13:
				break;
			case 49:
				v = other[0];
				break;
			case 50:
				v = other[1];
				break;
			case 51:
				v = other[2];
				break;
			case 52:
				v = other[3];
				break;
		}
		if ([49, 50, 51, 52].includes(e.keyCode) && v !== null && v !== undefined) {
			if (other.length > 0 && other.includes(v)) verifyAnswer(v);
		}
		if (answer && !other.length && e.keyCode === 13) verifyAnswer(answer);
	}

	function verifyAnswer(userAnswer: string | number) {
		answer = userAnswer;
		setTimeout(() => {
			if (answer === currIdx && set) set.data[currIdx][2]++;
			// updateSet();
			stack.push([currIdx, 10]);
			answer = null;
			currIdx++;
		}, 2500);
	}

	onMount(() => {
		setStore.subscribe((value: Set[]) => {
			set = value.filter((v) => v.id === $page.params.id)[0];
		});
		if (!set) goto("/set");
	});

	$: if (set?.data[currIdx][2] === 0) other = findOtherAnswers();
	else other = [];
</script>

<div class="flex justify-center items-center h-full">
	<div class="card w-[44rem] bg-base-200 shadow-xl">
		<div class="card-body gap-8">
			{#if set}
				<h2 class="card-title">{set.data[currIdx][1]}</h2>
				{#if set.data[currIdx][2] === 0}
					<div class="grid grid-cols-2 gap-2">
						{#each other as otherIdx, idx}
							<button
								type="button"
								class="btn btn-outline border-2 normal-case font-medium justify-start"
								class:btn-success={answer !== null && otherIdx === currIdx}
								class:btn-error={answer !== null && otherIdx === answer && answer !== currIdx}
								on:click={() => {
									verifyAnswer(otherIdx);
								}}
							>
								<span>{idx + 1}</span>
								<span>{set.data[otherIdx][0]}</span>
							</button>
						{/each}
					</div>
				{:else if set.data[currIdx][2] === 1}
					<input
						type="text"
						bind:value={answer}
						class="input w-full"
						class:input-success={answer}
					/>
				{/if}
			{/if}
		</div>
	</div>
</div>
<svelte:window on:keydown|={onKeyDown} />
