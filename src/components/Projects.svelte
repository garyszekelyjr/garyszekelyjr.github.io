<script lang="ts">
    import type * as Models from "../models";

    import Loader from "./Loader.svelte";
    import Project from "./Project.svelte";

    let projects: Models.Project[] = $state();

    (async () => {
    	const response = await fetch("https://api.github.com/users/garyszekelyjr/repos");
	    projects = await response.json();
    })();
</script>

{#if projects}
    {#each projects as project, index}
        <Project {...project} />
        {#if index < projects.length - 1}
            <hr />
        {/if}
    {/each}
{:else}
    <Loader />
{/if}
