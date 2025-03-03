<script lang="ts">
	type Languages = {
		[language: string]: number;
	};

	let languages: Languages = $state({});

	(async () => {
		let response = await fetch(
			"https://api.github.com/users/garyszekelyjr/repos",
		);
		if (response.ok) {
			const PROJECTS = await response.json();
			for (const PROJECT of PROJECTS) {
				let response = await fetch(
					PROJECT["languages_url"],
				);
				if (response.ok) {
					const LANGUAGES: Languages =
						await response.json();
					for (const [
						LANGUAGE,
						COUNT,
					] of Object.entries(LANGUAGES)) {
						if (!(LANGUAGE in languages)) {
							languages[LANGUAGE] = 0;
						}
						languages[LANGUAGE] += COUNT;
					}
				}
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
