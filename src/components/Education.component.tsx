import { Education } from '../models';

function EducationComponent({ degree, major, concentration, school, start, end }: Education) {
    return (
        <div className='card bg-body-secondary'>
            <div className='card-body'>
                <div className='fs-2'>{degree}, {major}</div>
                <div className='fs-4'>Concentration: {concentration}</div>
                <div className='fs-4'>{school}</div>
                <div className='fs-4'>{start} &mdash; {end}</div>
            </div>
        </div>
    );
}

export default EducationComponent;