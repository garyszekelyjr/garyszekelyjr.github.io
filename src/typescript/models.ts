export type Project = {
	name: string;
	description: string;
	html_url: string;
	languages_url: string;
}

export type Languages = {
	[language: string]: number
}
