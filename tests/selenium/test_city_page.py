import pytest

from pages.build_page import BuildPage
from pages.city_page import CityPage


@pytest.mark.smoke
class TestPageWork:
    def test_game_start(self, browser):
        """
        The test will check the appearance of the working area and tabs, after opening the application
        """
        page = CityPage(browser)
        page.open()
        page.game_open()

    def test_transitions_work(self, browser):
        """
        The test checks the transitions on the tabs, switching to each of them, checking the emerging elements and returning
        back to the city
        """
        page = CityPage(browser)
        page.open()
        page.click_tabs()

@pytest.mark.smoke
@pytest.mark.xfail
def test_save_and_load(browser):
    """
    The test save initial progress, buys a house and loading the save. Having checked the level of the house, he checks that he is zero.
    """
    page = CityPage(browser)
    page.open()
    page.save()
    page_build = BuildPage(browser)
    page_build.build_house()
    page.go_to_city()
    page.cancel_canvas()
    page.load()
    page2.check_house_level()
