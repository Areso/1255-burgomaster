import pytest

from pages.build_page import BuildPage

@pytest.mark.smoke
def test_build_house(browser):
    """
    The test checks the possibility of building a house (checks the level of the house and the appearance of a house in the city)
    """
    page = BuildPage(browser)
    page.open()
    page.build_house()
    page.check_house_level()
    page.check_house_in_city()
