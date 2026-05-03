describe("TAMA - LOGIN & NAVIGATION FLOW", () => {
    const baseUrl = "https://tax.oasisproducts.ng/";

    // --- UNIQUE DATA GENERATION ---
    const timestampSuffix = Date.now().toString().slice(-8);
    const uniqueEmail = `peaceoasis9023+${timestampSuffix}@gmail.com`;
    const uniquePhone = `070${timestampSuffix}`;

    // --- HELPER: ROBUST UPLOAD LOGIC ---
    const uploadDocumentInList = (itemIndex, filePath) => {
        cy.log(`--- Starting Upload for Item Index: ${itemIndex} ---`);

        // 1. Find the specific list item and click its upload button
        cy.get('app-document-upload ul li', { timeout: 20000 })
            .eq(itemIndex)
            .within(() => {
                cy.contains('button', 'Upload Document')
                    .should('be.visible')
                    .click({ force: true });
            });

        // 2. Search globally for the file input (Angular often appends to body)
        // We use a slightly longer timeout to allow the event loop to render the input
        cy.get('input[type="file"]', { timeout: 15000 })
            .last()
            .selectFile(filePath, { force: true });

        // 3. Verification: Look for the "Uploaded" text and success icon in that specific row
        cy.get('app-document-upload ul li')
            .eq(itemIndex)
            .contains('Uploaded', { timeout: 20000 })
            .should('be.visible');

        cy.log(`Item ${itemIndex} Uploaded Successfully`);
    };

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
        cy.get('.card.ng-star-inserted > .row > :nth-child(5) > .flex-grow-1 > .form-control').type("Agriculture");

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

        // --- STEP 6: DOCUMENT UPLOAD PHASE ---
        // Wait for the specific upload component to render
        cy.get('app-document-upload', { timeout: 30000 }).should('be.visible');

        // Upload first document (Index 0 - usually CAC Certificates)
        uploadDocumentInList(0, 'cypress/fixtures/certificate.pdf');

        // If you need to upload the second item in the list, uncomment below:
        // uploadDocumentInList(1, 'cypress/fixtures/certificate.pdf');

        // --- STEP 7: FINAL SUBMISSION ---
        cy.contains('button', 'Submit Application')
            .should('be.visible')
            .click({ force: true });

        // Final confirmation check
        cy.contains('Successfully', { timeout: 15000 }).should('be.visible');
    });
});