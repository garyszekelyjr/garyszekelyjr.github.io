import { Education } from '../models';

function EducationComponent({ degree, major, concentration, school, start, end }: Education) {
    return (
        <div className='card bg-body-secondary'>
            <div className='card-body'>
                <div className='fs-2'>{degree}, {major}</div>
                <div className='fs-4'>Concentration: {concentration}</div>
                <div className='fs-4'>{school}</div>
                <div className="fs-4">{new Date(start).toLocaleString('en-us', {
                    year: 'numeric',
                    month: 'long'
                })} &mdash; {new Date(end).toLocaleString('en-us', {
                    year: 'numeric',
                    month: 'long'
                })}</div>
            </div>
        </div>
    );
}

export default EducationComponent;