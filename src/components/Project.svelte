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

	let languages: Record<string, number> | undefined = $state();

	(async () => {
		const response = await fetch(languages_url);
		if (response.ok) {
			languages = await response.json();
		}
	})();
</script>

<div class="mx-2 my-3">
	<div class="flex justify-between text-white">
		<div>
			<a
				href={html_url}
				target="_blank"
				class="text-blue-500 hover:underline">{name}</a
			>
			<div class="mb-2">{description}</div>
			{#if languages}
				<div class="flex justify-between">
					<ul class="me-2">
						{#each Object.keys(languages) as language}
							<li>
								{language}
							</li>
						{/each}
					</ul>
					<ul>
						{#each Object.values(languages) as numBytes}
							<li>
								{(
									(numBytes /
										Object.values(
											languages,
										).reduce(
											(
												acc,
												x,
											) =>
												acc +
												x,
											0,
										)) *
									100
								).toFixed(2)}%
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		</div>
		<div>
			<div class="mb-1">
				Created: {new Date(
					created_at,
				).toLocaleDateString()}
			</div>
			<div class="mb-2">
				Updated: {new Date(
					updated_at,
				).toLocaleDateString()}
			</div>
		</div>
	</div>
</div>
