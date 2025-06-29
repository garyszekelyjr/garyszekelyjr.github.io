<script lang="ts">
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

<nav class="flex p-4 sticky top-0 bg-mantle">
        <div class="flex-auto">The Gary Szekely Jr. Website</div>
        <div class="flex">
                {#each SOCIALS as { href, src, alt }}
                        <a {href} target="_blank" class="ps-2">
                                <img {src} {alt} width="25" height="25" />
                        </a>
                {/each}
        </div>
</nav>
