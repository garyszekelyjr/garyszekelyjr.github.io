import { Education } from '../models';

function EducationComponent({ degree, major, concentration, school, start, end }: Education) {
    return (
        <div className='card bg-body-secondary'>
            <div className='card-body'>
                <div className='fs-2 text-wrap'>{degree}, {major}</div>
                <div className='fs-4 text-wrap'>Concentration: {concentration}</div>
                <div className='fs-4 text-wrap'>{school}</div>
                <div className="fs-4 text-wrap">{new Date(start).toLocaleString('en-us', {
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