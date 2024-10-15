<script lang="ts">
    import { type Project } from "../models";
    import { default as ProjectComponent } from "../components/Project.svelte";

    export let projects: Project[];
</script>

{#if projects}
    {#each projects as project}
        <ProjectComponent {...project} />
    {/each}
{:else}
    <div class="h-100 d-flex justify-content-center align-items-center">
        <div class="spinner-border" />
    </div>
{/if}
