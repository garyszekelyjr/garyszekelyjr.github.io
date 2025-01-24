<script lang="ts">
	export let component: string;

	const tabs = ["Home", "Projects"];
	const socials = [
		{
			href: "https://linkedin.com/in/garyszekelyjr",
			src: "linkedin.svg",
			alt: "LinkedIn",
		},
		{
			href: "https://github.com/garyszekelyjr",
			src: "github.svg",
			alt: "GitHub",
		},
	];
</script>

<nav class="flex p-8">
	<div class="flex-auto">
		{#each tabs as tab}
			<button
				class={`link ${component === tab ? "selected" : null} px-1`}
				on:click={() => {
					component = tab;
				}}>{tab}</button
			>
		{/each}
	</div>
	<div class="flex">
		{#each socials as { href, src, alt }}
			<a {href} target="_blank" class="px-1">
				<img {src} {alt} width="25" height="25" />
			</a>
		{/each}
	</div>
</nav>
