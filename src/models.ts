type About = {
    profile: string;
};

type Education = {
    degree: string;
    major: string;
    concentration: string;
    school: string;
    start: string;
    end: string;
};

type Experience = {
    title: string;
    company: string;
    start: string;
    end: string;
};

type Project = {
    name: string;
    description: string;
    stack: string;
    link: string;
};

export type { About, Education, Experience, Project };
