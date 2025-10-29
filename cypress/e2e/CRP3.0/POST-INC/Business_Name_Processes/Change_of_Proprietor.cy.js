describe("BN CHANGE OF PROPRIETOR/PARTNER(S) UI Tests", () => {
    const rcNumber = "7015032"; // 🔑 Single source of truth

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

    // 1️⃣ Agent - CHANGE OF PROPRIETOR/PARTNER(S)
    it("1️⃣ CHANGE OF PROPRIETOR/PARTNER(S)", () => {
        cy.visit("https://cac.oasisproducts.ng/post/dashboard");
        cy.log("🌐 [1️⃣] Agent Dashboard opened");

        cy.get("input[maxlength='110']").type(rcNumber);
        cy.get("button[class*='btn-primary']").click();
        cy.log(`🏢 [1️⃣] Business ${rcNumber} selected`);
        cy.wait(3000);

        cy.contains("Proceed to Dashboard").invoke("removeAttr", "target").click();
        cy.contains(" CHANGE OF PROPRIETOR/PARTNER(S)", { timeout: 20000 }).click();
        cy.contains("Start Request for Change of Proprietor / Partner(s)", { timeout: 20000 }).click();
        cy.log("📄 [1️⃣] Started Change of Proprietor/Partner(s) request");

        // Add New Proprietor
        cy.get("button[class$='btn-primary']").click();
        cy.log("👤 [1️⃣] Adding new individual proprietor");

        // Personal Details
        cy.get("input[formcontrolname='surname']").eq(0).type("Ndueso");
        cy.get("input[formcontrolname='firstName']").eq(0).type("Samuel");
        cy.get("input[formcontrolname='otherName']").eq(0).type("Jackson");
        cy.get("input[formcontrolname='dateOfBirth']").clear().type("1998-09-06");
        cy.get("select[formcontrolname='gender']").select('MALE');
        cy.get("select[formcontrolname='nationality']").eq(0).select('NIGERIA');
        cy.log("🧾 [1️⃣] Entered personal details");

        // Contact Details
        cy.get("#phone").eq(0).type('08012345678');
        cy.get("input[formcontrolname='email']").eq(0).type('mndueso@oasismgt.net');
        cy.log("☎️ [1️⃣] Entered contact details");

        // Address
        cy.get("select[formcontrolname='state']").select('FCT');
        cy.get("select[formcontrolname='lga']").select('Amac');
        cy.get("input[formcontrolname='city']").eq(0).type('WUSE');
        cy.get("input[formcontrolname='houseNumber']").eq(0).type('2');
        cy.get("input[formcontrolname='streetName']").eq(0).type('Parakou');
        cy.log("🏠 [1️⃣] Entered address");

        // ID
        cy.get("select[formcontrolname='meansOfId']").select('International Passport');
        cy.get("input[formcontrolname='idNumber']").type('1234567890');
        cy.log("🪪 [1️⃣] Entered ID details");

        // Appointment
        cy.get("input[formcontrolname='dateOfAppointment']")
            .clear({ force: true })
            .type('2025-09-06', { force: true })
            .click();
        cy.log("📅 [1️⃣] Selected date of appointment");

        cy.get("button[class$='fs-16']").click();
        cy.log("✅ [1️⃣] Added proprietor & continued");

        // Additional Details
        cy.get("input[maxlength='30']").clear().type("2025-09-03");
        cy.get("select[class='form-control']").eq(0).select('Abiodun  Abimbola');
        cy.log("📄 [1️⃣] Entered request details & authentication");

        // Wait 10 seconds for manual upload
        cy.wait(10000);
        cy.contains("PREVIEW ").click();
        cy.wait(2000);
        cy.contains("SAVE & CONTINUE").click();
        cy.log("💾 [1️⃣] Previewed & saved application");
        cy.wait(3000);

        cy.get("button[class='remita-btn']").click();
        cy.log("💳 [1️⃣] Proceeded to payment");
        cy.wait(60000);

        cy.get("div[class='footer-btn']").click();
        cy.log("📥 [1️⃣] Completed Change of Proprietor/Partner(s) process");
    });

    // 2️⃣ Officer - Query Application
    it("2️⃣ CHANGE OF PROPRIETOR/PARTNER(S) - Query Application", () => {
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
        cy.contains("Change Of Proprietor/Partners").click();
        cy.wait(3000);
        cy.log("📂 [2️⃣] Accessed Change of Proprietor/Partners");

        // 🔎 Collect correct RC
        cy.contains(rcNumber)
            .parents("tr")
            .find("div.collect-btn")
            .click();

        cy.contains("My Pending Request").click();

        // 🔎 Open View Details for this RC
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
    it("3️⃣ CHANGE OF PROPRIETOR/PARTNER(S) - RESOLVE QUERY", () => {
        cy.visit("https://cac.oasisproducts.ng/post/dashboard");
        cy.log("🌐 [3️⃣] Agent Dashboard opened");

        cy.get("input[maxlength='110']").type(rcNumber);
        cy.get("button.btn-primary").click();
        cy.wait(3000);
        cy.log(`🏢 [3️⃣] Business ${rcNumber} selected`);

        cy.contains("Proceed to Dashboard").invoke("removeAttr", "target").click();
        cy.contains(" CHANGE OF PROPRIETOR/PARTNER(S) ", { timeout: 20000 }).click();
        cy.wait(3000);
        cy.log("📂 [3️⃣] Opened Change of Proprietor/Partner(s)");

        cy.xpath("//a[contains(@class, 'danger')]").click();
        cy.contains("Resolve Query").click();

        cy.get("select[class='form-control']").eq(0).select('Abiodun  Abimbola');
        cy.log("📄 [3️⃣] Entered request details & authentication");

        cy.contains("PREVIEW ").click();
        cy.wait(2000);
        cy.contains("SAVE & CONTINUE").click();
        cy.wait(3000);
        cy.get("div[class='footer-btn']").click();
        cy.log("✅ [3️⃣] Query resolved and resubmitted");
    });

    // 4️⃣ Officer - Approve Application
    it("4️⃣ CHANGE OF PROPRIETOR/PARTNER(S) - Approve Application", () => {
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
        cy.contains("Change Of Proprietor/Partners").click();
        cy.wait(2000);
        cy.log("📂 [4️⃣] Accessed Change of Proprietor/Partners");

        // 🔎 Collect correct RC
        cy.contains(rcNumber)
            .parents("tr")
            .find("div.collect-btn")
            .click();

        cy.contains("My Pending Request").click();

        // 🔎 Open View Details for this RC
        cy.contains(rcNumber)
            .parents("tr")
            .find("td:nth-of-type(5) div")
            .click();
        cy.wait(5000);
        cy.log(`📄 [4️⃣] Viewing application details for RC ${rcNumber}`);

        cy.contains(" approve ").eq(0).click();

        cy.log("✅ [4️⃣] Application approved");
    });

    // 5️⃣ Agent - DOWNLOAD STATUS REPORT
    it("5️⃣ CHANGE OF PROPRIETOR/PARTNER(S) - DOWNLOAD STATUS REPORT", () => {
        cy.visit("https://cac.oasisproducts.ng/post/dashboard");
        cy.log("🌐 [5️⃣] Agent Dashboard opened");

        cy.get("input[maxlength='110']").type(rcNumber);
        cy.get("button.btn-primary").click();
        cy.wait(3000);
        cy.log(`🏢 [5️⃣] Business ${rcNumber} selected`);

        cy.contains("Proceed to Dashboard").invoke("removeAttr", "target").click();
        cy.contains(" CHANGE OF PROPRIETOR/PARTNER(S) ", { timeout: 20000 }).click();
        cy.wait(3000);
        cy.log("📂 [5️⃣] Opened Change of Proprietor/Partner(s)");

        cy.get("a[class$='success']").click();
        cy.contains("Download Status Report").click();
        cy.log("📥 [5️⃣] Downloaded Status Report");
    });
});