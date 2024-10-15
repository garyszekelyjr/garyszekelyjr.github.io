<script async lang="ts">
    import { type About, type Experience, type Education, type Project } from "./models";

    import { default as AboutPage } from "./pages/About.svelte";
    import Projects from "./pages/Projects.svelte";
    import Contact from "./pages/Contact.svelte";

    import Background from "./components/Background.svelte";
    import Cell from "./components/Cell.svelte";
    import Window from "./components/Window.svelte";
    import Taskbar from "./components/Taskbar.svelte";

    let icons = [
        { name: "About", cell: 0 },
        { name: "Projects", cell: 10 },
        { name: "Contact", cell: 20 },
    ];

    let windows: string[] = [];
    let tabs: string[] = [];
    let about: About;
    let experiences: Experience[];
    let educations: Education[];
    let projects: Project[];

    function openApplication(name: string) {
        if (!windows.includes(name)) {
            windows = [...windows, name];
            tabs = [...tabs, name];
        }
    }

    function closeApplication(name: string) {
        windows = windows.filter((window) => window !== name);
        tabs = tabs.filter((tab) => tab !== name);
    }

    (async () => {
        const response = await fetch(`${import.meta.env.VITE_DATABASE}?` + new URLSearchParams({ sheet: "About" }));
        if (response.ok) {
            about = (await response.json()).shift();
        }
    })();
    (async () => {
        const response = await fetch(`${import.meta.env.VITE_DATABASE}?` + new URLSearchParams({ sheet: "Experience" }));
        if (response.ok) {
            experiences = await response.json()
            experiences = experiences.sort((a: Experience, b: Experience) => new Date(b.start).getTime() - new Date(a.start).getTime());
        }
    })();
    (async () => {
        const response = await fetch(`${import.meta.env.VITE_DATABASE}?` + new URLSearchParams({ sheet: "Education" }));
        if (response.ok) {
            educations = await response.json()
            educations = educations.sort((a: Education, b: Education) => new Date(b.start).getTime() - new Date(a.start).getTime());
        }
    })();
    (async () => {
        const response = await fetch(`${import.meta.env.VITE_DATABASE}?` + new URLSearchParams({ sheet: "Project" }));
        if (response.ok) {
            projects = await response.json();
            projects = projects.sort((a: Project, b: Project) => a.name.localeCompare(b.name));
        }
    })();
</script>

<main>
    <div class="flex-fill position-relative d-flex justify-content-center align-items-center">
        <Background />
        <div class="position-absolute w-100 h-100 grid p-3">
            {#each Array.from({ length: 48 }) as _, i}
                {#if icons.find((icon) => icon.cell === i)}
                    <Cell name={icons.find((icon) => icon.cell === i)?.name} {openApplication} />
                {:else}
                    <div></div>
                {/if}
            {/each}
        </div>
        {#each windows as window}
            <Window {window} {closeApplication}>
                {#if window === "About"}
                    <AboutPage {about} {experiences} {educations} />
                {/if}
                {#if window === "Projects"}
                    <Projects {projects} />
                {/if}
                {#if window === "Contact"}
                    <Contact />
                {/if}
            </Window>
        {/each}
    </div>
    <Taskbar {tabs} />
</main>

<style>
    .grid {
        grid-auto-rows: 1fr;
        grid-template-columns: repeat(10, 1fr);
    }
</style>
