describe('LICENSE APPLICATION - Ministry Of Culture', () => {
        it('Successfully Create a License', () => {
    
            cy.log('Visiting the license application page');
            cy.visit('http://41.207.248.244:4070/');
    
            cy.log('Logging in to the system');
            cy.get("input[formcontrolname='email']", { timeout: 10000 })
                .should('be.visible')
                .type('Mndueso@oasismgt.net');
            cy.get("input[formcontrolname='password']", { timeout: 10000 })
                .should('be.visible')
                .type('password', { log: false });
            cy.get("button[type='submit']", { timeout: 10000 })
                .should('be.visible')
                .click();
    
            cy.log('Clicking "New Operational License"');
            cy.wait(1000);
            cy.contains("New Operational License")
                .should('be.visible')
                .click();
    
            cy.log('Scrolling down after clicking "New Operational License"');
            cy.window().then((win) => {
                win.scrollTo(0, document.body.scrollHeight);
            });
    
            cy.wait(1000);
    
            cy.log('Clicking Next');
            cy.contains(" Next ")
                .first()
                .scrollIntoView()
                .should('be.visible')
                .click({ force: true });
    
            cy.log('Entering RC Number');
            cy.get("input[placeholder='Enter RN/BN']", { timeout: 10000 })
                .should('be.visible')
                .type('35147935');
    
            cy.log('Clicking Verify');
            cy.wait(1000);
            cy.contains(" VERIFY ")
                .should('be.visible')
                .click();
    
            cy.log('Entering Nature Of Ownership');
            cy.get('.ng-invalid.ng-dirty > .p-5 > :nth-child(2) > :nth-child(2) > .amc-input-group > .form-control')
                .should('be.visible')
                .type('Mjay Ownership');
    
            cy.log('Entering Nature Of Business Category');
            cy.get(':nth-child(3) > :nth-child(2) > .amc-input-group > .form-control')
                .should('be.visible')
                .type('Amazing Nature');
    
            cy.log('Clicking Next');
            cy.get('form.ng-dirty > .mt-5 > .row > .col > .mat-stepper-next')
                .should('be.visible')
                .click({ force: true });
    
            cy.log('Entering Operational/Brand Name');
            cy.get("input[formcontrolname='brandName']", { timeout: 10000 })
                .should('be.visible')
                .type('ASK MJAY SERVICES LTD.', { force: true });
    
            cy.log('Selecting Operation Type');
            cy.get("ng-select[formcontrolname='operationType'] div[class='ng-select-container']", { timeout: 10000 })
                .should('be.visible')
                .click({ force: true });
            cy.get(".ng-dropdown-panel .ng-option", { timeout: 10000 })
                .contains('Test Operational Type')
                .click({ force: true });
    
            cy.log('Entering Test Attribute');
            cy.get("input[placeholder='Enter Test Attribute']", { timeout: 10000 })
                .should('be.visible')
                .type('123', { force: true });
    
            cy.log('Adding Details');
            cy.get("button[class$='align-items-center']")
                .should('be.visible')
                .click({ force: true });
    
            cy.log('Filling Proprietor Details');
            cy.get("input[formcontrolname='proprietorFirstName']").type('Michael');
            cy.get("input[placeholder='Proprietor Last Name ']").type('Jackson');
            cy.get("input[placeholder='Proprietor Phone Number']").type('08098963410');
            cy.get("input[formcontrolname='proprietorEmail']").type('Mndueso@oasismgt.net');
            cy.get("input[formcontrolname='proprietorAddress']").type('12, Parakou Street, Wuse 2, Abuja.');
            cy.get("input[formcontrolname='numberOfStaffs']").type('3');
            cy.get("input[formcontrolname='numberOfSecurities']").type('3');
            cy.get("input[placeholder='Operation Address']").type('12, Parakou Street, Wuse 2, Abuja.');
    
            cy.log('Selecting LGA');
            cy.get(':nth-child(2) > :nth-child(2) > .field > .ng-select > .ng-select-container', { timeout: 10000 })
                .should('exist')
                .click({ force: true });
    
            cy.get('.ng-dropdown-panel .ng-option')
                .should('be.visible')
                .contains('Oyi')
                .click({ force: true });
    
            cy.log('Selecting Area');
    
            cy.get(':nth-child(1) > .field > .ng-select > .ng-select-container > .ng-value-container > .ng-input')
                .should('be.visible')
                .click()
    
            cy.get('.ng-dropdown-panel .ng-option')
                .should('be.visible')
                .eq(2)
                .click({ force: true });
    
    
            cy.log('Selecting Office Branch');
            cy.get(':nth-child(2) > .d-flex > .ng-untouched')
                .should('exist')
                .click({ force: true });
    
            cy.log('Clicking Next');
            cy.get('.p-5 > .mt-5 > .row > .col > .mat-stepper-next')
                .should('be.visible')
                .click({ force: true });
    
            cy.log('Uploading CAC Certificate');
            cy.get('input[type="file"]', { timeout: 10000 })
                .should('exist')
                .attachFile('Account_Creation.pdf', { force: true });
    
            cy.log('Submitting Application');
            cy.get("button.next-btn.d-flex.align-items-center.gap-2.justify-content-center", { timeout: 10000 })
                .scrollIntoView()
                .should('be.visible')
                .click({ force: true });
            cy.wait(1000)
    
            cy.log('Submitting Application');
            cy.get("button[class='next-btn d-flex align-items-center gap-2 justify-content-center']", { timeout: 10000 })
                .scrollIntoView()
                .should('be.visible')
                .and('not.be.disabled') // Ensure the button is enabled
                .click({ force: true });
    
            cy.log('Clicking Continue');
            cy.get('.continue-button', { timeout: 10000 })
                .scrollIntoView()
                .should('be.visible')
                .click({ force: true });
    
       });
    
    
    before(() => {
            // Ignore uncaught exceptions from the application
            Cypress.on('uncaught:exception', (err, runnable) => {
                return false;
            });
        });
    
    //     it('Successfully Query an Application', () => {
    //         // **Step 1: Visit the Application URL with Admin Credentials**
    //         cy.log('Visiting the license application page with Admin Credentials');
    //         cy.visit('http://41.207.248.244:4070/');
    
    //         // **Step 2: Log in to the system**
    //         cy.log('Entering email address');
    //         cy.get("input[formcontrolname='email']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type('culture@oasismgt.net');
    
    //         cy.log('Entering password (hidden for security)');
    //         cy.get("input[formcontrolname='password']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type('password', { log: false });
    
    //         cy.log('Submitting login form');
    //         cy.contains("Sign In")
    //             .should('be.visible')
    //             .click({ force: true });
    
    //         // **Step 3: Wait for the application list to load**
    //         cy.log('Waiting for applications to load').wait(2000)
    //         cy.get(':nth-child(1) > :nth-child(6) > .d-flex > .btn', { timeout: 15000 })
    //             .should('be.visible')
    //             .click({ force: true });
    
    //         // **Step 4: Click on Query Application
    //         cy.log('Click on Query Application').wait(2000)
    //         cy.get('.query-btn')        .should('be.visible')
    //         .click();
    //     //  Type in the Query message
    //         cy.get("textarea[formcontrolname='comment']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type("Query test here");
    
    //         // Submit Query
    //         cy.get("div[class='modal-actions-wrapper']", { timeout: 10000 })
    //             .should('be.visible')
    //             .click();
    
    //         cy.log('Click on the continue button');
    //         cy.get('.continue-button', { timeout: 10000 })
    //             .should('be.visible')
    //             .click();
    
    //     });
    
    
    //     it('Successfully Update Query', () => {
    
    //         cy.log('Visiting the license application page');
    //         cy.visit('http://41.207.248.244:4070/');
    
    //         cy.log('Logging in to the system');
    //         cy.get("input[formcontrolname='email']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type('Mndueso@oasismgt.net');
    //         cy.get("input[formcontrolname='password']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type('password', { log: false });
    //         cy.get("button[type='submit']", { timeout: 10000 })
    //             .should('be.visible')
    //             .click();
    
    //       //  Click on Update Details
    //              cy.log('Click on Update Details').wait(2000);
    //         cy.contains(" Update Details ")
    //                  .should('be.visible')
    //                  .click({ force: true })
    
    //             // Update the Address
    //              cy.get('div.ng-pristine > .p-5 > .row > :nth-child(5) > .field > .form-control').type('12, Parakou Street, Wuse 2, Abuja.');
    
    //               // Click Submit
    //              cy.log('Submitting Application');
    //              cy.contains("Save & Submit Changes")
    //              .click({ force: true });
    
    //         //    Click on the Yes button and confirm the approval**
    //              cy.log('Click on the Yes button').wait(2000)
    //              cy.contains(" Yes ")
    //                  .should('be.visible')
    //                  .click();
    
    //              // Click on the continue button
    //                  cy.log('Click on the continue button');
    //                  cy.contains(" Done ")
    //                      .should('be.visible')
    //                      .click();
    
    
    //          });
    
    
    // before(() => {
    //         // Ignore uncaught exceptions from the application
    //         Cypress.on('uncaught:exception', (err, runnable) => {
    //             return false;
    //         });
    //     });
    
    
    //         it('Successfully Approve an Application', () => {
    //         // **Step 1: Visit the Application URL with Admin Credentials**
    //         cy.log('Visiting the license application page with Admin Credentials');
    //         cy.visit('http://41.207.248.244:4070/');
    
    //         // **Step 2: Log in to the system**
    //         cy.log('Entering email address');
    //         cy.get("input[formcontrolname='email']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type('culture@oasismgt.net');
    
    //         cy.log('Entering password (hidden for security)');
    //         cy.get("input[formcontrolname='password']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type('password', { log: false });
    
    //         cy.log('Submitting login form');
    //         cy.contains("Sign In")
    //             .should('be.visible')
    //             .click({ force: true });
    
    //         // **Step 3: Wait for the application list to load**
    //         cy.log('Waiting for applications to load').wait(2000)
    //             cy.contains(" Pending ")
    
    //             // Click on View Application
    //             cy.contains(" View Application ")
    //                 .should('be.visible')
    //             .click({ force: true });
    
    //         // **Step 4: Click on Approve Application**
    //         cy.log('Click on Approve Application').wait(2000)
    //            cy.contains(" Approve Application ")
    //             .should('be.visible')
    //             .click({ force: true });
    
    //                  cy.log('Click on the Yes button').wait(2000)
    //                  cy.contains(" Yes ")
    //                      .should('be.visible')
    //                      .click();
    
    //                  // Click on the continue button
    //                      cy.log('Click on the continue button');
    //                      cy.contains(" Done ")
    //                          .should('be.visible')
    //                          .click();
    //     });
    // //
    // //
    // //
    //     before(() => {
    //         // Ignore uncaught exceptions from the application
    //         Cypress.on('uncaught:exception', (err, runnable) => {
    //             return false;
    //         });
    //     });
    
    //     it('Successfully Assign a License', () => {
    //         // **Step 1: Visit the Application URL with Admin Credentials**
    //         cy.log('Visiting the license application page with Admin Credentials');
    //         cy.visit('http://41.207.248.244:4070/');
    
    //         // **Step 2: Log in to the system**
    //         cy.log('Entering email address');
    //         cy.get("input[formcontrolname='email']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type('culture@oasismgt.net');
    
    //         cy.log('Entering password (hidden for security)');
    //         cy.get("input[formcontrolname='password']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type('password', { log: false });
    
    //         cy.log('Submitting login form');
    //         cy.contains("Sign In")
    //             .should('be.visible')
    //             .click({ force: true });
    
    //         // **Step 3: Wait for the application list to load**
    //         cy.log('Waiting for application list to load').wait(1000);
    
    //         // Click on the Unassigned Tab
    //         cy.contains(" Unassigned ")
    //             .should('exist')
    //             .should('be.visible')
    //             .click({ force: true });
    
    //         // Click on View Application
    //         cy.log('Click on View Application');
    //         cy.contains(" View Application ").wait(2000)
    //             .should('be.visible')
    //             .click({ force: true });
    
    //         // Click on Assign for Inspection
    //         cy.log('Click on Assign for Inspection');
    //         cy.contains(" Assign For Inspection ")
    //             .should('be.visible')
    //             .click({ force: true });
    
    //         // Select the Inspector
    //         cy.log('Select the Inspector');
    //         cy.get('.ng-select-container', { timeout: 10000 })
    //             .should('be.visible')
    //             .scrollIntoView()
    //             .click({ force: true });
    
    //         // Ensure the dropdown is open before selecting the option
    //         cy.get('.ng-dropdown-panel', { timeout: 10000 }) // Wait for dropdown panel
    //             .should('be.visible')
    //             .contains('Destiny Kefas')
    //             .click({ force: true });
    
    //         // Click on the save button
    //            cy.contains("Save")
    //             .click({ force: true });
    
    //                  // Click on the continue button
    //                      cy.log('Click on the continue button');
    //                      cy.contains(" Done ")
    //                          .should('be.visible')
    //                          .click();
    
    //     });
    
    //     before(() => {
    //         // Ignore uncaught exceptions from the application
    //         Cypress.on('uncaught:exception', (err, runnable) => {
    //             return false;
    //         });
    //     });


    
    //     it('Successfully Inspect a License', () => {
    //         // **Step 1: Visit the Application URL with Inspector Credentials**
    //         cy.log('Visiting the license application page with Admin Credentials');
    //         cy.visit('http://41.207.248.244:4070/');
    
    //         // **Step 2: Log in to the system**
    //         cy.log('Entering email address');
    //         cy.get("input[formcontrolname='email']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type('dkefas@oasismgt.net');
    
    //         cy.log('Entering password (hidden for security)');
    //         cy.get("input[formcontrolname='password']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type('Password#1', { log: false });
    
    //         cy.log('Submitting login form');
    //         cy.contains("Sign In")
    //             .should('be.visible')
    //             .click({ force: true });
    
    //             // **Step 3: Wait for the application list to load**
    //             cy.log('Waiting for application list to load').wait(1000);
    //             cy.contains("Pending").should("be.visible")
    
    //         // Click on View Application
    //         cy.log('Click on View Application');
    //         cy.contains(" View Application ")
    //             .should('be.visible')
    //             .wait(1000)
    //             .click({ force: true });
    
    //         // Click on Inspect
    //         cy.log('Click on Inspect');
    //         cy.contains(" Inspect ")
    //             .should('be.visible')
    //             .wait(2000)
    //             .click({ force: true });
    
    //         // **Inspect Assets**
    //         cy.log('Selecting applicable category to inspect');
    
    //         // Select 'NORMAL' for the first question
    //         cy.log('First Question: Selecting NORMAL');
    //         cy.get("select.form-control.form-select")
    //             .eq(0) // First dropdown
    //             .should('be.visible')
    //             .select('NORMAL', { force: true });
    
    //         // Select 'NEUTRAL' for the second question
    //         cy.log('Second Question: Selecting NEUTRAL');
    //         cy.get("select.form-control.form-select")
    //             .eq(1) // Second dropdown
    //             .should('be.visible')
    //             .select('NEUTRAL', { force: true });
    
    //         // Select 'EXCELLENT' for the third question
    //         cy.log('Third Question: Selecting EXCELLENT');
    //         cy.get("select.form-control.form-select")
    //             .eq(2) // Third dropdown
    //             .should('be.visible')
    //             .select('EXCELLENT', { force: true });
    
    //         // Debugging: Check how many dropdowns are found
    //         cy.get("select.form-control.form-select").then($dropdowns => {
    //         });
    
    
    //         // Type in Recommendation Comment
    //         cy.log('Typing Recommendation Comment');
    //         cy.get('#recommendation').should('be.visible').wait(1000).type('Recommendation Test');
    
    //         // Click Submit
    //         cy.log('Clicking Submit');
    //         cy.contains(" Submit ").click({ force: true });
    
    
    //                  // Click on the continue button
    //                      cy.log('Click on the continue button');
    //                      cy.contains(" Done ")
    //                          .should('be.visible')
    //                          .click();
    
    //     });
    
    
    //     before(() => {
    //         // Ignore uncaught exceptions from the application
    //         Cypress.on('uncaught:exception', (err, runnable) => {
    //             return false;
    //         });
    //     });


    //     it('Successfully Query a License', () => {
    //         // **Step 1: Visit the Application URL with Admin Credentials**
    //         cy.log('Visiting the license application page with Admin Credentials');
    //         cy.visit('http://41.207.248.244:4070/');
    
    //         // **Step 2: Log in to the system**
    //         cy.log('Entering email address');
    //         cy.get("input[formcontrolname='email']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type('culture@oasismgt.net');
    
    //         cy.log('Entering password (hidden for security)');
    //         cy.get("input[formcontrolname='password']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type('password', { log: false });
    
    //         cy.log('Submitting login form');
    //         cy.contains("Sign In")
    //             .should('be.visible')
    //             .click({ force: true });
    
    //         // **Step 3: Wait for the application list to load**
    //         cy.get("html > body > app-root > div > div > app-license-applications-list > div > div:nth-of-type(2) > div:nth-of-type(1) > button:nth-of-type(4)",{ timeout: 10000 })
    //             .should('exist')
    //             .should('be.visible')
    //             .click({ force: true });
    
    //         // Click on View Application
    //         cy.log('Click on View Application');
    //         cy.get(':nth-child(1) > :nth-child(9) > .d-flex > .btn').wait(2000)
    //             .should('be.visible')
    //             .click({ force: true });
    
    //         // Click on See Inspection Details
    //         cy.log('Click on See Inspection Details');
    //         cy.get('.download-btn')
    //             .should('be.visible')
    //             .wait(2000)
    //             .click({ force: true });
    
    //       // **Step 4: Click on Query Application
    //         cy.log('Click on Query Application').wait(2000)
    //         cy.get('.btn-danger')  .should('be.visible')
    //         .click();
    //     //  Type in the Query message
    //         cy.get("textarea[formcontrolname='comment']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type("Query test here");
    
    //         // Submit Query
    //         cy.get("div[class='modal-actions-wrapper']", { timeout: 10000 })
    //             .should('be.visible')
    //             .click();
    
    //         cy.log('Click on the continue button');
    //         cy.get('.continue-button', { timeout: 10000 })
    //             .should('be.visible')
    //             .click();  });//
    
    
    //     it('Successfully Update a Queried Application', () => {
    //         // **Step 1: Visit the Application URL with Inspector Credentials**
    //         cy.log('Visiting the license application page with Admin Credentials');
    //         cy.visit('http://41.207.248.244:4070/');
    
    //         // **Step 2: Log in to the system**
    //         cy.log('Entering email address');
    //         cy.get("input[formcontrolname='email']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type('dkefas@oasismgt.net');
    
    //         cy.log('Entering password (hidden for security)');
    //         cy.get("input[formcontrolname='password']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type('Password#1', { log: false });
    
    //         cy.log('Submitting login form');
    //         cy.contains("Sign In")
    //             .should('be.visible')
    //             .click({ force: true });
    
    //         // Click on the Queried Column
    //         cy.log('Click on the Queried Column');
    //         cy.get('.tab-buttons > :nth-child(3)')
    //             .should('be.visible')
    //             .click({ force: true });
    
    // // Wait for the new state to stabilize
    //         cy.wait(1000);
    
    // // Re-select the element after clicking to ensure it's still available
    //         cy.get('.tab-buttons > :nth-child(3)').should('exist');
    
    
    //         // Click on View Application
    //         cy.log('Click on View Application');
    //         cy.get(':nth-child(1) > :nth-child(6) > .d-flex > .btn')
    //             .should('be.visible')
    //             .wait(1000)
    //             .click({ force: true });
    
    //         // Click on Re-Inspect
    //         cy.log('Click on Re-Inspect');
    //         cy.get("button[class='btn update-btn']", { timeout: 10000 })
    //             .should('be.visible')
    //             .wait(2000)
    //             .click({ force: true });
    
    //         // **Inspect Assets**
    //         cy.log('Selecting applicable category to inspect');
    
    //         // Select 'NORMAL' for the first question
    //         cy.log('First Question: Selecting NORMAL');
    //         cy.get("select.form-control.form-select")
    //             .eq(0) // First dropdown
    //             .should('be.visible')
    //             .select('NORMAL', { force: true });
    
    //         // Select 'NEUTRAL' for the second question
    //         cy.log('Second Question: Selecting NEUTRAL');
    //         cy.get("select.form-control.form-select")
    //             .eq(1) // Second dropdown
    //             .should('be.visible')
    //             .select('NEUTRAL', { force: true });
    
    //         // Select 'EXCELLENT' for the third question
    //         cy.log('Third Question: Selecting EXCELLENT');
    //         cy.get("select.form-control.form-select")
    //             .eq(2) // Third dropdown
    //             .should('be.visible')
    //             .select('EXCELLENT', { force: true });
    
    //         // Debugging: Check how many dropdowns are found
    //         cy.get("select.form-control.form-select").then($dropdowns => {
    //         });
    
    
    //         // Type in Recommendation Comment
    //         cy.log('Typing Recommendation Comment');
    //         cy.get('#recommendation').should('be.visible').wait(1000).type('Recommendation Test');
    
    //         // Click Submit
    //         cy.log('Clicking Submit');
    //         cy.get('.submit').should('be.visible').click({ force: true });
    
    //         // Click Continue Button
    //         cy.log('Clicking Continue');
    //         cy.get('.continue-button', { timeout: 10000 }).should('be.visible').click();
    
    //     });
    
    
    //     it('Successfully Re-assign a License for Inspection', () => {
    //         // **Step 1: Visit the Application URL with Admin Credentials**
    //         cy.log('Visiting the license application page with Admin Credentials');
    //         cy.visit('http://41.207.248.244:4070/');
    
    //         // **Step 2: Log in to the system**
    //         cy.log('Entering email address');
    //         cy.get("input[formcontrolname='email']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type('culture@oasismgt.net');
    
    //         cy.log('Entering password (hidden for security)');
    //         cy.get("input[formcontrolname='password']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type('password', { log: false });
    
    //         cy.log('Submitting login form');
    //         cy.contains("Sign In")
    //             .should('be.visible')
    //             .click({ force: true });
    
    //         // **Step 3: Navigate to the Inspected Column **
    //         cy.get("html > body > app-root > div > div > app-license-applications-list > div > div:nth-of-type(2) > div:nth-of-type(1) > button:nth-of-type(4)",{ timeout: 10000 })
    //             .should('exist')
    //             .should('be.visible')
    //             .click({ force: true });
    
    //         // Click on View Application
    //         cy.log('Click on View Application');
    //         cy.get(':nth-child(1) > :nth-child(9) > .d-flex > .btn').wait(2000)
    //             .should('be.visible')
    //             .click({ force: true });
    
    //         // Click on See Inspection Details
    //         cy.log('Click on See Inspection Details');
    //         cy.get('.download-btn')
    //             .should('be.visible')
    //             .wait(2000)
    //             .click({ force: true });
    
    //       // **Step 4: Click on Re-Assign for Inspection
    //         cy.log('Click on Re-Assign for Inspection').wait(2000)
    //         cy.get("button[class$='btn-light-blue']")
    //            .should('be.visible')
    //         .click();
    
    //         // Select the Inspector
    //         cy.log('Select the Inspector');
    //         cy.get('.ng-select-container', { timeout: 10000 })
    //             .should('be.visible')
    //             .scrollIntoView()
    //             .click({ force: true });
    
    //         // Ensure the dropdown is open before selecting the option
    //         cy.get('.ng-dropdown-panel', { timeout: 10000 }) // Wait for dropdown panel
    //             .should('be.visible')
    //             .contains('Destiny Kefas')
    //             .click({ force: true });
    
    //         // Click on the save button
    //         cy.get('.gradient-btn').should('be.visible')
    //             .click({ force: true });
    
    //         cy.log('Click on the continue button');
    //         cy.get('.continue-button', { timeout: 10000 })
    //             .should('be.visible')
    //             .click();
    
    //     });
    
    
    //     it('Successfully Inspect a License', () => {
    //         // **Step 1: Visit the Application URL with Inspector Credentials**
    //         cy.log('Visiting the license application page with Admin Credentials');
    //         cy.visit('http://41.207.248.244:4070/');
    
    //         // **Step 2: Log in to the system**
    //         cy.log('Entering email address');
    //         cy.get("input[formcontrolname='email']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type('dkefas@oasismgt.net');
    
    //         cy.log('Entering password (hidden for security)');
    //         cy.get("input[formcontrolname='password']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type('Password#1', { log: false });
    
    //         cy.log('Submitting login form');
    //         cy.contains("Sign In")
    //             .should('be.visible')
    //             .click({ force: true });
    
    //         // Click on View Application
    //         cy.log('Click on View Application');
    //         cy.get(':nth-child(1) > :nth-child(6) > .d-flex > .btn')
    //             .should('be.visible')
    //             .wait(1000)
    //             .click({ force: true });
    
    //         // Click on Inspect
    //         cy.log('Click on Inspect');
    //         cy.get('.download-btn')
    //             .should('be.visible')
    //             .wait(2000)
    //             .click({ force: true });
    
    //         // **Inspect Assets**
    //         cy.log('Selecting applicable category to inspect');
    
    //         // Select 'NORMAL' for the first question
    //         cy.log('First Question: Selecting NORMAL');
    //         cy.get("select.form-control.form-select")
    //             .eq(0) // First dropdown
    //             .should('be.visible')
    //             .select('NORMAL', { force: true });
    
    //         // Select 'NEUTRAL' for the second question
    //         cy.log('Second Question: Selecting NEUTRAL');
    //         cy.get("select.form-control.form-select")
    //             .eq(1) // Second dropdown
    //             .should('be.visible')
    //             .select('NEUTRAL', { force: true });
    
    //         // Select 'EXCELLENT' for the third question
    //         cy.log('Third Question: Selecting EXCELLENT');
    //         cy.get("select.form-control.form-select")
    //             .eq(2) // Third dropdown
    //             .should('be.visible')
    //             .select('EXCELLENT', { force: true });
    
    //         // Debugging: Check how many dropdowns are found
    //         cy.get("select.form-control.form-select").then($dropdowns => {
    //         });
    
    
    //         // Type in Recommendation Comment
    //         cy.log('Typing Recommendation Comment');
    //         cy.get('#recommendation').should('be.visible').wait(1000).type('Recommendation Test');
    
    //         // Click Submit
    //         cy.log('Clicking Submit');
    //         cy.get('.submit').should('be.visible').click({ force: true });
    
    //         // Click Continue Button
    //         cy.log('Clicking Continue');
    //         cy.get('.continue-button', { timeout: 10000 }).should('be.visible').click();
    
    //     });
    
    
    //     it('Successfully Approve a License', () => {
    //         // **Step 1: Visit the Application URL with Admin Credentials**
    //         cy.log('Visiting the license application page with Admin Credentials');
    //         cy.visit('http://41.207.248.244:4070/');
    
    //         // **Step 2: Log in to the system**
    //         cy.log('Entering email address');
    //         cy.get("input[formcontrolname='email']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type('culture@oasismgt.net');
    
    //         cy.log('Entering password (hidden for security)');
    //         cy.get("input[formcontrolname='password']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type('password', { log: false });
    
    //         cy.log('Submitting login form');
    //         cy.contains("Sign In")
    //             .should('be.visible')
    //             .click({ force: true });
    
    //         // **Step 3: Wait for the application list to load**
    //         // Click on the Inspected Column
    //         cy.contains(" Inspected ")
    //             .should('exist')
    //             .should('be.visible')
    //             .click({ force: true });
    
    //         // Click on View Application
    //         cy.log('Click on View Application');
    //        cy.contains(" View Application ").wait(2000)
    
    //             .should('be.visible')
    //             .click({ force: true });
    //     //
    //     //     // Click on See Inspection Details
    //     //     cy.log('Click on See Inspection Details');
    //         cy.contains(" See Inspection Details ")
    //             .should('be.visible')
    //             .wait(2000)
    //             .click({ force: true });
    
    //         // **Step 4: Click on Approve Application**
    //         cy.log('Click on Approve Application').wait(2000)
    //         cy.contains(" Approve ")
    //             .should('be.visible')
    //             .click({ force: true });
    
    
    //         //    Click on the Yes button and confirm the approval**
    //              cy.log('Click on the Yes button').wait(2000)
    //              cy.contains(" Yes ")
    //                  .should('be.visible')
    //                  .click();
    
    //                  // Click on the continue button
    //                      cy.log('Click on the continue button');
    //                      cy.contains(" Done ")
    //                          .should('be.visible')
    //                          .click();
    
    //         });
    
    //     it('Successfully Pay online for a license', () => {
    //             // **Step 1: Visit the Application URL**
    //             cy.log('Visiting the license application page');
    //             cy.visit('http://41.207.248.244:4070/');
    
    //             // **Step 2: Log in to the system**
    //             cy.log('Entering email address');
    //             cy.get("input[formcontrolname='email']", { timeout: 10000 })
    //                 .should('be.visible')
    //                 .type('Mndueso@oasismgt.net');
    
    //             cy.log('Entering password (hidden for security)');
    //             cy.get("input[formcontrolname='password']", { timeout: 10000 })
    //                 .should('be.visible')
    //                 .type('password', { log: false });
    
    //             cy.log('Submitting login form');
    //             cy.contains("Sign In")
    //                 .should('be.visible')
    //                 .click({ force: true });
    
    //             // **Step 3: Click on Pay Online**
    //             cy.log('Click on Pay Online').wait(2000);
    //             cy.contains("Pay Online")
    //             .should('be.visible')
    //             .click({ force: true });
    
    //         // **Step 4: Click on Proceed**
    //         cy.log('Click on Proceed').wait(2000);
    //          cy.contains("Proceed")
    //             .should('be.visible')
    //             .click({ force: true });
    
    
    // cy.log('Click on Pay Online').wait(2000);
    // cy.get("button[class='already-paid']")
    //     .should('be.visible')
    //     .click({ force: true });
    
    // // **Step 6: Pay With Card
    // cy.log('Pay With Card');
    // cy.contains("Pay with CardVerve, Visa, Mastercard, discover and Amex cards are all accepted")
    //     .click();
    
    // // Fill in the Card Details
    // cy.log('Fill in the Card Details');
    
    // //Type in the Card Number
    // cy.get("#card-number").type('5060990580000217499').wait(1000)
    
    // // Type in the Expiry Date
    // cy.get("#card-exp").type('0350').wait(1000)
    
    // // Type in the CVV
    // cy.get("#card-cvv").type('111').wait(1000)
    
    // // Click on the Pay Button
    // cy.contains("Pay NGN 60,000.00").click();
    
    // // Type in the 4-digit Pin
    // cy.get("html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > form > div:nth-of-type(1) > div > div:nth-of-type(1) > input:nth-of-type(1)").type('1').wait(1000)
    
    // cy.get("html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > form > div:nth-of-type(1) > div > div:nth-of-type(1) > input:nth-of-type(2)").type('1').wait(1000)
    
    // cy.get("html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > form > div:nth-of-type(1) > div > div:nth-of-type(1) > input:nth-of-type(3)").type('1').wait(1000)
    
    // cy.get("html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > form > div:nth-of-type(1) > div > div:nth-of-type(1) > input:nth-of-type(4)").type('1').wait(1000)
    
    // // Click on the Authorize button
    // cy.contains("Authorize").click();
    
    // // Type in the OTP
    // cy.get("input[inputmode='numeric']").type('123456').wait(1000)
    
    // // Click on the Authorize button
    // cy.contains("Authorize").click();
    //      });
    // //
    // // **Step 5: Wait for 60 seconds to allow manual entry of card details**
    //     cy.log('Waiting 60 seconds for you to enter card details...');
    //     cy.wait(60000); // Increased wait time to 60 seconds
    
    // // **Step 6: Click on Continue to Dashboard**
    //     cy.log('Click on Continue to Dashboard');
    //     cy.get('.button > button', { timeout: 10000 })
    //     .should('be.visible')
    //     .click({ force: true });
    
    //     cy.log('Payment process completed successfully.');
    // // });
    
    
    
    
    //     it('Successfully Query a License Application (Commissioner Query)', () => {
    //         // **Step 1: Visit the Application URL with HOD Credentials**
    //         cy.log('Successfully Approve a License Application (HOD Approval)');
    //         cy.visit('http://41.207.248.244:4070/');
    
    //         // **Step 2: Log in to the system**
    //         cy.log('Entering email address');
    //         cy.get("input[formcontrolname='email']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type('dekeji1@gmail.com');
    
    //         cy.log('Entering password (hidden for security)');
    //         cy.get("input[formcontrolname='password']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type('#Password1', { log: false });
    
    //         cy.log('Submitting login form');
    //         cy.contains("Sign In")
    //             .should('be.visible')
    //             .click({ force: true });
    
    //         // Click on View Application
    //         cy.log('Click on View Application on a paid application');
    //         cy.get(':nth-child(1) > :nth-child(9) > .d-flex > .btn').wait(2000)
    //             .should('be.visible')
    //             .click({ force: true });
    
    //         // Click on See Inspection Details
    //         cy.log('Click on See Inspection Details');
    //         cy.get('.download-btn')
    //             .should('be.visible')
    //             .wait(2000)
    //             .click({ force: true });
    
    //    //*Step 4: Click on Query Application
    //         cy.log('Click on Query Application').wait(2000)
    //         cy.get('.btn-danger')  .should('be.visible')
    //         .click();
    //     //  Type in the Query message
    //         cy.get("textarea[formcontrolname='comment']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type("Query test here");
    
    //         // Submit Query
    //         cy.get("div[class='modal-actions-wrapper']", { timeout: 10000 })
    //             .should('be.visible')
    //             .click();
    
    //         cy.log('Click on the continue button');
    //         cy.get('.continue-button', { timeout: 10000 })
    //             .should('be.visible')
    //             .click();
    //     });
    
    
    //     it('Successfully Update a Queried Commissioner License Application', () => {
    //         // **Step 1: Visit the Application URL with Admin Credentials**
    //         cy.log('Visiting the license application page with Admin Credentials');
    //         cy.visit('http://41.207.248.244:4070/');
    
    //         // **Step 2: Log in to the system**
    //         cy.log('Entering email address');
    //         cy.get("input[formcontrolname='email']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type('culture@oasismgt.net');
    
    //         cy.log('Entering password (hidden for security)');
    //         cy.get("input[formcontrolname='password']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type('password', { log: false });
    
    //         cy.log('Submitting login form');
    //         cy.contains("Sign In")
    //             .should('be.visible')
    //             .click({ force: true });
    
    //         // Click on the Queried Column
    //         cy.log('Click on the Queried Column').wait(2000);
    //         cy.contains(" Queried ")
    //                 .should('be.visible')
    //                 .click({ force: true });
    
    //         // Click on View Application
    //         cy.log('Click on View Application');
    //         cy.contains(" View Application ")
    //             .should('be.visible')
    //             .click({ force: true });
    
    
    //         // Click on See Inspection Details
    //         cy.log('Click on See Inspection Details');
    //         cy.contains(" See Inspection Details ")
    //             .should('be.visible')
    //             .wait(2000)
    //             .click({ force: true });
    
    //       // **Step 4: Click on Query Application
    //         cy.log('Click on Query Application').wait(2000)
    //         cy.contains(" Query Application ")
    //             .should('be.visible')
    //                         .click();
    
    
    //     //  Type in the Query message
    //         cy.get("textarea[formcontrolname='comment']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type("HOD  Query test here ");
    
    //         // Submit Query
    //               cy.contains(" QUERY ")
    //             .should('be.visible')
    //             .click();
    
    //         cy.log('Click on the continue button');
    //         cy.contains(" Done ")
    //             .should('be.visible')
    //             .click();  });
    
    
    //     it('Successfully Update Query', () => {
    
    //         cy.log('Visiting the license application page');
    //         cy.visit('http://41.207.248.244:4070/');
    
    //         cy.log('Logging in to the system');
    //         cy.get("input[formcontrolname='email']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type('Mndueso@oasismgt.net');
    //         cy.get("input[formcontrolname='password']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type('password', { log: false });
    //         cy.get("button[type='submit']", { timeout: 10000 })
    //             .should('be.visible')
    //             .click();
    
    //       //Click on Update Details
    //         cy.log('Click on Update Details');
    //         cy.contains(" Update Details ")
    //             .should('be.visible')
    //             .click({ force: true })
    //             .wait(2000);
    
    //        // Update the Address
    //         cy.get('div.ng-pristine > .p-5 > .row > :nth-child(5) > .field > .form-control').type('12, Parakou Street, Wuse 2, Abuja.');
    
    //          // Click Submit
    //         cy.log('Submitting Application');
    //         cy.contains("Save & Submit Changes")
    //         .click({ force: true });
    
    //    //    Click on the Yes button and confirm the approval**
    //         cy.log('Click on the Yes button').wait(2000)
    //         cy.contains(" Yes ")
    //             .should('be.visible')
    //             .click();
    
    //         // Click on the continue button
    //             cy.log('Click on the continue button');
    //             cy.contains(" Done ")
    //                 .should('be.visible')
    //                 .click();
    
    
    //     });
    
    
    //     it('Successfully Approve an Application', () => {
    //         // **Step 1: Visit the Application URL with Admin Credentials**
    //         cy.log('Visiting the license application page with Admin Credentials');
    //         cy.visit('http://41.207.248.244:4070/');
    
    //         // **Step 2: Log in to the system**
    //         cy.log('Entering email address');
    //         cy.get("input[formcontrolname='email']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type('culture@oasismgt.net');
    
    //         cy.log('Entering password (hidden for security)');
    //         cy.get("input[formcontrolname='password']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type('password', { log: false });
    
    //         cy.log('Submitting login form');
    //         cy.contains("Sign In")
    //             .should('be.visible')
    //             .click({ force: true });
    
    //         // **Step 3: Wait for the application list to load**
    //         cy.log('Waiting for applications to load').wait(2000)
    //             cy.contains(" Pending ")
    
    //             // Click on View Application
    //             cy.contains(" View Application ")
    //                 .should('be.visible')
    //             .click({ force: true });
    
    //         // **Step 4: Click on Approve Application**
    //         cy.log('Click on Approve Application').wait(2000)
    //            cy.contains(" Approve Application ")
    //             .should('be.visible')
    //             .click({ force: true });
    
    //                  cy.log('Click on the Yes button').wait(2000)
    //                  cy.contains(" Yes ")
    //                      .should('be.visible')
    //                      .click();
    
    //                  // Click on the continue button
    //                      cy.log('Click on the continue button');
    //                      cy.contains(" Done ")
    //                          .should('be.visible')
    //                          .click();
    //     });
    

    //     before(() => {
    //         // Ignore uncaught exceptions from the application
    //         Cypress.on('uncaught:exception', (err, runnable) => {
    //             return false;
    //         });
    //     });
    

    //     it('Successfully Assign a License', () => {
    //         // **Step 1: Visit the Application URL with Admin Credentials**
    //         cy.log('Visiting the license application page with Admin Credentials');
    //         cy.visit('http://41.207.248.244:4070/');
    
    //         // **Step 2: Log in to the system**
    //         cy.log('Entering email address');
    //         cy.get("input[formcontrolname='email']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type('culture@oasismgt.net');
    
    //         cy.log('Entering password (hidden for security)');
    //         cy.get("input[formcontrolname='password']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type('password', { log: false });
    
    //         cy.log('Submitting login form');
    //         cy.contains("Sign In")
    //             .should('be.visible')
    //             .click({ force: true });
    
    //         // **Step 3: Wait for the application list to load**
    //         cy.log('Waiting for application list to load').wait(1000);
    
    //         // Click on the Unassigned Tab
    //         cy.contains(" Unassigned ")
    //             .should('exist')
    //             .should('be.visible')
    //             .click({ force: true });
    
    //         // Click on View Application
    //         cy.log('Click on View Application');
    //         cy.contains(" View Application ").wait(2000)
    //             .should('be.visible')
    //             .click({ force: true });
    
    //         // Click on Assign for Inspection
    //         cy.log('Click on Assign for Inspection');
    //         cy.contains(" Assign For Inspection ")
    //             .should('be.visible')
    //             .click({ force: true });
    
    //         // Select the Inspector
    //         cy.log('Select the Inspector');
    //         cy.get('.ng-select-container', { timeout: 10000 })
    //             .should('be.visible')
    //             .scrollIntoView()
    //             .click({ force: true });
    
    //         // Ensure the dropdown is open before selecting the option
    //         cy.get('.ng-dropdown-panel', { timeout: 10000 }) // Wait for dropdown panel
    //             .should('be.visible')
    //             .contains('Destiny Kefas')
    //             .click({ force: true });
    
    //         // Click on the save button
    //            cy.contains("Save")
    //             .click({ force: true });
    
    //                  // Click on the continue button
    //                      cy.log('Click on the continue button');
    //                      cy.contains(" Done ")
    //                          .should('be.visible')
    //                          .click();
    
    //     });


    
    //     before(() => {
    //         // Ignore uncaught exceptions from the application
    //         Cypress.on('uncaught:exception', (err, runnable) => {
    //             return false;
    //         });
    //     });
    

    //     it('Successfully Inspect a License', () => {
    //         // **Step 1: Visit the Application URL with Inspector Credentials**
    //         cy.log('Visiting the license application page with Admin Credentials');
    //         cy.visit('http://41.207.248.244:4070/');
    
    //         // **Step 2: Log in to the system**
    //         cy.log('Entering email address');
    //         cy.get("input[formcontrolname='email']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type('dkefas@oasismgt.net');
    
    //         cy.log('Entering password (hidden for security)');
    //         cy.get("input[formcontrolname='password']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type('Password#1', { log: false });
    
    //         cy.log('Submitting login form');
    //         cy.contains("Sign In")
    //             .should('be.visible')
    //             .click({ force: true });
    
    //             // **Step 3: Wait for the application list to load**
    //             cy.log('Waiting for application list to load').wait(1000);
    //             cy.contains("Pending").should("be.visible")
    
    //         // Click on View Application
    //         cy.log('Click on View Application');
    //         cy.contains(" View Application ")
    //             .should('be.visible')
    //             .wait(1000)
    //             .click({ force: true });
    
    //         // Click on Inspect
    //         cy.log('Click on Inspect');
    //         cy.contains(" Inspect ")
    //             .should('be.visible')
    //             .wait(2000)
    //             .click({ force: true });
    
    //         // **Inspect Assets**
    //         cy.log('Selecting applicable category to inspect');
    
    //         // Select 'NORMAL' for the first question
    //         cy.log('First Question: Selecting NORMAL');
    //         cy.get("select.form-control.form-select")
    //             .eq(0) // First dropdown
    //             .should('be.visible')
    //             .select('NORMAL', { force: true });
    
    //         // Select 'NEUTRAL' for the second question
    //         cy.log('Second Question: Selecting NEUTRAL');
    //         cy.get("select.form-control.form-select")
    //             .eq(1) // Second dropdown
    //             .should('be.visible')
    //             .select('NEUTRAL', { force: true });
    
    //         // Select 'EXCELLENT' for the third question
    //         cy.log('Third Question: Selecting EXCELLENT');
    //         cy.get("select.form-control.form-select")
    //             .eq(2) // Third dropdown
    //             .should('be.visible')
    //             .select('EXCELLENT', { force: true });
    
    //         // Debugging: Check how many dropdowns are found
    //         cy.get("select.form-control.form-select").then($dropdowns => {
    //         });
    
    
    //         // Type in Recommendation Comment
    //         cy.log('Typing Recommendation Comment');
    //         cy.get('#recommendation').should('be.visible').wait(1000).type('Recommendation Test');
    
    //         // Click Submit
    //         cy.log('Clicking Submit');
    //         cy.contains(" Submit ").click({ force: true });
    
    
    //                  // Click on the continue button
    //                      cy.log('Click on the continue button');
    //                      cy.contains(" Done ")
    //                          .should('be.visible')
    //                          .click();
    
    //     });
    
    
    
    //     it('Successfully Approve a License', () => {
    //         // **Step 1: Visit the Application URL with Admin Credentials**
    //         cy.log('Visiting the license application page with Admin Credentials');
    //         cy.visit('http://41.207.248.244:4070/');
    
    //         // **Step 2: Log in to the system**
    //         cy.log('Entering email address');
    //         cy.get("input[formcontrolname='email']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type('culture@oasismgt.net');
    
    //         cy.log('Entering password (hidden for security)');
    //         cy.get("input[formcontrolname='password']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type('password', { log: false });
    
    //         cy.log('Submitting login form');
    //         cy.contains("Sign In")
    //             .should('be.visible')
    //             .click({ force: true });
    
    //         // **Step 3: Wait for the application list to load**
    //         // Click on the Inspected Column
    //         cy.contains(" Inspected ")
    //             .should('exist')
    //             .should('be.visible')
    //             .click({ force: true });
    
    //         // Click on View Application
    //         cy.log('Click on View Application');
    //        cy.contains(" View Application ").wait(2000)
    
    //             .should('be.visible')
    //             .click({ force: true });
        

    //     //     // Click on See Inspection Details
    //     //     cy.log('Click on See Inspection Details');
    //         cy.contains(" See Inspection Details ")
    //             .should('be.visible')
    //             .wait(2000)
    //             .click({ force: true });
    
    //         // **Step 4: Click on Approve Application**
    //         cy.log('Click on Approve Application').wait(2000)
    //         cy.contains(" Approve ")
    //             .should('be.visible')
    //             .click({ force: true });
    
    
    //         //    Click on the Yes button and confirm the approval**
    //              cy.log('Click on the Yes button').wait(2000)
    //              cy.contains(" Yes ")
    //                  .should('be.visible')
    //                  .click();
    
    //                  // Click on the continue button
    //                      cy.log('Click on the continue button');
    //                      cy.contains(" Done ")
    //                          .should('be.visible')
    //                          .click();
    
    //         });
       
            

    //     it('Successfully Pay online for a license', () => {
    //              // **Step 1: Visit the Application URL**
    //              cy.log('Visiting the license application page');
    //              cy.visit('http://41.207.248.244:4070/');
        
    //              // **Step 2: Log in to the system**
    //              cy.log('Entering email address');
    //              cy.get("input[formcontrolname='email']", { timeout: 10000 })
    //                  .should('be.visible')
    //                  .type('Mndueso@oasismgt.net');
        
    //              cy.log('Entering password (hidden for security)');
    //              cy.get("input[formcontrolname='password']", { timeout: 10000 })
    //                  .should('be.visible')
    //                  .type('password', { log: false });
        
    //              cy.log('Submitting login form');
    //              cy.contains("Sign In")
    //                  .should('be.visible')
    //                  .click({ force: true });
        
    //              // Select the Application with payment status "Paid"
    //              cy.contains(" PAID ")
    //              cy.contains(" View Application ").click();
        
        
        
        
    //              // **Step 3: Click on Pay Online**
    //              cy.log('Click on Pay Online').wait(2000);
    //              cy.contains("Pay Online")
    //              .should('be.visible')
    //              .click({ force: true });
        
    //          // **Step 4: Click on Proceed**
        
    //          cy.log('Click on Proceed').wait(2000);
    //           cy.contains("Proceed")
    //              .should('be.visible')
    //              .click({ force: true });
        
    //          // **Step 5: Fill in the Card Details
    //          cy.log('Fill in the Card Details');
        
    //          //Type in the Card Number
    //              cy.get("#card-number").type('5060990580000217499').wait(1000)
        
    //           // Type in the Expiry Date
    //           cy.get("#card-exp").type('0350').wait(1000)
        
    //          // Type in the CVV
    //           cy.get("#card-cvv").type('111').wait(1000)
        
    //          // Click on the Pay Button
    //              cy.contains("Pay NGN 60,000.00").click();
        
    //          // Type in the 4-digit Pin
    //              cy.get("html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > form > div:nth-of-type(1) > div > div:nth-of-type(1) > input:nth-of-type(1)").type('1').wait(1000)
        
    //              cy.get("html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > form > div:nth-of-type(1) > div > div:nth-of-type(1) > input:nth-of-type(2)").type('1').wait(1000)
        
    //              cy.get("html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > form > div:nth-of-type(1) > div > div:nth-of-type(1) > input:nth-of-type(3)").type('1').wait(1000)
        
    //              cy.get("html > body > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div > form > div:nth-of-type(1) > div > div:nth-of-type(1) > input:nth-of-type(4)").type('1').wait(1000)
        
    //              // Click on the Authorize button
    //              cy.contains("Authorize").click();
        
    //              // Type in the OTP
    //              cy.get("input[inputmode='numeric']").type('123456').wait(1000)
        
    //              // Click on the Authorize button
    //              cy.contains("Authorize").click();
        
        
    //              // **Step 6: Click on Continue to Dashboard**
    //          cy.log('Click on Continue to Dashboard').wait(2000);
    //          cy.get('.button > button', { timeout: 10000 })
    //              .should('be.visible')
    //              .click({ force: true });
        
    //          cy.log('Payment process completed successfully.');
        
    //     });

    
    //     it('Successfully Approve a License Application (Commissioner Approval)', () => {
    //         // **Step 1: Visit the Application URL with HOD Credentials**
    //         cy.log('Successfully Approve a License Application (HOD Approval)');
    //         cy.visit('http://41.207.248.244:4070/');
    
    //         // **Step 2: Log in to the system**
    //         cy.log('Entering email address');
    //         cy.get("input[formcontrolname='email']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type('dekeji1@gmail.com');
    
    //         cy.log('Entering password (hidden for security)');
    //         cy.get("input[formcontrolname='password']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type('#Password1', { log: false });
    
    //         cy.log('Submitting login form');
    //         cy.contains("Sign In")
    //             .should('be.visible')
    //             .click({ force: true });
    
    //         // Select the Application with payment status "Paid"
    //         // Select the row containing "PAID" and click "View Application"
    
    //         cy.contains(" PAID ")
    
    //             .should('be.visible')
    //             .click({ force: true });
    //             cy.contains(" View Application ")
    //         cy.get(':nth-child(1) > :nth-child(9) > .d-flex > .btn').click();
    
    
    //         // Click on "See Inspection Details" after ensuring it's visible
    //         cy.contains("See Inspection Details", { timeout: 10000 })
    //             .should('be.visible')
    //             .click({ force: true });
    
    
    //             // **Step 4: Click on Approve Application**
    //             cy.log('Click on Approve Application').wait(2000)
    //             cy.contains(" Approve ")
    //                 .should('be.visible')
    //                 .click({ force: true });
    
    
    //             //    Click on the Yes button and confirm the approval**
    //                  cy.log('Click on the Yes button').wait(2000)
    //                  cy.contains(" Yes ")
    //                      .should('be.visible')
    //                      .click();
    
    //                      // Click on the continue button
    //                          cy.log('Click on the continue button');
    //                          cy.contains(" Done ")
    //                              .should('be.visible')
    //                              .click();
    
    //             });
    
    
    
    
    //     it('Successfully Download the Approved Certificate', () => {
    
    //         cy.log('Visiting the license application page');
    //         cy.visit('http://41.207.248.244:4070/');
    
    //         cy.log('Logging in to the system');
    //         cy.get("input[formcontrolname='email']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type('Mndueso@oasismgt.net');
    //         cy.get("input[formcontrolname='password']", { timeout: 10000 })
    //             .should('be.visible')
    //             .type('password', { log: false });
    //         cy.get("button[type='submit']", { timeout: 10000 })
    //             .should('be.visible')
    //             .click();
    
    //         cy.log('Clicking "Download Certificate"');
    //         cy.wait(1000);
    //         cy.get("html > body > app-root > div > div > app-user-dashboard > div > div:nth-of-type(2) > div > div > div > div > div:nth-of-type(1) > div:nth-of-type(2) > button:nth-of-type(1)")
    //             .should('be.visible')
    //             .click();
    
    //  });
    
    });
    