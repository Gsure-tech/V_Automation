describe("CAC Registration for Sole Proprietor UI Tests", () => {
    const targetName = "MOMENTARY VENTURES";
    const targetCode = "177333098387";
    // const uniqueEmail = `joyoasis9023+${timestamp}@gmail.com`;


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


    it("Completes Name Registration for Business Name (Sole)", () => {

        // Step 1️⃣: Navigate to Registrations
        // cy.visit("https://www.cac.oasisproducts.ng/business-registration");
        cy.visit("https://www.cac.oasisproducts.ng/name-reservation");

        cy.log("🌐 Navigated to Agent Dashboard");

        cy.get("select[formcontrolname='status']", { timeout: 10000 })
            // .select("NOT SUBMITTED", { force: true });
            .select("APPROVED", { force: true });

        cy.wait(1000);

        // Step 2️⃣: Find the correct row by targetCode and click the action button
        cy.contains("td", targetName, { timeout: 20000 })
            .parents("tr")
            // .find("td:nth-of-type(6) div button")
            .find("td:nth-of-type(8) div button")
            .first()
            .should("be.visible")
            .click({ force: true })
            .then(() => {
                cy.log(`✅ Clicked resolve-action button for "${targetName}"`);
            });

        // Step 3️⃣: Wait for dropdown and click "Continue Application"
        cy.log("🛠 Clicking Continue Application button");

        // Debug log: list available dropdown options (optional)
        cy.get("ul.dropdown-menu.show li button", { timeout: 10000 })
            .should("exist")
            .each(($btn) => {
                cy.log("📋 Dropdown Option:", $btn.text());
            });

        // Click the correct dropdown option by text
        // cy.contains("ul.dropdown-menu.show li button", "Continue Application", { timeout: 10000 })
        cy.contains("ul.dropdown-menu.show li button", "Go To Business Registration", { timeout: 10000 })

            .should("be.visible")
            .click({ force: true })
            .then(() => {
                cy.log("✅ Opened Continue Application view for Not submitted applications");
            });

        // Optional: confirm navigation success
        cy.log("🎯 Successfully navigated to registration page");

       // NEW BUSINESS REGISTRATION
        // Company Information
        // Type in the Company Email
        cy.wait(5000);
        cy.get("input[placeholder='Enter Email']").clear().type("joyoasis9023@gmail.com");

        // Select the Company State of Residence
        cy.get("select[formcontrolname='companyStateOfResidence']", { timeout: 10000 })
            .select("IMO");

        // Type in the Company City
        cy.get("input[placeholder='Enter City']", { timeout: 10000 })
            .type("WUSE");

        // Type in the Company Street Number
        cy.get("input[placeholder='Enter Street Number']", { timeout: 10000 })
            .type("2");

        // Type in the Company Street Address
        cy.get("input[placeholder='Enter Address']", { timeout: 10000 })
            .type("Parakou");

        // Select the Business Commencement Date
        cy.get("input[placeholder='Enter First']").clear().type("2026-03-10");

        cy.contains("SAVE & CONTINUE").click();


        // Proprietor Information
        // cy.get("input[formcontrolname='lastName']").type("Ndueso");
        // cy.get("input[formcontrolname='firstName']").type("Michael");
        // cy.get("input[formcontrolname='otherName']").type("Jackson");
        //
        // cy.get("#phone").type("8098963410");
        // cy.get("select[formcontrolname='gender']").select("MALE");
        // cy.get("input[formcontrolname='dob']").clear().type("1996-10-06");
        // cy.get("select[formcontrolname='state']").select("IMO");
        // cy.get("select[formcontrolname='lga']").select("Isu");
        // cy.get("input[formcontrolname='city']").type("WUSE");
        // cy.get("input[formcontrolname='streetNumber']").type("2");
        // cy.get("input[formcontrolname='serviceAddress']").type("Parakou");

        cy.wait(5000);

        cy.contains("SAVE & CONTINUE").click();


        // Document Uploads
        cy.get("select[formcontrolname='proprietor']").select(1);

        cy.contains(" Add Proprietor ").click();
        cy.get('input[formcontrolname="meansOfIDFile"]')
            .selectFile('cypress/fixtures/spiral.png', { force: true });

        cy.get('input[formcontrolname="passportFile"]')
            .selectFile('cypress/fixtures/spiral.png', { force: true });

        cy.get('input[formcontrolname="signatureFile"]')
            .selectFile('cypress/fixtures/spiral.png', { force: true });

        // (Upload the Documents Manually within this Wait period)
        cy.wait(20000);

        cy.get("button[class*='ps-1']").should("be.visible").click();


        cy.contains("SAVE & CONTINUE").click();
        cy.wait(10000)
        cy.contains("button", /submit & proceed to payment/i, { timeout: 30000 })
            .scrollIntoView()
            .should("be.visible");
        cy.contains("submit & proceed to payment").click();

        // Step 5️⃣: Remita Payment
        cy.log("Proceeding to Payment...");
        cy.get("button[class='remita-btn']").should("be.visible").click();

        cy.log("⏳ Waiting for Remita modal...");
        cy.wait(60000);

        cy.log("✅ Payment iframe (Card, Expiry, CVV, OTP) steps would be handled here.");
        cy.contains("Continue").click();

    });

});