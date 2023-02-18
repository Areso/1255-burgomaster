import pytest

from pages.build_page import BuildPage

@pytest.mark.smoke
def test_build_house(browser):
    """
    Тест проверяет возможность постройки дома(проверяет уровень дома и появление дома в городе)
    """
    page = BuildPage(browser)
    page.open()
    page.build_house()
    page.check_house_level()
    page.check_house_in_city()
