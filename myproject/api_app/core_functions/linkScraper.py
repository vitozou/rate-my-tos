from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import requests
import time

def getTOSLinks(url):
    response = requests.get(url)
    if response.status_code == 200:
        # Get the HTML content of the webpage
        html_doc = response.text

        # Parse the HTML with BeautifulSoup
        soup = BeautifulSoup(html_doc, 'html.parser')

        # Find all <a> elements and store them in a list
        a_tags = soup.find_all('a')

        # Optionally, get only the href attribute of each <a> tag
        links = [a.get('href') for a in a_tags if a.get('href') is not None and a.get('href')[0] != '#']

        for i in range(len(links)):
            if links[i].startswith('/'):
                links[i] = url + links[i]
            elif not links[i].startswith('http') and '/' in links[i]:
                links[i] = url + '/' + links[i]
            

        print(links)

        return links
    else:
        print("Failed to retrieve the page. Status code:", response.status_code)
        return []
        
def parsePageText(url):
    response = requests.get(url)
    if response.status_code == 200:
        html_doc = response.text
        soup = BeautifulSoup(html_doc, 'html.parser')
        page_text = soup.get_text(separator=' ', strip=True)  # Separator adds spaces between elements
        return page_text
    else:
        print("Failed to retrieve the page. Status code:", response.status_code)
        return ""

# # someURL = "https://gitlab.com/-/users/terms"
# someURL = "https://gmail.com/"
# somePolicyURL = "https://accounts.google.com/TOS?loc=US&hl=en-US&privacy=true"

# # tos_links = getTOSLinks(someURL)
# # for link in tos_links:
# #     print(link.get('href'), "-", link.get_text(strip=True))

# text = getTOSLinks("https://facebook.com/r.php")
# print(text)
