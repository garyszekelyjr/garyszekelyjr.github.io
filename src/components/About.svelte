<script lang="ts">
	import type * as Models from "../models";

	import Education from "./Education.svelte";
	import Experience from "./Experience.svelte";
	import Loader from "./Loader.svelte";

	let about: Models.About | undefined = $state();
	let experiences: Models.Experience[] | undefined = $state();
	let educations: Models.Education[] | undefined = $state();

	(async () => {
		const downloadUrl = (
			await (
				await fetch(
					"https://api.github.com/repos/garyszekelyjr/garyszekelyjr.github.io/contents/data.json",
				)
			).json()
		).download_url;

		const response = await fetch(downloadUrl);
		if (response.ok) {
			const data = await response.json();
			about = data.about;
			experiences = data.experiences;
			educations = data.educations;
		}
	})();
</script>

<div>
	<div class="mx-1 my-3">
		{#if about}
			<div class="text-white">{about}</div>
		{:else}
			<Loader />
		{/if}
	</div>
	<hr />
	<div class="mx-1 my-3">
		{#if experiences}
			<div class="text-white text-2xl">Experience</div>
			{#each experiences as experience}
				<Experience {...experience} />
			{/each}
		{:else}
			<Loader />
		{/if}
	</div>
	<hr />
	<div class="mx-1 my-3">
		{#if educations}
			<div class="text-white text-2xl">Education</div>
			{#each educations as education}
				<Education {...education} />
			{/each}
		{:else}
			<Loader />
		{/if}
	</div>
</div>
