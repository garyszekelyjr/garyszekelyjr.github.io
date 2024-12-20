<script lang="ts">
	let {
		title,
		company,
		dates,
	}: {
		title: string;
		company: string;
		dates: string;
	} = $props();
</script>

<div class="py-3">
	<div>{title}</div>
	<div>{company}</div>
	<div class="text-subtext">{dates}</div>
</div>
