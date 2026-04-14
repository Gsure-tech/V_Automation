describe('Bulk upload for Registration Wallet with Card', () => {
    it('should login and perform a bulk business registration', () => {
        cy.viewport(1440, 900);
        cy.visit("https://vas.oasisproducts.ng/login");

        cy.log('Entering valid email and valid password to enable the "Login" button');
        cy.get('input[type="email"]').clear().type('joyoasis9023@gmail.com');
        cy.get('input[type="password"]').clear().type('Gsure9023@2025');

        cy.log('Clicking the Login button');
        cy.get('button').contains('Login').click();
        cy.log('Login button clicked successfully');

        cy.log('Verifying the URL after successful login');
        // cy.wait(3000);
        cy.url({ timeout: 30000 }).should('include', 'dashboard');
        cy.log('Successfully logged in and redirected to dashboard');

        cy.log('Clicking on the collapse icon to toggle the menu');
        cy.get('.collapse-icon').click();

        // Assert the dashboard section is visible
        cy.log('Checking if the dashboard and transaction sections are visible');
        cy.get('.fa-regular').click({force:true});
        cy.get('[style="margin-top: 23px; margin-bottom: 0px; height: 50px;"] > .sidebar-link').click({force:true});
        cy.get('#collapseExample > div > ul > .product-list').click({force:true});
        cy.get('.selected-dropdowns').select('BUSINESS NAME');
        cy.get('.optional-email').clear();
        cy.get('.optional-email').type("joyoasis9023@gmail.com");
        // cy.get('.upload-file').click({force:true});
        cy.get('input[type="file"]').selectFile('cypress/fixtures/vasBNRegistration.json', {
            force: true
        });
        cy.get('.continue-btn').click({force:true});
        cy.get('.send-bulk').click({force:true});
        cy.get('p').contains('Your Bulk transaction was successfully completed');
        cy.get('.viewReport').click({force:true});
    });

});