<script lang="ts">
    import type * as Models from "../models";

    import Education from "./Education.svelte";
    import Experience from "./Experience.svelte";
    import Loader from "./Loader.svelte";

    interface Props {
        about: Models.About | undefined;
        experiences: Models.Experience[] | undefined;
        educations: Models.Education[] | undefined;
    }

    let { about, experiences, educations }: Props = $props();
</script>

<div class="">
    <div class="mx-1 my-3">
        {#if about}
            <div class="text-white">{about.profile}</div>
        {:else}
            <Loader />
        {/if}
    </div>
    <hr />
    <div class="mx-1 my-3">
        <div class="text-white text-2xl">Experience</div>
        {#if experiences}
            {#each experiences as experience}
                <Experience {...experience} />
            {/each}
        {:else}
            <Loader />
        {/if}
    </div>
    <hr />
    <div class="mx-1 my-3">
        <div class="text-white text-2xl">Education</div>
        {#if educations}
            {#each educations as education}
                <Education {...education} />
            {/each}
        {:else}
            <Loader />
        {/if}
    </div>
</div>
