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
				a["updated_at"] < b["updated_at"] ? 1 : -1,
			);
		}
	})();
</script>

<div class="flex-auto">
	{#if projects}
		{#each projects as project, index}
			<Project {...project} />
			{#if index < projects.length - 1}
				<hr />
			{/if}
		{/each}
	{:else}
		<Loader />
	{/if}
</div>
