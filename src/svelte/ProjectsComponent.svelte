<script lang="ts">
        import { onMount } from "svelte";

        import type { Languages } from "../typescript/models";
        import {
                fetchLanguages,
                fetchProjects,
                getSortedLanguages,
                getAbsoluteLanguageProportion,
                getRelativeLanguageProportion,
                getLanguageColor,
        } from "../typescript/utilities";

        import ProjectComponent from "./ProjectComponent.svelte";

        let languages: Languages = $state({});
        let summary: boolean = $state(JSON.parse(localStorage.getItem("summary") || "false"));

        onMount(async () => {
                const PROJECTS = await fetchProjects();
                for (const PROJECT of PROJECTS) {
                        const LANGUAGES = await fetchLanguages(PROJECT.languages_url);
                        for (const [LANGUAGE, COUNT] of Object.entries(LANGUAGES)) {
                                if (!(LANGUAGE in languages)) {
                                        languages[LANGUAGE] = 0;
                                }
                                languages[LANGUAGE] += COUNT;
                        }
                }
        });
</script>

<div class="p-10">
        <div class="flex justify-between items-center">
                <h1>Projects</h1>
                <div>
                        <button
                                onclick={() => {
                                        summary = true;
                                        localStorage.setItem("summary", summary.toString());
                                }}
                                class={`border rounded p-2 ${summary ? "bg-white text-crust" : null}`}>Summary</button
                        >
                        <button
                                onclick={() => {
                                        summary = false;
                                        localStorage.setItem("summary", summary.toString());
                                }}
                                class={`border rounded p-2 ${summary ? null : "bg-white text-crust"}`}>By Project</button
                        >
                </div>
        </div>
        <hr class="mt-2 mb-4" />
        {#if summary}
                <div class="flex gap-4">
                        <div>
                                {#each getSortedLanguages(languages) as language}
                                        <div class="text-left">{language}</div>
                                {/each}
                        </div>
                        <div class="flex-auto">
                                {#each getSortedLanguages(languages) as language}
                                        {#await getLanguageColor(language) then color}
                                                <div class="flex items-center gap-2">
                                                        <div
                                                                class="inline-block h-[12px]"
                                                                style={`background-color: ${color}; width: ${getRelativeLanguageProportion(languages, language)}%`}
                                                        ></div>
                                                        {getAbsoluteLanguageProportion(languages, language).toFixed(2)}%
                                                </div>
                                        {/await}
                                {/each}
                        </div>
                </div>
        {:else}
                {#await fetchProjects() then projects}
                        <div class="flex flex-col justify-center gap-4">
                                {#each projects as project}
                                        <ProjectComponent {...project} />
                                {/each}
                        </div>
                {/await}
        {/if}
</div>
