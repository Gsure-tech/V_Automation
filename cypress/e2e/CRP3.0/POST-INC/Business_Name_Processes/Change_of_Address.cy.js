describe("BN CHANGE OF ADDRESS UI Tests", () => {
    const rcNumber = "7015032"; // 🔑 Single source of truth for RC number

    beforeEach(() => {
        cy.session("loginSession", () => {
            cy.visit("https://cac.oasisproducts.ng/auth/login");
            cy.log("🔑 Visiting login page");

            cy.contains("Email").click();
            cy.get("input[formcontrolname='email']").type("okekeonnyedikachi@gmail.com");
            cy.get("input[formcontrolname='password']").type("password");
            cy.log("📝 Entered login credentials");

            cy.get("#flexCheckDefault").check();
            cy.get("button[class$='w-100']").click();
            cy.log("➡️ Submitted login form");

            cy.get("input[name='otp'], input[formcontrolname='otp']").type("123456");
            cy.get("button[class$='btn-success']").click();
            cy.log("🔒 Entered OTP and submitted");

            cy.url({ timeout: 20000 }).should("include", "/dashboard");
            cy.log("✅ Successfully logged into dashboard");
        });
    });

    // // 1️⃣ Agent - CHANGE OF ADDRESS
    // it("1️⃣ CHANGE OF ADDRESS", () => {
    //     cy.visit("https://cac.oasisproducts.ng/post/dashboard");
    //     cy.log("🌐 Navigated to Agent Dashboard");
    //
    //     cy.get("input[maxlength='110']").type(rcNumber);
    //     cy.get("button[class*='btn-primary']").click();
    //     cy.log(`🏢 Searched and selected business ${rcNumber}`);
    //     cy.wait(3000);
    //
    //     cy.contains("Proceed to Dashboard").invoke("removeAttr", "target").click();
    //     cy.log("➡️ Proceeded to business dashboard");
    //
    //     cy.contains("Change of PRINCIPAL PLACE OF BUSINESS AND/OR BRANCH ADDRESS", { timeout: 20000 }).click();
    //     cy.contains("Start Request for Change of Address", { timeout: 20000 }).click();
    //     cy.log("📄 Started Change of Address request");
    //
    //     cy.get("select[formcontrolname='state']").eq(0).select("FCT");
    //     cy.get("select[formcontrolname='lga']").eq(0).select("Amac");
    //     cy.get("input[formcontrolname='city']").eq(0).type("WUSE");
    //     cy.get("input[formcontrolname='streetNumber']").eq(0).type("12");
    //     cy.get("input[formcontrolname='streetName']").eq(0).type("Parakou");
    //     cy.get("input[formcontrolname='dateOfChange']").clear().type("2025-09-03");
    //     cy.log("🏠 Filled new address details");
    //
    //     cy.xpath("//select[@class='form-control']").select("Abiodun  Abimbola");
    //     cy.log("👤 Selected signatory");
    //
    //     cy.contains("PREVIEW ").click();
    //     cy.wait(2000);
    //     cy.log("➡️ Clicking save and continue button");
    //     cy.contains("SAVE & CONTINUE").should("be.visible").click();
    //     cy.wait(3000);
    //
    //     cy.get("button[class='remita-btn']").click();
    //     cy.log("💳 Proceeded to payment");
    //     cy.wait(60000);
    //
    //     cy.get("div[class='footer-btn']").click();
    //     cy.log("📥 Completed Change of Address process");
    // });
    //
    // // 2️⃣ Officer - Query Application
    // it("2️⃣ CHANGE OF ADDRESS - Query Application", () => {
    //     cy.visit("https://backoffice.oasisproducts.ng/login");
    //     cy.log("🌐 Navigated to Officer Login");
    //
    //     cy.contains("Welcome 👋 back,hover to login", { timeout: 10000 })
    //         .trigger("mouseover")
    //         .click({ force: true });
    //     cy.log("👤 Opened login form");
    //
    //     cy.get("input[formcontrolname='userName']").type("ookorie");
    //     cy.get("input[placeholder='************']").type("Password55");
    //     cy.contains("Sign In").click();
    //     cy.log("🔑 Officer login submitted");
    //
    //     cy.wait(2000);
    //     cy.xpath("//button[@style='--i: 3;']").click();
    //     cy.contains("Change Of Principal Address").click();
    //     cy.log("📂 Opened Change of Address applications");
    //     cy.wait(2000);
    //
    //     cy.contains(rcNumber)
    //         .parents("tr")
    //         .find("div.collect-btn")
    //         .click();
    //     cy.log(`📄 Collecting the Application for RC ${rcNumber}`);
    //
    //     cy.wait(3000);
    //     cy.contains("My Pending Request").click();
    //
    //     cy.contains(rcNumber)
    //         .parents("tr")
    //         .find("td:nth-of-type(5) div")
    //         .click();
    //
    //     cy.wait(5000);
    //     cy.log(`📄 Viewing pending application for RC ${rcNumber}`);
    //
    //     cy.xpath("//button[@class='partner-btns']").click();
    //     cy.get("input[role='combobox']").eq(0).click();
    //     cy.contains(".ng-option", "NO SEAL").click();
    //     cy.get("textarea[formcontrolname='queryComment']").type("Query Test 1");
    //     cy.contains("Add Query").click();
    //     cy.get("button[class='submit-query']").click();
    //     cy.xpath("//button[contains(@style, '#B18209;')]").click();
    //     cy.log("❓ Added and submitted query for application");
    // });
    //
    // // 3️⃣ Agent - RESOLVE QUERY
    // it("3️⃣ CHANGE OF ADDRESS - RESOLVE QUERY", () => {
    //     cy.visit("https://cac.oasisproducts.ng/post/dashboard");
    //     cy.log("🌐 Navigated to Agent Dashboard");
    //
    //     cy.get("input[maxlength='110']").type(rcNumber);
    //     cy.get("button.btn-primary").click();
    //     cy.log(`🏢 Selected business ${rcNumber}`);
    //     cy.wait(3000);
    //
    //     cy.contains("Proceed to Dashboard").invoke("removeAttr", "target").click();
    //     cy.contains("Change of PRINCIPAL PLACE OF BUSINESS AND/OR BRANCH ADDRESS", { timeout: 20000 }).click();
    //     cy.log("📂 Opened Change of Address section");
    //     cy.wait(3000);
    //
    //     cy.xpath("//a[contains(@class, 'danger')]").click();
    //     cy.contains("Resolve Query").click();
    //     cy.log("⚡ Started resolving query");
    //
    //     cy.get("input[formcontrolname='city']")
    //         .first()
    //         .clear()
    //         .type("WUSE 2");
    //
    //     cy.contains("PREVIEW ").click();
    //     cy.wait(2000);
    //
    //     cy.log("➡️ Clicking save and continue button");
    //     cy.contains("SAVE & CONTINUE").should("be.visible").click();
    //     cy.wait(3000);
    //
    //     cy.get("div[class='footer-btn']").click();
    //     cy.log("✅ Query resolved and resubmitted");
    // });

    // 4️⃣ Officer - Approve Application
    it("4️⃣ CHANGE OF ADDRESS - Approve Application", () => {
        cy.visit("https://backoffice.oasisproducts.ng/login");
        cy.log("🌐 Navigated to Officer Login");

        cy.contains("Welcome 👋 back,hover to login", { timeout: 10000 })
            .trigger("mouseover")
            .click({ force: true });
        cy.log("👤 Opened login form");

        cy.get("input[formcontrolname='userName']").type("ookorie");
        cy.get("input[placeholder='************']").type("Password55");
        cy.contains("Sign In").click();
        cy.log("🔑 Officer login submitted");

        cy.wait(2000);
        cy.xpath("//button[@style='--i: 3;']").click();
        cy.contains("Change Of Principal Address").click();
        cy.log("📂 Opened Change of Address applications");

        cy.contains(rcNumber)
            .parents("tr")
            .find("div.collect-btn")
            .click();

        cy.contains("My Pending Request").click();

        cy.contains(rcNumber)
            .parents("tr")
            .find("td:nth-of-type(5) div")
            .click();
        cy.wait(5000);
        cy.log(`📄 Viewing application details for RC ${rcNumber}`);

        cy.contains(" approve ").eq(0).click();

        cy.log("✅ Application approved");
    });

    // 5️⃣ Agent - DOWNLOAD STATUS REPORT
    it("5️⃣ CHANGE OF ADDRESS - DOWNLOAD STATUS REPORT", () => {
        cy.visit("https://cac.oasisproducts.ng/post/dashboard");
        cy.log("🌐 Navigated to Agent Dashboard");

        cy.get("input[maxlength='110']").type(rcNumber);
        cy.get("button.btn-primary").click();
        cy.log(`🏢 Selected business ${rcNumber}`);
        cy.wait(3000);

        cy.contains("Proceed to Dashboard").invoke("removeAttr", "target").click();
        cy.contains("Change of PRINCIPAL PLACE OF BUSINESS AND/OR BRANCH ADDRESS", { timeout: 20000 }).click();
        cy.wait(3000);
        cy.log("📂 Opened Change of Address section");

        cy.get("a[class$='success']").click();
        cy.contains("Download Status Report").click();
        cy.log("📥 Downloaded Status Report");
    });
});