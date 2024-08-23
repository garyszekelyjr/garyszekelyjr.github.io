import { Project } from "../models";

import ProjectComponent from "../components/Project.component";

interface Props {
    projects: Project[] | undefined
}

function ProjectsPage({ projects }: Props) {
    return projects ? projects.map((project) => <ProjectComponent key={project.id} {...project} />) : (
        <div className='h-100 d-flex justify-content-center align-items-center'>
            <div className='spinner-border' />
        </div>
    );
}

export default ProjectsPage;