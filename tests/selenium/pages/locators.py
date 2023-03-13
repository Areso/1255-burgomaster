from selenium.webdriver.common.by import By


class BasePageLocators:
    WORKSPACE = (By.XPATH, "//div[@class='content-panel']/div[@id='Main']/canvas")
    CITY = (By.ID, "tabCity")
    BUILDING = (By.ID, "TabBuilding")
    SETTINGS = (By.ID, "tabSettings")
    ABOUT = (By.ID, "tabAbout")
    DISCORD_CHANNEL = (By.ID, "tabDiscord")
    NOTIFICATION = (By.ID, "myDCanvas")
    COUNTER = (By.ID, "dcounter")
    CANVAS = (By.CLASS_NAME, "canvas-modal.active-modal")


class CityPageLocators:
    HOUSE_SMOKE = (By.XPATH, "//div[@id='events_graphics']/img[@src='resources/smoke.gif']")
    SAVE = (By.ID, "saveGameButton")
    LOAD = (By.ID, "loadGameButton")


class BuildingPageLocators:
    BUILDING_LIST = (By.CLASS_NAME, "building-list")
    HOME_BUILD = (By.XPATH, "//div[@id='bldHome']/div[@class='building-card__action']/button[@id='homes']")


class SettingsPageLocators:
    NICKNAME = (By.ID, "login")
    PASSWORD = (By.ID, "password")
    EMAIL = (By.ID, "email")


class AboutPageLocators:
    LINK_WIKI = (By.XPATH, "//div[@id='lblAboutGame']/a")


class DiscordPageLocators:
    DISCORD_FRAME = (By.CSS_SELECTOR, "div.tab > iframe")
