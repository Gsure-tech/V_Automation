describe("CAC Sole Proprietor Name Reservation UI Tests", () => {

    const targetName = "MOMENTARY VENTURES";

    beforeEach(() => {
        cy.session(
            "loginSession",
            () => {
                cy.visit("https://www.cac.oasisproducts.ng/auth/login");
                cy.log("🔑 [Login] Visiting login page");

                cy.contains("Email").click();
                cy.get("input[formcontrolname='email']").type("okekeonnyedikachi@mailinator.com");
                cy.get("input[formcontrolname='password']").type("password");
                cy.get("#flexCheckDefault").check();
                cy.get("button[class$='w-100']").click();
                cy.log("➡️ [Login] Submitted login form");

                cy.get("input[name='otp'], input[formcontrolname='otp']", { timeout: 20000 })
                    .should("be.visible");

                cy.wait(5000);

                cy.request("https://www.mailinator.com/api/v2/domains/public/inboxes/okekeonnyedikachi")
                    .then((inbox) => {
                        const messages = inbox.body.msgs;

                        if (!messages || messages.length === 0) {
                            throw new Error("No emails found in Mailinator inbox");
                        }

                        const latestMessage = messages.sort((a, b) => b.time - a.time)[0];
                        const messageId = latestMessage.id;

                        cy.log(`📨 Opening latest email: ${messageId}`);

                        cy.request(`https://www.mailinator.com/api/v2/domains/public/inboxes/okekeonnyedikachi/messages/${messageId}`)
                            .then((message) => {
                                const emailText = message.body.parts[0].body;
                                const otp = emailText.match(/\b\d{6}\b/)?.[0];

                                if (!otp) {
                                    throw new Error("OTP not found in latest email");
                                }

                                cy.log(`📩 OTP found: ${otp}`);
                                cy.get("input[name='otp'], input[formcontrolname='otp']")
                                    .clear()
                                    .type(otp);
                            });
                    });

                cy.get("button[class$='btn-success']").click();
                cy.url({ timeout: 30000 }).should("include", "/dashboard");
                cy.log("✅ Login successful and dashboard loaded");
            },
            {
                validate: () => {
                    cy.visit("https://www.cac.oasisproducts.ng/dashboard");
                    cy.url({ timeout: 30000 }).should("include", "/dashboard");
                },
            }
        );

        cy.visit("https://www.cac.oasisproducts.ng/dashboard");
        cy.log("Ensuring the dashboard is loaded after session restore");
    });


    it("Business Name Reservation (Sole Proprietor) with Remita Payment", () => {
        cy.log("Clicking on New Reservation");
        cy.contains("New Reservation", { timeout: 20000 }).should("be.visible").click();

        cy.log("Selecting Business Classification and Type");
        cy.get("select[formcontrolname='businessClassification']")
            .should("be.visible")
            .select("Business Name");

        cy.get("select[formcontrolname='businessType']")
            .should("be.visible")
            .select("Sole Proprietor");

        cy.log("Clicking Continue");
        cy.contains("CONTINUE").should("be.visible").click();

        cy.log("Filling Business Name and Nature");
        cy.get("input[formcontrolname='businessName']")
            .should("be.visible")
            .clear()
            .type(targetName);

        cy.get("select[formcontrolname='natureOfBusinessCategory']")
            .should("be.visible")
            .select("Education");

        cy.get("select[formcontrolname='natureOfBusiness']")
            .should("be.visible")
            .select("Education");

        cy.log("Checking Availability");
        cy.contains("CHECK AVAILABILITY").should("be.visible").click();
        cy.get(".footer-btn", { timeout: 10000 }).click({ force: true });

        cy.log("Continuing to Payment");
        cy.contains("CONTINUE TO PAYMENT").should("be.visible").click();

        cy.log("Opening Remita payment modal");
        cy.get("button[class='remita-btn']", { timeout: 30000 })
            .should("be.visible")
            .click();

        cy.get("iframe[src*='remita']", { timeout: 60000 })
            .should("be.visible");

        cy.log("✅ Remita iframe opened successfully");

        cy.log("Continuing filing process");
        cy.get("button.btn.btn-primary.px-4.fs-14", { timeout: 60000 })
            .should("be.visible")
            .click();

    });

    after(() => {
        cy.log("✅ Test execution completed");
    });
});