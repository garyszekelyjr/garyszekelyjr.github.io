<script lang="ts">
    import { onMount } from "svelte";
    import Tab from "./Tab.svelte";
    import { Sortable } from "@shopify/draggable";

    interface Props {
        tabs: string[];
    }

    let { tabs }: Props = $props();
    let date = $state(new Date());

    setInterval(() => {
        date = new Date();
    }, 1000);

    let container: HTMLElement | undefined = $state();

    onMount(() => {
        if (container) {
            new Sortable(container, { draggable: "span" });
        }
    });
</script>

<div class="navbar bg-body-secondary">
    <div class="container-fluid mx-3">
        <span bind:this={container} class="d-flex align-items-center">
            {#each tabs as tab}
                <Tab {tab} />
            {/each}
        </span>
        <span class="fs-3">{`${date.toLocaleDateString()}`}&nbsp;&nbsp;{`${date.toLocaleTimeString()}`}</span>
    </div>
</div>
