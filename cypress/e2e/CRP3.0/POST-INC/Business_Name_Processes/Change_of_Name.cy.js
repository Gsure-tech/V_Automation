describe("BN CHANGE OF NAME UI Tests", () => {
    const rcNumber = "8578961";            // 🔑 RC Number
    // const businessName = "OASIS VENTURES"; // 🔑 Business Name (for status report download)

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

    // 1️⃣ Agent - CHANGE OF NAME
    it("1️⃣ CHANGE OF NAME", () => {
        cy.visit("https://cac.oasisproducts.ng/post/dashboard");
        cy.log("🌐 Navigated to Agent Dashboard");

        cy.get("input[maxlength='110']").type(rcNumber);
        cy.get("button[class*='btn-primary']").click();
        cy.log(`🏢 Selected business RC ${rcNumber} for Change of Name`);
        cy.wait(3000);

        cy.contains("Proceed to Dashboard").invoke("removeAttr", "target").click();
        cy.log("➡️ Proceeded to business dashboard");

        cy.contains(" CHANGE OF NAME ", { timeout: 20000 }).click();
        cy.contains("Start Request for Change of Name ", { timeout: 20000 }).click();
        cy.log("📄 Started Change of Name request");

        cy.get("input[placeholder='Enter Code']").eq(0).type("175821107765");
        cy.log("🔑 Entered AV Code");

        cy.get("div[class$='gap-3'] button").eq(0).click();
        cy.log("➡️ Clicked Continue");

        cy.get("input[maxlength='30']").clear().type("2025-09-03");
        cy.xpath("//select").select(1);
        cy.log("📝 Filled Date of Change & selected signatory");

        cy.contains("PREVIEW ").click();
        cy.wait(2000);

        cy.log("➡️ Clicking save and continue button");
        cy.contains("SAVE & CONTINUE").should("be.visible").click();
        cy.wait(3000);

        cy.get("button[class='remita-btn']").click();
        cy.log("💳 Proceeded to payment");
        cy.wait(60000);

        cy.get("div[class='footer-btn']").click();
        cy.log("📥 Completed Change of Name process");
    });

    // 2️⃣ Officer - Query Application
    it("2️⃣ CHANGE OF NAME - Query Application", () => {
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
        cy.contains("Change Of Name").click();
        cy.log("📂 Opened Change of Name applications");

        // 🔎 Collect the specific RC's application (was eq(0))
        cy.contains(rcNumber)
            .parents("tr")
            .find("div.collect-btn")
            .click();
        cy.log("📄 Collected application for RC " + rcNumber);

        cy.contains("My Pending Request").click();

        // 🔎 Click the View Details that belongs to the same RC
        cy.contains(rcNumber)
            .parents("tr")
            .find("td:nth-of-type(5) div")
            .click();
        cy.log(`📄 Viewing pending application details for RC ${rcNumber}`);
        cy.wait(5000);

        cy.xpath("//button[@class='partner-btns']").click();
        cy.get("input[role='combobox']").eq(0).click();
        cy.contains(".ng-option", "NO SEAL").click();
        cy.get("textarea[formcontrolname='queryComment']").type("Query Test 3");
        cy.contains("Add Query").click();
        cy.get("button[class='submit-query']").click();
        cy.xpath("//button[contains(@style, '#B18209;')]").click();
        cy.log("❓ Added and submitted query for application");
    });

    // 3️⃣ Agent - RESOLVE QUERY
    it("3️⃣ CHANGE OF NAME - RESOLVE QUERY", () => {
        cy.visit("https://cac.oasisproducts.ng/post/dashboard");
        cy.log("🌐 Navigated to Agent Dashboard");

        cy.get("input[maxlength='110']").type(rcNumber);
        cy.get("button.btn-primary").click();
        cy.log(`🏢 Selected business RC ${rcNumber}`);
        cy.wait(3000);

        cy.contains("Proceed to Dashboard").invoke("removeAttr", "target").click();
        cy.contains(" CHANGE OF NAME ", { timeout: 20000 }).click();
        cy.log("📂 Opened Change of Name section");
        cy.wait(3000);

        cy.xpath("//a[contains(@class, 'danger')]").click();
        cy.contains("Resolve Query").click();
        cy.log("⚡ Started resolving query");

        cy.get("input[maxlength='30']").clear().type("2024-12-03");
        cy.log("📝 Filled Date of Change");

        cy.contains("PREVIEW ").click();
        cy.wait(2000);

        cy.log("➡️ Clicking save and continue button");
        cy.contains("SAVE & CONTINUE").should("be.visible").click();
        cy.wait(3000);

        cy.get("div[class='footer-btn']").click();
        cy.log("✅ Query resolved and resubmitted");
    });

    // 4️⃣ Officer - Approve Application
    it("4️⃣ CHANGE OF NAME - Approve Application", () => {
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

        cy.contains("Change Of Name").click();
        cy.log("📂 Opened Change of Name applications");
        cy.wait(2000);

        // 🔎 Collect the application for rcNumber
        cy.contains(rcNumber)
            .parents("tr")
            .find("div.collect-btn")
            .click();

        cy.contains("My Pending Request").click();

        // 🔎 Open details for the same RC
        cy.contains(rcNumber)
            .parents("tr")
            .find("td:nth-of-type(5) div")
            .click();
        cy.wait(5000);
        cy.log(`📄 Viewing application details for RC ${rcNumber}`);

        // Approve scoped to the RC row
        cy.contains(" approve ").eq(0).click();

        cy.log("✅ Application approved");
    });

    // 5️⃣ Agent - DOWNLOAD STATUS REPORT
    it("5️⃣ CHANGE OF NAME - DOWNLOAD STATUS REPORT", () => {
        cy.visit("https://cac.oasisproducts.ng/post/dashboard");
        cy.log("🌐 Navigated to Agent Dashboard");

        cy.get("input[maxlength='110']").type(businessName);
        cy.get("button.btn-primary").click();
        cy.log(`🏢 Selected business ${businessName}`);
        cy.wait(3000);

        cy.contains("Proceed to Dashboard").invoke("removeAttr", "target").click();
        cy.contains(" CHANGE OF NAME ", { timeout: 20000 }).click();
        cy.log("📂 Opened Change of Name section");
        cy.wait(3000);

        cy.get("a[class$='success']").click();
        cy.contains("Download Status Report").click();
        cy.log(`📥 Downloaded Status Report for ${businessName}`);
    });
});