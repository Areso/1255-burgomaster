import time

from .base_page import BasePage
from .locators import BasePageLocators, BuildingPageLocators, CityPageLocators


class BuildPage(BasePage):
    def build_house(self):
        if self.element_clickable(*BasePageLocators.BUILDING):
            self.go_to_building()
        else:
            pass
        self.cancel_canvas()

        assert self.is_element_present(*BuildingPageLocators.HOME_BUILD), "There is no button to buy a house, or it is inaccessible"
        button = self.browser.find_element(*BuildingPageLocators.HOME_BUILD)
        self.browser.execute_script("return arguments[0].scrollIntoView(true);", button)
        counter = self.browser.find_element(*BasePageLocators.COUNTER)
        count = counter.get_attribute('textContent')
        while count != "30":
            count = counter.get_attribute('textContent')
        button.click()

    def check_house_level(self):
        js_house_level = self.browser.execute_script("return game.buildLevelH")
        assert js_house_level == 1, "The level was not increased at the program level"

        button = self.browser.find_element(*BuildingPageLocators.HOME_BUILD)
        button_text = button.text.split()

        assert button_text[2] + button_text[3] == "ур.2" or button_text[2] + button_text[3] == 'lvl2' or \
               button_text[2] + button_text[3] == 'niveau2' or \
               button_text[3] + button_text[4] == 'niveau2', "The level counter was not increased"

    def check_house_in_city(self):
        if self.element_clickable(*BasePageLocators.CITY):
            self.go_to_city()
        else:
            pass
        assert self.is_element_present(*CityPageLocators.HOUSE_SMOKE), "The house was not built"

        time.sleep(10)

