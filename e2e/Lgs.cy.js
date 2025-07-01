// describe('LGS Business Name Registration Flow', () => {
//     const baseUrl = 'http://lgs.oasisproducts.ng';
//
//     it('loads the registration landing page and confirms visibility of primary elements', () => {
//         cy.visit(`${baseUrl}/Bn-registration`);
//
//         cy.get('.words').contains('Register A New Business Name In 4 simple Steps');
//
//         cy.get('[routerlink="/Bn-registration/application"]')
//             .contains('Register New Business')
//             .should('be.visible');
//
//         cy.get('button[routerlink="/status"]')
//             .contains('Check Registration Status')
//             .should('be.visible');
//
//         cy.get('button[routerlink="/agents"]')
//             .contains('Signup for Free')
//             .should('be.visible');
//     });
//
//     it('navigates to registration form, fills details,validates name compliance, returns 400 when name already exist', () => {
//
//         cy.visit(`${baseUrl}/Bn-registration`);
//
//         cy.get('[routerlink="/Bn-registration/application"]')
//             .contains('Register New Business')
//             .click();
//
//         cy.url().should('include', '/Bn-registration/application');
//         cy.get('#BusinessName').type('Mighty Accelarator Hub');
//         cy.get('#companyEmail').type('founder@mah.com');
//         cy.get('#companyStreetNumber').type('12');
//         cy.get('#companyStateOfResidence').select('Kano State');
//         cy.get('#companyAddress').type('12B Airport Road, Kano');
//         cy.get('#companyCity').type('Kano');
//         cy.get('#lineOfBusiness').select('Legal practice and Consultancy');
//
//         // Step 4: Intercept API
//         cy.intercept('POST', 'http://41.207.248.246:9088/api/ls/bn/external-registration/check-name').as('checkName');
//
//         // Step 5: Submit form
//         cy.get("button[class$='ng-star-inserted']").contains('Check compliance').click();
//
//         // Step 6: Wait for response
//         cy.wait('@checkName').then((interception) => {
//             const { statusCode, body } = interception.response;
//
//             if (statusCode === 200) {
//                 cy.contains('Proprietor Bio Data').should('exist');
//             } else if (statusCode === 400) {
//                 cy.wrap(body.errors).should('include', 'name already exists');
//                 cy.contains('name already exists').should('exist');
//             } else {
//                 throw new Error(`Unexpected status code: ${statusCode}`);
//             }
//         });
//     });
//
//     it('navigates to registration form, fills details,validates name compliance and proceed', () => {
//
//         cy.visit(`${baseUrl}/Bn-registration`);
//
//         cy.get('[routerlink="/Bn-registration/application"]')
//             .contains('Register New Business')
//             .click();
//
//         cy.url().should('include', '/Bn-registration/application');
//
//
//         cy.get('#BusinessName').type('Nvidea Monolith Hub');
//         cy.get('#companyEmail').type('founder@mah.com');
//         cy.get('#companyStreetNumber').type('12');
//         cy.get('#companyStateOfResidence').select('Kano State');
//         cy.get('#companyAddress').type('12B Airport Road, Kano');
//         cy.get('#companyCity').type('Kano');
//         cy.get('#lineOfBusiness').select('Legal practice and Consultancy');
//
//         // Step 4: Intercept API
//         cy.intercept('POST', 'http://41.207.248.246:9088/api/ls/bn/external-registration/check-name').as('checkName');
//
//         // Step 5: Submit form
//         cy.get("button[class$='ng-star-inserted']").contains('Check compliance').click();
//
//         // Step 6: Wait for response
//         cy.wait('@checkName').then((interception) => {
//             const { statusCode, body } = interception.response;
//
//             if (statusCode === 200) {
//                 cy.get('h4').contains('Business Registration form');
//                 cy.get('#proprietorFirstName').type('Agada');
//                 cy.get('#proprietorLastName').type('Joseph');
//                 cy.get('#proprietorOtherName').type('Akpala');
//                 cy.get('#proprietorPhoneNumber').type('08033221100');
//                 cy.get('#proprietorEmail').type('geeee9023@gmail.com');
//                 cy.get('#proprietorGender').select('Male');
//                 cy.get('.nextBtn').contains('Next').click();
//
//                 cy.get('#proprietorStreetNumber').type('40');
//                 cy.get('#proprietorState').select('Adamawa State');
//                 cy.get('#proprietorCity').type('Mubi');
//                 cy.get('#proprietorLga').select('Hong');
//                 const dob = '1995-06-01';
//                 cy.get('#proprietorDob').type(dob).should('have.value', dob);
//                 cy.get('#proprietorServiceAddress').type('College Road');
//                 cy.get('.nextBtn').contains('Next').click();
//
//
//
//
//
//                 const largeFile = 'spiral.png';
//
//                 // Upload large file to all slots
//                 cy.contains('Upload Proprietor Signature')
//                     .parent()
//                     .find('input[type="file"]')
//                     .selectFile(`cypress/fixtures/${largeFile}`, { force: true });
//
//                 cy.contains('Upload Proprietor ID')
//                     .parent()
//                     .find('input[type="file"]')
//                     .selectFile(`cypress/fixtures/${largeFile}`, { force: true });
//
//                 cy.contains('Upload Proprietor Photograph')
//                     .parent()
//                     .find('input[type="file"]')
//                     .selectFile(`cypress/fixtures/${largeFile}`, { force: true });
//
//                 cy.contains('Upload Supporting Document')
//                     .parent()
//                     .find('input[type="file"]')
//                     .selectFile(`cypress/fixtures/${largeFile}`, { force: true });
//
//                 // Validate that error messages appear with consistent matching
//                 const errorSelectors = [
//                     ':nth-child(1) > :nth-child(2) > div.ng-star-inserted > .error-message',
//                     ':nth-child(2) > :nth-child(2) > div.ng-star-inserted > .error-message',
//                     ':nth-child(3) > :nth-child(2) > div.ng-star-inserted > .error-message',
//                     ':nth-child(4) > :nth-child(2) > div.ng-star-inserted > .error-message',
//                 ];
//
//                 errorSelectors.forEach((selector) => {
//                     cy.get(selector)
//                         .invoke('text')
//                         .should((text) => {
//                             expect(text.trim().toLowerCase()).to.match(/file size exceed(s)? 500kb/i);
//                         });
//                 });
//
//
//
//
//
//
//                 const fileName = 'gamma1.png';
//
//                 // Upload Proprietor Signature
//                 cy.contains('Upload Proprietor Signature')
//                     .parent()
//                     .find('input[type="file"]')
//                     .selectFile(`cypress/fixtures/${fileName}`, { force: true });
//
//                 // Upload Proprietor ID
//                 cy.contains('Upload Proprietor ID')
//                     .parent()
//                     .find('input[type="file"]')
//                     .selectFile(`cypress/fixtures/${fileName}`, { force: true });
//
//                 // Upload Proprietor Photograph
//                 cy.contains('Upload Proprietor Photograph')
//                     .parent()
//                     .find('input[type="file"]')
//                     .selectFile(`cypress/fixtures/${fileName}`, { force: true });
//
//                 // Upload Supporting Document
//                 cy.contains('Upload Supporting Document')
//                     .parent()
//                     .find('input[type="file"]')
//                     .selectFile(`cypress/fixtures/${fileName}`, { force: true });
//
//
//
//                 // Click the "Continue to Payment" button
//                 cy.get('.submitBtn').should('not.be.disabled').click();
//
//                 cy.get('h3').contains('Payment').should('exist')
//
//             } else if (statusCode === 400) {
//                 cy.wrap(body.errors).should('include', 'name already exists');
//                 cy.contains('name already exists').should('exist');
//             } else {
//                 throw new Error(`Unexpected status code: ${statusCode}`);
//             }
//         });
//     });
//
// });


