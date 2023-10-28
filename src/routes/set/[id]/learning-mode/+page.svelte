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
	let ct: {
		idx: number;
		input: string | number | null;
		confirmed: boolean;
		choices: number[];
		delayQueue: { [key: number]: number };
	} = {
		idx: 0,
		input: null,
		confirmed: false,
		choices: [],
		delayQueue: {}
	};

	function generateChoices() {
		if (!set) return [];
		let choices = [ct.idx];
		while (choices.length < Math.min(set.data.length, 4)) {
			const r = getRandomIdx(set.data as []);
			if (!choices.includes(r)) choices.push(r);
		}
		choices = shuffle(choices as []);
		return choices;
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
				v = ct.choices[0];
				break;
			case 50:
				v = ct.choices[1];
				break;
			case 51:
				v = ct.choices[2];
				break;
			case 52:
				v = ct.choices[3];
				break;
		}
		if ([49, 50, 51, 52].includes(e.keyCode) && v !== null && v !== undefined) {
			if (ct.choices.length > 0 && ct.choices.includes(v)) verifyAnswer(v);
		}
		if (ct.input && !ct.choices.length && e.keyCode === 13) verifyAnswer(ct.input);
	}

	function verifyAnswer(userAnswer: string | number) {
		ct.input = userAnswer;
		ct.confirmed = true;
		setTimeout(() => {
			if (ct.input === ct.idx && set) set.data[ct.idx][2]++;
			updateSet();
			ct.delayQueue[ct.idx] = 10;
			for (const k in ct.delayQueue) {
				ct.delayQueue[k]--;
				if (!ct.delayQueue[k]) delete ct.delayQueue[k];
			}
			ct.input = null;
			ct.confirmed = false;
			ct.idx++;
		}, 2500);
	}

	onMount(() => {
		setStore.subscribe((value: Set[]) => {
			set = value.filter((v) => v.id === $page.params.id)[0];
		});
		if (!set) goto("/set");
	});

	$: if (set?.data[ct.idx][2] === 0 && !ct.confirmed) ct.choices = generateChoices();
</script>

<div class="flex justify-center items-center h-full">
	{#if set && Number.isInteger(ct.idx)}
		<div class="card w-[44rem] bg-base-200 shadow-xl">
			<div class="card-body gap-4">
				<h2 class="card-title">{set.data[ct.idx][1]}</h2>
				{#if set.data[ct.idx][2] === 0}
					<div class="grid grid-cols-2 gap-2">
						{#each ct.choices as otherIdx, idx}
							<button
								type="button"
								class="btn btn-outline border-2 normal-case font-medium justify-start"
								class:btn-success={ct.confirmed && otherIdx === ct.idx}
								class:btn-error={ct.confirmed && otherIdx === ct.input && ct.input !== ct.idx}
								on:click={() => {
									if (!ct.confirmed) verifyAnswer(otherIdx);
								}}
							>
								<span>{idx + 1}</span>
								<span>{set.data[otherIdx][0]}</span>
							</button>
						{/each}
					</div>
				{:else if set.data[ct.idx][2] === 1}
					<input
						type="text"
						bind:value={ct.input}
						class="input w-full"
						class:input-success={ct.confirmed && ct.input === set.data[ct.idx][0]}
						class:input-error={ct.confirmed && ct.input !== set.data[ct.idx][0]}
					/>
				{/if}
			</div>
		</div>
	{/if}
</div>
<svelte:window on:keydown|={onKeyDown} />
