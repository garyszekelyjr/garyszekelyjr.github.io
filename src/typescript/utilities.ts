import fs from 'fs';
import yaml from 'js-yaml';

import type { Languages, Project } from "./models";


export async function fetchProjects(): Promise<Project[]> {
	const RESPONSE = await fetch("https://api.github.com/users/garyszekelyjr/repos");
	if (RESPONSE.ok) {
		return await RESPONSE.json();
	}
	return []
}

export async function fetchLanguages(languages_url: string): Promise<Languages> {
	const RESPONSE = await fetch(languages_url);
	if (RESPONSE.ok) {
		return await RESPONSE.json();
	}
	return {}
}

export async function downloadLanguageColors() {
	const RESPONSE = await fetch("https://api.github.com/repos/github-linguist/linguist/contents/lib/linguist/languages.yml");
	if (RESPONSE.ok) {
		const data = await RESPONSE.json();
		fs.writeFile("../../public/languages.yml", Buffer.from(data.content, 'base64').toString(), () => { })
	}
}

export async function getLanguageColor(language: string): Promise<string> {
	const response = await fetch('languages.yml');
	const colors: any = yaml.load(await response.text());
	const color = colors[language]["color"]
	return color;
}

