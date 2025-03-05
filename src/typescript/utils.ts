import type { Languages, Project } from "./models";

export async function fetch_projects(): Promise<Project[]> {
	const RESPONSE = await fetch("https://api.github.com/users/garyszekelyjr/repos");
	if (RESPONSE.ok) {
		return RESPONSE.json();
	}
	return []
}

export async function fetch_languages(languages_url: string): Promise<Languages> {
	const RESPONSE = await fetch(languages_url);
	if (RESPONSE.ok) {
		return RESPONSE.json();
	}
	return {}
}
