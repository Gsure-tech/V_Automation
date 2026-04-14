describe('Funding Wallet with Card', () => {
    it('should validate login button behavior and be able to login', () => {
        cy.viewport(1440, 900);
        cy.visit("https://vas.oasisproducts.ng/login");

        cy.log('Clearing the email and password fields');
        cy.get('input[type="email"]').clear();
        cy.get('input[type="password"]').clear();

        // Check that the "Login" button is disabled when both fields are empty
        cy.get('.theme-form > :nth-child(5)').contains('Login').should('be.disabled');
        cy.log('Login button is disabled when email and password are empty');

        cy.log('Entering empty email and valid password');
        cy.get('input[type="email"]').clear();
        cy.get('input[type="password"]').clear().type('Gsure9023@2025');

        cy.get('.theme-form > :nth-child(5)').contains('Login').should('be.disabled');
        cy.log('Login button is disabled when email is empty');

        cy.log('Entering valid email and empty password');
        cy.get('input[type="email"]').clear().type('abdulganiyu9023@gmail.com');
        cy.get('input[type="password"]').clear();

        cy.get('.theme-form > :nth-child(5)').contains('Login').should('be.disabled');
        cy.log('Login button is disabled when password is empty');

        cy.log('Entering valid email and valid password to enable the "Login" button');
        cy.get('input[type="email"]').clear().type('joyoasis9023@gmail.com');
        cy.get('input[type="password"]').clear().type('Gsure9023@2025');

        // Verify the "Login" button is enabled when both email and password are provided
        cy.get('.theme-form > :nth-child(5)').contains('Login').should('not.be.disabled');
        cy.log('"Login" button is enabled when both email and password are entered');

        cy.log('Toggling password visibility by clicking the eye icon');

        // Verify the password is initially hidden (type="password")
        cy.get('input[formcontrolname="password"]').should('have.attr', 'type', 'password');
        cy.log('Password field is initially hidden');

        cy.get('.fa').click();
        cy.log('Clicked the eye icon to show the password');

        cy.get('input[formcontrolname="password"]').should('have.attr', 'type', 'text');
        cy.log('Password field is now visible');

        cy.get('.fa').click();
        cy.log('Clicked the eye icon again to hide the password');

        cy.get('input[formcontrolname="password"]').should('have.attr', 'type', 'password');
        cy.log('Password field is now hidden again');

        cy.get('div[class="checkbox"]').click();
        cy.log('Checked the "Remember Password" checkbox');

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
        cy.get('.btn').click({ force: true });
        cy.get('[name="amount"]').clear();
        cy.get('[name="amount"]').type('1000');
        cy.get('#payment-form > .btn').click();
    });

});