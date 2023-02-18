import time

from selenium.webdriver.common.action_chains import ActionChains

from .base_page import BasePage
from .locators import BasePageLocators, BuildingPageLocators, SettingsPageLocators, AboutPageLocators, \
    DiscordPageLocators, CityPageLocators


class CityPage(BasePage):
    def game_open(self):
        assert self.is_element_present(*BasePageLocators.WORKSPACE), "The working area of the game does not exist"
        assert self.wait_element_visibility(*BasePageLocators.NOTIFICATION), "The notification with the advice did not appear"
        assert self.is_element_present(*BasePageLocators.CITY), 'Tab "City" does not exist'
        assert self.is_element_present(*BasePageLocators.BUILDING), 'Tab "Building" does not exist'
        assert self.is_element_present(*BasePageLocators.SETTINGS), 'Tab "Settings" does not exist'
        assert self.is_element_present(*BasePageLocators.ABOUT), 'Tab "How To play" does not exist'
        assert self.is_element_present(*BasePageLocators.DISCORD_CHANNEL), 'Tab "Discord" does not exist'

    def click_tabs(self):
        city = self.browser.find_element(*BasePageLocators.CITY)

        self.browser.find_element(*BasePageLocators.BUILDING).click()
        assert self.is_element_present(*BuildingPageLocators.BUILDING_LIST), 'Transition to "Building" did not occur'
        city.click()

        self.browser.find_element(*BasePageLocators.SETTINGS).click()
        assert self.is_element_present(*SettingsPageLocators.NICKNAME), 'Transition to "Settings" did not occur'
        city.click()

        self.browser.find_element(*BasePageLocators.ABOUT).click()
        assert self.is_element_present(*AboutPageLocators.LINK_WIKI), 'Transition "How To play" did not occur'
        city.click()

        self.browser.find_element(*BasePageLocators.DISCORD_CHANNEL).click()
        assert self.is_element_present(*DiscordPageLocators.DISCORD_FRAME), 'Transition "Discord" did not occur'

    def save(self):
        self.cancel_canvas()

        assert self.is_element_present(*CityPageLocators.SAVE), 'Button "Save" does not exist, or it is blocked '
        self.browser.find_element(*CityPageLocators.SAVE).click()

    def load(self):
        assert self.is_element_present(*CityPageLocators.LOAD), 'Button "Load" does not exist, or it is blocked '
        self.browser.find_element(*CityPageLocators.LOAD).click()
        ActionChains(self.browser).move_by_offset(431, 274).click().perform()