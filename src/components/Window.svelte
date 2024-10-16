<script lang="ts">
    export let window: string;
    export let closeApplication: (window: string) => void;

    let fullscreen = false;
</script>

<div class={`card ${fullscreen ? "w-100 h-100" : "w-50 h-75"} position-absolute`}>
    <div class="card-header d-flex justify-content-between align-items-center">
        <span class="display-6">{window}</span>
        <div>
            <button class="btn btn-success">
                <i class="bi bi-dash" />
            </button>
            <button
                on:click={(event) => {
                    fullscreen = !fullscreen;
                }}
                class="btn btn-warning"
            >
                <i class={`bi bi-${fullscreen ? "fullscreen-exit" : "fullscreen"}`} />
            </button>
            <button
                on:click={() => {
                    closeApplication(window);
                }}
                class="btn btn-danger"
            >
                <i class="bi bi-x" />
            </button>
        </div>
    </div>
    <div class="card-body overflow-auto" on:pointerdown={(event) => event.stopPropagation()}>
        <slot />
    </div>
</div>
