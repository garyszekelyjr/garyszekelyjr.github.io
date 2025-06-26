<script lang="ts">
        import { onMount } from "svelte";

        import type { Languages, Project } from "../typescript/models";
        import {
                fetchLanguages,
                getSortedLanguages,
                getAbsoluteLanguageProportion,
                getRelativeLanguageProportion,
                getLanguageColor,
        } from "../typescript/utilities";

        let { name, description, html_url, languages_url }: Project = $props();

        let languages: Languages = $state({});

        onMount(async () => {
                const LANGUAGES = await fetchLanguages(languages_url);
                for (const [LANGUAGE, COUNT] of Object.entries(LANGUAGES)) {
                        if (!(LANGUAGE in languages)) {
                                languages[LANGUAGE] = 0;
                        }
                        languages[LANGUAGE] += COUNT;
                }
        });
</script>

<div>
        <div class="flex flex-col xl:flex-row gap-2 p-2 border rounded">
                <div class="xl:w-1/4">
                        <a href={html_url} target="_blank" class="link">{name}</a>
                        <p class="text-sm text-muted">{description}</p>
                </div>
                <div class="flex-auto flex gap-2">
                        <div class="w-5/12 md:w-1/6">
                                {#each getSortedLanguages(languages) as language}
                                        <div class="text-right">{language}</div>
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
        </div>
</div>
