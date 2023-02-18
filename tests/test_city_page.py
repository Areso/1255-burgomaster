import pytest

from pages.build_page import BuildPage
from pages.city_page import CityPage


@pytest.mark.smoke
class TestPageWork:
    def test_game_start(self, browser):
        """
        Тест проверят появление рабочей области и вкладок, после открытия приложения
        """
        page = CityPage(browser)
        page.open()
        page.game_open()

    def test_transitions_work(self, browser):
        """
        Тест проверяет переходы по вкладкам, переходя на каждую из них, проверяя появляющиеся элементы и возвращаясь
        назад в город
        """
        page = CityPage(browser)
        page.open()
        page.click_tabs()

@pytest.mark.smoke
@pytest.mark.xfail
def test_save_and_load(browser):
    """
    Тест сохраняет начальный прогресс, покупает дом и загружается. Сверив уровень дома, он проверяет что он равен нулю.
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
