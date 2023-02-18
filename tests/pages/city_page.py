import time

from selenium.webdriver.common.action_chains import ActionChains

from .base_page import BasePage
from .locators import BasePageLocators, BuildingPageLocators, SettingsPageLocators, AboutPageLocators, \
    DiscordPageLocators, CityPageLocators


class CityPage(BasePage):
    def game_open(self):
        assert self.is_element_present(*BasePageLocators.WORKSPACE), "Рабочей области игры не существует"
        assert self.wait_element_visibility(*BasePageLocators.NOTIFICATION), "Оповещение с советом не появилось"
        assert self.is_element_present(*BasePageLocators.CITY), 'Вкладки "Город" не существует'
        assert self.is_element_present(*BasePageLocators.BUILDING), 'Вкладки "Строительство" не существует'
        assert self.is_element_present(*BasePageLocators.SETTINGS), 'Вкладки "Настройки" не существует'
        assert self.is_element_present(*BasePageLocators.ABOUT), 'Вкладки "Как играть" не существует'
        assert self.is_element_present(*BasePageLocators.DISCORD_CHANNEL), 'Вкладки "Discord" не существует'

    def click_tabs(self):
        city = self.browser.find_element(*BasePageLocators.CITY)

        self.browser.find_element(*BasePageLocators.BUILDING).click()
        assert self.is_element_present(*BuildingPageLocators.BUILDING_LIST), 'Переход на "Строительство" не совершен'
        city.click()

        self.browser.find_element(*BasePageLocators.SETTINGS).click()
        assert self.is_element_present(*SettingsPageLocators.NICKNAME), 'Переход на "Настройки" не совершен'
        city.click()

        self.browser.find_element(*BasePageLocators.ABOUT).click()
        assert self.is_element_present(*AboutPageLocators.LINK_WIKI), 'Переход на "Как играть" не совершен'
        city.click()

        self.browser.find_element(*BasePageLocators.DISCORD_CHANNEL).click()
        assert self.is_element_present(*DiscordPageLocators.DISCORD_FRAME), 'Переход на "Discord" не совершен'

    def save(self):
        self.cancel_canvas()

        assert self.is_element_present(*CityPageLocators.SAVE), 'Кнопки "Сохранить" не существует, либо она перекрыта'
        self.browser.find_element(*CityPageLocators.SAVE).click()

    def load(self):
        assert self.is_element_present(*CityPageLocators.LOAD), 'Кнопки "Загрузить" не существует, либо она перекрыта'
        self.browser.find_element(*CityPageLocators.LOAD).click()
        ActionChains(self.browser).move_by_offset(431, 274).click().perform()