<script lang="ts">
    import { gsap } from "gsap";
    import { Draggable } from "gsap/Draggable";
    import { onMount } from "svelte";

    interface Props {
        window: string;
        closeApplication: (window: string) => void;
        children?: import("svelte").Snippet;
    }

    let { window, closeApplication, children }: Props = $props();

    let fullscreen = $state(false);

    gsap.registerPlugin(Draggable);

    onMount(() => {
        Draggable.create(".window", { bounds: ".desktop" });
    });
</script>

<div class={`card ${fullscreen ? "w-100 h-100" : "w-50 h-75"} position-absolute window`}>
    <div class="card-header d-flex justify-content-between align-items-center">
        <span class="display-6">{window}</span>
        <div>
            <button aria-label="minimize" class="btn btn-success">
                <i class="bi bi-dash"></i>
            </button>
            <button
                aria-label="fullscreen"
                onclick={() => {
                    fullscreen = !fullscreen;
                }}
                class="btn btn-warning"
            >
                <i class={`bi bi-${fullscreen ? "fullscreen-exit" : "fullscreen"}`}></i>
            </button>
            <button
                aria-label="close"
                onclick={() => {
                    closeApplication(window);
                }}
                class="btn btn-danger"
            >
                <i class="bi bi-x"></i>
            </button>
        </div>
    </div>
    <div class="card-body overflow-auto" onpointerdown={(event) => event.stopPropagation()}>
        {@render children?.()}
    </div>
</div>
