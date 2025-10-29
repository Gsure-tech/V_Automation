// @ts-ignore
// @ts-ignore
/// <reference types="cypress-mailslurp" />

describe("CAC Name Requiring Consent UI Tests", () => {

  beforeEach(() => {
    cy.log("test plan will cover Visual , Functional and ux requirement")
    cy.visit("https://cac.oasisproducts.ng"); //
    cy.get("button.btn.btn-success.rounded-pill.px-5").click()
  })

 it("Name Requiring Consent", () => {
   cy.visit("https://cac.oasisproducts.ng/auth/login"); //

   // Type in the Username
   cy.get("input[formcontrolname='username']").type('jevmis')

   // Type in the Password
   cy.get("input[formcontrolname='password']").type('*Mndueso3')

   // Tick on Remember me
   cy.get("#flexCheckDefault").click();

   // Click on Login
   cy.get("button[class$='w-100']").click();

   // Wait and Type in the OTP
   cy.wait(50000); // Let page load after login

       // Click Submit
   cy.get("button[class$='btn-success']").click();
//
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


// Click on Name Requiring Consent
  cy.contains("Name Requiring Consent").click();
  cy.url().should("include", "consent/applications");

  // Click on Apply For Consent
  cy.contains(" Apply For Consent ").should("be.visible").click();

  // Select the Business Classification
  cy.get("select[formcontrolname='businessClassification']").should('be.visible').select('Business Name');

  // Select the Business Type
  cy.get("select[formcontrolname='businessType']").should('be.visible').select('Partnership');

  // Select the Reason for consent request
  cy.get("select[formcontrolname='reasonForConsent']").should('be.visible').select('Use Of Restricted Word');

  // Click on Apply for Consent
    cy.get('.pt-3 > .btn').click();

    // Confirm Action
    cy.get('.bg-white > .d-flex > .btn-primary').click();
    cy.wait(3000)

  //Particulars of Proprietors

  //Business Details
  // Type in the Proposed Name 1
  cy.get("input[formcontrolname='proposedName1']").type('Parakou');

  // Type in the Proposed Name 2 (Optional)
  cy.get("input[formcontrolname='proposedName2']").type('Parakou2');

  // Type in the Proposed Name 3 (Optional)
  cy.get("input[formcontrolname='proposedName3']").type('Parakou3');

  // Select the Business Commencement Date
  cy.get("input[formcontrolname='commencementDate']").should('be.visible').clear().type('1998-05-15');

  // Type in the Email
  cy.get("input[formcontrolname='email']").type('Parakou@oasismgt.net');


  //Principal Place of Business
  // Select the State
  cy.get("select[formcontrolname='state']").should('be.visible').select('FCT');

  // Select the LGA
  cy.get("select[formcontrolname='lga']").should('be.visible').select('Amac');

  // Type in the City/Town/Village
  cy.get("input[formcontrolname='city']").type('Wuse 2');

  // Type in the Post Code (optional)
  cy.get("input[formcontrolname='postCode']").type('9001012');

  // Type in the House Number/Building Name
  cy.get("input[formcontrolname='houseNumber']").type('12');

  // Type in the Street Name
  cy.get("input[formcontrolname='streetName']").type('Parakou');

  // Type in the Full Address of Branches (if any)
  cy.get("textarea[formcontrolname='addressOfBranches']").type('Addrezzz Parakou');

  // Click on Save & Continue
  cy.get("button[class$='btn-success']").click();
  cy.wait(2000);

// Click on Save again
    cy.get('.d-flex > .btn-primary').click();

  // Particulars of Proprietors

// Proprietor Type
  cy.get("select[formcontrolname='type']").should('be.visible').select('Individual Proprietor');

  // Click on the Continue Button
  cy.contains("Continue").click();

//Add Individual Proprietor
  // Personal Details
  // Type in the Surname
  cy.get("input[formcontrolname='surname']").type('Ndueso')

  // Type in the First Name
  cy.get("input[formcontrolname='firstName']").type('Michael')

  // Type in the Other name (optional)
  cy.get("input[formcontrolname='otherName']").type('Jackson')

  // Select the Date of Birth
  cy.get("input[formcontrolname='dateOfBirth']").should('be.visible').clear().type('1996-05-12');

  // Select the Gender
  cy.get("select[formcontrolname='gender']").should('be.visible').select('MALE');

  // Select the Nationality
    cy.get("select[formcontrolname='nationality']").should('be.visible').select('Nigeria');

    // Type in the Former Name (If any)
  cy.get("input[formcontrolname='formerName']").type('Akpan')

  // Select the Nationality
  cy.get("select[formcontrolname='formerNationality']").should('be.visible').select('Benin');

  // Type in the Occupation
  cy.get("input[formcontrolname='occupation']").type('Engineer')


//  Contact Details
  // Type in the Proprietor Phone Number
  cy.get("#phone").type('+2348098963410')

  // Type in the Email Address
  cy.get("input[formcontrolname='email']").type('mndueso@oasismgt.net');


// Address

// Select the Country
cy.wait(20000) //(type in the address manually)
//     cy.contains('div', 'Address') // locate the section
//         .parent() // move up to the container div
//         .find("select.form-control.ng-untouched.ng-pristine.ng-invalid") // find the select inside it
//         .should('be.visible')
//         .select('Nigeria');
//
//
//
// // Select the State
//     cy.xpath("/html/body/ngb-modal-window/div/div/app-add-proprietor-personnel-modal/form/div[4]/div[1]/div/div[2]/select")
//         .should('be.visible')
//         .select('FCT');
//
//
// // Select the LGA
//     cy.xpath("/html/body/ngb-modal-window/div/div/app-add-proprietor-personnel-modal/form/div[4]/div[1]/div/div[3]/select")
//         .should('be.visible')
//         .select('Amac');
//
//
// // Type in the Postal Code (optional)
//     cy.xpath("/html/body/ngb-modal-window/div/div/app-add-proprietor-personnel-modal/form/div[4]/div[1]/div/div[4]/input")
//         .should('be.visible')
//         .type('9001012');
//
// // Type in the City
//     cy.xpath("/html/body/ngb-modal-window/div/div/app-add-proprietor-personnel-modal/form/div[4]/div[1]/div/div[5]/input")
//         .should('be.visible')
//         .type('Wuse 2');
//
//
//
// // Type in the House Number/Building Name
//     cy.xpath("/html/body/ngb-modal-window/div/div/app-add-proprietor-personnel-modal/form/div[4]/div[1]/div/div[6]/input")
//         .should('be.visible')
//         .type('12');
//
//
// // Type in the Street Name
//     cy.xpath("/html/body/ngb-modal-window/div/div/app-add-proprietor-personnel-modal/form/div[4]/div[1]/div/div[7]/input")
//         .should('be.visible')
//         .type('Parakou');



  // Tick Same as Service Address?
  cy.get("input[formcontrolname='sameAsContact']").click();

  // Tick Hide Residential Address from Public Record?
  cy.get("input[formcontrolname='hideResidentialAddressFromPublic']").click();


//  Means of Identification
// Select the Means of Identification
  cy.get("select[formcontrolname='meansOfId']").should('be.visible').select('International Passport');


  // Type in the Identity Number
  cy.get("input[formcontrolname='idNumber']").type('1234567890');


  // Click on Add & Continue
  cy.contains("Add & Continue").click();


// Click on Save & Continue
  cy.contains(" SAVE & CONTINUE ").click();

cy.wait(5000);

  // Nature of Business
// Select the Nature of Business Category
  cy.get("select[formcontrolname='category']").should('be.visible').select('Education');

// Select the Specific Nature of Business
  cy.get("select[formcontrolname='specificNature']").should('be.visible').select('Education');

  // Type in the Nature of Business Description
  cy.get("textarea[formcontrolname='description']").type('QWERTYUYTRESDFGHJKJHGFFGHJK');

  // Click on "Add Nature of Business"
  cy.get("button[class*='ps-1']").click();


  // Click on Save & Continue
  cy.contains(" SAVE & CONTINUE ").click();

  // Click on Save & Continue
    cy.wait(3000);
    cy.get('.btn-success').click();

  // Click on Save & Continue
    cy.wait(3000);
    cy.get('.btn-success').click();

//
//         // Click on Continue to Payment
//     cy.wait(5000); // Wait for modal to load
//
//     // Wait for the Remita iframe or fields to be ready
// // Click on Remita
//     cy.get("button[class='remita-btn']"). click();
//
//     cy.wait(10000); // Wait for modal to load


});
});