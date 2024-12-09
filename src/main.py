import json

from pathlib import Path

from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright


html = ''

with sync_playwright() as playwright:
    with playwright.chromium.launch(headless=False) as browser:
        with browser.new_page() as page:
            page.goto("https://www.linkedin.com/in/garyszekelyjr")
            page.wait_for_load_state('domcontentloaded')
            html = page.content()

soup = BeautifulSoup(html, 'html.parser')
about = soup.find('section', {'class': 'summary'}).find('p').text

experiences = [] 
for experience in soup.find('ul', {'class': 'experience__list'}).find_all('li'):
    title = experience.find('span', { 'class' : 'experience-item__title'}).text.strip()
    company = experience.find('span', { 'class' : 'experience-item__subtitle'}).text.strip()
    dates = ' - '.join(map(lambda date: date.text, experience.find_all('time')))

    if '-' not in dates:
        dates = f'{dates} - Present'

    experiences.append({
        'title': title,
        'company': company,
        'dates': dates
    })

educations = []
for education in soup.find('ul', {'class': 'education__list'}).find_all('li'):
    school = education.find('h3').text.strip()
    degree, major = education.find('h4').text.strip().split('\n')
    degree = degree.strip()
    major = major.strip()
    concentration = education.find('div', {'class': 'show-more-less-text'}).text.strip()
    dates = ' - '.join(map(lambda date: date.text, education.find_all('time')))
    educations.append({
        'school': school,
        'degree': degree,
        'major': major,
        'concentration': concentration,
        'dates': dates
    })

print(about)
print(experiences)
print(educations)

with open(Path(__file__).parent / 'assets' / 'data.json', 'w') as f:
    json.dump({
        'about': about,
        'experiences': experiences,
        'educations': educations
    }, f)
