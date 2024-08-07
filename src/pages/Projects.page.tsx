import { useState, useEffect } from "react";

import { Project } from "../models";

import ProjectComponent from "../components/Project.component";

function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>();

    useEffect(() => {
        (async () => {
            const response = await fetch(`${import.meta.env.VITE_DATABASE}?` + new URLSearchParams({ sheet: 'Project' }));
            if (response.ok) {
                setProjects(await response.json());
            }
        })();
    }, []);

    return projects === undefined ? (
        <div className='h-100 d-flex justify-content-center align-items-center'>
            <div className='spinner-border' />
        </div>
    ) : projects.map((project) => <ProjectComponent key={project.id} {...project} />);
}

export default ProjectsPage;