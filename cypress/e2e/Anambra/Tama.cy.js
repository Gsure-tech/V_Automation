describe("TAMA - LOGIN & NAVIGATION FLOW", () => {
    const baseUrl = "https://tax.oasisproducts.ng/";

    // --- UNIQUE DATA GENERATION ---
    const timestampSuffix = Date.now().toString().slice(-8);
    const uniqueEmail = `peaceoasis9023+${timestampSuffix}@gmail.com`;
    const uniquePhone = `070${timestampSuffix}`;


    it("Individual User Full TAMA Flow (Agent Login Path)", () => {
        // --- STEP 1: INITIAL NAVIGATION ---
        cy.visit(baseUrl);
        cy.get('.left > .material-icons').click({ force: true });
        cy.get(':nth-child(10) > a').click();
        cy.get('.btn-agent').click();

        // --- STEP 2: ASIN VALIDATION ---
        cy.get('.form-control').clear().type("35147935");
        cy.get('.d-flex > .btn').click();

        // --- STEP 3: COMPANY/INDIVIDUAL CONTACT DETAILS ---
        cy.get(':nth-child(1) > .row > :nth-child(4) > .flex-grow-1 > .form-control')
            .clear()
            .type(uniquePhone);

        cy.get(':nth-child(1) > .row > :nth-child(5) > .flex-grow-1 > .form-control')
            .clear()
            .type(uniqueEmail);

        cy.get('.card.ng-star-inserted > .row > :nth-child(1) > .flex-grow-1 > .form-control').type("Joy John");
        cy.get('.card.ng-star-inserted > .row > :nth-child(2) > .flex-grow-1 > .form-control').type("Manager");
        cy.get('.card.ng-star-inserted > .row > :nth-child(3) > .flex-grow-1 > .form-control').type(uniquePhone);
        cy.get('.card.ng-star-inserted > .row > :nth-child(4) > .flex-grow-1 > .form-control').type(uniqueEmail);
        // cy.get('.card.ng-star-inserted > .row > :nth-child(5) > .flex-grow-1 > .form-control').type("Agriculture");

        // Select ID and Proceed

        cy.get(':nth-child(1) > [name="meansOfId"]').click({ force: true });
        cy.get('.pt-4 > .btn').click();

        // --- STEP 4: MODAL / SECONDARY CONTACT ---
        cy.get('.justify-content-between > .btn').click();
        cy.get(':nth-child(1) > .flex-grow-1 > .form-control').type("Peace Okeke");
        cy.get(':nth-child(2) > .flex-grow-1 > .form-control').type("Secretary");
        cy.get(':nth-child(3) > .flex-grow-1 > .form-control').type(uniquePhone);
        cy.get(':nth-child(4) > .flex-grow-1 > .form-control').type(uniqueEmail);
        cy.get('.modal-footer > .btn').click();

        // --- STEP 5: TAX PROFESSIONAL SECTION ---
        cy.get('.pt-4 > .btn-warning').click({ force: true });
        cy.get(':nth-child(1) > [name="hasTaxProfessionals"]').click();
        cy.get('#cert_ICAN').click();
        cy.get('.form-control').type("3");
        cy.get('.btn-warning').click();
        cy.wait(40000);

        // --- STEP 6: DOCUMENT UPLOAD PHASE --

        // --- STEP 7: FINAL SUBMISSION ---
        cy.contains('button', 'Submit Application')
            .should('be.visible')
            .click({ force: true });
        cy.get('.modal-content > .card').contains("TAMA Registration Successful")

        // Final confirmation check
        // cy.contains('TAMA Registration Successful', { timeout: 15000 }).should('be.visible');
    });
});