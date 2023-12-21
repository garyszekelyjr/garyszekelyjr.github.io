import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

import Tab from "./Tab.component";

interface Props {
    tabs: string[],
    setTabs: Dispatch<SetStateAction<string[]>>
}

function Taskbar({ tabs, setTabs }: Props) {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => { setDate(new Date()); }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="navbar bg-body-secondary">
            <div className="container-fluid">
                <span className="d-flex align-items-center">
                    <span className="fs-3 me-5">GSJ</span>
                    <DndContext collisionDetection={closestCenter} onDragEnd={({ active, over }) => {
                        if (active.id !== over?.id) {
                            setTabs(arrayMove(tabs, tabs.indexOf(active.id as string), tabs.indexOf(over?.id as string)));
                        }
                    }}>
                        <SortableContext items={tabs}>
                            {tabs.map((tab) => <Tab tab={tab} />)}
                        </SortableContext>
                    </DndContext>
                </span>
                <span className="fs-3">{`${date.toLocaleDateString()}`}&nbsp;&nbsp;{`${date.toLocaleTimeString()}`}</span>
            </div>
        </div>
    );
}

export default Taskbar;