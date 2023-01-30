import warnings

from python.testware.pageobjects import StartPageObject
from python.testware.seleniumwrapper import SeleniumBaseTest


class StarterTests(SeleniumBaseTest):

    def setUp(self):
        return super().setUp()

    def test_game_loads(self):
        page = StartPageObject(self.browser)
        self.browser.get("http://localhost:6699")

        page.verify_menu_panel_is_visible()
        page.verify_resource_panel_is_visible()
        page.verify_canvas_is_visible()

        warnings.warn("This test needs refactoring!")