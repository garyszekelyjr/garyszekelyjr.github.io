<script lang="ts">
	import Education from "./Education.svelte";
	import Experience from "./Experience.svelte";

	import { about, experiences, educations } from "../assets/data.json";
</script>

<div class="p-4">
	<div class="text-white">{about}</div>
</div>
<div class="p-4">
	<div class="text-white text-2xl">Experience</div>
	{#each experiences as experience}
		<Experience {...experience} />
	{/each}
</div>
<div class="p-4">
	<div class="text-white text-2xl">Education</div>
	{#each educations as education}
		<Education {...education} />
	{/each}
</div>
