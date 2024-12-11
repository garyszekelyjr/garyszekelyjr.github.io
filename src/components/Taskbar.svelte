<script lang="ts">
	let date = $state(new Date());

	setInterval(() => {
		date = new Date();
	}, 1000);
</script>

<div class="flex justify-end p-2 bg-neutral-900">
	<span class="mr-2 text-white text-2xl lg:text-3xl"
		>{`${date.toLocaleDateString()}`}</span
	>
	<span class="text-white text-2xl lg:text-3xl"
		>{`${date.toLocaleTimeString()}`}</span
	>
</div>
