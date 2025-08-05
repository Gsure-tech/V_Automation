# V_AUTOMATION - Cypress E2E Tests

This project contains end-to-end tests written in [Cypress](https://www.cypress.io/) for automating services flow (e.g., Lgs, Vas, Bulk Approval, etc.).

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or newer recommended)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- Git (if you are cloning the project)

## Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/Gsure-tech/V_Automation.git
cd V_AUTOMATION
npm install
```

## Running Tests

### Open Cypress Test Runner (Interactive Mode)

```bash
npx cypress open
```

### Run Tests in Headless Mode

```bash
npx cypress run
```

### Run a Specific Test File

```bash
npx cypress run --spec "cypress/e2e/Lgs.cy.js"
```

## Environment Variables

Update your `baseUrl` in the Cypress config or define it as an environment variable in `cypress.config.js`:

```js
e2e: {
  baseUrl: "http://localhost:3000" 
}
```

## Sample Test Scenario (from `Lgs.cy.js`)

```js
it("should login successfully with valid email and correct password", () => {
  cy.visit(`${baseUrl}`);
  cy.get(".becomeAnAgentBtn").contains("Signup for Free").click();
  cy.get("#agentEmail").type("joyoasis9023+3@gmail.com");
  cy.get("#agentLogin").type("Gsure9023@2025");
  cy.get(".button-submit").click();
  cy.url().should("include", "/overview");
});
```

## Downloads

- Files downloaded during tests (e.g., PDFs, CSVs) are stored in `cypress/downloads/`.

## Notes

- This setup is optimized for internal QA automation.
- Ensure your test environment is accessible and contains test accounts as referenced in the tests.

## Support

For help or collaboration, please contact the QA Engineer.
