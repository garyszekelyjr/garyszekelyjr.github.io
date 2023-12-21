import { useEffect, useState } from 'react';

import { Experience, Education } from '../models';

import ExperienceComponent from '../components/Experience.component';
import EducationComponent from '../components/Education.component';

function About() {
    const [experiences, setExperiences] = useState<Experience[]>();
    const [educations, setEducations] = useState<Education[]>();

    useEffect(() => {
        (async () => {
            const response = await fetch(`${import.meta.env.VITE_DATABASE}?` + new URLSearchParams({ sheet: 'Experience' }));
            if (response.ok) {
                setExperiences(await response.json());
            }
        })();
        (async () => {
            const response = await fetch(`${import.meta.env.VITE_DATABASE}?` + new URLSearchParams({ sheet: 'Education' }));
            if (response.ok) {
                setEducations(await response.json());
            }
        })();
    }, []);

    return (
        <>
            <div className='row'>
                <div className='col p-3'>
                    <div className='card'>
                        <div className='card-body'>

                        </div>
                    </div>
                </div>
            </div>
            <div className='row flex-wrap'>
                <div className='col p-3'>
                    <div className='card'>
                        <div className='card-header'>
                            <div className='fs-3'>Experience</div>
                        </div>
                        <div className='card-body'>
                            {experiences === undefined ? (
                                <div className='d-flex justify-content-center align-items-center'>
                                    <div className='spinner-border' />
                                </div>
                            ) : experiences.map((experience) => <ExperienceComponent key={experience.id} {...experience} />)}
                        </div>
                    </div>
                </div>
                <div className='col p-3'>
                    <div className='card'>
                        <div className='card-header'>
                            <div className='fs-3'>Education</div>
                        </div>
                        <div className='card-body'>
                            {educations === undefined ? (
                                <div className='d-flex justify-content-center align-items-center'>
                                    <div className='spinner-border' />
                                </div>
                            ) : educations.map((education) => <EducationComponent key={education.id} {...education} />)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;