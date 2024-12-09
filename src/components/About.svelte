<script lang="ts">
    import type * as Models from "../models";

    import Education from "./Education.svelte";
    import Experience from "./Experience.svelte";
    import Loader from "./Loader.svelte";

    let about: string = $state();
    let experiences: Models.Experience[] = $state();
    let educations: Models.Education[] = $state();

    (async () => {
    	const response = await fetch("https://api.github.com/repos/garyszekelyjr/garyszekelyjr.github.io/contents/data.json");
	if (response.ok) {
	    const download_url = (await response.json()).download_url;
	    const data = await (await fetch(download_url)).json();
	    about = data.about;
	    experiences = data.experiences;
	    educations = data.educations;
	}
    })();

</script>

<div class="">
    <div class="mx-1 my-3">
        {#if about}
            <div class="text-white">{about}</div>
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
