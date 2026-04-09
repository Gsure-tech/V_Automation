describe('LICENSE APPLICATION - ARTISANS', () => {

    const baseUrl = 'http://41.207.248.246:3600/';

    // ==============================
    // 🔑 CONSTANTS
    // ==============================
    const ASIN = {
        individual: '17602288105',
        corporate: '16995905859'
    };

    const credentials = {
        applicant: { email: 'mndueso@oasismgt.net', password: '*Mndueso3' },
        reviewer: { email: 'dev.francisuloko@gmail.com', password: 'Password@123' },
        admin: { email: 'admin@oasismgt.net', password: 'P@ssw0rd!' }
    };

    // ==============================
    // 🔐 LOGIN HELPER
    // ==============================
    const login = (email, password) => {
        cy.visit(baseUrl);
        cy.log('🔑 Logging into system');

        cy.contains('Login').click();

        cy.get('#Email-ASIN', { timeout: 15000 })
            .should('be.visible')
            .clear()
            .type(email);

        cy.get('#login-password')
            .should('be.visible')
            .clear()
            .type(password, { log: false });

        cy.contains(" Login ").click();

        cy.log('✅ Login submitted');
    };

    // ==============================
    // 1️⃣ APPLICATION FLOW
    // ==============================
    it('1️⃣ Successfully applies for ARTISANS license', () => {
        // cy.viewport(1440, 900);

        login(credentials.applicant.email, credentials.applicant.password);

        cy.wait(1000);
        cy.get('[routerlink="/user/license"] > .nav-container > p').click({force: true});
        cy.get('#licenseType').select('ARTISANS');
        cy.get('button').click({force: true})
        cy.get('.input').clear().type('17602288105');
        cy.get('.d-flex > button').click({force: true});
        // cy.contains('Licenses').click();
        // cy.log('📄 Navigated to Licenses page');
        //
        // cy.contains('ARTISANS').click({ force: true });
        // cy.log('🛠 Selected ARTISANS license');
        //
        // cy.contains('APPLY').click({ force: true });
        //
        // // ==============================
        // // 👤 BUSINESS OWNER DETAILS
        // // ==============================
        // cy.get('.input-group-div input', { timeout: 15000 })
        //     .should('be.visible')
        //     .clear()
        //     .type(ASIN.individual);
        // cy.log(`👤 Entered ASIN: ${ASIN.individual}`);
        //
        // // ==============================
        // // 🔎 VERIFY ASIN
        // // ==============================
        //
        // cy.contains(" Verify ASIN ")
        //     .should('be.visible')
        //     .click();
        //
        // cy.log('🔎 ASIN verification clicked');
        // cy.wait(10000);
        // cy.wait(10000);
        // cy.get('.link > .nav-container').click({force: true});
        // ==============================
        // 🚨 FIX: STABLE SPA NAVIGATION CHECK
        // ==============================

        // Wait for route to stabilize (prevents intermediate ?type= issue)
        // cy.location('pathname', { timeout: 30000 })
        //     .should('include', '/user/license/applications');
        //
        // // Confirm correct query param AFTER route settles
        // cy.location('search', { timeout: 30000 })
        //     .should('include', 'type=ARTISANS');
        //
        // cy.log('✅ Successfully redirected to ARTISANS applications page');
        //
        // // ==============================
        // // (Optional) Continue flow after redirect
        // // ==============================
        //
        // cy.contains('Licenses').click();
        // cy.contains('ARTISANS').click({ force: true });
        // cy.contains('APPLY').click({ force: true });
        //
        // cy.log('➡️ Returned to application flow');
        //
        // // Workshop Details
        cy.get('[style="position: relative;"] input', { timeout: 15000 })
            .should('be.visible')
            .type('A');
        cy.get('.ms-0 > :nth-child(2)').click({force: true});
        cy.get('.ms-mb-10 > .input').select('Category A');
        cy.get('.proceed').click({force: true});
        cy.wait(10000);
        // cy.get('.save').click({force: true});
        // cy.get('[style="display: flex; justify-content: flex-end; margin-top: 2rem;"] > div > .proceed',{ timeout: 15000 }).click();
        // // cy.contains('PROCEED TO PAYMENT').click({ force: true });
        // cy.wait(10000);
        // cy.get('.already-paid').click({force: true});

        // cy.contains('Automobile Spare Part Dealer / Buchi And Son')
        //     .should('be.visible')
        //     .click();

        // cy.get('select')
        //     .should('be.visible')
        //     .select('Category A');
        //
        // // ==============================
        // // 📤 DOCUMENT UPLOAD
        // // ==============================
        // const documents = [
        //     'Account_Creation.pdf',
        //     'certificate.pdf',
        //     'status-report.pdf'
        // ];
        // documents.forEach((file, i) => {
        //     cy.get('input[type="file"]')
        //         .eq(i)
        //         // .attachFile(file, { force: true });
        //
        //     cy.get('.upload-btn')
        //         .eq(i)
        //         .click();
        // });
        //
        // cy.log('📤 Documents uploaded');
        //
        // cy.contains('PROCEED').click({ force: true });
        // cy.contains('SAVE').click();
        //
        // cy.log('✅ Application completed successfully');
    });


    // it('2️⃣ Pays for ARTISANS license', () => {
    //
    //     login(credentials.applicant.email, credentials.applicant.password);
    //
    //     cy.contains('Licenses').click();
    //
    //     cy.get('div svg').eq(5).click();
    //
    //     cy.contains('Make Payment').click({ force: true });
    //
    //     cy.contains('Pay Online')
    //         .should('be.visible')
    //         .click({ force: true });
    //
    //     cy.log('💳 Payment initiated');
    //
    //     cy.wait(30000);
    // });
    //
    // it('3️⃣ Reviewer submits recommendation', () => {
    //
    //     login(credentials.reviewer.email, credentials.reviewer.password);
    //
    //     cy.get('#dropdownMenu1 > p').click();
    //
    //     cy.get('.dropdown-menu .dropdown-item')
    //         .first()
    //         .click();
    //
    //     cy.get("svg[data-inline='false']")
    //         .first()
    //         .click();
    //
    //     cy.contains('View Details').click();
    //
    //     cy.contains('Recommend for Approval').click();
    //
    //     cy.get('.btn-primary').click();
    //
    //     cy.get('button[data-bs-dismiss="modal"]').click();
    //
    //     cy.log('✅ Recommendation completed');
    // });
    //
    // it('4️⃣ Admin approves license', () => {
    //
    //     login(credentials.admin.email, credentials.admin.password);
    //
    //     cy.visit(`${baseUrl}admin/license-applications?q=APPROVAL`);
    //
    //     cy.get("svg[data-inline='false']")
    //         .first()
    //         .click();
    //
    //     cy.contains('View Details').click();
    //
    //     cy.contains('Approve Application').click();
    //
    //     cy.get('.btn-primary').click();
    //
    //     cy.get('button[data-bs-dismiss="modal"]').click();
    //
    //     cy.log('🎉 License approved successfully');
    // });

});
