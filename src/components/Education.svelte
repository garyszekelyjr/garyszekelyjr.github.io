<script lang="ts">
	interface Props {
		degree: string;
		major: string;
		concentration: string;
		school: string;
		dates: string;
	}

	let { degree, major, concentration, school, dates }: Props = $props();
</script>

<div class="mx-1 my-3">
	<div class="text-white">{degree}, {major}</div>
	<div class="text-white">{concentration}</div>
	<div class="text-white">{school}</div>
	<div class="text-white">{dates}</div>
</div>
