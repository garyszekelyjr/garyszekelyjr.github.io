import { Education } from '../models';

function EducationComponent({ degree, major, concentration, school, start, end }: Education) {
    return (
        <div className='card bg-body-secondary'>
            <div className='card-body'>
                {degree}, {major}
                <br />
                Concentration: {concentration}
                <br />
                {school}
                <br />
                {start} &mdash;  {end}
            </div>
        </div>
    );
}

export default EducationComponent;