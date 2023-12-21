type Experience = {
    id: number;
    title: string;
    company: string;
    start: string;
    end: string;
}

type Education = {
    id: number;
    degree: string;
    major: string;
    concentration: string;
    school: string;
    start: string;
    end: string;
}

type Project = {
    id: number;
    name: string;
    description: string;
    stack: string;
    link: string;
}

export type { Experience, Education, Project };