describe('LGS Business Name Registration Flow', () => {
    const baseUrl = 'http://lgs.oasisproducts.ng';

    it('loads the registration landing page and confirms visibility of primary elements', () => {
        cy.log('Visiting landing page');
        cy.visit(`${baseUrl}/Bn-registration`);

        cy.log('Checking headline text');
        cy.get('.words').contains('Register A New Business Name In 4 simple Steps');

        cy.log('Checking presence of navigation buttons');
        cy.get('[routerlink="/Bn-registration/application"]').contains('Register New Business').should('be.visible');
        cy.get('button[routerlink="/status"]').contains('Check Registration Status').should('be.visible');
        cy.get('button[routerlink="/agents"]').contains('Signup for Free').should('be.visible');
    });

    it('shows error when name already exists (400 response)', () => {
        cy.log('Navigating to registration form');
        cy.visit(`${baseUrl}/Bn-registration`);
        cy.get('[routerlink="/Bn-registration/application"]').contains('Register New Business').click();
        cy.url().should('include', '/Bn-registration/application');

        cy.log('Filling business registration form with existing name');
        cy.get('#BusinessName').type('Mighty Accelarator Hub');
        cy.get('#companyEmail').type('founder@mah.com');
        cy.get('#companyStreetNumber').type('12');
        cy.get('#companyStateOfResidence').select('Kano State');
        cy.get('#companyAddress').type('12B Airport Road, Kano');
        cy.get('#companyCity').type('Kano');
        cy.get('#lineOfBusiness').select('Legal practice and Consultancy');

        cy.log('Intercepting compliance API');
        cy.intercept('POST', 'http://41.207.248.246:9088/api/ls/bn/external-registration/check-name').as('checkName');
        cy.get("button[class$='ng-star-inserted']").contains('Check compliance').click();

        cy.log('Waiting for compliance API response');
        cy.wait('@checkName').then(({ response }) => {
            const { statusCode, body } = response;

            cy.log(`Received response status: ${statusCode}`);

            if (statusCode === 200) {
                cy.contains('Proprietor Bio Data').should('exist');
            } else if (statusCode === 400) {
                cy.log(`Received error: ${body.errors}`);
                cy.wrap(body.errors).should('include', 'name already exists');
                cy.contains('name already exists').should('exist');
            } else {
                throw new Error(`Unexpected status code: ${statusCode}`);
            }
        });
    });

    it('registers successfully with valid name and uploads valid files', () => {
        cy.log('Navigating to registration form');
        cy.visit(`${baseUrl}/Bn-registration`);
        cy.get('[routerlink="/Bn-registration/application"]').contains('Register New Business').click();
        cy.url().should('include', '/Bn-registration/application');

        cy.log('Filling business form with a new unique name');
        cy.get('#BusinessName').type('Nvidea Commamd Hub');
        cy.get('#companyEmail').type('founder@mah.com');
        cy.get('#companyStreetNumber').type('12');
        cy.get('#companyStateOfResidence').select('Kano State');
        cy.get('#companyAddress').type('12B Airport Road, Kano');
        cy.get('#companyCity').type('Kano');
        cy.get('#lineOfBusiness').select('Legal practice and Consultancy');

        cy.log('Intercepting compliance check');
        cy.intercept('POST', 'http://41.207.248.246:9088/api/ls/bn/external-registration/check-name').as('checkName');
        cy.get("button[class$='ng-star-inserted']").contains('Check compliance').click();

        cy.wait('@checkName').then(({ response }) => {
            const { statusCode, body } = response;
            cy.log(`Compliance response status: ${statusCode}`);

            if (statusCode === 200) {
                cy.log('Filling proprietor bio data');
                cy.get('h4').contains('Business Registration form');
                cy.get('#proprietorFirstName').type('Agada');
                cy.get('#proprietorLastName').type('Joseph');
                cy.get('#proprietorOtherName').type('Akpala');
                cy.get('#proprietorPhoneNumber').type('08033221100');
                cy.get('#proprietorEmail').type('geeee9023@gmail.com');
                cy.get('#proprietorGender').select('Male');
                cy.get('.nextBtn').contains('Next').click();

                cy.log('Filling proprietor demographic data');
                cy.get('#proprietorStreetNumber').type('40');
                cy.get('#proprietorState').select('Adamawa State');
                cy.get('#proprietorCity').type('Mubi');
                cy.get('#proprietorLga').select('Hong');
                cy.get('#proprietorDob').type('1995-06-01').should('have.value', '1995-06-01');
                cy.get('#proprietorServiceAddress').type('College Road');
                cy.get('.nextBtn').contains('Next').click();

                const largeFile = 'spiral.png';
                cy.log('Uploading large file to simulate size error');

                ['Upload Proprietor Signature', 'Upload Proprietor ID', 'Upload Proprietor Photograph', 'Upload Supporting Document'].forEach(label => {
                    cy.contains(label)
                        .parent()
                        .find('input[type="file"]')
                        .selectFile(`cypress/fixtures/${largeFile}`, { force: true });
                });

                const errorSelectors = [
                    ':nth-child(1) > :nth-child(2) > div.ng-star-inserted > .error-message',
                    ':nth-child(2) > :nth-child(2) > div.ng-star-inserted > .error-message',
                    ':nth-child(3) > :nth-child(2) > div.ng-star-inserted > .error-message',
                    ':nth-child(4) > :nth-child(2) > div.ng-star-inserted > .error-message',
                ];

                cy.log('Validating all oversized file error messages');
                errorSelectors.forEach((selector) => {
                    cy.get(selector)
                        .invoke('text')
                        .should((text) => {
                            expect(text.trim().toLowerCase()).to.match(/file size exceed(s)? 500kb/i);
                        });
                });

                const fileName = 'gamma1.png';
                cy.log('Uploading valid file after error');

                ['Upload Proprietor Signature', 'Upload Proprietor ID', 'Upload Proprietor Photograph', 'Upload Supporting Document'].forEach(label => {
                    cy.contains(label)
                        .parent()
                        .find('input[type="file"]')
                        .selectFile(`cypress/fixtures/${fileName}`, { force: true });
                });

                cy.log('Submitting for payment');
                cy.get('.submitBtn').should('not.be.disabled').click();
                cy.get('h3').contains('Payment').should('exist');

            } else if (statusCode === 400) {
                cy.wrap(body.errors).should('include', 'name already exists');
                cy.contains('name already exists').should('exist');
            } else {
                throw new Error(`Unexpected status code: ${statusCode}`);
            }
        });

        cy.log('Proceeded to Payment Modal');
        cy.get('h3').contains('Payment').should('exist');

// Step 1: Mismatched email check
        cy.log('Testing with mismatched emails');
        cy.get('input[formcontrolname="email"]').type('test1@example.com');
        cy.get('input[formcontrolname="confirmEmail"]').type('test2@example.com');
        cy.get('button.status-button').contains('Make Payment').click();

// Step 2: Check for error message and close modal
        cy.get('div[class$="error-background"] div')
            .should('contain.text', 'Emails supplied do not match')
            .then(() => {
                cy.log('Caught email mismatch validation');

                // Click the SVG close icon (X)
                cy.get('div[class$="error-background"] svg')
                    .should('exist')
                    .click({ force: true }); // use force in case it's overlayed

                cy.log('Closed error modal');
            });


 // Provide valid matching emails
        cy.get('input[formcontrolname="email"]').clear().type('geeee9023@gmail.com');
        cy.get('input[formcontrolname="confirmEmail"]').clear().type('geeee9023@gmail.com');
        cy.get('button.status-button').contains('Make Payment').click();
//
// // Enter card number
//         cy.get('input[name="cardNumber"]')
//             .type('5060990580000217499')
//             .should('have.value', '5060 9905 8000 0217 499');
//
// // Enter expiry
//         cy.get('input[name="cardExpiry"]')
//             .type('0350')
//             .should('have.value', '03/50');
//
// // Enter CVV
//         cy.get('input[name="cvv"]')
//             .type('111')
//             .should('have.value', '111');
//
// // Click Proceed
//         cy.get('button.submit_btn').should('not.be.disabled').click();
//
// // Log: Moved to PIN input screen
//         cy.log('Proceed clicked. Waiting for PIN screen...');



    });



    it('check registration status', () => {
        // Visit the homepage
        cy.visit(`${baseUrl}/Bn-registration`);

        // Log the action
        cy.log('Clicking on the Check Registration Status button');

        // Click the "Check Registration Status" button
        cy.get('button[routerlink="/status"]')
            .should('be.visible')
            .and('contain.text', 'Check Registration Status')
            .click();

        // Assert that navigation to the status page occurred
        cy.url().should('include', '/status');

        // Confirm presence of required fields and button
        cy.get('input[formcontrolname="transactionReference"]').should('exist');
        cy.get('input[formcontrolname="passcode"]').should('exist');
        cy.get('button.status-button').should('contain.text', 'Check Status');
    });

    it('shows and closes error modal on incorrect transaction reference or passcode', () => {
        // Step 1: Visit the status page directly
        cy.visit('http://lgs.oasisproducts.ng/status');

        // Step 2: Fill in incorrect credentials
        cy.get('input[formcontrolname="transactionReference"]').type('LGS9884949830PQ');
        cy.get('input[formcontrolname="passcode"]').type('wrongpass');

        // Step 3: Submit the form
        cy.get('button.status-button').should('contain.text', 'Check Status').click();

        // Step 4: Assert the error modal appears
        cy.get('div[class$="error-background"] div')
            .should('be.visible')
            .and('contain.text', 'Incorrect passcode or transaction reference');



        // Step 5: Close the modal
        cy.get('path[d="M6.5 6.08911L18.5 18.0891"]').click();

        cy.log('Error modal appeared and was dismissed successfully');

        // Click on the "Don't have a passcode? Click here" label
        cy.get('h6.paragraph span')
            .contains('Click here')
            .should('be.visible')
            .click();

        // Assert modal header is visible and contains correct text
        cy.get('header[class="header"] h3')
            .should('be.visible')
            .and('contain.text', "Don’t have a passcode?");
    });



    it('requests passcode and handles error/success modals', () => {
        // Step 1: Visit the status page directly
        cy.visit('http://lgs.oasisproducts.ng/status');

        // Step 2: Click "Don't have a passcode? Click here"
        cy.get('h6.paragraph span')
            .contains("Click here")
            .click();

        // Step 3: Confirm modal header is visible
        cy.get('header.header h3').should('contain.text', "Don’t have a passcode?");

        // Step 4: Enter invalid transaction reference
        cy.get('input[class$="ng-valid"]').clear().type("LGS2506231435130PP");
        cy.get('button[class$="ng-star-inserted"]').contains("Send passcode").click();

        // Step 5: Assert error message and close icon
        cy.get('div[class$="error-background"] div')
            .should('contain.text', 'error generating passcode');
        cy.get('svg[viewBox$="25"]').click(); // Click ❌ to close

        // Step 6: Enter valid transaction reference and try again
        cy.get('input[class$="ng-valid"]').clear().type("LGS250623143513003");
        cy.get('button[class$="ng-star-inserted"]').contains("Send passcode").click();

        // Step 7: Assert success notification
        cy.get('div[class$="success-background"] div')
            .should('contain.text', 'Passcode has been sent to your email');
    });


});
