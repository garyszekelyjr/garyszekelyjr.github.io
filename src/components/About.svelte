<script lang="ts">
	import Education from "./Education.svelte";
	import Experience from "./Experience.svelte";

	import { experiences, educations } from "../assets/data.json";
</script>

<div class="flex-auto flex flex-col lg:flex-row justify-around p-10">
	<div>
		<div class="text-2xl">Experience</div>
		{#each experiences as experience}
			<Experience {...experience} />
		{/each}
	</div>
	<div>
		<div class="text-2xl">Education</div>
		{#each educations as education}
			<Education {...education} />
		{/each}
	</div>
</div>
