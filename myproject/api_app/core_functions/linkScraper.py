from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import requests
import time

def getTOSLinks(url):
    # Set up Chrome options for headless mode
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')  # Enable headless mode
    options.add_argument('--no-sandbox')  # Recommended for running in some environments like servers
    options.add_argument('--disable-dev-shm-usage')  # Avoid some potential issues in headless mode
    options.add_argument('--disable-gpu')  # Disable GPU acceleration for headless mode on Windows

    # Initialize the WebDriver with options
    driver = webdriver.Chrome(options=options)

    try:
        # Open the URL
        driver.get(url)

        WebDriverWait(driver, 3).until(
            EC.presence_of_element_located((By.TAG_NAME, "a"))
        )

        html_doc = driver.page_source

        soup = BeautifulSoup(html_doc, 'html.parser')

        keywords = ["tos", "terms", "privacy", "terms of service", "terms of use"]

        # search all <a> elements
        links = []
        for a in soup.find_all('a'):
            href = a.get('href', '').lower()
            text = a.get_text(strip=True).lower()
            rel = ' '.join(a.get('rel', [])).lower()  # Convert rel list to a lowercase string
            data_attrs = ' '.join([str(v).lower() for v in a.attrs.values() if isinstance(v, str)])

            # if any keyword is in href, text, rel attribute, or other attributes
            if any(keyword in href or keyword in text or keyword in rel or keyword in data_attrs for keyword in keywords):
                links.append(a)

        return links

    finally:
        driver.quit()
        
def parsePageText(url):
    response = requests.get(url)
    if response.status_code == 200:
        html_doc = response.text
        soup = BeautifulSoup(html_doc, 'html.parser')
        page_text = soup.get_text(separator=' ', strip=True)  # Separator adds spaces between elements
        return page_text
    else:
        print("Failed to retrieve the page. Status code:", response.status_code)
        return None

# # someURL = "https://gitlab.com/-/users/terms"
# someURL = "https://gmail.com/"
# somePolicyURL = "https://accounts.google.com/TOS?loc=US&hl=en-US&privacy=true"

# # tos_links = getTOSLinks(someURL)
# # for link in tos_links:
# #     print(link.get('href'), "-", link.get_text(strip=True))

# text = parsePageText(somePolicyURL)
# print(text)
