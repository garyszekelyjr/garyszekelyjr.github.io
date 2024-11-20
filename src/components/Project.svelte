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

<div class="">
    <div class="">
        <h4 class="">
            <a href={link} target="_blank">{name}</a>
        </h4>
        <p class="">{description}</p>
    </div>
    <div class="">
        {#each badges as badge}
            <span class="mr-1">{badge}</span>
        {/each}
    </div>
</div>
