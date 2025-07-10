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

it("Collects last page record and verifies My Pending Request increases", () => {
  // Login
  cy.get(":nth-child(4) > .login-input").clear().type("vas_admin");
  cy.get('[style="margin-bottom: 0;"] > .login-input').clear().type("password");
  cy.get(".signIn-btn").click();

  // Ensure dashboard is loaded
  cy.url({ timeout: 15000 }).should("include", "/Registration");
  cy.contains("BUSINESS REGISTRATION").should("be.visible");

  // Step 1: Click the last pagination button
  cy.get(".pagination > :nth-child(9)").click();

  // Step 2: Wait for the Collect button to appear
  cy.get(":nth-child(5) > :nth-child(9) > .collect-btn", { timeout: 10000 })
    .should("be.visible")
    .then(($btn) => {
      // Step 3: Click using jQuery native click to avoid async re-render problems
      cy.wrap($btn).click({ force: true });
    });

  // Step 4: Wait briefly for collection to take effect
  cy.wait(3000);

  // Step 5: Click "My Pending Request" tab
  cy.get(":nth-child(2) > aside > .p-tags")
    .should("contain.text", "My Pending Request")
    .click();

  // Step 6: Validate that the count is > 0
  cy.get(":nth-child(2) > aside > .countNumber", { timeout: 10000 })
    .invoke("text")
    .then((text) => {
      const count = Number(text.trim());
      expect(count).to.be.greaterThan(0);
    });
});



});
