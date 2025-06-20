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
                let proportion = ((count / totalCount) * 100).toFixed(2);
                return Number(proportion);
        }
</script>

<div class="p-10">
        <h1>GitHub Breakdown</h1>
        <div class="w-full">
                {#each Object.entries(languages).sort((a, b) => b[1] - a[1]) as [language, _]}
                        {#await getLanguageColor(language) then color}
                                <div class="w-full">
                                        <div
                                                class="inline-block h-[10px] mr-1"
                                                style={`background-color: ${color}; width: ${calculateLanguageProportion(language) * 2}%;`}
                                        ></div>
                                        {language}
                                        {calculateLanguageProportion(language)}%
                                </div>
                        {/await}
                {/each}
        </div>
</div>
