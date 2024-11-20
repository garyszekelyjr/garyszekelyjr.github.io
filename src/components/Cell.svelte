<script lang="ts">
    interface Props {
        window: string | undefined;
        open: () => void;
    }

    let { window, open }: Props = $props();
</script>

<div class="">
    {#if window}
        <button ondblclick={open} class="">
            <div class="">{window}</div>
        </button>
    {/if}
</div>
