import htmlvalidate from "cypress-html-validate/plugin";

export default {
  e2e: {
    baseUrl: 'http://localhost:8080',
    setupNodeEvents(on, config) {
        video: false;         
        htmlvalidate.install(on);
      // implement node event listeners here
    },
  },
};