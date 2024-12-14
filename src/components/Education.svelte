<script lang="ts">
	let {
		degree,
		major,
		concentration,
		school,
		dates,
	}: {
		degree: string;
		major: string;
		concentration: string;
		school: string;
		dates: string;
	} = $props();
</script>

<div class="mx-1 my-3">
	<div class="text-white">{degree}, {major}</div>
	<div class="text-white">{concentration}</div>
	<div class="text-white">{school}</div>
	<div class="text-white">{dates}</div>
</div>
