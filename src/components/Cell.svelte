<script lang="ts">
	let {
		window,
		icon,
		open,
	}: {
		window: string | undefined;
		icon: string | undefined;
		open: () => void;
	} = $props();
</script>

<div class="flex flex-col justify-center items-center">
	{#if window}
		<button
			onclick={open}
			class="flex flex-col justify-center items-center"
		>
			<img src={icon} alt="desktop icon" width="50" />
			<div class="text-white text-2xl">{window}</div>
		</button>
	{/if}
</div>
