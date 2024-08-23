import { useState, useEffect } from "react";

import { SortableContext } from "@dnd-kit/sortable";

import TabComponent from "./Tab.component";

interface Props {
    tabs: string[]
}

function TaskbarComponent({ tabs }: Props) {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => { setDate(new Date()); }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="navbar bg-body-secondary">
            <div className="container-fluid mx-3">
                <span className="d-flex align-items-center">
                    <SortableContext items={tabs}>
                        {tabs.map((tab, i) => <TabComponent key={i} tab={tab} />)}
                    </SortableContext>
                </span>
                <span className="fs-3">{`${date.toLocaleDateString()}`}&nbsp;&nbsp;{`${date.toLocaleTimeString()}`}</span>
            </div>
        </div>
    );
}

export default TaskbarComponent;