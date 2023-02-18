from .locators import BasePageLocators

from selenium.common.exceptions import NoSuchElementException, ElementNotInteractableException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class BasePage:
    def __init__(self, browser, timeout=10):
        self.browser = browser
        self.url = "https://1255.areso.pro/"
        self.browser.implicitly_wait(timeout)

    def open(self):
        self.browser.get(self.url)

    def is_element_present(self, how, what):
        try:
            self.browser.find_element(how, what)
        except NoSuchElementException:
            return False
        return True

    def wait_element_visibility(self, how, what, timeout=4):
        try:
            WebDriverWait(self.browser, timeout).until(
                EC.visibility_of_element_located((how, what)))
        except NoSuchElementException:
            return False
        return True

    def element_clickable(self, how, what, timeout=4):
        try:
            WebDriverWait(self.browser, timeout).until(
                EC.element_to_be_clickable((how, what)))
        except ElementNotInteractableException:
            return False
        return True

    def go_to_city(self):
        self.browser.find_element(*BasePageLocators.CITY).click()

    def go_to_building(self):
        self.browser.find_element(*BasePageLocators.BUILDING).click()

    def go_to_settings(self):
        self.browser.find_element(*BasePageLocators.SETTINGS).click()

    def go_to_about(self):
        self.browser.find_element(*BasePageLocators.ABOUT).click()

    def go_to_discord(self):
        self.browser.find_element(*BasePageLocators.DISCORD_CHANNEL).click()

    def cancel_canvas(self):
        if self.is_element_present(*BasePageLocators.CANVAS):
            assert self.is_element_present(*BasePageLocators.CANVAS), "Hints do not exist"
            canvas = self.browser.find_element(*BasePageLocators.CANVAS)
            self.browser.execute_script("""var element = document.getElementById("myDCanvas");
                                    element.classList.remove("active-modal");""")