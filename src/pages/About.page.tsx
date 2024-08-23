import { About, Education, Experience } from '../models';

import ExperienceComponent from '../components/Experience.component';
import EducationComponent from '../components/Education.component';

interface Props {
    about: About | undefined,
    experiences: Experience[] | undefined,
    educations: Education[] | undefined
}

function AboutPage({ about, experiences, educations }: Props) {
    return (
        <>
            <div className='row'>
                <div className='col p-3'>
                    <div className='card'>
                        <div className='card-body'>
                            {about === undefined ? (
                                <div className='d-flex justify-content-center align-items-center'>
                                    <div className='spinner-border' />
                                </div>
                            ) : about.profile}
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
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
                            ) : experiences
                                .sort((a: Experience, b: Experience) => new Date(b.start).getTime() - new Date(a.start).getTime())
                                .map((experience) => <ExperienceComponent key={experience.id} {...experience} />)}
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
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
                            ) : educations
                                .sort((a: Education, b: Education) => new Date(b.start).getTime() - new Date(a.start).getTime())
                                .map((education) => <EducationComponent key={education.id} {...education} />)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AboutPage;