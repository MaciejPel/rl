<script lang="ts">
	import "../app.css";
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import { themeChange } from "theme-change";

	let isDark = false;
	onMount(() => {
		themeChange(false);
		isDark =
			document.documentElement.dataset.theme === "dark" ||
			(!document.documentElement.dataset.theme &&
				window.matchMedia("(prefers-color-scheme: dark)").matches);
	});
	$: lightActive = !isDark ? "swap-off" : "swap-on";
	$: darkActive = isDark ? "swap-off" : "swap-on";
	$: order = isDark ? "light,dark" : "dark,light";

	const routes = [
		{ path: "/set", name: "Sets" },
		{ path: "/about", name: "About" }
	];
	let currentRoute = "/";
	$: currentRoute = $page.url.pathname;
</script>

<header
	class="w-full p-2 bg-primary sticky top-0 left-0 flex justify-center transition-colors font-open-sans z-10"
>
	<div class="container flex justify-between text-white">
		<a href="/" class="text-3xl font-bold tracking-wider ts-logo">RLM</a>
		<nav class="flex gap-4 items-center text-lg font-bold">
			{#each routes as route}
				<a
					href={route.path}
					class:opacity-60={!currentRoute.includes(route.path)}
					class={currentRoute.includes(route.path) ? "ts-nav-link-active" : "ts-nav-link"}
					>{route.name}
				</a>
			{/each}
			<a href="/set/create" class="hover:bg-black hover:bg-opacity-50 rounded-full p-1">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
				</svg>
			</a>
			<label class="swap swap-rotate fill-white hover:fill-yellow-400">
				<input type="checkbox" data-toggle-theme={order} />
				<svg
					class="w-6 h-6 drop-shadow-sm {darkActive}"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
				>
					<path
						fill-rule="evenodd"
						d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
						clip-rule="evenodd"
					/>
				</svg>

				<svg class="w-6 h-6 {lightActive}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path
						d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"
					/>
				</svg>
			</label>
		</nav>
	</div>
</header>
<main class="transition-colors font-open-sans min-h-[calc(100lvh-3.25rem)] flex justify-center">
	<div class="container py-4 px-2 md:px-16 relative">
		<slot />
	</div>
</main>
