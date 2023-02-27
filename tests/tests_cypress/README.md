# tests_cypress

Перед началом работы необходимо установить:
1.  Установка node 16.16.0
    в домашнем каталоге в консоли обновление/установка npm
           npm install -g npm@latest
    Если не помогло  и установилась версия ниже, то ставим через установщик nvm, например 
    https://habr.com/ru/company/timeweb/blog/541452/

2.  Установка Cypress  >12.6.0   
    в домашнем каталоге в консоли 
           npm install cypress --save-dev

на этом глобальные установки закончены
устанавливаем опционально для каждого каталога с тестами отдельно

3. Для работы HTMLvalidate в папке с автотестами tests/tests_cypress/validateHTML установить
           npm install --save-dev html-validate cypress-html-validate

4. Для работы с отчетами 
    на данный момент отчеты не формируем   

5. При создании нового каталога с автотестами
           npx cypress open
    в открывшемся окне E2ETesting==>Continue==>Start E2E Testing in Chrome ==> Scaffold example specs==>Okay, I got it!
    В  cypress удалить папку download 
    В  cypress/e2e удалить папки 1-getting-started, 2-advanced-examples
    настроить файл cypress.config.js
    добавить файлы package.json, package-lock.json
    добавляем сценарии тестов в папку cypress/e2e  с расширением .cy.js
  
структура каталогов 
tests
└── tests_cypress 
        ├── canvas
        ├── E2E
        │   └── cypress
        │       ├── e2e
        │       ├── fixtures
        │       └── support
        ├── unit
        └── validateHTML
                └── cypress
                ├── e2e
                ├── fixtures
                └── support
