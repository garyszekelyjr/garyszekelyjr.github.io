<script lang="ts">
    import type * as Models from "./models";

    import About from "./components/About.svelte";
    import Background from "./components/Background.svelte";
    import Cell from "./components/Cell.svelte";
    import Projects from "./components/Projects.svelte";
    import Taskbar from "./components/Taskbar.svelte";
    import Window from "./components/Window.svelte";

    let cells = [
        { window: "About", icon: "user.svg", index: 0 },
        { window: "Projects", icon: "folder.svg", index: 10 },
    ];

    let windows: string[] = $state([]);
    let about: Models.About | undefined = $state();
    let experiences: Models.Experience[] | undefined = $state();
    let educations: Models.Education[] | undefined = $state();
    let projects: Models.Project[] | undefined = $state();

    function open(window: string | undefined) {
        if (window && !windows.includes(window)) {
            windows = [...windows, window];
        }
    }

    function close(window: string) {
        windows = windows.filter((_window) => _window !== window);
    }

    (async () => {
        const response = await fetch(`${import.meta.env.VITE_URL}?` + new URLSearchParams({ sheet: "About" }));
        if (response.ok) {
            about = (await response.json()).shift();
        }
    })();

    (async () => {
        const response = await fetch(`${import.meta.env.VITE_URL}?` + new URLSearchParams({ sheet: "Experience" }));
        if (response.ok) {
            experiences = await response.json();
            if (experiences) {
                experiences = experiences.sort((a: Models.Experience, b: Models.Experience) => new Date(b.start).getTime() - new Date(a.start).getTime());
            }
        }
    })();

    (async () => {
        const response = await fetch(`${import.meta.env.VITE_URL}?` + new URLSearchParams({ sheet: "Education" }));
        if (response.ok) {
            educations = await response.json();
            if (educations) {
                educations = educations.sort((a: Models.Education, b: Models.Education) => new Date(b.start).getTime() - new Date(a.start).getTime());
            }
        }
    })();

    (async () => {
        const response = await fetch(`${import.meta.env.VITE_URL}?` + new URLSearchParams({ sheet: "Project" }));
        if (response.ok) {
            projects = await response.json();
            if (projects) {
                projects = projects.sort((a: Models.Project, b: Models.Project) => a.name.localeCompare(b.name));
            }
        }
    })();
</script>

<main class="flex flex-col">
    <div class="relative flex-auto desktop">
        <Background />
        <div class="absolute w-full h-full grid auto-rows-fr grid-cols-5 lg:grid-cols-10 p-5">
            {#each Array.from({ length: 48 }) as _, i}
                {@const cell = cells.find((cell) => cell.index === i)}
                <Cell window={cell?.window} icon={cell?.icon} open={() => open(cell?.window)} />
            {/each}
        </div>
        {#each windows as window}
            <Window {window} close={() => close(window)}>
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
