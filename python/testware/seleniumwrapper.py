import unittest

from os import environ
from selenium.webdriver import Firefox
from selenium.webdriver.firefox.options import Options as FirefoxOptions
from selenium.webdriver.remote.webdriver import WebDriver

class SeleniumBaseTest(unittest.TestCase):

    def setUp(self):
        options: FirefoxOptions = FirefoxOptions()
        if "GITHUB_ACTIONS" in environ:
            options.headless = True
        self.browser: WebDriver = Firefox(options=options)
        self.addCleanup(self.browser.quit)