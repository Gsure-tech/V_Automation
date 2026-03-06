describe("LGS Individual Account Creation Flow", () => {
  const baseUrl = "http://lgs.oasisproducts.ng";
  // const uniqueName = `Mandatory ${Date.now()} Hub`;

const date = new Date();
const day = date.toLocaleString('default', { day: 'numeric' });
const month = date.toLocaleString('default', { month: 'short' });
const hours = String(date.getHours()).padStart(2, '0');
const mins = String(date.getMinutes()).padStart(2, '0');
const secs = String(date.getSeconds()).padStart(2, '0');

const timestamp = `${month}${day}-${hours}${mins}${secs}`;
const uniqueBusinessName = `TesterPitch-${timestamp} Hub`;
const uniqueName = `TesterPitch-${timestamp}`;

// 2. Create the unique sub-addressed email
const uniqueEmail = `joyoasis9023+${timestamp}@gmail.com`;
  

  it("should create an individual account",()=>{
    cy.visit(`${baseUrl}/auth/login`);
    cy.get('.auth-card > :nth-child(1) > .text-center > a').click();
    cy.get(':nth-child(1) > .account-type-picker').contains("Individual Account").click();
    cy.get('.btn').contains("Continue").click();
    cy.get(':nth-child(1) > .form-group > .form-control').clear().type("JoyTest");
    cy.get(':nth-child(2) > .form-group > .form-control').clear().type("Doe");
    cy.get(':nth-child(3) > .form-group > .form-control').clear().type(uniqueEmail);
    cy.get(':nth-child(4) > .form-group > .form-control').clear().type("08033223322");
    cy.get('.input-group > .form-control').clear().type("Gsure9023@2026");
    cy.get('.btn').contains("Submit").click();
    cy.wait(7000)
    cy.get('.title').contains("Registration Successful");
    cy.get(':nth-child(1) > .description').contains("We’ve sent a verification link to your email address.")
    cy.get('.btn').contains("Proceed to Login");
  
  })

//   it("should display 'user already exists' when an existing email is used to singup", () => {
//     cy.visit(`${baseUrl}/agents`);
//     cy.get(":nth-child(6) > span").contains("Sign Up here!").click();

//     // Fill form
//     cy.get("#firstName").type("Adedeji");
//     cy.get("#lastName").type("Adetokunbo");
//     cy.get("#createEmail").type("joyoasis9023@gmail.com");
//     cy.get("#createPassword").type("StrongPass123!");

//     // Submit
//     cy.get(".button-submit").click();
//     cy.get(".containerModal > div").contains("user already exists");
//   });

//   it("validates agent signup inputs and button state", () => {
//     cy.visit(`${baseUrl}/agents`);
//     cy.get(":nth-child(6) > span").contains("Sign Up here!").click();

//     // Check all field labels
//     cy.get(":nth-child(1) > .login-paragraph").should("contain", "First Name");
//     cy.get(":nth-child(2) > .login-paragraph").should("contain", "Last Name");
//     cy.get(":nth-child(3) > .login-paragraph").should(
//       "contain",
//       "Email Address"
//     );
//     cy.get(":nth-child(4) > .login-paragraph").should("contain", "Password");

//     // Attempt to click Submit with empty form
//     cy.get(".button-submit").should("be.disabled");

//     // Fill some fields only
//     cy.get("#firstName").type("Deji");
//     cy.get("#createEmail").type("invalidemail");

//     // Submit should still be disabled or error shown
//     cy.get(".button-submit").should("be.disabled");

//     cy.wait(3000);

//     // Now fill all correctly and button should work
//     cy.get("#firstName").type("Deji");
//     cy.get("#lastName").type("Tokunbo");
//     cy.get("#createEmail").type("validemail@gmail.com");
//     cy.get("#createPassword").type("Valid123!");
//     cy.get(".button-submit").should("not.be.disabled");
//   });

//   it("validates agent login form fields", () => {
//     cy.visit(`${baseUrl}/agents`);

//     // Check Forgot Password label exists
//     cy.get(
//       '[style="display: flex; justify-content: end; margin: 10px 0;"] > .signUp'
//     ).should("contain.text", "Forgot Password");

//     // Check that submit button is disabled
//     cy.get(".button-submit").should("be.disabled");

//     // Input invalid email
//     cy.get("#agentEmail").type("invalid");
//     cy.get("#agentLogin").type("pass");
//     cy.get(".button-submit").should("be.disabled");

//     // Expect error, or still on same page
//     cy.url().should("include", "agents");
//   });

//   it('should display "invalid credentials" when both email and password are incorrect', () => {
//     cy.visit(`${baseUrl}/agents`);
//     // Login page is default
//     cy.get("#agentEmail").type("testagent@example.com");
//     cy.get("#agentLogin").type("StrongPass123!");
//     cy.get(".button-submit").click();
//     cy.get('.containerModal').contains("invalid credentials")

//     // Validate redirect or welcome
//     cy.url().should("not.include", "/create-account");
//   });

//   it('should display "Invalid username or password" with a valid email and incorrect password', () => {
//     cy.visit(`${baseUrl}/agents`);

//     // Login page is default
//     cy.get("#agentEmail").type("joyoasis9023@gmail.com");
//     cy.get("#agentLogin").type("StrongPass123!");
//     cy.get(".button-submit").click();

//     cy.get(".containerModal > div").contains("Invalid username or password");
//   });

//   it('should display "invalid credentials" with an invalid email and correct password', () => {
//     cy.visit(`${baseUrl}/agents`);
//     cy.get("#agentEmail").type("doyo9023@gmail.com");
//     cy.get("#agentLogin").type("Gsure9023@2025");
//     cy.get(".button-submit").click();

//     cy.get(".containerModal > div").contains("invalid credentials");

//     // Validate redirect or welcome
//     cy.url().should("not.include", "/create-account");
//   });

//    it("should successfully log in, verify dashboard content,ensure navigation and KYC sections are visible and logout", () => {
//      // Navigate to the base URL and click 'Signup for Free' button
//      cy.visit(`${baseUrl}/agents`);
//      cy.log('Visiting the base URL and clicking the "Signup for Free" button');

//      // Enter login credentials and submit
//      cy.log("Entering valid agent email and password");
//      cy.get("#agentEmail").type("peaceoasis9023+4@gmail.com");
//      cy.get("#agentLogin").type("Gsure9023@2025");
//      cy.get(".button-submit").click();

//      // Wait for the dashboard to load and validate redirection
//      cy.log("Validating successful login and redirecting to the dashboard");
//      cy.url().should("include", "/overview");
//      cy.log("Successfully navigated to the dashboard");

//      // Validate the dashboard content for pending registrations
//      cy.get(":nth-child(1) > aside > .payment-header")
//        .should("contain.text", "Total Pending Registrations")
//        .should("be.visible");
//      cy.log('Verified the "Total Pending Registrations" section');

//      // Validate the total number for pending registrations is a valid number
//      cy.get(":nth-child(1) > aside > .payment-total")
//        .invoke("text")
//        .then((text) => {
//          const value = Number(text.trim());
//          expect(value).to.be.a("number").and.not.to.be.NaN;
//        });
//      cy.log(
//        "Verified the total number for pending registrations is a valid number"
//      );

//      // Validate the "Total Queried Registrations" section
//      cy.get(":nth-child(3) > aside > .payment-header")
//        .should("contain.text", "Total Queried Registrations")
//        .should("be.visible");
//      cy.log('Verified the "Total Queried Registrations" section');

//      // Validate the total number for queried registrations is a valid number
//      cy.get(":nth-child(1) > aside > .payment-total")
//        .invoke("text")
//        .then((text) => {
//          const value = Number(text.trim());
//          expect(value).to.be.a("number").and.not.to.be.NaN;
//        });
//      cy.log(
//        "Verified the total number for queried registrations is a valid number"
//      );

//      // Validate the "Total Approved Registrations" section
//      cy.get(":nth-child(5) > aside > .payment-header")
//        .should("contain.text", "Total Approved Registrations")
//        .should("be.visible");
//      cy.log('Verified the "Total Approved Registrations" section');

//      // Validate the total number for approved registrations is a valid number
//      cy.get(":nth-child(1) > aside > .payment-total")
//        .invoke("text")
//        .then((text) => {
//          const value = Number(text.trim());
//          expect(value).to.be.a("number").and.not.to.be.NaN;
//        });
//      cy.log(
//        "Verified the total number for approved registrations is a valid number"
//      );

//      // Click the menu to expand the sidebar
//      cy.get(".fa").click();
//      cy.log("Clicked the menu icon to expand the sidebar");

//      // Verify sidebar links are visible
//      cy.get(".active-link")
//        .should("contain.text", "Business Registration")
//        .should("be.visible");
//      cy.log('Verified "Business Registration" menu item is visible');

//      cy.get('[routerlink="/agents/storefront"] > p')
//        .should("contain.text", "Store Front")
//        .should("be.visible");
//      cy.log('Verified "Store Front" menu item is visible');

//      cy.get('[routerlink="/agents/payment"] > p')
//        .should("contain.text", "Payment & Withdrawal")
//        .should("be.visible");
//      cy.log('Verified "Payment & Withdrawal" menu item is visible');

//      cy.get('[routerlink="/agents/updateKyc"] > p')
//        .should("contain.text", "KYC")
//        .should("be.visible");
//      cy.log('Verified "KYC" menu item is visible');

//      // Check if the profile name is visible
//      cy.get(".profile-name > p").invoke("text").should("not.be.empty");
//      cy.log("Verified the profile name is not empty");

//      // Log out
//      cy.get(".logout").click();
//      cy.url().should("include", "/agents");
//      cy.log("Successfully logged out and redirected to agents page");
//    });

 
 
});
