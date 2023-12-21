import { useDraggable } from "@dnd-kit/core";
import { CSS } from '@dnd-kit/utilities'

interface Props {
    name: string,
    openApplication: (name: string) => void
}

function Icon({ name, openApplication }: Props) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: name });

    return (
        <div ref={setNodeRef} onDoubleClick={() => { openApplication(name); }} className='flex-fill text-center' style={{ transform: CSS.Translate.toString(transform) }} {...listeners} {...attributes}>
            <i className={`bi bi-${{
                'About': 'info-circle-fill',
                'Projects': 'folder-fill',
                'Contact': 'person-rolodex'
            }[name]} fs-2`} />
            <div className="fs-2">{name}</div>
        </div>
    );
}

export default Icon;