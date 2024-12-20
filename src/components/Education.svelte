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

<div class="py-3">
	<div>{degree}, {major}</div>
	<div>{concentration}</div>
	<div>{school}</div>
	<div class="text-subtext">{dates}</div>
</div>
