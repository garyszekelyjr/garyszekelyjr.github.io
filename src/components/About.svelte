<script lang="ts">
    import type * as Models from "../models";
    
    import Experience from "./Experience.svelte";
    import Education from "./Education.svelte";

    interface Props {
        about: Models.About | undefined;
        experiences: Models.Experience[] | undefined;
        educations: Models.Education[] | undefined;
    }

    let { about, experiences, educations }: Props = $props();
</script>

<div>
    <div class="">
        <div class="">
            {#if about}
                <div class="">{about.profile}</div>
            {:else}
                <div class="">
                    <div class=""></div>
                </div>
            {/if}
        </div>
    </div>
    <div class="">
        <div class="">
            <div class="">Experience</div>
        </div>
        <div class="">
            {#if experiences}
                {#each experiences as experience}
                    <Experience {...experience} />
                {/each}
            {:else}
                <div class="">
                    <div class=""></div>
                </div>
            {/if}
        </div>
    </div>
    <div class="">
        <div class="">
            <div class="">Education</div>
        </div>
        <div class="">
            {#if educations}
                {#each educations as education}
                    <Education {...education} />
                {/each}
            {:else}
                <div class="">
                    <div class=""></div>
                </div>
            {/if}
        </div>
    </div>
</div>
