describe("BN CERTIFIED TRUE COPY/ CERTIFIED EXPERT UI Tests", () => {
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

    // 1️⃣ Agent - CERTIFIED TRUE COPY/ CERTIFIED EXPERT
    it("1️⃣ CERTIFIED TRUE COPY/ CERTIFIED EXPERT", () => {
        cy.visit("https://cac.oasisproducts.ng/post/dashboard");
        cy.log("🌐 Navigated to Agent Dashboard");

        cy.get("input[maxlength='110']").type(rcNumber);
        cy.get("button[class*='btn-primary']").click();
        cy.log("🏢 Searched and selected business");
        cy.wait(3000);

        cy.contains("Proceed to Dashboard").invoke("removeAttr", "target").click();
        cy.log("➡️ Proceeded to business dashboard");

        cy.contains(" CERTIFIED TRUE COPY/ CERTIFIED EXPERT ", { timeout: 20000 }).click();
        cy.contains("Start Request for CTC ", { timeout: 20000 }).click();
        cy.log("📄 Started Request for CTC request");

        // CTC Request Information
        cy.log("Select the CTC Type");
        cy.get("input[value='1']").click();
        cy.get("input[value='2']").click();

        // Select the Annual Return Year
        cy.get("select[formcontrolname='yearForAnnualReturn']").select(1);

        cy.xpath("//select[@class='form-control']").select("Abiodun  Abimbola");
        cy.log("👤 Selected signatory");

        cy.contains("PREVIEW ").click()
        cy.wait(2000);
        cy.log("➡️ Clicking save and continue button");
        cy.contains("SAVE & CONTINUE").should("be.visible").click();
        cy.wait(3000);

        cy.get("button[class='remita-btn']").click();
        cy.log("💳 Proceeded to payment");
        cy.wait(60000);

        cy.get("div[class='footer-btn']").click();
        cy.log("📥 Completed Change of Address process");
    });

    // 2️⃣ Officer - Query Application
    it("2️⃣ CERTIFIED TRUE COPY/ CERTIFIED EXPERT - Query Application", () => {
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

        cy.contains("Certified True Copy").click();
        cy.log("📂 Opened Certified True Copy applications");
        cy.wait(2000);

        // 🔎 Collect specific RC number application
        cy.contains(rcNumber)
            .parents("tr")
            .find("td:nth-of-type(5) div.collect-btn")
            .click();
        cy.log(`📄 Collecting application for RC ${rcNumber}`);

        cy.contains("My Pending Request").click();

        // 🔎 Open View Details for same RC
        cy.contains(rcNumber)
            .parents("tr")
            .find("td:nth-of-type(5) div")
            .click();
        cy.log(`📄 Viewing pending application details for RC ${rcNumber}`);

        cy.wait(5000);

        cy.xpath("//button[@class='partner-btns']").click();
        cy.get("input[role='combobox']").eq(0).click();
        cy.contains(".ng-option", "NO SEAL").click();
        cy.get("textarea[formcontrolname='queryComment']").type("Query Test 1");
        cy.contains("Add Query").click();
        cy.get("button[class='submit-query']").click();
        cy.xpath("//button[contains(@style, '#B18209;')]").click();
        cy.log("❓ Added and submitted query for application");
    });

    // 3️⃣ Agent - RESOLVE QUERY
    it("3️⃣ CERTIFIED TRUE COPY/ CERTIFIED EXPERT - RESOLVE QUERY", () => {
        cy.visit("https://cac.oasisproducts.ng/post/dashboard");
        cy.log("🌐 Navigated to Agent Dashboard");

        cy.get("input[maxlength='110']").type(rcNumber);
        cy.get("button.btn-primary").click();
        cy.log("🏢 Selected business");
        cy.wait(3000);

        cy.contains("Proceed to Dashboard").invoke("removeAttr", "target").click();

        cy.contains(" CERTIFIED TRUE COPY/ CERTIFIED EXPERT ", { timeout: 20000 }).click();
        cy.log("📄 Started Request for CTC request");
        cy.wait(3000);

        cy.get("a[class$='danger']").click();
        cy.contains("Resolve Query").click();
        cy.log("⚡ Started resolving query");

        cy.contains("PREVIEW ").click()
        cy.wait(2000);

        cy.log("➡️ Clicking save and continue button");
        cy.contains("SAVE & CONTINUE").should("be.visible").click();
        cy.wait(3000);

        cy.get("div[class='footer-btn']").click();
        cy.log("✅ Query resolved and resubmitted");
    });

    // 4️⃣ Officer - Approve Application
    it("4️⃣ CERTIFIED TRUE COPY/ CERTIFIED EXPERT - Approve Application", () => {
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

        cy.contains("Certified True Copy").click();
        cy.log("📂 Opened Certified True Copy applications");
        cy.wait(2000);

        // 🔎 Collect RC
        cy.contains(rcNumber)
            .parents("tr")
            .find("td:nth-of-type(5) div.collect-btn")
            .click();

        cy.contains("My Pending Request").click();

        // 🔎 Open details
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
    it("5️⃣ CERTIFIED TRUE COPY/ CERTIFIED EXPERT - DOWNLOAD STATUS REPORT", () => {
        cy.visit("https://cac.oasisproducts.ng/post/dashboard");
        cy.log("🌐 Navigated to Agent Dashboard");

        cy.get("input[maxlength='110']").type(rcNumber);
        cy.get("button.btn-primary").click();
        cy.log("🏢 Selected business");
        cy.wait(3000);

        cy.contains("Proceed to Dashboard").invoke("removeAttr", "target").click();
        cy.contains(" CERTIFIED TRUE COPY/ CERTIFIED EXPERT ", { timeout: 20000 }).click();
        cy.log("📄 Started Request for CTC request");
        cy.wait(3000);

        cy.get("a[class$='success']").click();
        cy.contains("Download Status Report").click();
        cy.log("📥 Downloaded Status Report");
    });
});