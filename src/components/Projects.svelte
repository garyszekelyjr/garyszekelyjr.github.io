<script lang="ts">
	import type * as Models from "../models";

	import Loader from "./Loader.svelte";
	import Project from "./Project.svelte";

	let projects: Models.Project[] | undefined = $state();

	(async () => {
		const response = await fetch(
			"https://api.github.com/users/garyszekelyjr/repos",
		);
		if (response.ok) {
			projects = await response.json();
			projects?.sort((a, b) =>
				b["updated_at"].localeCompare(a["updated_at"]),
			);
		}
	})();
</script>

<div class="p-10" id="/projects">
	{#if projects}
		<div class="grid lg:grid-cols-2 gap-5">
			{#each projects as project}
				<Project {...project} />
			{/each}
		</div>
	{:else}
		<Loader />
	{/if}
</div>
