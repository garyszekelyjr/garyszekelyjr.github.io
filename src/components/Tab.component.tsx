import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Props {
    tab: string
}

function TabComponent({ tab }: Props) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: tab, animateLayoutChanges: () => false });

    return (
        <span ref={setNodeRef} className="me-3 fs-3" style={{ transform: CSS.Transform.toString(transform), transition }} {...attributes} {...listeners}>
            <i className={`bi bi-${{
                'About': 'info-circle-fill',
                'Projects': 'folder-fill',
                'Contact': 'person-rolodex'
            }[tab]} fs-3`} />
        </span>
    );
}

export default TabComponent;