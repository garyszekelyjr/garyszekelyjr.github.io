<script lang="ts">
	import Education from "./Education.svelte";
	import Experience from "./Experience.svelte";

	import { experiences, educations } from "../../data.json";

	let about: undefined = $state();

	(async () => {
		const downloadUrl = (
			await (
				await fetch(
					"https://api.github.com/repos/garyszekelyjr/garyszekelyjr.github.io/contents/data.json",
				)
			).json()
		).downloadUrl;

		const response = await fetch(downloadUrl);
		if (response.ok) {
			const data = await response.json();
			console.log(data);
			about = data.about;
		}
	})();
</script>

<div class="">
	<div class="mx-1 my-3">
		<div class="text-white">{about}</div>
	</div>
	<hr />
	<div class="mx-1 my-3">
		<div class="text-white text-2xl">Experience</div>
		{#each experiences as experience}
			<Experience {...experience} />
		{/each}
	</div>
	<hr />
	<div class="mx-1 my-3">
		<div class="text-white text-2xl">Education</div>
		{#each educations as education}
			<Education {...education} />
		{/each}
	</div>
</div>
