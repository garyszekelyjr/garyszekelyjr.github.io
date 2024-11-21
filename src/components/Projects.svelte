<script lang="ts">
    import type * as Models from "../models";

    import Loader from "./Loader.svelte";
    import Project from "./Project.svelte";

    interface Props {
        projects: Models.Project[] | undefined;
    }

    let { projects }: Props = $props();
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
