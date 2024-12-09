interface About {
    profile: string;
}

interface Education {
    degree: string;
    major: string;
    concentration: string;
    school: string;
    dates: string;
}

interface Experience {
    title: string;
    company: string;
    dates: string;
}

interface Project {
    name: string;
    description: string;
    html_url: string;
    languages_url: string;
}

export type { About, Education, Experience, Project };
