/* eslint-disable no-undef */
/* eslint-disable jest/expect-expect */
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  chromeWebSecurity: false,
  video: false,
});
