import { Experience } from "../models";

function ExperienceComponent({ title, company, start, end }: Experience) {
    return (
        <div className='card bg-body-secondary'>
            <div className='card-body'>
                <div className="fs-2">{title}</div>
                <div className="fs-4">{company}</div>
                <div className="fs-4">{new Date(start).toLocaleDateString('en-us', {
                    year: 'numeric',
                    month: 'long'
                })} &mdash; {end ? new Date(end).toLocaleDateString('en-us', {
                    year: 'numeric',
                    month: 'long'
                }) : 'Present'}</div>
            </div>
        </div>
    );
}

export default ExperienceComponent;