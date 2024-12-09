<script lang="ts">
    interface Props {
        name: string;
        description: string;
        html_url: string;
	languages_url: string;
    }

    let { name, description, html_url, languages_url }: Props = $props();

    let languages: string[] = $state([]);

    (async () => {
	    const response = await fetch(languages_url);
	    languages = Object.keys(await response.json());
    })();

</script>

<div class="mx-2 my-3">
    <a href={html_url} target="_blank" class="text-white hover:underline">{name}</a>
    <div class="text-white mb-2">{description}</div>
    {#each languages as language}
        <span class="mr-1 border rounded p-1 text-white">{language}</span>
    {/each}
</div>
