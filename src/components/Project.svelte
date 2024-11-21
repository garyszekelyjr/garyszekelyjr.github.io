<script lang="ts">
    interface Props {
        name: string;
        description: string;
        stack: string;
        link: string;
    }

    let { name, description, stack, link }: Props = $props();

    let badges = stack.split(", ");
</script>

<div class="mx-2 my-3">
    <a href={link} target="_blank" class="text-white hover:underline">{name}</a>
    <div class="text-white mb-2">{description}</div>
    {#each badges as badge}
        <span class="mr-1 border rounded p-1 text-white">{badge}</span>
    {/each}
</div>