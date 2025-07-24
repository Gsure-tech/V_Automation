describe("Bulk Service Approval", () => {
  beforeEach(() => {
    cy.visit("http://bulk.oasisproducts.ng");
    cy.wait(1000);
    cy.get(".login-section").trigger("mouseover");

    cy.get(":nth-child(4) > .login-input", { timeout: 10000 }).should(
      "be.visible"
    );
    cy.get('[style="margin-bottom: 0;"] > .login-input').should("be.visible");
  });

//   it("Shows error when both username and password are wrong", () => {
//     cy.get(":nth-child(4) > .login-input").clear().type("wrong_username");
//     cy.get('[style="margin-bottom: 0;"] > .login-input')
//       .clear()
//       .type("wrong_pass");

//     cy.get(".signIn-btn").click();

//     cy.get(".error").should("contain.text", "Error");
//     cy.get(".infoParagraph").should(
//       "contain.text",
//       "unauthorized - Bad credentials"
//     );
//   });

//   it("Shows error when username is wrong and password is correct", () => {
//     cy.get(":nth-child(4) > .login-input").clear().type("wrong_username");
//     cy.get('[style="margin-bottom: 0;"] > .login-input')
//       .clear()
//       .type("passwor1");

//     cy.get(".signIn-btn").click();

//     cy.get(".error").should("contain.text", "Error");
//     cy.get(".infoParagraph").should(
//       "contain.text",
//       "unauthorized - Bad credentials"
//     );
//   });

//   it("Shows error when username is correct and password is wrong", () => {
//     cy.get(":nth-child(4) > .login-input").clear().type("vas_admin");
//     cy.get('[style="margin-bottom: 0;"] > .login-input')
//       .clear()
//       .type("wrong_pass");

//     cy.get(".signIn-btn").click();

//     cy.get(".error").should("contain.text", "Error");
//     cy.get(".infoParagraph").should(
//       "contain.text",
//       "unauthorized - Bad credentials"
//     );
//   });

// it("Logs in successfully and logs out", () => {
//   cy.get(":nth-child(4) > .login-input").clear().type("vas_admin");
//   cy.get('[style="margin-bottom: 0;"] > .login-input').clear().type("password");

//   cy.get(".signIn-btn").click();


//   cy.url({ timeout: 15000 }).should("include", "/Registration");
//   cy.contains("BUSINESS REGISTRATION").should("be.visible");

//   cy.wait(1000);


//   cy.get(".logout > p").click();

//   cy.contains("hover to login", { timeout: 10000 }).should("be.visible");
//    cy.wait(1000);
// });


//   // end checks here to get more control values
// it("Validates dashboard and sidebar controls after login", () => {
//   // Login
//   cy.get(":nth-child(4) > .login-input").clear().type("vas_admin");
//   cy.get('[style="margin-bottom: 0;"] > .login-input').clear().type("password");
//   cy.get(".signIn-btn").click();

//   // Wait for dashboard to load
//   cy.url({ timeout: 15000 }).should("include", "/Registration");
//   cy.get(".welcomeMessage").should("contain.text", "BUSINESS REGISTRATION");

//   // Dashboard stat boxes
//   cy.get(".active-button > aside > .p-tags").should(
//     "contain.text",
//     "Open Request"
//   );
//   cy.get(".active-button > aside > .countNumber")
//     .invoke("text")
//     .should((text) => {
//       expect(Number(text.trim())).to.be.a("number");
//     });

//   cy.get(":nth-child(2) > aside > .p-tags").should(
//     "contain.text",
//     "My Pending Request"
//   );
//   cy.get(":nth-child(2) > aside > .countNumber")
//     .invoke("text")
//     .should((text) => {
//       expect(Number(text.trim())).to.be.a("number");
//     });

//   cy.get(":nth-child(3) > aside > .p-tags").should(
//     "contain.text",
//     "Queried Applications"
//   );
//   cy.get(":nth-child(3) > aside > .countNumber")
//     .invoke("text")
//     .should((text) => {
//       expect(Number(text.trim())).to.be.a("number");
//     });

//   cy.get(":nth-child(4) > aside > .p-tags").should(
//     "contain.text",
//     "Quarantined Applications"
//   );
//   cy.get(":nth-child(4) > aside > .countNumber")
//     .invoke("text")
//     .should((text) => {
//       expect(Number(text.trim())).to.be.a("number");
//     });

//   cy.get(":nth-child(5) > aside > .p-tags").should(
//     "contain.text",
//     "Approved Applications"
//   );
//   cy.get(":nth-child(5) > aside > .countNumber")
//     .invoke("text")
//     .should((text) => {
//       expect(Number(text.trim())).to.be.a("number");
//     });

//   // Sidebar items
//   cy.get(".head-title").should("contain.text", "SPECIAL PROJECT");

//   cy.get(":nth-child(1) > .sidebar-link > p").should(
//     "contain.text",
//     "Business Name"
//   );

//    cy.get(":nth-child(1) > .sidebar-link").should(
//      "contain.text",
//      "Business Name"
//    );
//   cy.get(":nth-child(3) > .sidebar-link").should("contain.text", "LLC");

//   // Expand Business Name section
//   cy.get(":nth-child(1) > .sidebar-link > .fa-angle-down").click();

//   // Verify Business Name dropdown items
//   cy.contains("span", "Business Registration").should("be.visible");
//   cy.contains("span", "Report").should("be.visible");
//   cy.contains("span", "Post Incorporation").should("be.visible");
//   cy.contains("span", "Assisted Approval").should("be.visible");

//   // Expand LLC section
//   cy.get(":nth-child(3) > .sidebar-link > .fa-angle-down").click();

//   // Verify LLC dropdown items
//   cy.contains("span", "LLC Registration").should("be.visible");
//   cy.contains("span", "Report").should("be.visible");
//   cy.contains("span", "Post Incorporation").should("be.visible");
//   cy.contains("span", "Assisted Approval").should("be.visible");

// });




it("Searches for a transaction reference, collects it if found, and submits a query for Signature", () => {
  // Login
  cy.get(":nth-child(4) > .login-input").clear().type("vas_admin");
  cy.get('[style="margin-bottom: 0;"] > .login-input').clear().type("password");
  cy.get(".signIn-btn").click();
  cy.log("Logged in as vas_admin");

  cy.wait(2000); // Wait for navigation and dashboard load

  // Ensure dashboard is loaded
  cy.url({ timeout: 15000 }).should("include", "/Registration");
  cy.contains("BUSINESS REGISTRATION").should("be.visible");
  cy.log("Dashboard loaded successfully");

  // Go to last pagination page
  cy.get(".pagination > :nth-child(9)", { timeout: 10000 })
    .should("be.visible")
    .click();
  cy.wait(2000); // Wait for table to reload
  cy.log("Navigated to last page of pagination");

  const transactionRef = "VAS20250722142938523";

  // Search for the transaction ref
  cy.get(".search-text").clear().type(transactionRef);
  cy.get(".search-btn", { timeout: 10000 }).click();
  cy.wait(2000); // Wait for search results to load
  cy.log(`Searching for transactionRef: ${transactionRef}`);

  // Check for message or record
  cy.document().then((doc) => {
    const message = Cypress.$(doc).find(".fs-18").text().trim();

    if (message.includes("No application pending/No application found")) {
      cy.log(`'${transactionRef}' not found — skipping collect.`);
      return;
    }

    // Record exists
    const row = Cypress.$(doc)
      .find(`td:contains(${transactionRef})`)
      .closest("tr");

    if (row.length) {
      cy.wrap(row).find(".collect-btn").click({ force: true });
      cy.wait(3000); // Wait for modal or action to complete
      cy.log(`Collected transactionRef: ${transactionRef}`);
    } else {
      cy.log(`Transaction row for '${transactionRef}' not found in table.`);
      return;
    }

    // Go to "My Pending Request"
    cy.get(":nth-child(2) > aside > .p-tags", { timeout: 10000 })
      .should("contain.text", "My Pending Request")
      .click();
    cy.wait(2000); // Wait for content to load
    cy.log("Navigated to 'My Pending Request' tab");

    // Confirm that pending request contains a record
    cy.get(".active-button > aside > .countNumber", { timeout: 10000 })
      .invoke("text")
      .then((text) => {
        const count = Number(text.trim());
        cy.log(`Pending Request Count: ${count}`);
        expect(count).to.be.greaterThan(0);

        cy.get(
          ":nth-child(1) > :nth-child(9) > .d-inline-block > .dropdown-toggle"
        ).click();
        cy.wait(1000);

        cy.get(
          ":nth-child(1) > :nth-child(9) > .d-inline-block > .dropdown-menu > :nth-child(1)"
        ).click();
        cy.wait(1000);
        cy.log("Clicked dropdown and selected 'Query' option");

        cy.get(".query-btn").click();
        cy.wait(1000);
        cy.log("Query form opened");

        cy.get(".ng-input > input").type("i").clear();
        cy.contains(".ng-dropdown-panel-items .ng-option", "Signature").click();
        cy.wait(500);
        cy.log("Selected query reason: Signature");

        cy.get(".query-textarea").clear().type("upload a clearer signature");
        cy.wait(500);
        cy.get(".query-add").click();
        cy.wait(1000);
        cy.get(".submit-query").click();
        cy.wait(2000);
        cy.log("Submitted query for Signature");
      });
  });
});


});
