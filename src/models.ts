interface About {
    profile: string;
}

interface Education {
    degree: string;
    major: string;
    concentration: string;
    school: string;
    start: string;
    end: string;
}

interface Experience {
    title: string;
    company: string;
    start: string;
    end: string;
}

interface Project {
    name: string;
	description: string;
    html_url: string;
	languages_url: string;
}

export type { About, Education, Experience, Project };
