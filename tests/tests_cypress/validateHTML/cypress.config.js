import htmlvalidate from "cypress-html-validate/plugin";

export default {
  e2e: {
    reporter: 'mochawesome',
    reporterOptions: {
      html: false,
      json: true,
      reportDir: "cypress/reports/",
      reportFilename: "[status]_[datetime]-[name]-report",
      timestamp: "longDate",
      toConsole: true
    },
    baseUrl: 'http://localhost:8080',
    setupNodeEvents(on, config) {         
        htmlvalidate.install(on);
      // implement node event listeners here
    },
  },
};