describe('Coupon Creation Flow', () => {
    it('should login and successfully create coupon', () => {
        cy.viewport(1440, 900);
        cy.visit("https://vas.oasisproducts.ng/login");

        cy.log('Entering valid email and valid password to enable the "Login" button');
        cy.get('input[type="email"]').clear().type('abubakaroasis@gmail.com');
        cy.get('input[type="password"]').clear().type('Gsure9023@2025');

        cy.log('Clicking the Login button');
        cy.get('button').contains('Login').click();
        cy.log('Login button clicked successfully');
        cy.get('[routerlink="/admin/coupon"] > .sidebar-link').click({force:true});
        cy.get('.create-coupon').click({force:true});
        cy.get('.dropdown-btn').click({force:true});
        cy.get('.filter-textbox > .ng-pristine').clear().type('joyoasis9023@gmail.com');
        cy.get('.multiselect-item-checkbox > div').click({force:true});
        cy.get('.bulkcard-modal').clear().type('1000');
        cy.get('.submit-btn').click({force:true});
        cy.get("svg[viewBox$='14']").click({force:true});
    });

});