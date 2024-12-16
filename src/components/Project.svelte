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

<div class="flex justify-between text-white">
	<div class="flex flex-col">
		<div class="flex-auto">
			<a
				href={html_url}
				target="_blank"
				class="text-blue-500 hover:underline">{name}</a
			>
			<div>{description}</div>
		</div>
		<div>
			Updated: {new Date(updated_at).toLocaleDateString(
				undefined,
				{
					year: "numeric",
					month: "short",
				},
			)}
		</div>
		<div>
			Created: {new Date(created_at).toLocaleDateString(
				undefined,
				{
					year: "numeric",
					month: "short",
				},
			)}
		</div>
	</div>
	<div class="flex">
		<div>
			{#each Object.keys(languages) as language}
				<div>{language}</div>
			{/each}
		</div>
		<div class="flex flex-col items-end">
			{#each Object.values(languages) as proportion}
				<div>{proportion.toFixed(1)} %</div>
			{/each}
		</div>
	</div>
</div>
