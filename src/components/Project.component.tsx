import { Project } from "../models";

function ProjectComponent({ name, description, stack, link }: Project) {
    return (
        <div className="card m-3">
            <div className="card-body">
                <h4 className="card-title">
                    <a href={link} target="_blank">{name}</a>
                </h4>
                <p className="card-text">{description}</p>
            </div>
            <div className="card-footer">
                {stack.split(', ').map((skill, i) => <span key={i} className="badge bg-primary">{skill}</span>)}
            </div>
        </div>
    );
}

export default ProjectComponent;