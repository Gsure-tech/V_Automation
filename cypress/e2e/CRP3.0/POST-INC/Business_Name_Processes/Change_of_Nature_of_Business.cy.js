describe("BN CHANGE OF NATURE OF BUSINESS UI Tests", () => {
    const rcNumber = "7015032"; // 🔑 Single source of truth for RC number

    beforeEach(() => {
        cy.session("loginSession", () => {
            cy.visit("https://cac.oasisproducts.ng/auth/login");
            cy.contains("Email").click();
            cy.get("input[formcontrolname='email']").type("okekeonnyedikachi@gmail.com");
            cy.get("input[formcontrolname='password']").type("password");
            cy.get("#flexCheckDefault").check();
            cy.get("button[class$='w-100']").click();

            cy.get("input[name='otp'], input[formcontrolname='otp']").type("123456");
            cy.get("button[class$='btn-success']").click();

            cy.url({ timeout: 20000 }).should("include", "/dashboard");
        });
    });

    it("1️⃣ CHANGE OF NATURE OF BUSINESS", () => {
        cy.log("🌐 Navigating to Accredited Agent Dashboard");
        cy.visit("https://cac.oasisproducts.ng/post/dashboard");

        cy.log("🔎 Searching for business name");
        cy.get("input[maxlength='110']").should("be.visible").type(rcNumber);
        cy.get("button[class*='btn-primary']").should("be.visible").click();
        cy.wait(3000);

        cy.log("➡️ Proceeding to Dashboard");
        cy.contains("Proceed to Dashboard")
            .should("be.visible")
            .invoke("removeAttr", "target")
            .click();

        cy.log("CHANGE OF NATURE OF BUSINESS");
        cy.contains(" CHANGE OF NATURE OF BUSINESS ", { matchCase: false, timeout: 20000 }).click();
        cy.contains("Start Request for Change of Nature of Business", { matchCase: false, timeout: 20000 })
            .should("be.visible")
            .click();

        // Nature of Business Details
        cy.log("Select the Nature of Business Category");
        cy.get("select[formcontrolname='natureOfBusiness']").eq(0).should("be.visible").select("Education");

        cy.log("Select the Specific Nature of Business");
        cy.get("select[formcontrolname='specificNature']").eq(0).should("be.visible").select("Education");

        cy.log("Click on Add Nature of Business");
        cy.get("button[class$='btn-primary']").eq(0).should("be.visible").click();

        // Additional Request Details
        cy.log("📅 Selecting Date of Change");
        cy.get("input[formcontrolname='dateOfChange']").should("be.visible").clear().type("2025-09-03");

        // Authentication
        cy.log("Select the Proprietor/Partner");
        cy.xpath("//select[@class='form-control']").select("Abiodun  Abimbola");

        cy.contains("PREVIEW ").click();
        cy.wait(2000);
        cy.log("➡️ Clicking save and continue button");
        cy.contains("SAVE & CONTINUE").should("be.visible").click();
        cy.wait(3000);

        cy.log("💰 Proceeding to make payment");
        cy.get("button[class='remita-btn']").should("be.visible").click();
        cy.wait(60000);

        cy.log("💰 Clicking Submit Button");
        cy.get("div[class='footer-btn']").should("be.visible").click();
    });

    // 2️⃣ Officer - Query Application
    it("2️⃣ CHANGE OF NATURE OF BUSINESS - Query Application", () => {
        cy.visit("https://backoffice.oasisproducts.ng/login");

        cy.contains("Welcome 👋 back,hover to login", { timeout: 10000 })
            .trigger("mouseover")
            .click({ force: true });

        cy.get("input[formcontrolname='userName']").type("ookorie");
        cy.get("input[placeholder='************']").type("Password55");
        cy.contains("Sign In").click();

        cy.wait(2000);
        cy.xpath("//button[@style='--i: 3;']").click();
        cy.contains("Change Of Nature Of Business").click();
        cy.wait(2000);

        // 🔎 Collect the correct RC
        cy.contains(rcNumber)
            .parents("tr")
            .find("div.collect-btn")
            .click();

        cy.contains("My Pending Request").click();

        // 🔎 Open details for same RC
        cy.contains(rcNumber)
            .parents("tr")
            .find("td:nth-of-type(5) div")
            .click();
        cy.wait(5000);

        cy.xpath("//button[@class='partner-btns']").click();
        cy.get("input[role='combobox']").eq(0).click();
        cy.contains(".ng-option", "NO SEAL").click();
        cy.get("textarea[formcontrolname='queryComment']").type("Query Test 2");
        cy.contains("Add Query").click();
        cy.get("button[class='submit-query']").click();
        cy.xpath("//button[contains(@style, '#B18209;')]").click();
    });

    // 3️⃣ Agent - RESOLVE QUERY
    it("3️⃣ CHANGE OF NATURE OF BUSINESS - RESOLVE QUERY", () => {
        cy.visit("https://cac.oasisproducts.ng/post/dashboard");

        cy.get("input[maxlength='110']").type(rcNumber);
        cy.get("button.btn-primary").click();
        cy.wait(3000);

        cy.contains("Proceed to Dashboard").invoke("removeAttr", "target").click();
        cy.contains(" CHANGE OF NATURE OF BUSINESS ", { timeout: 20000 }).click();
        cy.wait(3000);

        cy.xpath("//a[contains(@class, 'danger')]").click();
        cy.contains("Resolve Query").click();

        cy.contains("PREVIEW ").click();
        cy.wait(2000);

        cy.log("➡️ Clicking save and continue button");
        cy.contains("SAVE & CONTINUE").should("be.visible").click();
        cy.wait(3000);

        cy.get("div[class='footer-btn']").click();
    });

    // 4️⃣ Officer - Approve Application
    it("4️⃣ CHANGE OF NATURE OF BUSINESS - Approve Application", () => {
        cy.visit("https://backoffice.oasisproducts.ng/login");

        cy.contains("Welcome 👋 back,hover to login", { timeout: 10000 })
            .trigger("mouseover")
            .click({ force: true });

        cy.get("input[formcontrolname='userName']").type("ookorie");
        cy.get("input[placeholder='************']").type("Password55");
        cy.contains("Sign In").click();

        cy.wait(2000);
        cy.xpath("//button[@style='--i: 3;']").click();
        cy.contains("Change Of Nature Of Business").click();
        cy.wait(2000);

        // 🔎 Collect the correct RC
        cy.contains(rcNumber)
            .parents("tr")
            .find("div.collect-btn")
            .click();

        cy.contains("My Pending Request").click();

        // 🔎 Open details for same RC
        cy.contains(rcNumber)
            .parents("tr")
            .find("td:nth-of-type(5) div")
            .click();
        cy.wait(5000);

        // Approve for this RC
        cy.contains(" approve ").eq(0).click();

    });

    // 5️⃣ Agent - DOWNLOAD STATUS REPORT
    it("5️⃣ CHANGE OF NATURE OF BUSINESS - DOWNLOAD STATUS REPORT", () => {
        cy.visit("https://cac.oasisproducts.ng/post/dashboard");

        cy.get("input[maxlength='110']").type(rcNumber);
        cy.get("button.btn-primary").click();
        cy.wait(3000);

        cy.contains("Proceed to Dashboard").invoke("removeAttr", "target").click();
        cy.contains("CHANGE OF NATURE OF BUSINESS", { timeout: 20000 }).click();
        cy.wait(3000);

        cy.get("a[class$='success']").click();
        cy.contains("Download Status Report").click();
    });
});