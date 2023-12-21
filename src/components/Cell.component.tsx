import { PropsWithChildren } from "react";
import { useDroppable } from "@dnd-kit/core";

interface Props extends PropsWithChildren { id: number }

function Cell({ id, children }: Props) {
    const { setNodeRef } = useDroppable({ id: id });

    return (
        <div ref={setNodeRef} className="d-flex align-items-center">
            {children}
        </div>
    )
}

export default Cell;