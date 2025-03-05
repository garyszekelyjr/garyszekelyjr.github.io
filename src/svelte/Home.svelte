<script lang="ts">
	import type { Languages } from "../typescript/models";
	import { fetch_languages, fetch_projects } from "../typescript/utils";

	let languages: Languages = $state({});

	(async () => {
		const PROJECTS = await fetch_projects();
		for (const PROJECT of PROJECTS) {
			const LANGUAGES = await fetch_languages(
				PROJECT.languages_url,
			);
			for (const [LANGUAGE, COUNT] of Object.entries(
				LANGUAGES,
			)) {
				if (!(LANGUAGE in languages)) {
					languages[LANGUAGE] = 0;
				}
				languages[LANGUAGE] += COUNT;
			}
		}
	})();
</script>

<div class="p-10">
	{#each Object.entries(languages) as [language, count]}
		<div>
			{language}
			{(
				(count /
					Object.values(languages).reduce(
						(acc, curr) => acc + curr,
						0,
					)) *
				100
			).toFixed(2)}
		</div>
	{/each}
</div>
