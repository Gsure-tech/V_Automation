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


    it("Alteration of Memorandum Process", () => {
        cy.log("🌐 Navigating to Accredited Agent Dashboard");
        cy.visit("https://www.cac.oasisproducts.ng/post_app/accredited-agent-dashboard");

        cy.log("🔎 Searching for business name");
        cy.get("input[name='searchTerm']").should("be.visible").type("TEST 101 LTD");
        cy.get("button[type='submit']").should("be.visible").click();

        cy.log("➡️ Proceeding to Dashboard");
        cy.contains("Proceed to Dashboard").should("be.visible").invoke("removeAttr", "target").click();

        cy.log("📑 Selecting 'Alteration of Memorandum'");
        cy.contains(" ALTERATION OF MEMORANDUM ", { matchCase: false, timeout: 20000 }).should("be.visible").click();
        cy.contains(" START ALTERATION OF MEMORANDUM AND ARTICLE FILING ", { matchCase: false, timeout: 20000 }).should("be.visible").click();

        cy.log("❌ Closing requirements popup if present");
        cy.contains("Close").click();
        cy.wait(25000);

        cy.log("📝 Entering Object of Memorandum");
        cy.get("#memorandum").should("be.visible").type("Object of Memorandum");

        cy.log("➡️ Clicking Next button");
        cy.contains(" Next ").should("be.visible").click();

        cy.log("⚙️ Adopting Default Articles of Association");
        cy.contains(" Adopt Default Articles of Association ").should("be.visible").click();

        cy.log("✅ Confirming adoption");
        cy.get("button[class*='confirm-button'] span[class='mat-button-wrapper']").should("be.visible").click();

        cy.log("➡️ Moving to next step after Articles adoption");
        cy.contains(" Next ").should("be.visible").click();

        //
        // NOW the Date field should exist
        //
        cy.log("📅 Selecting Date of Special Resolution");
        cy.get("#datePicker").should('be.visible').clear().type('1996-05-12');

        cy.log("➡️ Clicking Next button");
        cy.get("button[class*='right']").should('be.visible').click();

        cy.log("💾 Clicking Save & Continue");
        cy.get("button[class*='right']").should('be.visible').click();
        cy.wait(3000);

        cy.log("💰 Clicking Remita to make payment");
        cy.get("a[class^='ui']").should('be.visible').click();
    });
});