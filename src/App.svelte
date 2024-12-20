<script lang="ts">
	import About from "./components/About.svelte";
	import Projects from "./components/Projects.svelte";

	let tab = "about";
</script>

<nav class="flex justify-between p-5">
	<div>
		<button
			class={`text-${tab === "about" ? "yellow" : "blue"} hover:underline`}
			on:click={() => {
				tab = "about";
			}}>About</button
		>
		<button
			class={`text-${tab === "projects" ? "yellow" : "blue"} hover:underline`}
			on:click={() => {
				tab = "projects";
			}}>Projects</button
		>
	</div>
	<div class="flex">
		<a
			href="https://linkedin.com/in/garyszekelyjr"
			target="_blank"
			class="p-1"
		>
			<img
				src="linkedin.svg"
				alt="LinkedIn"
				width="25"
				height="25"
			/>
		</a>
		<a
			href="https://github.com/garyszekelyjr"
			target="_blank"
			class="p-1"
		>
			<img
				src="github.svg"
				alt="GitHub"
				width="25"
				height="25"
			/>
		</a>
	</div>
</nav>

{#if tab === "about"}
	<About />
{/if}

{#if tab === "projects"}
	<Projects />
{/if}
