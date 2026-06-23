describe('Admin Creation Flow', () => {
    it('should login and successfully create admin', () => {
        cy.viewport(1440, 900);
        cy.visit("https://vas.oasisproducts.ng/login");

        // --- LOGIN ---
        cy.get('input[type="email"]').type('abubakaroasis@gmail.com');
        cy.get('input[type="password"]').type('Gsure9023@2025');
        cy.get('button').contains('Login').click();

        // --- NAVIGATION ---
        cy.get('.fa-regular').click({force:true});
        cy.get('[routerlink="/admin/admin-mgt"] > .sidebar-link').click({force:true});
        cy.get('.create-admin').click();

        // --- SHORT NUMERIC UNIQUE EMAIL ---
        // Generates a 6-digit number based on the current timestamp
        const shortNumericId = Math.floor(Date.now() / 1000).toString().slice(-6);
        const uniqueEmail = `peaceoasis9023+${shortNumericId}@gmail.com`;
        cy.log(`Using numeric unique email: ${uniqueEmail}`);

        cy.get(':nth-child(1) > .bulkcard-modal').clear().type(uniqueEmail);
        cy.get(':nth-child(2) > .bulkcard-modal').select('vas_admin');

        // --- SUBMIT ---
        cy.get('.submit-btn').click({force:true});
        cy.get('.success-card').contains('success');
    });
});