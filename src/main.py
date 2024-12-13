import json

from pathlib import Path

from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright, Error


about = None
experiences = [] 
educations = []
data = {}

while not all([about, experiences, educations]):
    print('Scraping...')

    html = ''

    try:
        with sync_playwright() as playwright:
            with playwright.chromium.launch() as browser:
                with browser.new_page() as page:
                    page.goto("https://www.linkedin.com/in/garyszekelyjr")
                    page.wait_for_load_state('load')
                    html = page.content()
    except Error as e:
        print(e)
        continue


    soup = BeautifulSoup(html, 'html.parser')

    if tag := soup.find('div', { 'class': 'core-section-container__content' }):
        about = tag.text.strip()


    for tag in soup.find_all('li', { 'class': 'experience-item' }):
        experience = {}

        if title := tag.find('span', { 'class': 'experience-item__title' }):
            experience['title'] = title.text.strip()

        if company := tag.find('span', { 'class': 'experience-item__subtitle' }):
            experience['company'] = company.text.strip()

        dates = []
        for date in tag.find_all('time'):
            dates.append(date.text.strip())

        if len(dates) == 1:
            dates.append('Present')

        experience['dates'] = ' - '.join(dates)

        experiences.append(experience)


    for tag in soup.find_all('li', { 'class': 'education__list-item' }):
        education = {}

        if school := tag.find('h3'):
            education['school'] = school.text.strip()

        if degree := tag.find('h4'):
            education['degree'], education['major'] = degree.text.strip().split('\n')

        if concentration := tag.find('div', { 'class': 'show-more-less-text' }):
            education['concentration'] = concentration.text.strip()

        dates = []
        for date in tag.find_all('time'):
            dates.append(date.text.strip())

        education['dates'] = ' - '.join(dates)

        educations.append(education)


data = {
    'about': about,
    'experiences': experiences,
    'educations': educations
}

with open(Path(__file__).parent / 'assets' / 'data.json', 'w') as f:
    json.dump(data, f, indent=8)

print('Scraped!')
