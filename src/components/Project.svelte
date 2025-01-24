<script lang="ts">
	import type * as Models from "../models";

	let {
		name,
		description,
		html_url,
		languages_url,
		created_at,
		updated_at,
	}: Models.Project = $props();

	let languages: Record<string, number> = $state({});

	(async () => {
		const response = await fetch(languages_url);
		if (response.ok) {
			languages = await response.json();
			const totalBytes = Object.values(languages).reduce(
				(acc, x) => acc + x,
				0,
			);
			for (const language of Object.keys(languages)) {
				languages[language] =
					(languages[language] / totalBytes) *
					100;
			}
		}
	})();
</script>

<div class="project">
	<a href={html_url} target="_blank" class="link">{name}</a>
	<div>{description}</div>
	<div class="flex-auto py-2">
		<div class="grid grid-cols-2">
			{#each Object.entries(languages) as [language, proportion]}
				<div>{language}</div>
				<div>{proportion.toFixed(1)} %</div>
			{/each}
		</div>
	</div>
	<div>
		<div class="text-subtext">
			Updated: {new Date(updated_at).toLocaleDateString(
				undefined,
				{
					year: "numeric",
					month: "short",
				},
			)}
		</div>
		<div class="text-subtext">
			Created: {new Date(created_at).toLocaleDateString(
				undefined,
				{
					year: "numeric",
					month: "short",
				},
			)}
		</div>
	</div>
</div>
