import unittest

from python.testware.seleniumwrapper import SeleniumBaseTest


class SeleniumSmokeTest(SeleniumBaseTest):

    def test_can_run_firefox_and_quit(self):
        self.assertEqual("firefox", self.browser.name)


if __name__ == '__main__':
    unittest.main()