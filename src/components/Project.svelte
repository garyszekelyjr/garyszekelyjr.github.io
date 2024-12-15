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

<div class="mx-2 my-3">
	<div class="text-white">
		<div class="flex justify-between">
			<div>
				<a
					href={html_url}
					target="_blank"
					class="text-blue-500 hover:underline"
					>{name}</a
				>
				<div>{description}</div>
			</div>
			<div>
				<div>
					Updated: {new Date(
						updated_at,
					).toLocaleDateString(undefined, {
						year: "numeric",
						month: "short",
					})}
				</div>
				<div>
					Created: {new Date(
						created_at,
					).toLocaleDateString(undefined, {
						year: "numeric",
						month: "short",
					})}
				</div>
			</div>
		</div>
		{#each Object.entries(languages) as [language, proportion]}
			<div class="w-1/4 flex justify-between">
				<div>
					<ul>
						<li>
							{language}
						</li>
					</ul>
				</div>
				<div>
					<ul>
						<li>
							{proportion.toFixed(1)} %
						</li>
					</ul>
				</div>
			</div>
		{/each}
	</div>
</div>
