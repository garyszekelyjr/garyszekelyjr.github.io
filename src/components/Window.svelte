<script lang="ts">
    import { gsap } from "gsap";
    import { Draggable } from "gsap/Draggable";

    interface Props {
        window: string;
        close: () => void;
        children?: import("svelte").Snippet;
    }

    let { window, close, children }: Props = $props();

    let fullscreen = $state(false);

    const expand = () => {
        fullscreen = !fullscreen;
    };

    gsap.registerPlugin(Draggable);

    $effect(() => {
        if (!fullscreen) {
            Draggable.create(".window", { bounds: ".desktop" });
        }
    });
</script>

{#key fullscreen}
    <div class={`window flex flex-col bg-neutral-900 absolute top-0 bottom-0 left-0 right-0 md:lg:xl:top-${fullscreen ? "0" : "1/4"} md:lg:xl:bottom-${fullscreen ? "0" : "1/4"} md:lg:xl:left-${fullscreen ? "0" : "1/4"} md:lg:xl:right-${fullscreen ? "0" : "1/4"}`}>
        <div class="flex justify-between border-b p-3">
            <span class="text-white text-4xl">{window}</span>
            <div class="flex">
                <button aria-label="expand" onclick={expand} class="mr-1 hidden md:lg:xl:block">
                    <img src={fullscreen ? "/arrows-pointing-in.svg" : "/arrows-pointing-out.svg"} alt="expand" width="25" />
                </button>
                <button aria-label="close" onclick={close}>
                    <img src="./x.svg" alt="close" width="25" />
                </button>
            </div>
        </div>
        <div class="flex-auto overflow-auto px-3" onpointerdown={(event) => event.stopPropagation()}>
            {@render children?.()}
        </div>
    </div>
{/key}
