describe("BN CESSATION UI Tests", () => {
    const rcNumber = "8155246"; // 🔑 Single source of truth for RC number

    beforeEach(() => {
        cy.session("loginSession", () => {
            cy.visit("https://cac.oasisproducts.ng/auth/login");
            cy.log("🔑 [Login] Visiting login page");

            cy.contains("Email").click();
            cy.get("input[formcontrolname='email']").type("okekeonnyedikachi@gmail.com");
            cy.get("input[formcontrolname='password']").type("password");
            cy.log("📝 [Login] Entered credentials");

            cy.get("#flexCheckDefault").check();
            cy.get("button[class$='w-100']").click();
            cy.log("➡️ [Login] Submitted login form");

            cy.get("input[name='otp'], input[formcontrolname='otp']").type("123456");
            cy.get("button[class$='btn-success']").click();
            cy.log("🔒 [Login] Entered OTP and submitted");

            cy.url({ timeout: 20000 }).should("include", "/dashboard");
            cy.log("✅ [Login] Logged into dashboard");
        });
    });

    // 1️⃣ Agent - CESSATION (commented out for now)
    /*
    it("1️⃣ CESSATION PROCESS", () => {
        cy.visit("https://cac.oasisproducts.ng/post/dashboard");
        cy.log("🌐 [1️⃣] Agent Dashboard opened");

        cy.get("input[maxlength='110']").type(rcNumber);
        cy.get("button[class*='btn-primary']").click();
        cy.log("🏢 [1️⃣] Business selected");
        cy.wait(3000);

        cy.contains("Proceed to Dashboard").invoke("removeAttr", "target").click();
        cy.contains(" CESSATION ", { timeout: 20000 }).click();
        cy.contains("Start Request for Cessation ", { timeout: 20000 }).click();
        cy.log("📄 [1️⃣] Started Cessation");

        cy.log("📄 [1️⃣] Selecting Reason for Cessation of Business");
        cy.get("select[formcontrolname='reason']").eq(0).select("VOLUNTARY");

        cy.get("input[formcontrolname='dateOfCessation']")
            .clear({ force: true })
            .type("2025-09-06", { force: true })
            .click();
        cy.log("📅 [1️⃣] Selected date of Cessation");

        cy.get("select[class='form-control']").eq(0).select("Okeke Onyedikachi");
        cy.log("📄 [1️⃣] Entered request details & authentication");

        cy.wait(10000); // wait for manual file upload
        cy.contains("PREVIEW ").click();
        cy.wait(2000);

        cy.contains("SAVE & CONTINUE").click();
        cy.log("💾 [1️⃣] Previewed & saved application");
        cy.wait(3000);

        cy.get("button[class='remita-btn']").click();
        cy.log("💳 [1️⃣] Proceeded to payment");
        cy.wait(60000);

        cy.get("div[class='footer-btn']").click();
        cy.log("📥 [1️⃣] Completed Edit of Proprietor/Partner(s) process");
    });
    */

    // 2️⃣ Officer - Query Application
    it("2️⃣ CESSATION - Query Application", () => {
        cy.visit("https://backoffice.oasisproducts.ng/login");
        cy.log("🌐 [2️⃣] Officer login page opened");

        cy.contains("Welcome 👋 back,hover to login", { timeout: 10000 })
            .trigger("mouseover")
            .click({ force: true });

        cy.get("input[formcontrolname='userName']").type("ookorie");
        cy.get("input[placeholder='************']").type("Password55");
        cy.contains("Sign In").click();
        cy.log("🔑 [2️⃣] Officer credentials submitted");

        cy.wait(2000);
        cy.xpath("//button[@style='--i: 3;']").click();

        cy.contains("Cessation").click();
        cy.wait(3000);
        cy.log("📂 [2️⃣] Accessed Cessation");

        cy.contains(rcNumber)
            .parents("tr")
            .find("td:nth-of-type(5) div.collect-btn")
            .click();

        cy.wait(3000);
        cy.log(`📄 [2️⃣] Collecting the Application for RC ${rcNumber}`);

        cy.contains("My Pending Request").click();

        cy.contains(rcNumber)
            .parents("tr")
            .find("td:nth-of-type(5) div")
            .click();

        cy.wait(5000);
        cy.log(`📄 [2️⃣] Viewing pending application for RC ${rcNumber}`);

        cy.xpath("//button[@class='partner-btns']").click();
        cy.get("input[role='combobox']").eq(0).click();
        cy.contains(".ng-option", "NO SEAL").click();
        cy.get("textarea[formcontrolname='queryComment']").type("Query Testing");
        cy.contains("Add Query").click();
        cy.get("button[class='submit-query']").click();
        cy.xpath("//button[contains(@style, '#B18209;')]").click();

        cy.log("❓ [2️⃣] Query added & submitted");
    });

    // 3️⃣ Agent - RESOLVE QUERY
    it("3️⃣ CESSATION - RESOLVE QUERY", () => {
        cy.visit("https://cac.oasisproducts.ng/post/dashboard");
        cy.log("🌐 [3️⃣] Agent Dashboard opened");

        cy.get("input[maxlength='110']").type(rcNumber);
        cy.get("button.btn-primary").click();
        cy.wait(3000);
        cy.log(`🏢 [3️⃣] Business ${rcNumber} selected`);

        cy.contains("Proceed to Dashboard").invoke("removeAttr", "target").click();
        cy.contains(" CESSATION ", { timeout: 20000 }).click();
        cy.log("📄 [3️⃣] Opened Cessation");

        cy.xpath("//a[contains(@class, 'danger')]").click();
        cy.contains("Resolve Query").click();

        cy.contains("PREVIEW ").click();
        cy.wait(2000);
        cy.contains("SAVE & CONTINUE").click();
        cy.wait(3000);
        cy.get("div[class='footer-btn']").click();
        cy.log("✅ [3️⃣] Query resolved and resubmitted");
    });

    // 4️⃣ Officer - Approve Application
    it("4️⃣ CESSATION - Approve Application", () => {
        cy.visit("https://backoffice.oasisproducts.ng/login");
        cy.log("🌐 [4️⃣] Officer login page opened");

        cy.contains("Welcome 👋 back,hover to login", { timeout: 10000 })
            .trigger("mouseover")
            .click({ force: true });

        cy.get("input[formcontrolname='userName']").type("ookorie");
        cy.get("input[placeholder='************']").type("Password55");
        cy.contains("Sign In").click();
        cy.log("🔑 [4️⃣] Officer credentials submitted");

        cy.wait(2000);
        cy.xpath("//button[@style='--i: 3;']").click();

        cy.contains("Cessation").click();
        cy.wait(3000);
        cy.log("📂 [4️⃣] Accessed Cessation");

        cy.get("div.collect-btn").eq(0).click();
        cy.contains("My Pending Request").click();
        cy.contains("View Details").click();
        cy.wait(5000);
        cy.log(`📄 [4️⃣] Viewing application details for RC ${rcNumber}`);

        cy.contains(" approve ").eq(0).click();
        cy.log("✅ [4️⃣] Application approved");
    });

    // 5️⃣ Agent - DOWNLOAD STATUS REPORT
    it("5️⃣ CESSATION - DOWNLOAD STATUS REPORT", () => {
        cy.visit("https://cac.oasisproducts.ng/post/dashboard");
        cy.log("🌐 [5️⃣] Agent Dashboard opened");

        cy.get("input[maxlength='110']").type(rcNumber);
        cy.get("button.btn-primary").click();
        cy.wait(3000);
        cy.log(`🏢 [5️⃣] Business ${rcNumber} selected`);

        cy.contains("Proceed to Dashboard").invoke("removeAttr", "target").click();
        cy.contains(" CESSATION ", { timeout: 20000 }).click();
        cy.log("📄 [5️⃣] Opened Cessation");

        cy.get("a[class$='success']").click();
        cy.contains("Download Status Report").click();
        cy.log("📥 [5️⃣] Downloaded Status Report");
    });
});