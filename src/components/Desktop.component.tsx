import { useCallback, useRef, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

import Background from "./Background.component";
import Cell from "./Cell.component";
import Icon from "./Icon.component";
import Window from "./Window.component";

import AboutPage from "../pages/About.page";
import ProjectsPage from "../pages/Projects.page";

interface Props {
    windows: string[],
    openApplication: (name: string) => void,
    closeApplication: (name: string) => void
}

function Desktop({ windows, openApplication, closeApplication }: Props) {
    const [icons, setIcons] = useState<{ name: string, cell: number }[]>([
        { name: 'About', cell: 0 },
        { name: 'Projects', cell: 8 }
    ]);

    const onDragEnd = useCallback(({ active, over }: DragEndEvent) => {
        if (over) {
            const other = icons.filter(({ name }) => name !== active.id)
            if (!other.some(({ cell }) => cell === over.id)) {
                setIcons([...other, { name: active.id as string, cell: over.id as number }]);
            }
        }
    }, [icons])

    const constraints = useRef(null);

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
                        'About': <AboutPage />,
                        'Projects': <ProjectsPage />
                    }[window]}
                </Window>
            ))}
        </div>
    );
}

export default Desktop;