<script lang="ts">
    interface Props {
        name: string | undefined;
        openApplication: (name: string) => void;
    }

    let { name, openApplication }: Props = $props();
</script>

<div class="d-flex align-items-center">
    <button
        ondblclick={() => {
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
                    }[name]
                } fs-2`}
></i>
            <div class="fs-2">{name}</div>
        {/if}
    </button>
</div>
