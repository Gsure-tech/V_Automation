describe("LGS Business Name Registration Flow", () => {
  const baseUrl = "http://lgs.oasisproducts.ng";

  // it("loads the registration landing page and confirms visibility of primary elements", () => {
  //   cy.log("Visiting the business registration landing page");
  //   cy.visit(`${baseUrl}/Bn-registration`);

  //   cy.log("Validating presence of headline text");
  //   cy.get(".words").contains("Register A New Business Name In 4 simple Steps");

  //   cy.log("Validating visibility of navigation buttons");
  //   cy.get('[routerlink="/Bn-registration/application"]')
  //     .contains("Register New Business")
  //     .should("be.visible");
  //   cy.get('button[routerlink="/status"]')
  //     .contains("Check Registration Status")
  //     .should("be.visible");
  //   cy.get('button[routerlink="/agents"]')
  //     .contains("Signup for Free")
  //     .should("be.visible");
  // });

  // it("shows error modal when name already exists during compliance check", () => {
  //   cy.log("Navigating to application form");
  //   cy.visit(`${baseUrl}/Bn-registration`);
  //   cy.get('[routerlink="/Bn-registration/application"]')
  //     .contains("Register New Business")
  //     .click();
  //   cy.url().should("include", "/Bn-registration/application");

  //   cy.log("Filling business registration form with existing name");
  //   cy.get("#BusinessName").type("Mighty Accelarator Hub");
  //   cy.get("#companyEmail").type("founder@mah.com");
  //   cy.get("#companyStreetNumber").type("12");
  //   cy.get("#companyStateOfResidence").select("Kano State");
  //   cy.get("#companyAddress").type("12B Airport Road, Kano");
  //   cy.get("#companyCity").type("Kano");
  //   cy.get("#lineOfBusiness").select("Legal practice and Consultancy");

  //   cy.log("Clicking Check Compliance button");
  //   cy.get("button[class$='ng-star-inserted']")
  //     .contains("Check compliance")
  //     .click();

  //   cy.log("Waiting for modal header to appear");
  //   cy.get(".words", { timeout: 50000 })
  //     .should("be.visible")
  //     .and("contain.text", "Business Name Compliance Check");

  //   cy.log("Validating modal content for existing name");
  //   cy.get(".info-span > .paragraph")
  //     .should("be.visible")
  //     .and("contain.text", "BUSINESS NAME EXISTS");

  //   cy.log("Closing the compliance modal using SVG icon");
  //   cy.get('svg[viewBox="0 0 21 21"]').click();
  // });

  // it("registers successfully with valid name and uploads valid files", () => {
  //   cy.log("Opening application form for new registration");
  //   cy.visit(`${baseUrl}/Bn-registration`);
  //   cy.get('[routerlink="/Bn-registration/application"]')
  //     .contains("Register New Business")
  //     .click();
  //   cy.url().should("include", "/Bn-registration/application");

  //   cy.log("Filling form with a unique business name");
  //   cy.get("#BusinessName").type("hakutestreal Hub");
  //   cy.get("#companyEmail").type("founder@mah.com");
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
  // });

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
  //   cy.visit(`${baseUrl}`);
  //   cy.get(".becomeAnAgentBtn").contains("Signup for Free").click();

  //   cy.get(":nth-child(6) > span").contains("Sign Up here!").click();

  //   // Fill form
  //   cy.get("#firstName").type("Adedeji");
  //   cy.get("#lastName").type("Adetokunbo");
  //   const uniqueId = Date.now();
  //   cy.get("#createEmail").type(`peaceoasis9023+${uniqueId}@gmail.com`);
  //   cy.get("#createPassword").type("StrongPass123!");

  //   // Submit
  //   cy.get(".button-submit").click();

  //   // Email verification modal appears
  //   cy.get(".agent-title-words").should(
  //     "contain.text",
  //     "Verify your email address"
  //   );
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
  //   cy.visit(`${baseUrl}`);
  //   cy.get(".becomeAnAgentBtn").contains("Signup for Free").click();

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
  //   cy.visit(`${baseUrl}`);
  //   cy.get(".becomeAnAgentBtn").contains("Signup for Free").click();
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
  //   cy.visit(`${baseUrl}`);
  //   cy.get(".becomeAnAgentBtn").contains("Signup for Free").click();

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
  //   cy.visit(`${baseUrl}`);
  //   cy.get(".becomeAnAgentBtn").contains("Signup for Free").click();

  //   // Login page is default
  //   cy.get("#agentEmail").type("testagent@example.com");
  //   cy.get("#agentLogin").type("StrongPass123!");
  //   cy.get(".button-submit").click();

  //   cy.get(".containerModal > div").contains("invalid credentials");

  //   // Validate redirect or welcome
  //   cy.url().should("not.include", "/create-account");
  // });

  // it('should display "Invalid username or password" with a valid email and incorrect password', () => {
  //   cy.visit(`${baseUrl}`);
  //   cy.get(".becomeAnAgentBtn").contains("Signup for Free").click();

  //   // Login page is default
  //   cy.get("#agentEmail").type("joyoasis9023@gmail.com");
  //   cy.get("#agentLogin").type("StrongPass123!");
  //   cy.get(".button-submit").click();

  //   cy.get(".containerModal > div").contains("Invalid username or password");
  // });

  // it('should display "invalid credentials" with an invalid email and correct password', () => {
  //   cy.visit(`${baseUrl}`);
  //   cy.get(".becomeAnAgentBtn").contains("Signup for Free").click();

  //   cy.get("#agentEmail").type("doyo9023@gmail.com");
  //   cy.get("#agentLogin").type("Gsure9023@2025");
  //   cy.get(".button-submit").click();

  //   cy.get(".containerModal > div").contains("invalid credentials");

  //   // Validate redirect or welcome
  //   cy.url().should("not.include", "/create-account");
  // });

//  it("should successfully log in, verify dashboard content,ensure navigation and KYC sections are visible and logout", () => {
//    // Navigate to the base URL and click 'Signup for Free' button
//    cy.visit(`${baseUrl}`);
//    cy.log('Visiting the base URL and clicking the "Signup for Free" button');
//    cy.get(".becomeAnAgentBtn").contains("Signup for Free").click();

//    // Enter login credentials and submit
//    cy.log("Entering valid agent email and password");
//    cy.get("#agentEmail").type("joyoasis9023+3@gmail.com");
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


 it("should show errors for invalid inputs in storefront creation", () => {
    cy.visit(`${baseUrl}`);
    cy.log('Visiting the base URL and clicking the "Signup for Free" button');
    cy.get(".becomeAnAgentBtn").contains("Signup for Free").click();

    // Enter login credentials and submit
    cy.log("Entering valid agent email and password");
    cy.get("#agentEmail").type("joyoasis9023+3@gmail.com");
    cy.get("#agentLogin").type("Gsure9023@2025");
    cy.get(".button-submit").click();

    // Wait for the dashboard to load and validate redirection
    cy.log("Validating successful login and redirecting to the dashboard");
    cy.url().should("include", "/overview");
    cy.log("Successfully navigated to the dashboard");

    cy.get("a.overview-btn").should("contain.text", "Create Storefront")
      .should("be.visible").click();
    cy.log("Navigating to the 'Create Storefront' page");
    
    // ===================== Negative Test - Storefront Name =====================
    
    cy.log("Entering invalid storefront name with spaces and special characters");
    cy.get("#storefrontName").clear().type("testers_storefront");
   cy.get(".text-danger").should(
     "contain.text",
     "Only letters, numbers, and " &
       " are allowed! Spaces are not allowed. Maximum length is 50 characters."
   );
    cy.log("Storefront name validation message displayed correctly");

    // ===================== Negative Test - Storefront Link =====================
    
    cy.log("Entering invalid storefront link with special character");
     cy.get("#storefrontLink").clear().type("testerstore_");
   cy.get('.text-danger').should(
     "contain.text",
     "Only letters, numbers, and " &
       " are allowed! Spaces are not allowed. Maximum length is 20 characters."
   );
    cy.log("Storefront link validation message displayed correctly");

    // ===================== Negative Test - Storefront Price =====================

    cy.log("Entering invalid price (non-numeric value)");
     cy.get('#setPrice').clear().type("Fiftykay")
    cy.get('.creation-container > :nth-child(3) > span').should("contain.text", "NaN")
     .should("be.visible");
    cy.log("Invalid price validation displayed correctly");

  });


it("should be able to create a storefront", () => {
    cy.visit(`${baseUrl}`);
    cy.log('Visiting the base URL and clicking the "Signup for Free" button');
    cy.get(".becomeAnAgentBtn").contains("Signup for Free").click();

    // Enter login credentials and submit
    cy.log("Entering valid agent email and password");
    cy.get("#agentEmail").type("joyoasis9023+3@gmail.com");
    cy.get("#agentLogin").type("Gsure9023@2025");
    cy.get(".button-submit").click();

    // Wait for the dashboard to load and validate redirection
    cy.log("Validating successful login and redirecting to the dashboard");
    cy.url().should("include", "/overview");
    cy.log("Successfully navigated to the dashboard");

    cy.get("a.overview-btn").should("contain.text", "Create Storefront")
      .should("be.visible").click();
    cy.log("Navigating to the 'Create Storefront' page");

    // Enter valid values for name, link, and price
    cy.get("#storefrontName").clear().type("testerstorefront");
    cy.log("Valid storefront name entered");

    cy.get("#storefrontLink").clear().type("testerstore");
    cy.log("Valid storefront link entered");

    cy.get('#setPrice').clear().type("3000");
    cy.log("Valid price entered");
    
    // Add any other steps to complete the storefront creation, like submitting the form
  });

  


});
