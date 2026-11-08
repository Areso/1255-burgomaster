import htmlvalidate from 'cypress-html-validate/plugin';

export default {
  e2e: {
    baseUrl: 'http://localhost:8080',
    setupNodeEvents(on) {
      htmlvalidate.install(on);
    },
  },
};