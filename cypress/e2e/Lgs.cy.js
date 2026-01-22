// describe('LGS Website Navbar Interaction and Navigation Flow', () => {

//   beforeEach(() => {
//     cy.log('Visiting the LGS Business Registration Landing Page');
//     cy.visit('http://lgs.oasisproducts.ng');

//   });

//   it('should click the About button in the navbar', () => {
//     cy.log('Clicking on the About button');

//     cy.get('a.btn-login')
//       .contains('About')
//       .should('be.visible')
//       .click();

//     cy.wait(500);
//   });

//   it('should open Services dropdown and select Business Registration', () => {
//     cy.log('Opening Services dropdown');

//     cy.get('button[data-bs-toggle="dropdown"]')
//       .contains('Services')
//       .click();

//     cy.wait(500);

//     cy.log('Selecting Business Registration from dropdown');

//     cy.get('.dropdown-menu')
//       .contains('Business Registration')
//       .click();

//     cy.url().should('include', 'Bn-registration');

//     cy.wait(1000);
//   });

//   it('should open Services dropdown and select Storefront Creation', () => {
//     cy.log('Opening Services dropdown');

//     cy.get('button[data-bs-toggle="dropdown"]')
//       .contains('Services')
//       .click();

//     cy.wait(500);

//     cy.log('Selecting Storefront Creation');

//     cy.get('.dropdown-menu')
//       .contains('Storefront Creation')
//       .click();

//     cy.url().should('include', 'agents');

//     cy.wait(1000);
//   });

//   it('should open Services dropdown and select Batch Registration', () => {
//     cy.log('Opening Services dropdown');

//     cy.get('button[data-bs-toggle="dropdown"]')
//       .contains('Services')
//       .click();

//     cy.wait(500);

//     cy.log('Selecting Batch Registration');

//     cy.get('.dropdown-menu')
//       .contains('Batch Registration')
//       .click();

//     cy.url().should('include', 'client');

//     cy.wait(1000);
//   });

//   it('should click on the Login button', () => {
//     cy.log('Clicking Login button in the navbar');

//     cy.get('button.btn-login')
//       .contains('Login')
//       .should('be.visible')
//       .click();

//     cy.url().should('include', 'agents');

//     cy.wait(1000);
//   });

//   it("loads the registration landing page and confirms visibility of primary elements", () => {
//     cy.log("Visiting the business registration landing page");

//     cy.get('p.landing-page-paragraph')
//   .invoke('text')
//   .should('include', 'Register Your Business Name')
//   .and('include', 'in Nigeria')
//   .and('include', 'Seamlessly');

// });

// });

