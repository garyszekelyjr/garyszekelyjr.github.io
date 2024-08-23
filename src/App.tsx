import { useCallback, useEffect, useRef, useState } from "react";

import { DndContext, DragEndEvent, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import { About, Experience, Education, Project } from './models';

import BackgroundComponent from "./components/Background.component";
import CellComponent from "./components/Cell.component";
import IconComponent from "./components/Icon.component";
import TaskbarComponent from './components/Taskbar.component';
import WindowComponent from "./components/Window.component";

import AboutPage from "./pages/About.page";
import ProjectsPage from "./pages/Projects.page";
import ContactPage from "./pages/Contact.page";

function App() {
    const [windows, setWindows] = useState<string[]>([]);
    const [tabs, setTabs] = useState<string[]>([]);
    const [icons, setIcons] = useState<{ name: string, cell: number }[]>([
        { name: 'About', cell: 0 },
        { name: 'Projects', cell: 8 },
        { name: 'Contact', cell: 16 }
    ]);
    const [about, setAbout] = useState<About>();
    const [experiences, setExperiences] = useState<Experience[]>();
    const [educations, setEducations] = useState<Education[]>();
    const [projects, setProjects] = useState<Project[]>();

    const constraints = useRef<HTMLDivElement | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const openApplication = useCallback((name: string) => {
        setWindows((windows) => [...windows, name]);
        setTabs((tabs) => [...tabs, name]);
    }, []);

    const closeApplication = useCallback((name: string) => {
        setWindows((windows) => windows.filter((window) => window !== name));
        setTabs((tabs) => tabs.filter((tab) => tab !== name));
    }, []);

    const onDragEnd = useCallback(({ active, over }: DragEndEvent) => {
        if (over) {
            const other = icons.filter(({ name }) => name !== active.id)
            if (!other.some(({ cell }) => cell === over.id)) {
                setIcons([...other, { name: active.id as string, cell: over.id as number }]);
            }
        }
    }, [icons]);

    useEffect(() => {
        (async () => {
            const response = await fetch(`${import.meta.env.VITE_DATABASE}?` + new URLSearchParams({ sheet: 'About' }));
            if (response.ok) {
                setAbout((await response.json()).shift());
            }
        })();
        (async () => {
            const response = await fetch(`${import.meta.env.VITE_DATABASE}?` + new URLSearchParams({ sheet: 'Experience' }));
            if (response.ok) {
                setExperiences(await response.json());
            }
        })();
        (async () => {
            const response = await fetch(`${import.meta.env.VITE_DATABASE}?` + new URLSearchParams({ sheet: 'Education' }));
            if (response.ok) {
                setEducations(await response.json());
            }
        })();
        (async () => {
            const response = await fetch(`${import.meta.env.VITE_DATABASE}?` + new URLSearchParams({ sheet: 'Project' }));
            if (response.ok) {
                setProjects(await response.json());
            }
        })();
    }, []);

    return (
        <DndContext collisionDetection={closestCenter} sensors={sensors} onDragEnd={({ active, over }) => {
            if (active.id !== over?.id) {
                setTabs((tabs) => arrayMove(tabs, tabs.indexOf(active.id as string), tabs.indexOf(over?.id as string)));
            }
        }}>
            <div ref={constraints} className="flex-fill position-relative d-flex justify-content-center align-items-center">
                <div className="w-100 h-100 grid position-absolute p-3 z-1" style={{ gridAutoRows: '1fr', gridTemplateColumns: 'repeat(8, 1fr)' }}>
                    <DndContext onDragEnd={onDragEnd}>
                        {Array.from({ length: 48 }).map((_, i) => {
                            const icon = icons.find((icon) => icon.cell === i);
                            return (
                                <CellComponent key={i} id={i}>
                                    {icon ? (<IconComponent {...icon} openApplication={openApplication} />) : null}
                                </CellComponent>
                            );
                        })}
                    </DndContext>
                </div>
                <BackgroundComponent />
                {windows.map((window) => (
                    <WindowComponent key={window} window={window} constraints={constraints} closeApplication={closeApplication}>
                        {{
                            'About': <AboutPage about={about} experiences={experiences} educations={educations} />,
                            'Projects': <ProjectsPage projects={projects} />,
                            'Contact': <ContactPage />
                        }[window]}
                    </WindowComponent>
                ))}
            </div>
            <TaskbarComponent tabs={tabs} />
        </DndContext>
    );
}

export default App;
