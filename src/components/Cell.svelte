<script lang="ts">
    export let name: string | undefined;
    export let openApplication: (name: string) => void;
</script>

<div class="d-flex align-items-center">
    <button
        on:dblclick={() => {
            if (name) {
                openApplication(name);
            }
        }}
        class="btn flex-fill text-center"
    >
        {#if name}
            <i
                class={`bi bi-${
                    {
                        About: "info-circle-fill",
                        Projects: "folder-fill",
                        Contact: "person-rolodex",
                    }[name]
                } fs-2`}
            />
            <div class="fs-2">{name}</div>
        {/if}
    </button>
</div>
