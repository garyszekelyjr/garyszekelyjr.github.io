import { Experience } from "../models";

function ExperienceComponent({ title, company, start, end }: Experience) {
    return (
        <div className='card bg-body-secondary'>
            <div className='card-body'>
                {title}
                <br />
                {company}
                <br />
                {start} &mdash; {end}
            </div>
        </div>
    );
}

export default ExperienceComponent;