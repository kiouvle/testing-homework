module.exports = {
  sets: {
    desktop: {
      files: "test/**/*.hermione.js",
    },
  },

  browsers: {
    chrome: {
      automationProtocol: "devtools",
      desiredCapabilities: {
        browserName: "chrome",
      },
      windowSize: {
        width: 1920,
        height: 1080,
      },
    },
  },
  
  system: {
    ctx: {
      sutUri: "http://localhost:3000/hw/store",
      defaultTimeout: 5000,
      defaultSelector: '.Application'
    }
  },
  
  plugins: {
    "html-reporter/hermione": {
      enabled: true,
    },
  },
};
