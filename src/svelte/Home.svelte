<script lang="ts">
        import { onMount } from "svelte";

        import type { Languages } from "../typescript/models";
        import { fetchLanguages, fetchProjects, getLanguageColor } from "../typescript/utilities";

        let languages: Languages = $state({});
        let totalCount = 0;

        onMount(async () => {
                const PROJECTS = await fetchProjects();
                for (const PROJECT of PROJECTS) {
                        const LANGUAGES = await fetchLanguages(PROJECT.languages_url);
                        for (const [LANGUAGE, COUNT] of Object.entries(LANGUAGES)) {
                                if (!(LANGUAGE in languages)) {
                                        languages[LANGUAGE] = 0;
                                }
                                languages[LANGUAGE] += COUNT;
                                totalCount += COUNT;
                        }
                }
        });

        function calculateLanguageProportion(language: string): number {
                let count = languages[language];
                let proportion = (count / totalCount) * 100;
                return proportion;
        }
</script>

<div class="p-10">
        <h1>GitHub Breakdown</h1>
        <hr class="mt-1 mb-2" />
        <div class="w-full flex gap-10">
                <div>
                        {#each Object.entries(languages).sort((a, b) => b[1] - a[1]) as [language, _]}
                                <div>{language}</div>
                        {/each}
                </div>
                <div class="flex-auto">
                        {#each Object.entries(languages).sort((a, b) => b[1] - a[1]) as [language, _]}
                                {#await getLanguageColor(language) then color}
                                        <div class="w-full flex items-center gap-5">
                                                <div
                                                        class="inline-block h-[12px]"
                                                        style={`background-color: ${color}; width: ${calculateLanguageProportion(language)}%;`}
                                                ></div>
                                                {calculateLanguageProportion(language).toFixed(2)}%
                                        </div>
                                {/await}
                        {/each}
                </div>
        </div>
</div>
