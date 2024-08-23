import { useCallback, useEffect, useRef, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

import { About, Experience, Education, Project } from './models';

import Background from "./components/Background.component";
import Cell from "./components/Cell.component";
import Icon from "./components/Icon.component";
import Window from "./components/Window.component";

import AboutPage from "./pages/About.page";
import ProjectsPage from "./pages/Projects.page";
import ContactPage from "./pages/Contact.page";

interface Props {
    windows: string[],
    openApplication: (name: string) => void,
    closeApplication: (name: string) => void
}

function Desktop({ windows, openApplication, closeApplication }: Props) {
    const [icons, setIcons] = useState<{ name: string, cell: number }[]>([
        { name: 'About', cell: 0 },
        { name: 'Projects', cell: 8 },
        { name: 'Contact', cell: 16 }
    ]);
    const [about, setAbout] = useState<About>();
    const [experiences, setExperiences] = useState<Experience[]>();
    const [educations, setEducations] = useState<Education[]>();
    const [projects, setProjects] = useState<Project[]>();

    const onDragEnd = useCallback(({ active, over }: DragEndEvent) => {
        if (over) {
            const other = icons.filter(({ name }) => name !== active.id)
            if (!other.some(({ cell }) => cell === over.id)) {
                setIcons([...other, { name: active.id as string, cell: over.id as number }]);
            }
        }
    }, [icons])

    const constraints = useRef(null);

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
        <div ref={constraints} className="flex-fill position-relative d-flex justify-content-center align-items-center">
            <div className="w-100 h-100 grid position-absolute p-3 z-1" style={{ gridAutoRows: '1fr', gridTemplateColumns: 'repeat(8, 1fr)' }}>
                <DndContext onDragEnd={onDragEnd}>
                    {Array.from({ length: 48 }).map((_, i) => {
                        const icon = icons.find((icon) => icon.cell === i);
                        return (
                            <Cell key={i} id={i}>
                                {icon ? (<Icon {...icon} openApplication={openApplication} />) : null}
                            </Cell>
                        );
                    })}
                </DndContext>
            </div>
            <Background />
            {windows.map((window) => (
                <Window key={window} window={window} constraints={constraints} closeApplication={closeApplication}>
                    {{
                        'About': <AboutPage about={about} experiences={experiences} educations={educations} />,
                        'Projects': <ProjectsPage projects={projects} />,
                        'Contact': <ContactPage />
                    }[window]}
                </Window>
            ))}
        </div>
    );
}

export default Desktop;