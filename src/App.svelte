<script lang="ts">
	import About from "./components/About.svelte";
	import Background from "./components/Background.svelte";
	import Cell from "./components/Cell.svelte";
	import Projects from "./components/Projects.svelte";
	import Window from "./components/Window.svelte";

	let cells = [
		{ window: "About", icon: "user.svg", index: 0 },
		{ window: "Projects", icon: "folder.svg", index: 10 },
	];

	let windows: string[] = $state([]);

	function open(window: string | undefined) {
		if (window && !windows.includes(window)) {
			windows = [...windows, window];
		}
	}

	function close(window: string) {
		windows = windows.filter((_window) => _window !== window);
	}
</script>

<main class="desktop">
	<Background />
	<div
		class="absolute w-full h-full grid auto-rows-fr grid-cols-5 lg:grid-cols-10 p-5"
	>
		{#each Array.from({ length: 48 }) as _, i}
			{@const cell = cells.find((cell) => cell.index === i)}
			<Cell
				window={cell?.window}
				icon={cell?.icon}
				open={() => open(cell?.window)}
			/>
		{/each}
	</div>
	{#each windows as window}
		<Window {window} close={() => close(window)}>
			{#if window === "About"}
				<About />
			{/if}
			{#if window === "Projects"}
				<Projects />
			{/if}
		</Window>
	{/each}
</main>
