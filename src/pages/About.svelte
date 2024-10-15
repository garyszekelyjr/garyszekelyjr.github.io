<script lang="ts">
    import { type About, type Experience, type Education } from "../models";
    import { default as ExperienceComponent } from "../components/Experience.svelte";
    import { default as EducationComponent } from "../components/Education.svelte";

    export let about: About;
    export let experiences: Experience[];
    export let educations: Education[];
</script>

<div>
    <div class="card m-3">
        <div class="card-body">
            {#if about}
                <div class="fs-1">{about.profile}</div>
            {:else}
                <div class="d-flex justify-content-center align-items-center">
                    <div class="spinner-border" />
                </div>
            {/if}
        </div>
    </div>
    <div class="card m-3">
        <div class="card-header">
            <div class="fs-3">Experience</div>
        </div>
        <div class="card-body">
            {#if experiences}
                {#each experiences as experience}
                    <ExperienceComponent {...experience} />
                {/each}
            {:else}
                <div class="d-flex justify-content-center align-items-center">
                    <div class="spinner-border" />
                </div>
            {/if}
        </div>
    </div>
    <div class="card m-3">
        <div class="card-header">
            <div class="fs-3">Education</div>
        </div>
        <div class="card-body">
            {#if educations}
                {#each educations as education}
                    <EducationComponent {...education} />
                {/each}
            {:else}
                <div class="d-flex justify-content-center align-items-center">
                    <div class="spinner-border" />
                </div>
            {/if}
        </div>
    </div>
</div>
