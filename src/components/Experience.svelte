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

<div class="mx-1 my-3">
	<div class="text-white">{title}</div>
	<div class="text-white">{company}</div>
	<div class="text-white">{dates}</div>
</div>
