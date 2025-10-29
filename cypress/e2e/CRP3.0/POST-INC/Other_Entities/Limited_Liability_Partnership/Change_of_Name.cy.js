describe("CAC Other Entities Processes UI Tests", () => {

    beforeEach(() => {
        cy.session("loginSession", () => {
            cy.visit("https://www.cac.oasisproducts.ng/auth/login");
            cy.contains("Email").click();
            cy.get("input[formcontrolname='email']").type("okekeonnyedikachi@gmail.com");
            cy.get("input[formcontrolname='password']").type("password");
            // cy.get("input[formcontrolname='email']").type("ookorie@mailinator.com");
            // cy.get("input[formcontrolname='password']").type("Password55");
            cy.get("#flexCheckDefault").check();
            cy.get("button[class$='w-100']").click();

            // Static OTP (replace with real if needed)
            cy.get("input[name='otp'], input[formcontrolname='otp']").type("123456");
            cy.get("button[class$='btn-success']").click();

            cy.url({ timeout: 20000 }).should("include", "/dashboard");
        });
    });

it("Change of Name - Company  Process", () => {
        cy.visit("https://www.cac.oasisproducts.ng/post_app/accredited-agent-dashboard");

        cy.get("input[name='searchTerm']")
            .should("be.visible")
            .type("TEST 101 LTD");

        cy.get("button[type='submit']").should("be.visible").click();

        cy.contains("Proceed to Dashboard")
            .should("be.visible")
            .invoke("removeAttr", "target")
            .click();

        cy.contains("Change of Name", { matchCase: false, timeout: 20000 })
            .should("be.visible")
            .click();

        // cy.contains("START CHANGE OF NAME", { matchCase: false, timeout: 20000 })
        //     .should("be.visible")
        //     .click();
        //
        // // Type in the Availability Code
        // cy.get("input[formcontrolname='content']").should("be.visible").type("175449722546");
        //
        //
        // // Click on the Search Button
        // cy.get("button[class*='right']").should("be.visible").click();
        // cy.wait(3000);
        //
        // // Click on the Start Button
        // cy.contains(" Start ").should("be.visible").click();
        //
        // // Select the Date of Special Resolution
        // cy.pickDate("input[name='dateOfResolution']", 15, "May", 2025);
        //
        // // Authentication
        // // Type in the Fullname(s)
        // cy.get("input[name='authenticationFullname']").should('be.visible').type('Tester 1');
        //
        //
        // // Type in the Description
        // cy.get("textarea[placeholder='Description']").should('be.visible').type('Testing Description');
        //
        //
        // // Click on the Save & Continue
        // cy.contains(" Save & Continue ").should("be.visible").click();
        // cy.wait(3000);
        //
        // // Click on Proceed to payment
        // cy.contains("Proceed to Payment").should("be.visible").click();
        // cy.wait(10000);
        //
        //
        // cy.log("💰 Clicking Remita to make payment");
        // cy.contains(" Remita ").should('be.visible').click();
        //
        // cy.wait(60000);


        // Click on Not Submitted
        cy.get("div[class$='black'] div[class='label']").should("be.visible").click();

        // Click On the Continue Button
        cy.xpath("//button[.//i[contains(@class, 'edit')]]").click();

        cy.wait(10000);

        // Click on Upload Documents
        cy.get("button[class^='ui']").should("be.visible").click();

        //  Click on Attach Special Resolution Document
        cy.get('input[type="file"]').should("be.visible").attachFile('status-report.pdf', { force: true });

        //  Click on the OK Button (Manually)
        cy.wait(3000);

        //  Click on the Submit Application Button
        cy.get("button[class^='ui']").should("be.visible").click();

        //  Click on the OK Button (Manually)
            cy.wait(3000);




    });
});