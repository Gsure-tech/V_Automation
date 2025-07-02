describe('LGS Business Name Registration Flow', () => {
    const baseUrl = 'http://lgs.oasisproducts.ng';

    it('loads the registration landing page and confirms visibility of primary elements', () => {
        cy.log('Visiting the business registration landing page');
        cy.visit(`${baseUrl}/Bn-registration`);

        cy.log('Validating presence of headline text');
        cy.get('.words').contains('Register A New Business Name In 4 simple Steps');

        cy.log('Validating visibility of navigation buttons');
        cy.get('[routerlink="/Bn-registration/application"]').contains('Register New Business').should('be.visible');
        cy.get('button[routerlink="/status"]').contains('Check Registration Status').should('be.visible');
        cy.get('button[routerlink="/agents"]').contains('Signup for Free').should('be.visible');
    });

    it('shows error when name already exists (400 response)', () => {
        cy.log('Navigating to application form');
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

        cy.log('Intercepting compliance API request');
        cy.intercept('POST', 'http://41.207.248.246:9088/api/ls/bn/external-registration/check-name').as('checkName');
        cy.get("button[class$='ng-star-inserted']").contains('Check compliance').click();

        cy.log('Waiting for compliance response');
        cy.wait('@checkName').then(({response}) => {
            const {statusCode, body} = response;
            cy.log(`Response status: ${statusCode}`);

            if (statusCode === 200) {
                cy.contains('Proprietor Bio Data').should('exist');
            } else if (statusCode === 400) {
                cy.log(`Error message: ${body.errors}`);
                cy.wrap(body.errors).should('include', 'name already exists');
                cy.contains('name already exists').should('exist');
            } else {
                throw new Error(`Unexpected status code: ${statusCode}`);
            }
        });
    });

    it('registers successfully with valid name and uploads valid files', () => {
        cy.log('Opening application form for new registration');
        cy.visit(`${baseUrl}/Bn-registration`);
        cy.get('[routerlink="/Bn-registration/application"]').contains('Register New Business').click();
        cy.url().should('include', '/Bn-registration/application');

        cy.log('Filling form with a unique business name');
        cy.get('#BusinessName').type('Nvidea Commamd Hub');
        cy.get('#companyEmail').type('founder@mah.com');
        cy.get('#companyStreetNumber').type('12');
        cy.get('#companyStateOfResidence').select('Kano State');
        cy.get('#companyAddress').type('12B Airport Road, Kano');
        cy.get('#companyCity').type('Kano');
        cy.get('#lineOfBusiness').select('Legal practice and Consultancy');

        cy.log('Intercepting name compliance check');
        cy.intercept('POST', 'http://41.207.248.246:9088/api/ls/bn/external-registration/check-name').as('checkName');
        cy.get("button[class$='ng-star-inserted']").contains('Check compliance').click();

        cy.wait('@checkName').then(({response}) => {
            const {statusCode} = response;
            cy.log(`Compliance response: ${statusCode}`);

            if (statusCode === 200) {
                cy.log('Filling proprietor bio data section');
                cy.get('h4').contains('Business Registration form');
                cy.get('#proprietorFirstName').type('Agada');
                cy.get('#proprietorLastName').type('Joseph');
                cy.get('#proprietorOtherName').type('Akpala');
                cy.get('#proprietorPhoneNumber').type('08033221100');
                cy.get('#proprietorEmail').type('geeee9023@gmail.com');
                cy.get('#proprietorGender').select('Male');
                cy.get('.nextBtn').contains('Next').click();

                cy.log('Completing demographic data section');
                cy.get('#proprietorStreetNumber').type('40');
                cy.get('#proprietorState').select('Adamawa State');
                cy.get('#proprietorCity').type('Mubi');
                cy.get('#proprietorLga').select('Hong');
                cy.get('#proprietorDob').type('1995-06-01').should('have.value', '1995-06-01');
                cy.get('#proprietorServiceAddress').type('College Road');
                cy.get('.nextBtn').contains('Next').click();

                const largeFile = 'spiral.png';
                cy.log('Uploading large invalid files to test file size validation');

                ['Upload Proprietor Signature', 'Upload Proprietor ID', 'Upload Proprietor Photograph', 'Upload Supporting Document'].forEach(label => {
                    cy.contains(label).parent().find('input[type="file"]').selectFile(`cypress/fixtures/${largeFile}`, {force: true});
                });

                const errorSelectors = [
                    ':nth-child(1) > :nth-child(2) > div.ng-star-inserted > .error-message',
                    ':nth-child(2) > :nth-child(2) > div.ng-star-inserted > .error-message',
                    ':nth-child(3) > :nth-child(2) > div.ng-star-inserted > .error-message',
                    ':nth-child(4) > :nth-child(2) > div.ng-star-inserted > .error-message',
                ];

                cy.log('Validating oversized file error messages');
                errorSelectors.forEach(selector => {
                    cy.get(selector)
                        .invoke('text')
                        .should(text => expect(text.trim().toLowerCase()).to.match(/file size exceed(s)? 500kb/i));
                });

                const validFile = 'gamma1.png';
                cy.log('Uploading valid files after error');
                ['Upload Proprietor Signature', 'Upload Proprietor ID', 'Upload Proprietor Photograph', 'Upload Supporting Document'].forEach(label => {
                    cy.contains(label).parent().find('input[type="file"]').selectFile(`cypress/fixtures/${validFile}`, {force: true});
                });

                cy.log('Submitting registration form for payment');
                cy.get('.submitBtn').should('not.be.disabled').click();
                cy.get('h3').contains('Payment').should('exist');

                cy.log('Entering mismatched emails to test validation');
                cy.get('input[formcontrolname="email"]').type('test1@example.com');
                cy.get('input[formcontrolname="confirmEmail"]').type('test2@example.com');
                cy.get('button.status-button').contains('Make Payment').click();

                cy.get('div[class$="error-background"] div')
                    .should('contain.text', 'Emails supplied do not match')
                    .then(() => {
                        cy.log('Mismatched email error confirmed');
                        cy.get('div[class$="error-background"] svg').click({force: true});
                        cy.log('Closed mismatched email modal');
                    });

                cy.log('Entering matching emails for payment');
                cy.get('input[formcontrolname="email"]').clear().type('geeee9023@gmail.com');
                cy.get('input[formcontrolname="confirmEmail"]').clear().type('geeee9023@gmail.com');
                cy.get('button.status-button').contains('Make Payment').click();
            }
        });

        cy.log('Final confirmation of payment modal');
        cy.get('h3').contains('Payment').should('exist');
    });

    it('check registration status', () => {
        cy.visit(`${baseUrl}/Bn-registration`);
        cy.log('Clicking "Check Registration Status" from landing page');
        cy.get('button[routerlink="/status"]').should('be.visible').click();
        cy.url().should('include', '/status');
        cy.log('Validating fields for registration status check');
        cy.get('input[formcontrolname="transactionReference"]').should('exist');
        cy.get('input[formcontrolname="passcode"]').should('exist');
        cy.get('button.status-button').should('contain.text', 'Check Status');
    });

    it('shows and closes error modal on incorrect transaction reference or passcode', () => {
        cy.visit('http://lgs.oasisproducts.ng/status');
        cy.log('Typing incorrect registration credentials');
        cy.get('input[formcontrolname="transactionReference"]').type('LGS9884949830PQ');
        cy.get('input[formcontrolname="passcode"]').type('wrongpass');
        cy.get('button.status-button').click();
        cy.log('Expecting error modal for incorrect credentials');
        cy.get('div[class$="error-background"] div').should('contain.text', 'Incorrect passcode or transaction reference');
        cy.get('path[d="M6.5 6.08911L18.5 18.0891"]').click();
        cy.log('Clicked close icon on error modal');
        cy.get('h6.paragraph span').contains('Click here').click();
        cy.get('header[class="header"] h3').should('contain.text', "Don’t have a passcode?");
    });

    it('requests passcode and handles error/success modals', () => {
        cy.visit('http://lgs.oasisproducts.ng/status');
        cy.log('Opening passcode request modal');
        cy.get('h6.paragraph span').contains("Click here").click();
        cy.get('header.header h3').should('contain.text', "Don’t have a passcode?");
        cy.log('Submitting invalid reference');
        cy.get('.passcode-card input.inputField').clear().type("LGS2506231435130PP");
        cy.get('button[class$="ng-star-inserted"]').contains("Send passcode").click();
        cy.get('div[class$="error-background"] div').should('contain.text', 'error generating passcode');
        cy.get('svg[viewBox="0 0 25 25"] path[d="M6.5 6.08911L18.5 18.0891"]').click();
        cy.log('Submitting valid transaction reference');
        cy.get('.passcode-card input.inputField').clear().type("LGS250623143513003");
        cy.get('button[class$="ng-star-inserted"]').contains("Send passcode").click();
        cy.get('div[class$="success-background"] div').should('contain.text', 'Passcode has been sent to your email');
    });

    it('shows application status modal on correct transaction reference or passcode', () => {
        cy.log('Navigating to registration status page');
        cy.visit('http://lgs.oasisproducts.ng/status');

        cy.log('Entering valid transaction reference and passcode');
        cy.get('input[formcontrolname="transactionReference"]').type('LGS250623143513003');
        cy.get('input[formcontrolname="passcode"]').type('35135639');

        cy.log('Clicking "Check Status" button');
        cy.get('button.status-button').click();

        cy.log('Waiting for status modal to appear and validating its content');
        cy.get('h3.words')
            .should('be.visible')
            .and('contain.text', 'Application Status Check');

        cy.get('p')
            .should('be.visible')
            .and('contain.text', 'Your application');

        //validate specific statuses like "PENDING", "APPROVED", etc.
        cy.get('p').invoke('text').then((text) => {
            expect(text).to.match(/Your application is (PENDING|APPROVED|QUERIED)/i);
        });

    });


});
