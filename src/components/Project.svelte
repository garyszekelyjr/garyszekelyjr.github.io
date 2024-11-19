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

<div class="card m-3">
    <div class="card-body">
        <h4 class="card-title">
            <a href={link} target="_blank">{name}</a>
        </h4>
        <p class="card-text">{description}</p>
    </div>
    <div class="card-footer">
        {#each badges as badge}
            <span class="badge bg-primary me-1">{badge}</span>
        {/each}
    </div>
</div>
