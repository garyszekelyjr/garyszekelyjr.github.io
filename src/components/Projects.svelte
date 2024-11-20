<script lang="ts">
    import type * as Models from "../models";
    
    import Project from "./Project.svelte";

    interface Props {
        projects: Models.Project[] | undefined;
    }

    let { projects }: Props = $props();
</script>

{#if projects}
    {#each projects as project}
        <Project {...project} />
    {/each}
{:else}
    <div class="">
        <div class=""></div>
    </div>
{/if}
