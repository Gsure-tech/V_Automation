describe('Discount Creation and Deactivation  Flow', () => {
    it('should login and successfully create discount', () => {
        cy.viewport(1440, 900);
        cy.visit("https://vas.oasisproducts.ng/login");

        cy.log('Entering valid email and valid password to enable the "Login" button');
        cy.get('input[type="email"]').clear().type('abubakaroasis@gmail.com');
        cy.get('input[type="password"]').clear().type('Gsure9023@2025');

        cy.log('Clicking the Login button');
        cy.get('button').contains('Login').click();
        cy.log('Login button clicked successfully');
        cy.get('.fa-regular').click({force:true});
        cy.get('[routerlink="/admin/discounts"]').click({force:true});
        cy.get('.create-coupon').click();
        cy.get(':nth-child(1) > .ng-invalid > .multiselect-dropdown > :nth-child(1) > .dropdown-btn').click({force:true});
        cy.get(':nth-child(1) > .ng-invalid > .multiselect-dropdown > .dropdown-list > .item1 > .filter-textbox > .ng-untouched').type('geeee9023@gmail.com');
        cy.get(':nth-child(1) > .ng-untouched > .multiselect-dropdown > .dropdown-list > .item2 > .multiselect-item-checkbox > div').click({force:true});
        cy.get('.ng-invalid > .multiselect-dropdown > :nth-child(1) > .dropdown-btn').click({force:true});
        cy.get('.filter-textbox > .ng-pristine').type("GET COMPANY LINE OF BUSINESS");
        cy.get('.ng-untouched > .multiselect-dropdown > .dropdown-list > .item2 > .multiselect-item-checkbox > div').click({force:true});
        cy.get(':nth-child(4) > .bulkcard-modal').clear().type('50');
        cy.get('.submit-btn').click();
        cy.get('.success-card').contains('success');
        cy.get('.message-title-body').contains('The discount was successfully created');
    });

    it('should login and successfully deactivate discount', () => {
        cy.viewport(1440, 900);
        cy.visit("https://vas.oasisproducts.ng/login");

        cy.log('Entering valid email and valid password to enable the "Login" button');
        cy.get('input[type="email"]').clear().type('abubakaroasis@gmail.com');
        cy.get('input[type="password"]').clear().type('Gsure9023@2025');

        cy.log('Clicking the Login button');
        cy.get('button').contains('Login').click();
        cy.log('Login button clicked successfully');
        cy.get('.fa-regular').click({force:true});
        cy.get('[routerlink="/admin/discounts"]').click({force:true});
        cy.get(':nth-child(1) > :nth-child(9) > .d-inline-block > .dropdown-toggle').click({force:true});
        cy.get('[aria-describedby="tooltip-0"] > :nth-child(9) > .d-inline-block > .dropdown-menu > :nth-child(1)').click({force:true});
        cy.get('.success-card').contains('success');
        cy.get('.message-title-body').contains('The discount was successfully deactivated');
    });

    it('should login and successfully update discount', () => {
        cy.viewport(1440, 900);
        cy.visit("https://vas.oasisproducts.ng/login");

        cy.log('Entering valid email and valid password to enable the "Login" button');
        cy.get('input[type="email"]').clear().type('abubakaroasis@gmail.com');
        cy.get('input[type="password"]').clear().type('Gsure9023@2025');

        cy.log('Clicking the Login button');
        cy.get('button').contains('Login').click();
        cy.log('Login button clicked successfully');
        cy.get('.fa-regular').click({force:true});
        cy.get('[routerlink="/admin/discounts"]').click({force:true});
        cy.get(':nth-child(1) > :nth-child(9) > .d-inline-block > .dropdown-toggle').click({force:true});
        cy.get(':nth-child(1) > :nth-child(9) > .d-inline-block > .dropdown-menu > .dropdown-li').click({force:true});
        cy.get(':nth-child(4) > .bulkcard-modal').clear().type('50');
        cy.get('.submit-btn').click()
    });

});