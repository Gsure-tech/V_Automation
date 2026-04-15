describe('Foreign User Creation Flow', () => {
    it('should login and successfully create a Foreign User', () => {
        cy.viewport(1440, 900);
        cy.visit("https://vas.oasisproducts.ng/login");

        cy.log('Entering valid email and valid password to enable the "Login" button');
        cy.get('input[type="email"]').clear().type('abubakaroasis@gmail.com');
        cy.get('input[type="password"]').clear().type('Gsure9023@2025');

        cy.log('Clicking the Login button');
        cy.get('button').contains('Login').click();
        cy.log('Login button clicked successfully');
        cy.get('.fa-regular').click({force:true});
        cy.get('[routerlink="/admin/customer-mgt"] > .sidebar-link').click({force:true});
        cy.get('.create-mda').click();

        // --- SHORT NUMERIC UNIQUE EMAIL ---
        // Generates a 6-digit number based on the current timestamp
        const shortNumericId = Math.floor(Date.now() / 1000).toString().slice(-6);
        const uniqueEmail = `peaceoasis9023+${shortNumericId}@gmail.com`;
        cy.log(`Using numeric unique email: ${uniqueEmail}`);
        cy.get(':nth-child(2) > .input-group > .form-control').clear().type(uniqueEmail)
        cy.get(':nth-child(3) > .input-group > .form-control').select('FOREIGN USER');
        cy.get('.btn').contains('Send Invite').click({force:true});
        cy.wait(5000)
        cy.get('.success-card').contains('success');
        cy.get('.message-title-body').contains('Foreign User link was successfully sent');

    });

});