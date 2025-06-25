<script lang="ts">
        import { onMount } from "svelte";

        import type { Languages } from "../typescript/models";
        import { fetchLanguages, fetchProjects, getLanguageColor } from "../typescript/utilities";

        import ProjectComponent from "./ProjectComponent.svelte";

        let languages: Languages = $state({});
        let summary: boolean = $state(JSON.parse(localStorage.getItem("summary") || "true"));

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

        function getLanguages(): string[] {
                return Object.entries(languages)
                        .sort((a, b) => b[1] - a[1])
                        .map((e) => e[0]);
        }

        function getMaxCount(): number {
                return Math.max(...Object.values(languages));
        }

        function getTotalCount(): number {
                return Object.values(languages).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
        }

        function getProportion(language: string, totalCount: number): number {
                let count = languages[language];
                return (count / totalCount) * 100;
        }

        function getAbsoluteLanguageProportion(language: string): number {
                return getProportion(language, getTotalCount());
        }

        function getRelativeLanguageProportion(language: string): number {
                return getProportion(language, getMaxCount());
        }
</script>

<div class="p-10">
        <div class="flex justify-between">
                <h1>GitHub Breakdown</h1>
                <button
                        onclick={() => {
                                summary = !summary;
                                localStorage.setItem("summary", summary.toString());
                        }}
                        class="border rounded p-1 hover:bg-white hover:text-crust">{summary ? "By Project" : "Summary"}</button
                >
        </div>
        {#if summary}
                <hr class="my-2" />
                <div class="w-full flex gap-3">
                        <div>
                                {#each getLanguages() as language}
                                        <div class="text-right">{language}</div>
                                {/each}
                        </div>
                        <div class="flex-auto">
                                {#each getLanguages() as language}
                                        {#await getLanguageColor(language) then color}
                                                <div class="w-full flex items-center gap-3">
                                                        <div
                                                                class="inline-block h-[12px]"
                                                                style={`background-color: ${color}; width: ${getRelativeLanguageProportion(language)}%`}
                                                        ></div>
                                                        {getAbsoluteLanguageProportion(language).toFixed(2)}%
                                                </div>
                                        {/await}
                                {/each}
                        </div>
                </div>
        {:else}
                {#await fetchProjects() then projects}
                        {#each projects as project}
                                <hr class="my-2" />
                                <ProjectComponent {...project} />
                        {/each}
                {/await}
        {/if}
</div>
