<script lang="ts">
	import type * as Models from "../models";

	import Chart from "chart.js/auto";

	let {
		name,
		description,
		html_url,
		languages_url,
		created_at,
		updated_at,
	}: Models.Project = $props();

	let languages: Record<string, number> = $state({});

	let chart: HTMLCanvasElement | undefined;

	(async () => {
		const response = await fetch(languages_url);
		if (response.ok) {
			languages = await response.json();
			const totalBytes = Object.values(languages).reduce(
				(acc, x) => acc + x,
				0,
			);
			for (const language of Object.keys(languages)) {
				languages[language] =
					(languages[language] / totalBytes) *
					100;
			}

			if (chart) {
				new Chart(chart, {
					type: "pie",
					data: {
						labels: Object.keys(languages),
						datasets: [
							{
								data: Object.values(
									languages,
								),
							},
						],
					},
				});
			}
		}
	})();
</script>

<div class="flex justify-between p-4 text-white">
	<div>
		<a
			href={html_url}
			target="_blank"
			class="text-blue-500 hover:underline">{name}</a
		>
		<div>{description}</div>
		<div>
			Updated: {new Date(updated_at).toLocaleDateString(
				undefined,
				{
					year: "numeric",
					month: "short",
				},
			)}
		</div>
		<div>
			Created: {new Date(created_at).toLocaleDateString(
				undefined,
				{
					year: "numeric",
					month: "short",
				},
			)}
		</div>
	</div>
	<div>
		<canvas bind:this={chart}></canvas>
	</div>
</div>
