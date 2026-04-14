describe('End-to-End Coupon Life Cycle', () => {
    let sharedCoupon;

    it('Part 1: Admin - Create and Extract Coupon from UI', () => {
        cy.viewport(1440, 900);
        cy.visit("https://vas.oasisproducts.ng/login");

        cy.get('input[type="email"]').clear().type('abubakaroasis@gmail.com');
        cy.get('input[type="password"]').clear().type('Gsure9023@2025');
        cy.get('button').contains('Login').click();

        cy.get('[routerlink="/admin/coupon"] > .sidebar-link').click({force:true});
        cy.get('.create-coupon').click({force:true});
        cy.get('.dropdown-btn').click({force:true});
        cy.get('.filter-textbox input').first().clear().type('joyoasis9023@gmail.com');
        cy.get('.multiselect-item-checkbox > div').click({force:true});
        cy.get('.bulkcard-modal').clear().type('1000');
        cy.get('.submit-btn').click({force:true});

        // We look for the element containing "Coupon No-" and grab the text
        cy.contains('div', 'Coupon No-', { timeout: 10000 })
            .invoke('text')
            .then((fullText) => {
                // We split it by the hyphen and take the second part, then trim whitespace
                const code = fullText.split('-')[1].trim();

                sharedCoupon = code;
                cy.log(`Extracted Coupon: ${sharedCoupon}`);
            });

        cy.get("svg[viewBox$='14']").click({force:true});
    });

    it('Part 2: User - Redeem the Extracted Coupon', () => {
        expect(sharedCoupon).to.not.be.undefined;

        cy.viewport(1440, 900);
        cy.visit("https://vas.oasisproducts.ng/login");

        // Login Validations
        cy.get('input[type="email"]').type('joyoasis9023@gmail.com');
        cy.get('input[type="password"]').type('Gsure9023@2025');

        // Eye icon toggle logic
        cy.get('.fa').first().click();
        cy.get('input[formcontrolname="password"]').should('have.attr', 'type', 'text');
        cy.get('.fa').first().click();

        cy.get('button').contains('Login').click();
        cy.url({ timeout: 30000 }).should('include', 'dashboard');

        // Navigate to Wallet Funding
        cy.get('.collapse-icon').click();
        cy.get('.btn').contains('Fund Wallet').click({ force: true });
        cy.get(':nth-child(3) > [name="options"]').click({force:true});

        // --- USE THE CAPTURED CODE ---
        cy.log(`Redeeming code: ${sharedCoupon}`);
        cy.get('[name="coupon"]').clear().type(sharedCoupon);

        cy.wait(2000);
        cy.get('#payment-form > .btn').click({force:true});
        cy.get('.success-body').should('contain', 'success');
    });
});


