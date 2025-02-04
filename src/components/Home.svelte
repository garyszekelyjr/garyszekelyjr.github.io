<script lang="ts">
	const ROLES = ["Data Engineer", "Software Developer"];

	let role = $state(ROLES[0]);

	setInterval(() => {
		let index = ROLES.indexOf(role);
		role = ROLES[(index + 1) % ROLES.length];
	}, 2000);
</script>

<div class="p-10" id="/home">
	<div class="text-4xl">Gary Szekely Jr.</div>
	<div class="text-2xl">{role}</div>
</div>
