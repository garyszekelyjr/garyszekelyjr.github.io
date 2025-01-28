<script lang="ts">
	import Home from "./components/Home.svelte";
	import Navbar from "./components/Navbar.svelte";
	import Projects from "./components/Projects.svelte";

	let component = "Home";
</script>

<Navbar bind:component />
<div class="px-10">
	<svelte:component this={{ Home, Projects }[component]} />
</div>
