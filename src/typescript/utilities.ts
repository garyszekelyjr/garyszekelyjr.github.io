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

export function getSortedLanguages(languages: Languages): string[] {
	return Object.entries(languages)
		.sort((a, b) => b[1] - a[1])
		.map((e) => e[0]);
}

export function getProportion(languages: Languages, language: string, totalCount: number): number {
	let count = languages[language];
	return (count / totalCount) * 100;
}

export function getAbsoluteLanguageProportion(languages: Languages, language: string): number {
	return getProportion(languages, language, getTotalCount(languages));
}

export function getRelativeLanguageProportion(languages: Languages, language: string): number {
	return getProportion(languages, language, getMaxCount(languages));
}

function getMaxCount(languages: Languages): number {
	return Math.max(...Object.values(languages));
}

function getTotalCount(languages: Languages): number {
	return Object.values(languages).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
}
