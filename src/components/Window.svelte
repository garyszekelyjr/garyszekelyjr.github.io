<script lang="ts">
	import { gsap } from "gsap";
	import { Draggable } from "gsap/Draggable";

	let {
		window,
		close,
		children,
	}: {
		window: string;
		close: () => void;
		children?: import("svelte").Snippet;
	} = $props();

	let fullscreen = $state(screen.width < 768);

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
	<div
		class={`window flex flex-col bg-neutral-900 absolute ${fullscreen ? "inset-0" : "inset-1/4"}`}
	>
		<div class="flex justify-between border-b p-2">
			<span class="text-white text-4xl">{window}</span>
			<div class="flex">
				<button
					aria-label="expand"
					onclick={expand}
					class="hidden md:block"
				>
					<img
						src={fullscreen
							? "/arrows-pointing-in.svg"
							: "/arrows-pointing-out.svg"}
						alt="expand"
						width="25"
					/>
				</button>
				<button aria-label="close" onclick={close}>
					<img
						src="./x.svg"
						alt="close"
						width="25"
					/>
				</button>
			</div>
		</div>
		<div class="flex-auto overflow-auto">
			{@render children?.()}
		</div>
	</div>
{/key}
