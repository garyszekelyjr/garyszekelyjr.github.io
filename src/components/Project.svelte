<script lang="ts">
    export let name: string;
    export let description: string;
    export let stack: string;
    export let link: string;

    let badges = stack.split(', ');
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