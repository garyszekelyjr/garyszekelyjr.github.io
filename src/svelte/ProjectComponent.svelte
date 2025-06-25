<script lang="ts">
        import { onMount } from "svelte";

        import type { Languages, Project } from "../typescript/models";
        import { fetchLanguages, getLanguageColor } from "../typescript/utilities";

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

<div>
        <div class="flex p-2 border rounded">
                <div class="w-1/4">
                        <a href={html_url} target="_blank" class="link">{name}</a>
                        <p class="text-sm">{description}</p>
                </div>
                <div class="flex-auto flex gap-2">
                        <div class="w-1/4">
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
        </div>
</div>
