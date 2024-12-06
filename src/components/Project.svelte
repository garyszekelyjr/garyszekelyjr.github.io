<script lang="ts">
    interface Props {
        name: string;
        description: string;
        repo: string;
    }

    let { name, description, repo }: Props = $props();

    let languages: string[] = $state([]);

    (async () => {
	    let response = await fetch(`https://api.github.com/repos/${repo}/languages`);
	    let data = await response.json();
	    languages = Object.keys(data);
    })();

</script>

<div class="mx-2 my-3">
    <a href={`https://www.github.com/${repo}`} target="_blank" class="text-white hover:underline">{name}</a>
    <div class="text-white mb-2">{description}</div>
    {#each languages as language}
        <span class="mr-1 border rounded p-1 text-white">{language}</span>
    {/each}
</div>
