import { Experience } from "../models";

function ExperienceComponent({ title, company, start, end }: Experience) {
    return (
        <div className='card bg-body-secondary'>
            <div className='card-body'>
                <div className="fs-2">{title}</div>
                <div className="fs-4">{company}</div>
                <div className="fs-4">{start} &mdash; {end}</div>
            </div>
        </div>
    );
}

export default ExperienceComponent;