<script lang="ts">
	const TABS = ["Home", "Projects"];
	const SOCIALS = [
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

<nav class="flex p-10 sticky top-0 bg-mantle">
	<div class="flex-auto">
		{#each TABS as tab}
			<a href={`#/${tab.toLowerCase()}`} class="link pe-2"
				>{tab}</a
			>
		{/each}
	</div>
	<div class="flex">
		{#each SOCIALS as { href, src, alt }}
			<a {href} target="_blank" class="ps-2">
				<img {src} {alt} width="25" height="25" />
			</a>
		{/each}
	</div>
</nav>
