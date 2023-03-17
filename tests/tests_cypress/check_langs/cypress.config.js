
export default ({
  // defaultCommandTimeout: 200000, 
  // pageLoadTimeout:10000,
  e2e: {
    baseUrl: 'http://localhost:8080',
    setupNodeEvents(on, config) {
      video: false;
      // implement node event listeners here
    },
  },
});
