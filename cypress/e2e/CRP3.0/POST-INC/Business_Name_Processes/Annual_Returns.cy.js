describe("CAC Business Name Processes UI Tests", () => {
    beforeEach(() => {
        cy.session("loginSession", () => {
            cy.log("Test plan will cover Visual, Functional, and UX requirements");
            cy.visit("https://www.cac.oasisproducts.ng/auth/login")
            cy.get("input[formcontrolname='username']").type('ookeke2');
            cy.get("input[formcontrolname='password']").type('password');
            cy.get("#flexCheckDefault").check();
            cy.get("button[class$='w-100']").click();
            cy.get("input[name='otp'], input[formcontrolname='otp']").type("123456");
            cy.get("button[class$='btn-success']").click();
            cy.url({timeout: 20000}).should("include", "/dashboard");
        });
    })

    it("Annual return", () => {
        cy.log(" Navigating to Business");
        cy.visit("https://www.cac.oasisproducts.ng/post/dashboard");

        cy.log(" Searching for business name");
        cy.get("input[formcontrolname='search']").should("be.visible").type("6980477");
        cy.get("button[type='submit']").should("be.visible").click();
        
        cy.log(" Proceeding to Dashboard");
        cy.contains(" Proceed to Dashboard ").should("be.visible").invoke("removeAttr", "target").click();

        cy.log(" Selecting 'Annual return'");


        cy.contains(" Annual Return ", { matchCase: false, timeout: 20000 }).should("be.visible").click();
        cy.contains("Start Annual Return ", { matchCase: false, timeout: 20000 }).should("be.visible").click();

        cy.log("Closing requirements popup if present");

        cy.get('html > body > ngb-modal-window > div > div > div > div:nth-of-type(2) > div > select').select('2024');
        cy.get('.modal-footer > .btn').click()


        cy.log(" Entering Turnover");
        cy.get("input[formcontrolname='netTurnOver']").should("be.visible").type("100500");

        cy.log(" Entering Net Assets");
        cy.get("input[formcontrolname='netAssets']").should("be.visible").type("100000");

        cy.log("Select partners ");
        cy.get('select.form-control').select(1);

        // Assume you have a sample file (e.g., 'sample.pdf') in your fixtures folder
        cy.fixture('certificate.pdf', { encoding: null }).then(fileContent => {
            // Create a Blob from the binary buffer
            const blob = new Blob([fileContent], { type: 'application/pdf' });

            // Intercept the POST request
            cy.intercept('POST', '/file_server_service/edmsapp/uploads/post-inc', (req) => {
                // Attach the blob to the request body
                req.body = blob;
                req.continue();
            }).as('uploadRequest');

         //    // Click the upload button to trigger the POST request
         //    cy.get('button.btn-upload').click();
         //
         // //   Wait for the request to complete
         //    cy.wait('@uploadRequest').then(interception => {
         //        // Optionally assert the response
         //        expect(interception.response.statusCode).to.eq(200); // Adjust as needed
         //    });
        });

        cy.contains("PREVIEW ").click()
        cy.log("➡️ Clicking save and continue button");
        cy.contains("SAVE & CONTINUE").should("be.visible").click();
        cy.get('.remita-btn > img').click();
        cy.wait(60000);

        cy.log("➡️ Clicking the Continue button");
        cy.get("div[class='footer-btn']").click();
    });

});