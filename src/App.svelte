<script lang="ts">
    import type * as Models from "./models";

    import About from "./components/About.svelte";
    import Background from "./components/Background.svelte";
    import Cell from "./components/Cell.svelte";
    import Projects from "./components/Projects.svelte";
    import Taskbar from "./components/Taskbar.svelte";
    import Window from "./components/Window.svelte";

    let cells = [
        { window: "About", index: 0 },
        { window: "Projects", index: 10 },
    ];

    let windows: string[] = $state([]);
    let about: Models.About | undefined = $state();
    let experiences: Models.Experience[] | undefined = $state();
    let educations: Models.Education[] | undefined = $state();
    let projects: Models.Project[] | undefined = $state();

    function openWindow(window: string | undefined) {
        if (window && !windows.includes(window)) {
            windows = [...windows, window];
        }
    }

    function closeWindow(window: string) {
        windows = windows.filter((_window) => _window !== window);
    }

    (async () => {
        const aboutresponse = await fetch(`${import.meta.env.VITE_URL}?` + new URLSearchParams({ sheet: "About" }));
        if (aboutresponse.ok) {
            about = (await aboutresponse.json()).shift();
        }

        const experienceResponse = await fetch(`${import.meta.env.VITE_URL}?` + new URLSearchParams({ sheet: "Experience" }));
        if (experienceResponse.ok) {
            experiences = await experienceResponse.json();
            if (experiences) {
                experiences = experiences.sort((a: Models.Experience, b: Models.Experience) => new Date(b.start).getTime() - new Date(a.start).getTime());
            }
        }

        const educationResponse = await fetch(`${import.meta.env.VITE_URL}?` + new URLSearchParams({ sheet: "Education" }));
        if (educationResponse.ok) {
            educations = await educationResponse.json();
            if (educations) {
                educations = educations.sort((a: Models.Education, b: Models.Education) => new Date(b.start).getTime() - new Date(a.start).getTime());
            }
        }

        const projectResponse = await fetch(`${import.meta.env.VITE_URL}?` + new URLSearchParams({ sheet: "Project" }));
        if (projectResponse.ok) {
            projects = await projectResponse.json();
            if (projects) {
                projects = projects.sort((a: Models.Project, b: Models.Project) => a.name.localeCompare(b.name));
            }
        }
    })();
</script>

<main class="flex flex-col">
    <div class="relative flex-auto desktop">
        <Background />
        <div class="absolute w-full h-full grid auto-rows-fr grid-cols-10">
            {#each Array.from({ length: 48 }) as _, i}
                {@const cell = cells.find((cell) => cell.index === i)}
                <Cell window={cell?.window} open={() => openWindow(cell?.window)} />
            {/each}
        </div>
        {#each windows as window}
            <Window {window} close={() => closeWindow(window)}>
                {#if window === "About"}
                    <About {about} {experiences} {educations} />
                {/if}
                {#if window === "Projects"}
                    <Projects {projects} />
                {/if}
            </Window>
        {/each}
    </div>
    <Taskbar />
</main>
