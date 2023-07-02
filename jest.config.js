module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  // https://stackoverflow.com/questions/56547215/react-testing-library-why-is-tobeinthedocument-not-a-function
  setupFilesAfterEnv: ["<rootDir>/test/unit/setupTests.js"]
};
