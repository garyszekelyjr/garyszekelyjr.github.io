<script lang="ts">
    interface Props {
        window: string | undefined;
        icon: string | undefined;
        open: () => void;
    }

    let { window, icon, open }: Props = $props();
</script>

<div class="flex flex-col justify-center items-center">
    {#if window}
        <button ondblclick={open} class="">
            <img src={icon} alt={window} width="50" height="50" />
            <p>{window}</p>
        </button>
    {/if}
</div>
