describe("CAC Business Name Reservation UI Tests", () => {

    beforeEach(() => {
        cy.session("loginSession", () => {
            cy.visit("https://www.cac.oasisproducts.ng/auth/login");
            cy.contains("Email").click();

            cy.get("input[formcontrolname='email']").type("ookorie@mailinator.com");
            cy.get("input[formcontrolname='password']").type("Password55");
            cy.get("#flexCheckDefault").check();
            cy.get("button[class$='w-100']").click();

            // Static OTP (replace with real if needed)
            cy.get("input[name='otp'], input[formcontrolname='otp']").type("123456");
            cy.get("button[class$='btn-success']").click();

            cy.url({ timeout: 20000 }).should("include", "/dashboard");
        });

        // Ensure the dashboard is loaded after session restore
        cy.visit("https://www.cac.oasisproducts.ng/dashboard");
    }); // ✅ properly close beforeEach here


    // it("Business Name Reservation (Sole Proprietor)", () => {
    //
    //     // Click on New Reservation using text instead of class
    //     cy.contains("New Reservation", { timeout: 10000 }).should("be.visible").click();
    //
    //     // Select Business Classification and Type
    //     cy.get("select[formcontrolname='businessClassification']")
    //         .should("be.visible")
    //         .select("Business Name");
    //     cy.get("select[formcontrolname='businessType']")
    //         .should("be.visible")
    //         .select("Sole Proprietor");
    //
    //     // Click Continue
    //     cy.contains("CONTINUE").should("be.visible").click();
    //
    //     // Fill Business Name and Nature
    //     cy.get("input[formcontrolname='businessName']").should("be.visible").clear().type("POTATO BARBERS VENTURES");
    //     cy.get("select[formcontrolname='natureOfBusinessCategory']").should("be.visible").select("Education");
    //     cy.get("select[formcontrolname='natureOfBusiness']").should("be.visible").select("Education");
    //
    //     // Check Availability
    //     cy.contains("CHECK AVAILABILITY").should("be.visible").click();
    //     cy.get('.footer-btn', { timeout: 10000 }).click({ force: true });
    //
    //     // Continue to Payment
    //     cy.contains("CONTINUE TO PAYMENT").should("be.visible").click();
    //     cy.get("button[class='remita-btn']").click();
    //     cy.wait(60000); // wait for payment modal
    //
    //     // // Payment iframe steps (commented out)
    //     // cy.get('iframe[name="paymentFrame"]', { timeout: 10000 }).should('be.visible').then(($iframe) => {
    //     //   const $body = $iframe[0].contentDocument?.body;
    //     //   if ($body) {
    //     //     cy.wrap($body).as('iframeBody');
    //     //   }
    //     // });
    //     // cy.get('@iframeBody').find('#js-cf-pan').should('be.visible').type('5178681000000002');
    //     // cy.get('@iframeBody').find('#js-cf-expiryDate').should('be.visible').type('0530');
    //     // cy.get('@iframeBody').find('#js-cf-cvv').should('be.visible').type('000');
    //     // cy.get('@iframeBody').find('#js-cf-payBtn').click();
    //     // cy.wait(2000);
    //     // cy.get('@iframeBody').find('[name="otp"]').should('be.visible').type('123456');
    //     // cy.get('@iframeBody').find('#validate-btn').click();
    //
    //     // After payment, continue to filing
    //     cy.get("button.btn.btn-primary.px-4.fs-14").should("be.visible").click();
    // });

    it("Sole Proprietor Business Name Registration", () => {

        // Navigate to Business Registration
        cy.contains("Registrations", { timeout: 15000 }).should("be.visible").click();
        cy.url({ timeout: 10000 }).should("include", "business-registration");

        // Click on Register New Business
        cy.get("button[class$='text-uppercase']").should("be.visible").click();

        // Enter AV Code and continue
        cy.get("input[placeholder='Enter Code']").should("be.visible").type('175629486878');
        cy.get("button[class$='btn-primary']").should("be.visible").click();

        // // Additional company info (commented out)
        // cy.get("input[placeholder='Enter Email']").type('jevmis28@yahoo.com');
        // cy.get("select[formcontrolname='companyStateOfResidence']").should('be.visible').select('FCT');
        // cy.get("input[placeholder='Enter City']").type('Wuse 2');
        // cy.get("input[placeholder='Enter Street Number']").type('12');
        // cy.get("input[placeholder='Enter Address']").type('Parakou');
        // cy.get("input[placeholder='Enter First']").should('be.visible').clear().type('2025-08-27');

        // Save & Continue
        cy.get("button[class$='btn-success']").should("be.visible").click();
        cy.get("button[class*='btn-primary']").should("be.visible").click();

        // Proprietor Information
        cy.get("input[formcontrolname='lastName']").should("be.visible").type('Ndueso');
        cy.get("input[formcontrolname='firstName']").type('Michael');
        cy.get("input[formcontrolname='otherName']").type('Jackson');
        cy.get("#phone").type('+2348098963410');
        cy.get("select[formcontrolname='gender']").select('MALE');
        cy.get("input[formcontrolname='dob']").clear().type('1996-05-12');
        cy.get("select[formcontrolname='state']").select('FCT');
        cy.get("select[formcontrolname='lga']").select('Amac');
        cy.get("input[formcontrolname='city']").type('Wuse 2');
        cy.get("input[formcontrolname='streetNumber']").type('12');
        cy.get("input[formcontrolname='serviceAddress']").type('Parakou');

        cy.get("button[class*='ps-1']").click(); // Add Proprietor
        cy.get("button[class$='btn-success']").should("be.visible").click();
        cy.wait(2000);

        // Document Uploads
        // Wait for the proprietor select to be ready
        cy.get("select[formcontrolname='proprietor']", { timeout: 10000 })
            .should("be.visible")
            .select('Ndueso J Michael');

        // Wait for all 3 file inputs to exist and be visible
        cy.get("input[formcontrolname='meansOfIDFile']", { timeout: 10000 }).should('exist');
        cy.get("input[formcontrolname='passportFile']").should('exist');
        cy.get("input[formcontrolname='signatureFile']").should('exist');

        // Attach the files
        cy.get("input[formcontrolname='meansOfIDFile']").eq(0).attachFile('HFV.jpeg', { force: true });
        cy.get("input[formcontrolname='passportFile']").eq(0).attachFile('mjsig.png', { force: true });
        cy.get("input[formcontrolname='signatureFile']").eq(0).attachFile('spiral.png', { force: true });

            // Click "Add Proprietor" and wait for confirmation
        cy.get("button[class*='ps-1']", { timeout: 10000 })
            .should("be.visible")
            .click({ force: true });

        // Ensure "Save & Continue" button is visible before clicking
        cy.get("button[class$='btn-success']", { timeout: 10000 })
            .should("be.visible")
            .click();

    });

//   it("Business Name Reservation (Partnership)", () => {
//
//     // cy.get(':nth-child(1) > .form-control').type(uName).trigger("change");
//     // cy.get(':nth-child(2) > .form-control').type(pWord).trigger("change");
//     // cy.get(".btn-success.w-100").click();
//
//     // OTP via MailSlurp (uncomment if needed)
//     // cy.wrap(null).then(async () => {
//     //   const { getLatestOtp } = await import("../../support/mailslurp"); // fixed path
//     //   const otp = await getLatestOtp();
//     //   cy.get("input[name='otp'], input[formcontrolname='otp']").type(otp);
//     //   cy.get("button[type='submit'], button:contains('Verify'), .btn-success").click();
//     // });
//
//
//     cy.url().should("include", "/dashboard");
//
//     // Click on New Reservation
//     cy.get("svg[data-icon='majesticons:plus']")
//         .should("be.visible")
//         .click();
//
//     // Select the Business Classification
//     cy.get("select[formcontrolname='businessClassification']")
//         .should("be.visible")
//         .select("Business Name");
//
//     // Select the Business Type
//     cy.get("select[formcontrolname='businessType']")
//         .should("be.visible")
//         .select("Partnership");
//
//     // Click on Continue
//     cy.contains("CONTINUE")
//         .should("be.visible")
//         .click();
//
//     // Type in the Business Name
//     cy.get("input[formcontrolname='businessName']")
//         .should("be.visible")
//         .clear()
//         .type("BUSINESS BARBERS VENTURES");
//
//     // Select the Nature of Business Category
//     cy.get("select[formcontrolname='natureOfBusinessCategory']")
//         .should("be.visible")
//         .select("Education");
//
//     // Select the Specific Nature of Business
//     cy.get("select[formcontrolname='natureOfBusiness']")
//         .should("be.visible")
//         .select("Education");
//
//     // Click on Check Availability
//     cy.contains("CHECK AVAILABILITY")
//         .should("be.visible")
//         .click();
//
//     cy.wait(10000); // Wait for modal result
//
//     // Wait for Modal and Click Continue
//     cy.get('.footer-btn').click({ force: true });
//
//     cy.wait(2000);
//
//     // Click on Continue to Payment
//     cy.contains("CONTINUE TO PAYMENT").click();
//
//     cy.wait(5000); // Wait for modal to load
//
//     // Wait for the Remita iframe or fields to be ready
// // Click on Remita
//     cy.get("button[class='remita-btn']"). click();
//
//     cy.wait(10000); // Wait for modal to load
// //
// //
// // // Wait for and access the iframe
// //     cy.get('iframe[name="paymentFrame"]', { timeout: 10000 }) // increase timeout
// //         .should('be.visible')
// //         .then(($iframe) => {
// //           const $body = $iframe[0].contentDocument?.body;
// //           if ($body) {
// //             cy.wrap($body).as('iframeBody');
// //           }
// //         });
// //
// // // Fill in Card Number
// //     cy.get('@iframeBody').find('#js-cf-pan').should('be.visible').type('5178681000000002');
// //
// // // Fill in Expiry Date
// //     cy.get('@iframeBody').find('#js-cf-expiryDate').should('be.visible').type('0530');
// //
// // // Fill in CVV
// //     cy.get('@iframeBody').find('#js-cf-cvv').should('be.visible').type('000');
// //
// // // Click the Pay button
// //     cy.get('@iframeBody').find('#js-cf-payBtn').click();
// //
// // // Wait for OTP modal
// //     cy.wait(2000);
// //
// // // Fill in OTP
// //     cy.get('@iframeBody').find('[name="otp"]').should('be.visible').type('123456');
// //
// // // Click the validate button
// //     cy.get('@iframeBody').find('#validate-btn').click();
// //
// // After payment, continue to filing (outside iframe)
//     cy.get("button.btn.btn-primary.px-4.fs-14").click();
//
//
//   });

//   it("Partnership Business Name Registration ", () => {
  // cy.visit("https://cac.oasisproducts.ng/auth/login"); //
  //
  // // Type in the Username
  // cy.get("input[formcontrolname='username']").type('jevmis')
  //
  // // Type in the Password
  // cy.get("input[formcontrolname='password']").type('*Mndueso3')
  //
  // // Tick on Remember me
  // cy.get("#flexCheckDefault").click();
  //
  // // Click on Login
  // cy.get("button[class$='w-100']").click();
  //
  // // Wait and Type in the OTP
  // cy.wait(50000); // Let page load after login
  //
  //     // Click Submit
  // cy.get("button[class$='btn-success']").click();
// //
// //
// //     // cy.get(':nth-child(1) > .form-control').type(uName).trigger("change");
// //     // cy.get(':nth-child(2) > .form-control').type(pWord).trigger("change");
// //     // cy.get(".btn-success.w-100").click();
// //
// //     // OTP via MailSlurp (uncomment if needed)
// //     // cy.wrap(null).then(async () => {
// //     //   const { getLatestOtp } = await import("../../support/mailslurp"); // fixed path
// //     //   const otp = await getLatestOtp();
// //     //   cy.get("input[name='otp'], input[formcontrolname='otp']").type(otp);
// //     //   cy.get("button[type='submit'], button:contains('Verify'), .btn-success").click();
// //     // });
// //
// // Click on Business Registration
//     cy.contains("Registrations").click();
//
//     cy.url().should("include", "business-registration");
//
//     // Click on Register New Business
//     cy.get("button[class$='text-uppercase']")
//         .should("be.visible")
//         .click();
//
//
//     // Type in the AV Code
//     cy.get("input[placeholder='Enter Code']").type('175336650515');
//
//     // Click on the Continue Button
//     cy.get("button[class$='btn-primary']").click();
// //
// //
// //     // // Type in the Company Email
// //     // cy.get("input[placeholder='Enter Email']").type('jevmis28@yahoo.com');
// //     //
// //     // // Select the Company State of Residence
// //     // cy.get("select[formcontrolname='companyStateOfResidence']").should('be.visible').select('FCT');
// //     //
// //     // // Type in the Company City
// //     // cy.get("input[placeholder='Enter City']").type('Wuse 2');
// //     //
// //     // // Type in the Company Street Number
// //     // cy.get("input[placeholder='Enter Street Number']").type('12');
// //     //
// //     // // Type in the Company Street Address
// //     // cy.get("input[placeholder='Enter Address']").type('Parakou');
// //     //
// //     // // Select the Business Commencement Date
// //     //  cy.get("input[placeholder='Enter First']").should('be.visible').clear().type('2000-05-15');
// //
//      // Click on Save & Continue
//     cy.get("button[class$='btn-success']").click();
//
//     // Click Yes
//     cy.get("button[class*='btn-primary']").click();
//
//
//
//     // Proprietor Information
//
//     // Type in the Proprietor Surname
//     cy.get("input[formcontrolname='lastName']").type('Ndueso')
//
//     // Type in the Proprietor First Name
//     cy.get("input[formcontrolname='firstName']").type('Michael')
//
//     // Type in the Proprietor Other Name (optional)
//     cy.get("input[formcontrolname='otherName']").type('Jackson')
//
//     // Type in the Proprietor Phone Number
//     cy.get("#phone").type('+2348098963410')
//
//     // Select the Proprietor Gender
//     cy.get("select[formcontrolname='gender']").should('be.visible').select('MALE');
//
//     // Select the Proprietor Date of Birth
//     cy.get("input[formcontrolname='dob']").should('be.visible').clear().type('1996-05-12');
//
//     // Select the Proprietor State
//     cy.get("select[formcontrolname='state']").should('be.visible').select('FCT');
//
//     // Select the Proprietor LGA
//     cy.get("select[formcontrolname='lga']").should('be.visible').select('Amac');
//
//     // Type in the Proprietor City
//     cy.get("input[formcontrolname='city']").type('Wuse 2');
//
//     // Type in the Proprietor Street Number
//     cy.get("input[formcontrolname='streetNumber']").type('12');
//
//     // Type in the Proprietor Service Address
//     cy.get("input[formcontrolname='serviceAddress']").type('Parakou');
//
//     // Click on "Add Proprietor"
//     cy.get("button[class*='ps-1']").click();
//
//     // Click on Save & Continue
//     cy.get("button[class$='btn-success']").click();
//     cy.wait(2000);
//
//     // Document Uploads
//     //Select the Proprietor
//     cy.get("select[formcontrolname='proprietor']").should('be.visible').select('Bond James');
//
// // // Upload Proprietor NIN Card/Slip
// //         cy.get('input[type="file"]').eq(0).attachFile('HFV.jpeg', { force: true });
// //
// // // Upload Proprietor Passport
// //     cy.get('input[type="file"]').eq(1).attachFile('mjsig.png', { force: true });
// //
// // // Upload Proprietor Signature
// //     cy.get('input[type="file"]').eq(2).attachFile('spiral.png', { force: true });
//
//
//     // Click on "Add Proprietor"
//     cy.get("button[class*='ps-1']").click();
//
//     // Click on Save & Continue
//     cy.get("button[class$='btn-success']").click();
//
//   });

//   it("Company Reservation (Private Company Limited By Shares)", () => {
//     cy.visit("https://cac.oasisproducts.ng/auth/login"); //
//
//     // Type in the Username
//     cy.get("input[formcontrolname='username']").type('jevmis')
//
//     // Type in the Password
//     cy.get("input[formcontrolname='password']").type('*Mndueso3')
//
//     // Tick on Remember me
//     cy.get("#flexCheckDefault").click();
//
//     // Click on Login
//     cy.get("button[class$='w-100']").click();
//
//     // Wait and Type in the OTP
//     cy.wait(50000); // Let page load after login
//
//     // Click Submit
//     it("Company Reservation (Private Company Limited By Shares)", () => {
//       cy.visit("https://cac.oasisproducts.ng/auth/login");
//
//       // Login
//       cy.get("input[formcontrolname='username']").type('jevmis');
//       cy.get("input[formcontrolname='password']").type('*Mndueso3');
//       cy.get("#flexCheckDefault").click();
//       cy.get("button[class$='w-100']").click();
//
//       // Wait for OTP and next page to load
//       cy.wait(30000); // Consider replacing this with dynamic waits
//
//       // Try safer selector and longer wait
//       cy.get("button[class*='btn-success']", { timeout: 10000 })
//           .should('be.visible')
//           .click();
//     });
//
//     // cy.get(':nth-child(1) > .form-control').type(uName).trigger("change");
//     // cy.get(':nth-child(2) > .form-control').type(pWord).trigger("change");
//     // cy.get(".btn-success.w-100").click();
//
//     // OTP via MailSlurp (uncomment if needed)
//     // cy.wrap(null).then(async () => {
//     //   const { getLatestOtp } = await import("../../support/mailslurp"); // fixed path
//     //   const otp = await getLatestOtp();
//     //   cy.get("input[name='otp'], input[formcontrolname='otp']").type(otp);
//     //   cy.get("button[type='submit'], button:contains('Verify'), .btn-success").click();
//     // });
//
//
//     cy.url().should("include", "/dashboard");
//
//     // Click on New Reservation
//     cy.get("svg[data-icon='majesticons:plus']")
//         .should("be.visible")
//         .click();
//
//     // Select the Business Classification
//     cy.get("select[formcontrolname='businessClassification']")
//         .should("be.visible")
//         .select("Company");
//
//     // Select the Business Type
//     cy.get("select[formcontrolname='businessType']")
//         .should("be.visible")
//         .select("Private Company Limited By Shares");
//
//     // Click on Continue
//     cy.contains("CONTINUE")
//         .should("be.visible")
//         .click();
//
//     // Company Information
//
//     // Type in the Business Name
//     cy.get("input[formcontrolname='businessName']")
//         .should("be.visible")
//         .clear()
//         .type("COMPANY VENTURES LTD");
//
//     // Select the Nature of Business Category
//     cy.get("select[formcontrolname='natureOfBusinessCategory']")
//         .should("be.visible")
//         .select("Education");
//
//     // Select the Specific Nature of Business
//     cy.get("select[formcontrolname='natureOfBusiness']")
//         .should("be.visible")
//         .select("Education");
//
//     // Click on Check Availability
//     cy.contains("CHECK AVAILABILITY")
//         .should("be.visible")
//         .click();
//
//     cy.wait(10000); // Wait for modal result
//
//     // Wait for Modal and Click Continue
//     cy.get('.footer-btn').click({ force: true });
//
//     cy.wait(2000);
//
//     // Click on Continue to Payment
//     cy.contains("CONTINUE TO PAYMENT").click();
//
//     cy.wait(5000); // Wait for modal to load
//
//     // Wait for the Remita iframe or fields to be ready
// // Click on Remita
//     cy.get("button[class='remita-btn']"). click();
//
//     // Wait and fill in the card details
//     cy.wait(50000);
// //
// //
// // // Wait for and access the iframe
// //     cy.get('iframe[name="paymentFrame"]', { timeout: 10000 }) // increase timeout
// //         .should('be.visible')
// //         .then(($iframe) => {
// //           const $body = $iframe[0].contentDocument?.body;
// //           if ($body) {
// //             cy.wrap($body).as('iframeBody');
// //           }
// //         });
// //
// // // Fill in Card Number
// //     cy.get('@iframeBody').find('#js-cf-pan').should('be.visible').type('5178681000000002');
// //
// // // Fill in Expiry Date
// //     cy.get('@iframeBody').find('#js-cf-expiryDate').should('be.visible').type('0530');
// //
// // // Fill in CVV
// //     cy.get('@iframeBody').find('#js-cf-cvv').should('be.visible').type('000');
// //
// // // Click the Pay button
// //     cy.get('@iframeBody').find('#js-cf-payBtn').click();
// //
// // // Wait for OTP modal
// //     cy.wait(2000);
// //
// // // Fill in OTP
// //     cy.get('@iframeBody').find('[name="otp"]').should('be.visible').type('123456');
// //
// // // Click the validate button
// //     cy.get('@iframeBody').find('#validate-btn').click();
// //
// // AFTER Remita Payment is Complete, back on main app
//     cy.wait(20000); // Wait for redirect or page update
//
// // Option A: Match by text if visible
//     cy.contains("Continue to Filing", { timeout: 15000 }) // adjust based on actual text
//         .should('be.visible')
//         .click();
//
// // Option B: If text isn't reliable, use partial class and longer timeout
//     cy.get("button.btn.btn-primary", { timeout: 15000 })
//         .should('be.visible')
//         .click();
//
// // Proprietor Information
//
//     // Type in the Proprietor Surname
//     cy.get("input[formcontrolname='lastName']").type('Ndueso')
//
//     // Type in the Proprietor First Name
//     cy.get("input[formcontrolname='firstName']").type('Michael')
//
//     // Type in the Proprietor Other Name (optional)
//     cy.get("input[formcontrolname='otherName']").type('Jackson')
//
//     // Type in the Proprietor Phone Number
//     cy.get("#phone").type('+2348098963410')
//
//     // Select the Proprietor Gender
//     cy.get("select[formcontrolname='gender']").should('be.visible').select('MALE');
//
//     // Select the Proprietor Date of Birth
//     cy.get("input[formcontrolname='dob']").should('be.visible').clear().type('1996-05-12');
//
//     // Select the Proprietor State
//     cy.get("select[formcontrolname='state']").should('be.visible').select('FCT');
//
//     // Select the Proprietor LGA
//     cy.get("select[formcontrolname='lga']").should('be.visible').select('Amac');
//
//     // Type in the Proprietor City
//     cy.get("input[formcontrolname='city']").type('Wuse 2');
//
//     // Type in the Proprietor Street Number
//     cy.get("input[formcontrolname='streetNumber']").type('12');
//
//     // Type in the Proprietor Service Address
//     cy.get("input[formcontrolname='serviceAddress']").type('Parakou');
//
//     // Click on "Add Proprietor"
//     cy.get("button[class*='ps-1']").click();
//
//     // Click on Save & Continue
//     cy.get("button[class$='btn-success']").click();
//     cy.wait(2000);
//
//     // Document Uploads
//     //Select the Proprietor
//     cy.get("select[formcontrolname='proprietor']").should('be.visible').select('Bond James');
//
// // Upload Proprietor NIN Card/Slip
//     cy.get('input[type="file"]').eq(0).attachFile('HFV.jpeg', { force: true });
//
// // Upload Proprietor Passport
//     cy.get('input[type="file"]').eq(1).attachFile('mjsig.png', { force: true });
//
// // Upload Proprietor Signature
//     cy.get('input[type="file"]').eq(2).attachFile('spiral.png', { force: true });
//
//
//     // Click on "Add Proprietor"
//     cy.get("button[class*='ps-1']").click();
//
//     // Click on Save & Continue
//     cy.get("button[class$='btn-success']").click();
//
//   });

//     it(" Company Business Registration ", () => {
//
//         cy.visit("https://cac.oasisproducts.ng/auth/login"); //
//
//         // Type in the Username
//         cy.get("input[formcontrolname='username']").should('be.visible').type('jevmis')
//
//         // Type in the Password
//         cy.get("input[formcontrolname='password']").should('be.visible').type('*Mndueso3')
//
//         // Tick on Remember me
//         cy.get("#flexCheckDefault").click();
//
//         // Click on Login
//         cy.get("button[class$='w-100']").should('be.enabled').click();
//
//         // Wait and Type in the OTP
//         cy.wait(30000); // Let page load after login
//
//
//         // Click Submit
//         // cy.get("button[class$='btn-success']").click();
//
//         // // Wait for the login API to complete
//         // cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
//         //
//         // // Wait for the user profile API to complete
//         // cy.wait('@userProfile').its('response.statusCode').should('eq', 200);
//         //
//         //
//         // //Login check if we are logged in as admin
//         // cy.url().should('include', '/admin/dashboard', { timeout: 10000 });
//         //
//
// //
// //
// //     // cy.get(':nth-child(1) > .form-control').type(uName).trigger("change");
// //     // cy.get(':nth-child(2) > .form-control').type(pWord).trigger("change");
// //     // cy.get(".btn-success.w-100").click();
// //
// //     // OTP via MailSlurp (uncomment if needed)
// //     // cy.wrap(null).then(async () => {
// //     //   const { getLatestOtp } = await import("../../support/mailslurp"); // fixed path
// //     //   const otp = await getLatestOtp();
// //     //   cy.get("input[name='otp'], input[formcontrolname='otp']").type(otp);
// //     //   cy.get("button[type='submit'], button:contains('Verify'), .btn-success").click();
// //     // });
// //
// // Click on Business Registration
//         cy.contains("Registrations").should('be.visible').click();
//
//         cy.url().should("include", "business-registration");
//
//         // Click on Register New Business
//         cy.get("button[class$='text-uppercase']")
//             .should("be.visible")
//             .click();
//
//
//         // Type in the AV Code
//         cy.get("input[placeholder='Enter Code']").type('175457388632');
//
//         // Click on the Continue Button
//         cy.get("button[class$='btn-primary']").click();
//         cy.wait(8000)
//
//         // // Type in the Company Email
//         // cy.get("input[placeholder='Enter Email']").type('jevmis28@yahoo.com');
//         //
//         // // Select the Company State of Residence
//         // cy.get("select[formcontrolname='companyStateOfResidence']").should('be.visible').select('FCT');
//         //
//         // // Type in the Company City
//         // cy.get("input[placeholder='Enter City']").type('Wuse 2');
//         //
//         // // Type in the Company Street Number
//         // cy.get("input[placeholder='Enter Street Number']").type('12');
//         //
//         // // Type in the Company Street Address
//         // cy.get("input[placeholder='Enter Address']").type('Parakou');
//         //
//         // // Select the Business Commencement Date
//         //  cy.get("input[placeholder='Enter First']").should('be.visible').clear().type('2000-05-15');
// //
//         // Click on Save & Continue
//         cy.get("button[class$='btn-success']").should('be.visible').click();
//         //
//         // // Click Yes
//         // cy.get("button[class*='btn-primary']").click();
//         //   cy.wait(50000)
//
//
//
//         // // Company Details
//         //
//         // // Type in the Email Address
//         // cy.get("input[formcontrolname='email']").type('mndueso@oasismgt.net')
//         //
//         // // Select the Principal Business Activity
//         //   cy.get("select[formcontrolname='principalActivity']").should('be.visible').select('Education');
//         //
//         //   // Select the Specific Business Activity
//         //   cy.get("select[formcontrolname='specificActivity']").should('be.visible').select('Education');
//         //
//         // // Type in the Description of the Business Activity
//         // cy.get("textarea[formcontrolname='descriptionOfAssociationActivity']").type('+qwertrtyiuoioppuytdsadfghjlkjhbnvcxz')
//         //
//         //
//         //   //Registered Office Address
//         //
//         // // Select the State
//         // cy.get("select[formcontrolname='state']").should('be.visible').select('FCT');
//         //
//         // // Select the LGA
//         // cy.get("select[formcontrolname='lga']").should('be.visible').select('Amac');
//         //
//         // // Type in the City/Town/Village
//         // cy.get("input[formcontrolname='city']").type('Wuse 2');
//         //
//         // // Type in the Post Code (optional)
//         // cy.get("input[formcontrolname='postCode']").type('9000123');
//         //
//         // // Type in the House Number/Building Name
//         // cy.get("input[formcontrolname='houseNumber']").type('Parakou Duplex');
//         //
//         //   // Type in the Street Name
//         //   cy.get("input[formcontrolname='streetName']").type('Parakou ');
//         //
//         //
//         //   //Head Office Address (if applicable)
//         //   // Tick on "Same as Registered Address?"
//         //   cy.get("input[formcontrolname='sameAsRegisteredOffice']").click();
//         //
//         //
//         // // Click on Save & Continue
//         // cy.get("button[class$='btn-success']").click();
//         // cy.wait(2000);
//
//
//
//         // Articles of Association
//         // //Add / Adopt Article
//         //   //Type in the Part
//         //   cy.get("input[formcontrolname='part']").type('2');
//         //
//         //   //Type in the Title
//         //   cy.get("input[formcontrolname='title']").type('Testing Articles');
//         //
//         //   //Type in the Subtitle
//         //   cy.get("input[formcontrolname='subtitle']").type('Testing Subtitle');
//         //
//         //   //Type in the Subtitle
//         //   cy.get("div[data-placeholder*='of']").type('Textbox Testingggggggggg');
//         //
//         //
//         //
//         //   // Click on Add Article of Association
//         //   cy.contains(" Add Article of Association ").click();
//
//         cy.intercept("GET","https://cac.oasisproducts.ng/pre_backend_service/api/company-registration/find/articles-of-association/10075213").as('getArticle')
//
//         // Wait for the user profile API to complete
//         cy.wait('@getArticle' ,{ timeout: 200000 }).its('response.statusCode').should('eq', 200);
//
//
//
//         // Click on Adopt Default Article of Association
//         cy.contains("Adopt Default Article of Association").should('be.visible').click();
//
//         //Witnesse
//         // Click on Add New Witness
//         // cy.get("button[class*='ps-1']").click();
//
// //       //Add Witness
// //       //Details of Witness
// //       // Type in the Surname
// //       cy.get("input[formcontrolname='surname']").type('Ndueso');
// //
// //       // Type in the First Name
// //       cy.get("input[formcontrolname='firstName']").type('Jackson');
// //
// //       // Type in the Other name (optional)
// //       cy.get("input[formcontrolname='otherName']").type('Jackson');
// //
// //       // Select the Date of Birth
// //     cy.get("input[formcontrolname='dateOfBirth']").should('be.visible').clear().type('1996-05-12');
// //
// //     // Select the Gender
// //     cy.get("select[formcontrolname='gender']").should('be.visible').select('MALE');
// //
// //     // Type in the Occupation
// //     cy.get("input[formcontrolname='occupation']").type('TESTER');
// //
// //     // Type in the Phone Number
// //     cy.get("#phone").type('+2348098963410')
// //
// //       // Type in the Email Address
// //     cy.get("input[formcontrolname='email']").type('jevmis28.mj@gmail.com')
// //
// //
// //       // Address
// // // Select the Country
// // //       cy.wait(20000) //(type in the address manually)
// // //       cy.get("select[formcontrolname='country']").should('be.visible').select('Nigeria');
// //
// //
// // // Select the State
// //       cy.get("select[formcontrolname='state']").should('be.visible').select('FCT');
// //
// //
// // // Select the LGA
// //       cy.get("select[formcontrolname='lga']").should('be.visible').select('Amac');
// //
// //
// // // Type in the Postal Code (optional)
// //       cy.get("input[formcontrolname='postCode']").should('be.visible').type('9001012');
// //
// // // Type in the City
// //       cy.get("input[formcontrolname='city']").should('be.visible').type('Wuse 2');
// //
// //
// // // Type in the House Number/Building Name
// //       cy.get("input[formcontrolname='houseNumber']").should('be.visible').type('12');
// //
// //
// // // Type in the Street Name
// //       cy.get("input[formcontrolname='streetName']").should('be.visible').type('Parakou');
// //
// //
// //       // Click on Add & Continue
// //       cy.get("button[class$='fs-16']").click();
// //
// //         cy.wait(2000)
// //       // Click on Save & Continue
// //       cy.get("button[class$='btn-success']").click();
// //       cy.wait(10000)
// //
// //
// //
// //       //Objects of Memorandum
// //       // Type in the Objects of Memorandum
// //       cy.get("textarea[formcontrolname='objective']").should('be.visible').type('Object Testing zfasgbhgbsgbsdbsb');
// //
// //       // Click on Add Object
// //       cy.get("button[class*='ps-1']").click()
//
//         // Click on Save & Continue
//         cy.get("button[class$='btn-success']").should('be.visible').click();
//         cy.wait(15000)
//
//
//         // Click on Save & Continue
//         cy.get("button[class$='btn-success']").should('be.visible').click();
//         cy.wait(10000)
//
//         // Directors/Secretary
//         // Click on Save & Continue
//         cy.get("button[class$='btn-success']").should('be.visible').click();
//         cy.wait(4000)
//
//
//         // Click on Close
//         cy.get("div[class$='pb-3'] button").should('be.visible').click();
//         cy.wait(2000)
//
//
//         //Share Issue Capital
// // Select the Type of Company
//         cy.get("select[formcontrolname='typeOfCompany']").should('be.visible').select('TRUSTEE');
//
// // //Total Company Issued Share Capital
// //       // Type in the Total Issued Share Capital (in Naira)
// //       cy.get("input[formcontrolname='totalIssuedShareCapital']").should('be.visible').type('300000000');
//
//         // Share Details Breakdown
//         // Select the Class of Shares
//         cy.get("select[formcontrolname='classOfShare']").should('be.visible').select('PREFERENCE');
//
//
//         // Type in the Issued Share Capital (in Naira)
//         cy.get("input[formcontrolname='issuedShareCapital']").should('be.visible').type('300000000');
//
//         // Type in the Divided Into (Number of Units)
//         cy.get("input[placeholder='Enter Number of Units']").should('be.visible').type('2');
//
//
//         // Click on Add Share Breakdown
//         cy.get("button[class*='ps-1']").click();
//         cy.wait(1000)
//
//         //Shareholders
//         //Select Shareholder
//         cy.get("select[formcontrolname='type']").should('be.visible').select('Minor Shareholder');
//
//
//         // Click on Continue
//         cy.get("button[class$='btn-primary']").click();
//         cy.wait(1000)
//
//
// //Add Minor Shareholder
//         // Personal Details
//         // Type in the Surname
//         cy.get("input[formcontrolname='surname']").type('Ndueso');
//
//         // Type in the First Name
//         cy.get("input[formcontrolname='firstName']").type('Jackson');
//
//         // Type in the Other name (optional)
//         cy.get("input[formcontrolname='otherName']").type('Jackson');
//
//         // Select the Date of Birth
//         cy.get("input[formcontrolname='dateOfBirth']").should('be.visible').clear().type('2020-05-12');
//
//         // Select the Gender
//         cy.get("select[formcontrolname='gender']").should('be.visible').select('MALE');
//
//         // Select the Nationality
//         cy.get("select[formcontrolname='nationality']").should('be.visible').select('Nigeria');
//
//         // Type in the Former Name (If any)
//         cy.get("input[formcontrolname='formerName']").type('Akpan')
//
//         // Select the Nationality
//         cy.get("select[formcontrolname='formerNationality']").should('be.visible').select('Benin');
//
//         // Type in the Occupation
//         cy.get("input[formcontrolname='occupation']").type('Engineer')
//
//
//
//         //Contact Details
//         // Type in the Phone Number
//         cy.get("#phone").type('+2348098963410')
//
//         // Type in the Email Address
//         cy.get("input[formcontrolname='email']").type('jevmis28.mj@gmail.com')
//
//         // Address
//
// // Select the Country
//         cy.wait(20000) //(type in the address manually)
// //     cy.contains('div', 'Address') // locate the section
// //         .parent() // move up to the container div
// //         .find("select.form-control.ng-untouched.ng-pristine.ng-invalid") // find the select inside it
// //         .should('be.visible')
// //         .select('Nigeria');
// //
// //
// //
// // // Select the State
// //     cy.xpath("/html/body/ngb-modal-window/div/div/app-add-proprietor-personnel-modal/form/div[4]/div[1]/div/div[2]/select")
// //         .should('be.visible')
// //         .select('FCT');
// //
// //
// // // Select the LGA
// //     cy.xpath("/html/body/ngb-modal-window/div/div/app-add-proprietor-personnel-modal/form/div[4]/div[1]/div/div[3]/select")
// //         .should('be.visible')
// //         .select('Amac');
// //
// //
// // // Type in the Postal Code (optional)
// //     cy.xpath("/html/body/ngb-modal-window/div/div/app-add-proprietor-personnel-modal/form/div[4]/div[1]/div/div[4]/input")
// //         .should('be.visible')
// //         .type('9001012');
// //
// // // Type in the City
// //     cy.xpath("/html/body/ngb-modal-window/div/div/app-add-proprietor-personnel-modal/form/div[4]/div[1]/div/div[5]/input")
// //         .should('be.visible')
// //         .type('Wuse 2');
// //
// //
// //
// // // Type in the House Number/Building Name
// //     cy.xpath("/html/body/ngb-modal-window/div/div/app-add-proprietor-personnel-modal/form/div[4]/div[1]/div/div[6]/input")
// //         .should('be.visible')
// //         .type('12');
// //
// //
// // // Type in the Street Name
// //     cy.xpath("/html/body/ngb-modal-window/div/div/app-add-proprietor-personnel-modal/form/div[4]/div[1]/div/div[7]/input")
// //         .should('be.visible')
// //         .type('Parakou');
//
//
//
//         // Tick Same as Service Address?
//         cy.get("input[formcontrolname='sameAsContact']").click();
//
//         // Tick Hide Residential Address from Public Record?
//         cy.get("input[formcontrolname='hideResidentialAddressFromPublic']").click();
//
//
// //  Means of Identification
// // Select the Means of Identification
//         cy.get("select[formcontrolname='meansOfId']").should('be.visible').select('International Passport');
//
//         // Type in the Identity Number
//         cy.get("input[formcontrolname='idNumber']").type('1234567890');
//
//
//
//         // Share Allotment
//         // Select the Type of Shares
//         cy.get("select[formcontrolname='typeOfShares']").should('be.visible').select('PREFERENCE');
//
//         // Type in the Number of Shares Allotted
//         cy.get("input[placeholder='Enter Amount']").type('300,000,000');
//
//
//         // Click on Add & Continue
//         cy.contains("Add & Continue").click();
//         cy.wait(2000)
//
//         // Click on Add & Continue
//         cy.get("button[class$='btn-success']").click();
//         cy.wait(7000)
//
// //Persons with Significant Control
//         // Click on Add & Continue
//         cy.get("button[class$='btn-success']").click();
//         cy.wait(9000)
//
//
//         //Statement of Compliance
//         //Personal Details
//         // Type in the Surname
//         cy.get("input[formcontrolname='surname']").type('Ndueso');
//
//         // Type in the First Name
//         cy.get("input[formcontrolname='firstName']").type('Jackson');
//
//         // Type in the Other name (optional)
//         cy.get("input[formcontrolname='otherName']").type('Jackson');
//
//
//         // Type in the Accreditation Number (Optional)
//         cy.get("input[formcontrolname='accreditationNumber']").type('1234567');
//
//         // Type in the Phone Number
//         cy.get("#phone").type('+2348098963410')
//
//         // Type in the Email Address
//         cy.get("input[formcontrolname='email']").type('jevmis28.mj@gmail.com')
//
//
// // Registered Office Address
// // Select the Country
// //       cy.wait(20000) //(type in the address manually)
//         cy.get("select[formcontrolname='country']").should('be.visible').select('Nigeria');
//
//
// // Select the State
//         cy.get("select[formcontrolname='state']").should('be.visible').select('FCT');
//
//
// // Select the LGA
//         cy.get("select[formcontrolname='lga']").should('be.visible').select('Amac');
//
//
// // Type in the Postal Code (optional)
//         cy.get("input[formcontrolname='postCode']").should('be.visible').type('9001012');
//
// // Type in the City
//         cy.get("input[formcontrolname='city']").should('be.visible').type('Wuse 2');
//
//
// // Type in the House Number/Building Name
//         cy.get("input[formcontrolname='houseNumber']").should('be.visible').type('12');
//
//
// // Type in the Street Name
//         cy.get("input[formcontrolname='streetName']").should('be.visible').type('Parakou');
//
// // Compliance
//       // Tick on "I confirm that the requirements....."
//       cy.get("input[formcontrolname='acknowledgement']").click();
//       cy.wait(15000)
//
//
//
//       // Document Uploads
//     //Select the Proprietor
//     cy.get("select[formcontrolname='proprietor']").should('be.visible').select('Bond James');
//
// // Upload Proprietor NIN Card/Slip
//     cy.get('input[type="file"]').eq(0).attachFile('HFV.jpeg', { force: true });
//
// // Upload Proprietor Passport
//     cy.get('input[type="file"]').eq(1).attachFile('mjsig.png', { force: true });
//
// // Upload Proprietor Signature
//     cy.get('input[type="file"]').eq(2).attachFile('spiral.png', { force: true });
//
//       // Upload Proprietor NIN Card/Slip
//       cy.get('input[type="file"]').eq(3).attachFile('HFV.jpeg', { force: true });
//
// // Upload Proprietor Passport
//       cy.get('input[type="file"]').eq(4).attachFile('mjsig.png', { force: true });
//
// // Upload Proprietor Signature
//       cy.get('input[type="file"]').eq(5).attachFile('spiral.png', { force: true });
//
// // Upload Proprietor Signature
//       cy.get('input[type="file"]').eq(6).attachFile('spiral.png', { force: true });
//
//
//     // Click on Save & Continue
//     cy.get("button[class$='btn-success']").click();
//
//
//     // Preview
//
//         // Click on Save & Continue
//         cy.get("button[class$='btn-success']").click();
//
// //     // Click on Remita
// //     cy.get("button[class='remita-btn']"). click();
// //
// //     cy.wait(60000); // Wait for modal to load
//
//
//       // Click on Check Payment Status
//         cy.get("button[class$='btn-outline-primary']").click();
//         cy.wait(5000)
//
//         // Click on Pay Stamp Duty
//         cy.get("button[class$='btn-primary']").click();
//
//
//
//
//
//   });
//
//     after(() => {
//         console.log(`Total tests run: ${Cypress.mocha.getRunner().total}`);
//     });


});