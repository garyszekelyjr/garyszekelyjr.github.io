<script lang="ts">
    import { gsap } from "gsap";
    import { Draggable } from "gsap/Draggable";
    import { onMount } from "svelte";

    interface Props {
        window: string;
        close: () => void;
        children?: import("svelte").Snippet;
    }

    let { window, close, children }: Props = $props();

    let fullscreen = $state(false);

    gsap.registerPlugin(Draggable);

    $effect(() => {
        if (!fullscreen) {
            Draggable.create(".window", { bounds: ".desktop" });
        }
    });
</script>

{#key fullscreen}
    <div class={"window flex flex-col border bg-white absolute " + (fullscreen ? "top-0 bottom-0 left-0 right-0" : "top-1/4 bottom-1/4 left-1/4 right-1/4")}>
        <div class="flex justify-between p-1">
            <span class="text-3xl">{window}</span>
            <div class="flex">
                <button
                    aria-label="expand"
                    onclick={() => {
                        fullscreen = !fullscreen;
                    }}
                    class="mr-3"
                >
                    <img src={fullscreen ? "/minimize.svg" : "/expand.svg"} alt="expand" width="25" height="25" />
                </button>
                <button aria-label="close" onclick={close}>
                    <img src="/x.svg" alt="close" width="25" height="25" />
                </button>
            </div>
        </div>
        <div class="flex-auto overflow-auto p-1" onpointerdown={(event) => event.stopPropagation()}>
            {@render children?.()}
        </div>
    </div>
{/key}