describe("LGS Business Name Registration Flow", () => {
  const baseUrl = "http://lgs.oasisproducts.ng";

  // it("shows error modal when name already exists during compliance check", () => {
  //   cy.log("Navigating to application form");
  //   cy.visit(`${baseUrl}/Bn-registration`);
  //   cy.url().should("include", "/Bn-registration/application");

  //   cy.log("Filling business registration form with existing name");
  //   cy.get("#BusinessName").type("Mighty Accelarator Hub");
  //   cy.get("#lineOfBusiness").select("Legal practice and Consultancy");

  //   cy.log("Clicking Check Compliance button");
  //   cy.get("button[class$='ng-star-inserted']")
  //     .contains("Check compliance")
  //     .click();

  //   cy.log("Validating modal content for existing name");
  //   cy.get(".containerModal")
  //     .should("be.visible")
  //     .and("contain.text", "name already exists");
  // });

  it("registers successfully with valid name and uploads valid files", () => {
    cy.log("Opening application form for new registration");
    cy.visit(`${baseUrl}/Bn-registration`);
    cy.url().should("include", "/Bn-registration/application");

    cy.log("Filling form with a unique business name");
    cy.get("#BusinessName").type("Mandatory Goto Hub");
    cy.get("#lineOfBusiness").select("Trading");

    cy.log("Clicking Check Compliance button");
    cy.get("button[class$='ng-star-inserted']")
      .contains("Check compliance")
      .click();
    // cy.wait("2000")

    cy.get("#companyEmail").type("joyoasis9023@gmail.com");
    cy.get("#companyStreetNumber").type("12");
    cy.get("#companyStateOfResidence").select("Kano State");
    cy.get("#companyAddress").type("12B Airport Road, Kano");
    cy.get("#companyCity").type("Kano");
    cy.get(".navigation-buttons > .submitBtn").contains("Continue").click();
    cy.get("#NIN").clear().type("70123456789");
    cy.get(".submitBtn").contains("Validate NIN").click();

    cy.log("Filling proprietor bio data section");
    cy.get(".section-names").contains("Proprietor Bio Data");
    cy.get("#proprietorPhoneNumber").clear().type("08033221100");
    cy.get("#proprietorEmail").clear().type("geeee9023@gmail.com");
    cy.get(".nextBtn").contains("Next").click();

    cy.log("Completing demographic data section");
    cy.get("#proprietorStreetNumber").clear().type("40");
    cy.get("#proprietorState").select("Adamawa State");
    cy.get("#proprietorCity").clear().type("Mubi");
    cy.get("#proprietorLga").select("Hong");
    cy.get("#proprietorServiceAddress").clear().type("College Road");
    cy.get(".nextBtn").contains("Next").click();

    const largeFile = "spiral.png";
    const validFile = "gamma1.png";

    cy.log("Uploading large invalid files");

    // 1. Upload Signature (Large)
    cy.contains("p", "Proprietor Signature")
      .closest(".fileUpload-choose")
      .find('input[type="file"]')
      .selectFile(`cypress/fixtures/${largeFile}`, { force: true });

    // 2. Upload ID (Large)
    cy.contains("p", "Proprietor ID")
      .closest(".fileUpload-choose")
      .find('input[type="file"]')
      .selectFile(`cypress/fixtures/${largeFile}`, { force: true });

    // 3. Upload Photograph (Large)
    cy.contains("p", "Proprietor Photograph")
      .closest(".fileUpload-choose")
      .find('input[type="file"]')
      .selectFile(`cypress/fixtures/${largeFile}`, { force: true });

    // 4. Upload Supporting Document (Large)
    cy.contains("p", "Supporting Document")
      .closest(".fileUpload-choose")
      .find('input[type="file"]')
      .selectFile(`cypress/fixtures/${largeFile}`, { force: true });

    cy.log("Validating error messages");
    // Looks for the error text that appears in your HTML
    cy.contains("file size should not exceed 500KB").should("be.visible");

    cy.log("Uploading valid files");

    // Replace with valid files
    cy.contains("p", "Proprietor Signature")
      .closest(".fileUpload-choose")
      .find('input[type="file"]')
      .selectFile(`cypress/fixtures/${validFile}`, { force: true });

    cy.contains("p", "Proprietor ID")
      .closest(".fileUpload-choose")
      .find('input[type="file"]')
      .selectFile(`cypress/fixtures/${validFile}`, { force: true });

    cy.contains("p", "Proprietor Photograph")
      .closest(".fileUpload-choose")
      .find('input[type="file"]')
      .selectFile(`cypress/fixtures/${validFile}`, { force: true });

    cy.contains("p", "Supporting Document")
      .closest(".fileUpload-choose")
      .find('input[type="file"]')
      .selectFile(`cypress/fixtures/${validFile}`, { force: true });

    cy.log("Submitting form");
    // Using the exact text from your HTML button
    cy.contains("button", "Continue to Payment")
      .should("not.be.disabled")
      .click();

    cy.log("Payment Section");
    cy.get('input[formcontrolname="email"]').type("geeee9023@gmail.com");
    cy.get('input[formcontrolname="confirmEmail"]').type("geeee9023@gmail.com");
    cy.contains("button", "Make Payment").click();

    cy.log("Final confirmation");
    cy.get("h3", { timeout: 10000 }).should("contain", "Payment");
    // cy.wait(80000)

  });



// it("check registration status", () => {
//   cy.visit(`${baseUrl}/Bn-registration`);
//   cy.log('Clicking "Check Registration Status" from landing page');
//   cy.get('button[routerlink="/status"]').should("be.visible").click();
//   cy.url().should("include", "/status");
//   cy.log("Validating fields for registration status check");
//   cy.get('input[formcontrolname="transactionReference"]').should("exist");
//   cy.get('input[formcontrolname="passcode"]').should("exist");
//   cy.get("button.status-button").should("contain.text", "Check Status");
// });



// it("shows and closes error modal on incorrect transaction reference or passcode", () => {
//   cy.visit("http://lgs.oasisproducts.ng/status");
//   cy.log("Typing incorrect registration credentials");
//   cy.get('input[formcontrolname="transactionReference"]').type(
//     "LGS9884949830PQ"
//   );
//   cy.get('input[formcontrolname="passcode"]').type("wrongpass");
//   cy.get("button.status-button").click();
//   cy.log("Expecting error modal for incorrect credentials");
//   cy.get('div[class$="error-background"] div').should(
//     "contain.text",
//     "Incorrect passcode or transaction reference"
//   );
//   cy.get('path[d="M6.5 6.08911L18.5 18.0891"]').click();
//   cy.log("Clicked close icon on error modal");
//   cy.get("h6.paragraph span").contains("Click here").click();
//   cy.get('header[class="header"] h3').should(
//     "contain.text",
//     "Don’t have a passcode?"
//   );
// });

// it("requests passcode and handles error/success modals", () => {
//   cy.visit("http://lgs.oasisproducts.ng/status");
//   cy.log("Opening passcode request modal");
//   cy.get("h6.paragraph span").contains("Click here").click();
//   cy.get("header.header h3").should("contain.text", "Don’t have a passcode?");
//   cy.log("Submitting invalid reference");
//   cy.get(".passcode-card input.inputField")
//     .clear()
//     .type("LGS2506231435130PP");
//   cy.get('button[class$="ng-star-inserted"]')
//     .contains("Send passcode")
//     .click();
//   cy.get('div[class$="error-background"] div').should(
//     "contain.text",
//     "error generating passcode"
//   );
//   cy.get(
//     'svg[viewBox="0 0 25 25"] path[d="M6.5 6.08911L18.5 18.0891"]'
//   ).click();
//   cy.log("Submitting valid transaction reference");
//   cy.get(".passcode-card input.inputField")
//     .clear()
//     .type("LGS250623143513003");
//   cy.get('button[class$="ng-star-inserted"]')
//     .contains("Send passcode")
//     .click();
//     cy.wait(3000)
//   cy.get('div[class$="success-background"] div').should(
//     "contain.text",
//     "Passcode has been sent to your email"
//   );
// });

// it("handles application status or expired passcode scenarios", () => {
//   cy.visit("http://lgs.oasisproducts.ng/status");
//   cy.log("Typing valid transaction reference and passcode");

//   cy.get('input[formcontrolname="transactionReference"]').type(
//     "LGS250623143513003"
//   );
//   cy.get('input[formcontrolname="passcode"]').type("05216864");
//   cy.get("button.status-button").click();

//   cy.log("Waiting for status or error modal");

//   cy.get('h3.words, div[class$="error-background"] div', {
//     timeout: 7000,
//   }).then(($el) => {
//     const text = $el.text().trim();

//     if (text.includes("Application Status Check")) {
//       cy.log("Application status modal appeared");
//       cy.get("p")
//         .should("be.visible")
//         .and("contain.text", "Your application")
//         .invoke("text")
//         .then((msg) => {
//           expect(msg).to.match(
//             /Your application is (PENDING|APPROVED|QUERIED)/i
//           );
//           cy.log(`Application Status: ${msg.trim()}`);
//         });

//       cy.get('svg[viewBox="0 0 21 21"]').click();
//     }

//     if (text.includes("Incorrect passcode or transaction reference")) {
//       cy.log("Error modal detected for incorrect/expired passcode");
//       cy.get('div[class$="error-background"] div').should(
//         "contain.text",
//         "Incorrect passcode or transaction reference"
//       );

//       cy.get('path[d="M6.5 6.08911L18.5 18.0891"]').click();
//     }
//   });
// });

// it("successfully signs up an agent", () => {
//   cy.visit(`${baseUrl}/agents`);
//   cy.get(":nth-child(6) > span").contains("Sign Up here!").click();

//   // Fill form
//   cy.get("#firstName").type("Adedeji");
//   cy.get("#lastName").type("Adetokunbo");
//   const uniqueId = Date.now();
//   cy.get("#createEmail").type(`peaceoasis9023+${uniqueId}@gmail.com`);
//   cy.get("#createPassword").type("StrongPass123!");

//   // Submit
//   cy.get(".button-submit").click();

// // Email verification modal appears
//     cy.wait(3000);
// cy.get(".agent-title-words").should("include.text", "Verify your email address");

//   cy.get(".verify-form > :nth-child(4)").should(
//     "contain.text",
//     "A verification mail has been"
//   );
//   cy.get(".resend-email").click();

//   // Error modal appears after clicking resend
//   cy.get(".containerModal > div").should(
//     "contain.text",
//     "Something went wrong"
//   );

//   // Locate and click modal close SVG
//   cy.get('.containerModal svg[viewBox="0 0 25 25"]')
//     .should("be.visible")
//     .click({ force: true });

//   cy.get(".verify-form > .fa-solid").click();
// });

// it("should display 'user already exists' when an existing email is used to singup", () => {
//   cy.visit(`${baseUrl}/agents`);
//   cy.get(":nth-child(6) > span").contains("Sign Up here!").click();

//   // Fill form
//   cy.get("#firstName").type("Adedeji");
//   cy.get("#lastName").type("Adetokunbo");
//   cy.get("#createEmail").type("joyoasis9023@gmail.com");
//   cy.get("#createPassword").type("StrongPass123!");

//   // Submit
//   cy.get(".button-submit").click();
//   cy.get(".containerModal > div").contains("user already exists");
// });

// it("validates agent signup inputs and button state", () => {
//   cy.visit(`${baseUrl}/agents`);
//   cy.get(":nth-child(6) > span").contains("Sign Up here!").click();

//   // Check all field labels
//   cy.get(":nth-child(1) > .login-paragraph").should("contain", "First Name");
//   cy.get(":nth-child(2) > .login-paragraph").should("contain", "Last Name");
//   cy.get(":nth-child(3) > .login-paragraph").should(
//     "contain",
//     "Email Address"
//   );
//   cy.get(":nth-child(4) > .login-paragraph").should("contain", "Password");

//   // Attempt to click Submit with empty form
//   cy.get(".button-submit").should("be.disabled");

//   // Fill some fields only
//   cy.get("#firstName").type("Deji");
//   cy.get("#createEmail").type("invalidemail");

//   // Submit should still be disabled or error shown
//   cy.get(".button-submit").should("be.disabled");

//   cy.wait(3000);

//   // Now fill all correctly and button should work
//   cy.get("#firstName").type("Deji");
//   cy.get("#lastName").type("Tokunbo");
//   cy.get("#createEmail").type("validemail@gmail.com");
//   cy.get("#createPassword").type("Valid123!");
//   cy.get(".button-submit").should("not.be.disabled");
// });

// it("validates agent login form fields", () => {
//   cy.visit(`${baseUrl}/agents`);

//   // Check Forgot Password label exists
//   cy.get(
//     '[style="display: flex; justify-content: end; margin: 10px 0;"] > .signUp'
//   ).should("contain.text", "Forgot Password");

//   // Check that submit button is disabled
//   cy.get(".button-submit").should("be.disabled");

//   // Input invalid email
//   cy.get("#agentEmail").type("invalid");
//   cy.get("#agentLogin").type("pass");
//   cy.get(".button-submit").should("be.disabled");

//   // Expect error, or still on same page
//   cy.url().should("include", "agents");
// });

// it('should display "invalid credentials" when both email and password are incorrec', () => {
//   cy.visit(`${baseUrl}/agents`);
//   // Login page is default
//   cy.get("#agentEmail").type("testagent@example.com");
//   cy.get("#agentLogin").type("StrongPass123!");
//   cy.get(".button-submit").click();
//   cy.get('.containerModal').contains("invalid credentials")

//   // Validate redirect or welcome
//   cy.url().should("not.include", "/create-account");
// });

// it('should display "Invalid username or password" with a valid email and incorrect password', () => {
//   cy.visit(`${baseUrl}/agents`);

//   // Login page is default
//   cy.get("#agentEmail").type("joyoasis9023@gmail.com");
//   cy.get("#agentLogin").type("StrongPass123!");
//   cy.get(".button-submit").click();

//   cy.get(".containerModal > div").contains("Invalid username or password");
// });

// it('should display "invalid credentials" with an invalid email and correct password', () => {
//   cy.visit(`${baseUrl}/agents`);
//   cy.get("#agentEmail").type("doyo9023@gmail.com");
//   cy.get("#agentLogin").type("Gsure9023@2025");
//   cy.get(".button-submit").click();

//   cy.get(".containerModal > div").contains("invalid credentials");

//   // Validate redirect or welcome
//   cy.url().should("not.include", "/create-account");
// });

//  it("should successfully log in, verify dashboard content,ensure navigation and KYC sections are visible and logout", () => {
//    // Navigate to the base URL and click 'Signup for Free' button
//    cy.visit(`${baseUrl}/agents`);
//    cy.log('Visiting the base URL and clicking the "Signup for Free" button');

//    // Enter login credentials and submit
//    cy.log("Entering valid agent email and password");
//    cy.get("#agentEmail").type("peaceoasis9023+4@gmail.com");
//    cy.get("#agentLogin").type("Gsure9023@2025");
//    cy.get(".button-submit").click();

//    // Wait for the dashboard to load and validate redirection
//    cy.log("Validating successful login and redirecting to the dashboard");
//    cy.url().should("include", "/overview");
//    cy.log("Successfully navigated to the dashboard");

//    // Validate the dashboard content for pending registrations
//    cy.get(":nth-child(1) > aside > .payment-header")
//      .should("contain.text", "Total Pending Registrations")
//      .should("be.visible");
//    cy.log('Verified the "Total Pending Registrations" section');

//    // Validate the total number for pending registrations is a valid number
//    cy.get(":nth-child(1) > aside > .payment-total")
//      .invoke("text")
//      .then((text) => {
//        const value = Number(text.trim());
//        expect(value).to.be.a("number").and.not.to.be.NaN;
//      });
//    cy.log(
//      "Verified the total number for pending registrations is a valid number"
//    );

//    // Validate the "Total Queried Registrations" section
//    cy.get(":nth-child(3) > aside > .payment-header")
//      .should("contain.text", "Total Queried Registrations")
//      .should("be.visible");
//    cy.log('Verified the "Total Queried Registrations" section');

//    // Validate the total number for queried registrations is a valid number
//    cy.get(":nth-child(1) > aside > .payment-total")
//      .invoke("text")
//      .then((text) => {
//        const value = Number(text.trim());
//        expect(value).to.be.a("number").and.not.to.be.NaN;
//      });
//    cy.log(
//      "Verified the total number for queried registrations is a valid number"
//    );

//    // Validate the "Total Approved Registrations" section
//    cy.get(":nth-child(5) > aside > .payment-header")
//      .should("contain.text", "Total Approved Registrations")
//      .should("be.visible");
//    cy.log('Verified the "Total Approved Registrations" section');

//    // Validate the total number for approved registrations is a valid number
//    cy.get(":nth-child(1) > aside > .payment-total")
//      .invoke("text")
//      .then((text) => {
//        const value = Number(text.trim());
//        expect(value).to.be.a("number").and.not.to.be.NaN;
//      });
//    cy.log(
//      "Verified the total number for approved registrations is a valid number"
//    );

//    // Click the menu to expand the sidebar
//    cy.get(".fa").click();
//    cy.log("Clicked the menu icon to expand the sidebar");

//    // Verify sidebar links are visible
//    cy.get(".active-link")
//      .should("contain.text", "Business Registration")
//      .should("be.visible");
//    cy.log('Verified "Business Registration" menu item is visible');

//    cy.get('[routerlink="/agents/storefront"] > p')
//      .should("contain.text", "Store Front")
//      .should("be.visible");
//    cy.log('Verified "Store Front" menu item is visible');

//    cy.get('[routerlink="/agents/payment"] > p')
//      .should("contain.text", "Payment & Withdrawal")
//      .should("be.visible");
//    cy.log('Verified "Payment & Withdrawal" menu item is visible');

//    cy.get('[routerlink="/agents/updateKyc"] > p')
//      .should("contain.text", "KYC")
//      .should("be.visible");
//    cy.log('Verified "KYC" menu item is visible');

//    // Check if the profile name is visible
//    cy.get(".profile-name > p").invoke("text").should("not.be.empty");
//    cy.log("Verified the profile name is not empty");

//    // Log out
//    cy.get(".logout").click();
//    cy.url().should("include", "/agents");
//    cy.log("Successfully logged out and redirected to agents page");
//  });

// it("should show errors for invalid inputs in storefront creation", () => {
//   cy.visit(`${baseUrl}/agents`);

//   // Enter login credentials and submit
//   cy.log("Entering valid agent email and password");
//   cy.get("#agentEmail").type("peaceoasis9023+4@gmail.com");
//   cy.get("#agentLogin").type("Gsure9023@2025");
//   cy.get(".button-submit").click();

//   // Wait for the dashboard to load and validate redirection
//   cy.log("Validating successful login and redirecting to the dashboard");
//   cy.url().should("include", "/overview");
//   cy.log("Successfully navigated to the dashboard");

//   cy.get("a.overview-btn")
//     .should("contain.text", "Create Storefront")
//     .should("be.visible")
//     .click();
//   cy.log("Navigating to the 'Create Storefront' page");

//   //  Negative Test - Storefront Name

//   cy.log(
//     "Entering invalid storefront name with spaces and special characters"
//   );
//   cy.get("#storefrontName").clear().type("testers_storefront");
//   cy.get(".text-danger").should(
//     "contain.text",
//     "Only letters, numbers, and " &
//       " are allowed! Spaces are not allowed. Maximum length is 50 characters."
//   );
//   cy.log("Storefront name validation message displayed correctly");

//   //   Negative Test - Storefront Link

//   cy.log("Entering invalid storefront link with special character");
//   cy.get("#storefrontLink").clear().type("testerstore_");
//   cy.get(".text-danger").should(
//     "contain.text",
//     "Only letters, numbers, and " &
//       " are allowed! Spaces are not allowed. Maximum length is 20 characters."
//   );
//   cy.log("Storefront link validation message displayed correctly");

//   cy.get(".creation-container > :nth-child(3) > span")
//     .invoke("text")
//     .should((text) => {
//       expect(Number(text)).to.be.a("number");
//     });
// });

/***
 * For this script to run do the following:
 * **use an agent's email that has been verified but has no existing store front created with it
 * ** Modify line 704 & 705 to carry the actual email.
 */

// it("should be able to create a storefront", () => {
//   const validFile = "gamma1.png";
//   const storefrontName = `Test${Date.now()} Academy`;
//   const storefrontLink = `Test${Date.now()}`;
//   cy.visit(`${baseUrl}/agents`);

//   // Enter login credentials and submit
//   cy.log("Entering valid agent email and password");
//   cy.get("#agentEmail").type("peaceoasis9023+1765277645205@gmail.com");
//   cy.get("#agentLogin").type("StrongPass123!");
//   cy.get(".button-submit").click();

//   // Wait for the dashboard to load and validate redirection
//   cy.log("Validating successful login and redirecting to the dashboard");
//   cy.url().should("include", "/overview");
//   cy.log("Successfully navigated to the dashboard");

//   cy.get("a.overview-btn")
//     .should("contain.text", "Create Storefront")
//     .should("be.visible")
//     .click();
//   cy.log("Navigating to the 'Create Storefront' page");
//   // Enter valid values for name, link, and price
//   cy.get("#storefrontName").type(storefrontName);
//   cy.log("Valid storefront name entered");

//   cy.get("#storefrontLink").type(storefrontLink);
//   cy.log("Valid storefront link entered");

//   cy.get("#setPrice").clear().type("3000");
//   cy.log("Valid price entered");

//   cy.get(".save-btn").click();
//   cy.get(
//     'input[type="file"][accept="image/png, image/jpeg, image/jpg,image/svg+xml"]'
//   ).selectFile(`cypress/fixtures/${validFile}`, { force: true });
//   cy.get('.openLink.ng-star-inserted').click();
//   cy.get('.publish-section > h5')

//   cy.get(".publish-section > h5")
//     .should("contain.text", "Congratulations")
//     .should("be.visible")
//     .click();
//     cy.get(".publish-paragraph")
//       .should("contain.text", "Your storefront has been published")
//       .should("be.visible")
//       .click();
//     cy.get(".publishLink")
//       .should("contain.text", "Copy Storefront Link")
//       .should("be.visible")
//       .click();
// });

// it("should be able to register a business using a storefront link", () => {
//   cy.log("Opening application form for new registration");
//   cy.visit(`${baseUrl}/storefront/bterry`);
//   cy.get('[style="color: rgb(255, 255, 255); background-color: rgb(33, 150, 83);"]')
//     .contains("Register New Business")
//     .click();
//   cy.url().should("include", "/bterry/application");

//   cy.log("Filling form with a unique business name");
//   cy.get("#BusinessName").type("Mandatory Goto Hub");
//   cy.get("#companyEmail").type("joyoasis9023@gmail.com");
//   cy.get("#companyStreetNumber").type("12");
//   cy.get("#companyStateOfResidence").select("Kano State");
//   cy.get("#companyAddress").type("12B Airport Road, Kano");
//   cy.get("#companyCity").type("Kano");
//   cy.get("#lineOfBusiness").select("Trading");

//   cy.log("Intercepting name compliance check");
//   cy.intercept(
//     "POST",
//     "http://41.207.248.246:9088/api/ls/bn/external-registration/check-name"
//   ).as("checkName");
//   cy.get("button[class$='ng-star-inserted']")
//     .contains("Check compliance")
//     .click();

//   cy.wait("@checkName").then(({ response }) => {
//     const { statusCode } = response;
//     cy.log(`Compliance response: ${statusCode}`);

//     if (statusCode === 200) {
//       cy.log("Filling proprietor bio data section");
//       cy.get("h4").contains("Business Registration form");
//       cy.get("#proprietorFirstName").type("Agada");
//       cy.get("#proprietorLastName").type("Joseph");
//       cy.get("#proprietorOtherName").type("Akpala");
//       cy.get("#proprietorPhoneNumber").type("08033221100");
//       cy.get("#proprietorEmail").type("geeee9023@gmail.com");
//       cy.get("#proprietorGender").select("Male");
//       cy.get(".nextBtn").contains("Next").click();

//       cy.log("Completing demographic data section");
//       cy.get("#proprietorStreetNumber").type("40");
//       cy.get("#proprietorState").select("Adamawa State");
//       cy.get("#proprietorCity").type("Mubi");
//       cy.get("#proprietorLga").select("Hong");
//       cy.get("#proprietorDob")
//         .type("1995-06-01")
//         .should("have.value", "1995-06-01");
//       cy.get("#proprietorServiceAddress").type("College Road");
//       cy.get(".nextBtn").contains("Next").click();

//       const largeFile = "spiral.png";
//       cy.log("Uploading large invalid files to test file size validation");

//       [
//         "Upload Proprietor Signature",
//         "Upload Proprietor ID",
//         "Upload Proprietor Photograph",
//         "Upload Supporting Document",
//       ].forEach((label) => {
//         cy.contains(label)
//           .parent()
//           .find('input[type="file"]')
//           .selectFile(`cypress/fixtures/${largeFile}`, { force: true });
//       });

//       const errorSelectors = [
//         ":nth-child(1) > :nth-child(2) > div.ng-star-inserted > .error-message",
//         ":nth-child(2) > :nth-child(2) > div.ng-star-inserted > .error-message",
//         ":nth-child(3) > :nth-child(2) > div.ng-star-inserted > .error-message",
//         ":nth-child(4) > :nth-child(2) > div.ng-star-inserted > .error-message",
//       ];

//       cy.log("Validating oversized file error messages");
//       errorSelectors.forEach((selector) => {
//         cy.get(selector)
//           .invoke("text")
//           .should((text) =>
//             expect(text.trim().toLowerCase()).to.match(
//               /file size exceed(s)? 500kb/i
//             )
//           );
//       });

//       const validFile = "gamma1.png";
//       cy.log("Uploading valid files after error");
//       [
//         "Upload Proprietor Signature",
//         "Upload Proprietor ID",
//         "Upload Proprietor Photograph",
//         "Upload Supporting Document",
//       ].forEach((label) => {
//         cy.contains(label)
//           .parent()
//           .find('input[type="file"]')
//           .selectFile(`cypress/fixtures/${validFile}`, { force: true });
//       });

//       cy.log("Submitting registration form for payment");
//       cy.get(".submitBtn").should("not.be.disabled").click();
//       cy.wait(3000);
//       cy.get(".header > .words", { timeout: 10000 })
//         .contains("Payment")
//         .should("exist");

//       cy.wait(1000);
//       cy.log("Entering mismatched emails to test validation");
//       cy.get('input[formcontrolname="email"]').type("test1@example.com");
//       cy.get('input[formcontrolname="confirmEmail"]').type(
//         "test2@example.com"
//       );
//       cy.get("button.status-button").contains("Make Payment").click();

//       cy.get('div[class$="error-background"] div')
//         .should("contain.text", "Emails supplied do not match")
//         .then(() => {
//           cy.log("Mismatched email error confirmed");
//           cy.get('div[class$="error-background"] svg').click({ force: true });
//           cy.log("Closed mismatched email modal");
//         });

//       cy.log("Entering matching emails for payment");
//       cy.get('input[formcontrolname="email"]')
//         .clear()
//         .type("geeee9023@gmail.com");
//       cy.get('input[formcontrolname="confirmEmail"]')
//         .clear()
//         .type("geeee9023@gmail.com");
//       cy.get("button.status-button").contains("Make Payment").click();
//     }
//   });

//   cy.log("Final confirmation of payment modal");
//   cy.get("h3").contains("Payment").should("exist");
//   cy.wait(80000)
// });

// });
});