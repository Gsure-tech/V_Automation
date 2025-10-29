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

    // it("ANNUAL RETURNS PROCESS", () => {
    //     cy.log("🌐 Navigating to Accredited Agent Dashboard");
    //     cy.visit("https://www.cac.oasisproducts.ng/post_app/accredited-agent-dashboard");
    //
    //     cy.log("🔎 Searching for business name");
    //     cy.get("input[name='searchTerm']").should("be.visible").type("TEST 101 LTD");
    //     cy.get("button[type='submit']").should("be.visible").click();
    //
    //     cy.log("➡️ Proceeding to Dashboard");
    //     cy.contains("Proceed to Dashboard").should("be.visible").invoke("removeAttr", "target").click();
    //
    //     cy.contains(" ANNUAL RETURNS ", { matchCase: false, timeout: 20000 }).click();
    //     cy.contains(" START ANNUAL RETURN COMPANY FILING ", { matchCase: false, timeout: 20000 })
    //         .should("be.visible")
    //         .click();
    //
    //     // Select Filing Year
    //     cy.log("Select Filing Year");
    //
    //     cy.xpath("//select").should('be.visible').select('2022');
    //
    //     cy.log("Click on Submit");
    //     cy.contains("SUBMIT").click();
    //     cy.wait(5000);
    //
    //     cy.log("📅 Selecting Date of Annual General Meeting");
    //     cy.get("#datePicker").should('be.visible').clear().type('2022-12-31');
    //
    //     cy.log("Type in the Principal Activity Description");
    //     cy.get("textarea[formcontrolname='principalActivity']").type('RTYIUOIPJOIBTRYFUGHNOUHIUBUOIL');
    //     cy.wait(3000);
    //
    //     cy.log("📅 Selecting Date of Resolution ");
    //     cy.get("#datePicker").should('be.visible').clear().type('2025-09-01');
    //
    //     // Statement of Capital Details
    //     cy.log("Type in the Class of Shares");
    //     cy.get("input[formcontrolname='classofShare']").type('CLASS SHARES');
    //
    //     cy.log("Particulars of Indebtedness");
    //     cy.get("input[formcontrolname='particularsIndebtedness']").type('1');
    //
    //
    //     // Particulars of Turnover & Net Assets (Applicable to Small Companies Where Financial Statement is Not Required)
    //     cy.log("Type in the Total Turnover (2022)");
    //     cy.get("input[placeholder='2,000,000.00']").type('0');
    //
    //     cy.log("Total Value of Net Assets (2022)");
    //     cy.get("input[placeholder='1,000,000.00']").type('0');
    //
    //     cy.log("Click on Continue");
    //     cy.get("button[type='submit']").click();
    //     cy.wait(2000);
    //
    //     // Authentication
    //     cy.log("Type in the Full Name of Company Affiliate");
    //     cy.get("input[formcontrolname='fullname']").type('Michael Jackson N');
    //
    //     cy.log("Type in the Designation");
    //     cy.get("input[formcontrolname='description']").type('Tester');
    //
    //     cy.log("Click on Save and Continue");
    //     cy.get("span[class='ng-star-inserted']").click();
    //     cy.wait(7000);
    //
    //     cy.log("Click on Add New PSC");
    //     cy.get("button[class^='custom-add-button']").click();
    //     cy.wait(2000);
    //
    //     // PSC Form
    //     cy.log("Click on the PSC Notification green bar");
    //     cy.get("html > body > app-root > main > app-psc-details > div > div > div:nth-of-type(2) > div > app-accordion > div > div > h2 > button").click();
    //     cy.wait(2000);
    //
    //     cy.log("📅 Selecting Date this person became a PSC  ");
    //     cy.get("#datePicker").should('be.visible').clear().type('2025-09-01');
    //
    //     cy.log("📅 Selecting Date of Notification to the Company*");
    //     cy.get("#datePicker").should('be.visible').clear().type('2025-09-01');
    //
    //     cy.log("Type in the Title");
    //     cy.get("input[placeholder='Title']").eq(0).should('be.visible').type('Engr');
    //
    //     cy.log("Type in the First Name");
    //     cy.get("input[placeholder='Micheal']").eq(0).should('be.visible').type('Michael');
    //
    //     cy.log("Type in the Surname");
    //     cy.get("input[formcontrolname='surName']").eq(0).should('be.visible').type('Ndueso');
    //
    //     cy.log("Type in the Other Name");
    //     cy.get("input[placeholder='Oremeji']").eq(0).should('be.visible').type('Jackson');
    //
    //     cy.log("Type in the Designation");
    //     cy.get("input[placeholder='Oremeji']").eq(0).should('be.visible').type('Tester');
    //
    //     cy.log("Select the Nationality");
    //     cy.get("select[formcontrolname='nationality']").eq(0).should('be.visible').select('NIGERIAN');
    //
    //     // Means of Identification
    //     cy.log("Select the Identification Type");
    //     cy.get("select[formcontrolname='idType']").eq(0).should('be.visible').select('International Passport');
    //
    //     cy.log("Type in the Identification Number");
    //     cy.get("input[placeholder='70455e134562']").eq(0).should('be.visible').type('1234567890');
    //
    //     cy.log("Select the Gender");
    //     cy.get("select[formcontrolname='gender']").should('be.visible').select('MALE');
    //
    //     cy.log("Type in the Email");
    //     cy.get("input[formcontrolname='email']").eq(0).should('be.visible').type('mndueso@oasismgt.net');
    //
    //     cy.log("Type in the Phone Number");
    //     cy.get("input[placeholder='08097765332']").eq(0).should('be.visible').type('08012345678');
    //
    //     cy.log("Select the Date Of Birth");
    //     cy.get("input[formcontrolname='dob']").should('be.visible').clear().type('1996-05-12');
    //
    //     // ADDRESS - RESIDENTIAL
    //
    //     cy.log("Type in the Building Name/Number");
    //     cy.get("input[formcontrolname='homeAddressNo']").eq(0).should('be.visible').type('Heritage House');
    //
    //     cy.log("Select the Country");
    //     cy.get("select[formcontrolname='homeCountry']").eq(0).should('be.visible').select('NIGERIA');
    //
    //     cy.log("Select the State");
    //     cy.get("select[formcontrolname='homeState']").eq(0).should('be.visible').select('FCT');
    //
    //     cy.log("Type in the City");
    //     cy.get("input[formcontrolname='homeCity']").eq(0).should('be.visible').type('WUSE');
    //
    //     cy.log("Type in the Street Name");
    //     cy.get("input[formcontrolname='homeStreetName']").eq(0).should('be.visible').type('Parakou');
    //
    //
    //     // ADDRESS - SERVICE
    //
    //     cy.log("Type in the Building Name/Number");
    //     cy.get("input[formcontrolname='addressNo']").eq(0).should('be.visible').type('Heritage House');
    //
    //     cy.log("Select the Country");
    //     cy.get("select[formcontrolname='country']").eq(0).should('be.visible').select('NIGERIA');
    //
    //     cy.log("Select the State");
    //     cy.get("select[formcontrolname='state']").eq(0).should('be.visible').select('FCT');
    //
    //     cy.log("Type in the City");
    //     cy.get("input[formcontrolname='city']").eq(0).should('be.visible').type('WUSE');
    //
    //     cy.log("Type in the Street Name");
    //     cy.get("input[formcontrolname='streetName']").eq(0).should('be.visible').type('Parakou');
    //
    //
    //     // B DETAILS OF POLITICALLY EXPOSED PERSON (PEP) green bar
    //     cy.log('Click on the "B DETAILS OF POLITICALLY EXPOSED PERSON (PEP) green bar"');
    //     cy.get("html > body > app-root > main > app-psc-details > div > div > div:nth-of-type(2) > div > div > form > app-accordion:nth-of-type(1) > div > div > h2 > button").click();
    //     cy.wait(2000);
    //
    //
    //
    //     // // Means of Identification
    //     // cy.log("Select the Type");
    //     // cy.xpath("/html/body/app-root/main/app-company-appointment-of-manager-form/div/div/div[2]/div/form[1]/fieldset[4]/div/div[1]/select")
    //     // .select('International Passport');
    //     //
    //     // cy.log("Type in the Number");
    //     // cy.get("[name='identity_number']").eq(0).should('be.visible').type('1234567890');
    //     //
    //     // // ============================
    //     // // Appointment Details
    //     // // ============================
    //     //
    //     // // cy.log("Select the Person Type");
    //     // // cy.get("select[formcontrolname='isCorporate']").eq(1).should('be.visible').select('INDIVIDUAL');
    //     //
    //     // cy.log("Type in the Surname");
    //     // cy.get("[name='surname']").eq(1).should('be.visible').type('Ndueso');
    //     //
    //     // cy.log("Type in the First Name");
    //     // cy.get("[name='firstname']").eq(1).should('be.visible').type('Michael');
    //     //
    //     // cy.log("Type in the Other Name");
    //     // cy.get("[name='other_name']").eq(1).should('be.visible').type('Jackson');
    //     //
    //     // // Contact Details
    //     // cy.log("Type in the Phone Number");
    //     // cy.get("[name='phone_number']").eq(1).should('be.visible').type('08012345678');
    //     //
    //     // cy.log("Type in the Email");
    //     // cy.get("[name='email']").eq(1).should('be.visible').type('mndueso@oasismgt.net');
    //     //
    //     // // Address
    //     // cy.log("Select the Country");
    //     // cy.xpath("/html/body/app-root/main/app-company-appointment-of-manager-form/div/div/div[2]/div/form[2]/fieldset[3]/div/div[1]/div[1]/select")
    //     //     .should('be.visible').select('NIGERIA');
    //     //
    //     //
    //     // cy.log("Select the State");
    //     // cy.get("#state").should('be.visible').select('FCT');
    //     //
    //     // cy.log("Select the LGA");
    //     // cy.get("#lga").should('be.visible').select('AMAC');
    //     //
    //     // cy.log("Type in the Post Code");
    //     // cy.get("[name='postcode']").eq(1).should('be.visible').type('9001234');
    //     //
    //     // cy.log("Type in the City/Town/Village");
    //     // cy.get("[name='city']").eq(1).should('be.visible').type('WUSE');
    //     //
    //     // cy.log("Type in the House Number/Building Name");
    //     // cy.get("[name='streetNumber']").eq(1).should('be.visible').type('2');
    //     //
    //     // cy.log("Type in the Street Name");
    //     // cy.get("input.ng-untouched.ng-pristine.ng-valid").eq(1).should('be.visible').type('Parakou');
    //     //
    //     // // Means of Identification
    //     // cy.log("Select the Type");
    //     // cy.xpath("/html/body/app-root/main/app-company-appointment-of-manager-form/div/div/div[2]/div/form[2]/fieldset[4]/div/div[1]/select")
    //     // .should('be.visible').select('International Passport');
    //     //
    //     // cy.log("Type in the Number");
    //     // cy.xpath("/html/body/app-root/main/app-company-appointment-of-manager-form/div/div/div[2]/div/form[2]/fieldset[4]/div/div[2]/input")
    //     //     .should('be.visible').type('1234567890');
    //     //
    //     // // Details of Appointment
    //     // cy.log("Select the Appointment Type");
    //     // cy.get("select[formcontrolname='natureOfAppointment']").should('be.visible').select('Administrator');
    //     //
    //     // cy.log("Is the appointment over 'part' or the 'whole' of the property or undertaking of the company?");
    //     // cy.get("select[formcontrolname='reasonForRemoval']")
    //     //     .should('be.visible')
    //     //     .find('option')
    //     //     .should('have.length.greaterThan', 0)
    //     //     .then($opts => {
    //     //         // Try to find an exact match
    //     //         const option = [...$opts].find(o => o.textContent.trim() === "The whole of the property or undertaking of the company");
    //     //         if(option) {
    //     //             cy.get("select[formcontrolname='reasonForRemoval']").select(option.value);
    //     //         } else {
    //     //             // fallback to index if exact match fails
    //     //             cy.get("select[formcontrolname='reasonForRemoval']").select(2);
    //     //             cy.log('Fallback: Selected option by index');
    //     //         }
    //     //     });
    //     //
    //     // // Date of Appointment
    //     // cy.log("📅 Selecting Date of Date of Appointment");
    //     // cy.get("input[formcontrolname='dateOfAppointment']")
    //     //     .should('be.visible')
    //     //     .clear({ force: true })
    //     //     .type('1996-05-12', { force: true })
    //     //     .click();
    //     //
    //     // cy.log("Select the Mode of appointment");
    //     // cy.get("select[formcontrolname='appointedBy']").should('be.visible').select('Under the power contained in the instrument');
    //     //
    //     // // Authentication
    //     // cy.log("Type in the Name");
    //     // cy.get("input[name='fullname']").should('be.visible').type('MJ');
    //     //
    //     // cy.log("Type in the Description");
    //     // cy.get("input[name='description']").should('be.visible').type('Desctiption Testing');
    //     //
    //     // cy.log("💾 Clicking Save & Continue");
    //     // cy.get("div[class='pull-right']").should('be.visible').click();
    //     // cy.wait(3000);
    //     //
    //     // cy.log("💰 Clicking Proceed to make payment");
    //     // cy.get("button[class*='right'] span").should('be.visible').click();
    //     // cy.wait(20000);
    //     //
    //     //
    //     // cy.log("💰 Clicking Remita to make payment");
    //     // cy.get("a[class*='ui']").should('be.visible').click();
    //
    //
    // });


    // it("APPOINTMENT OF ADMINISTRATOR, RECEIVER, RECEIVER MANAGER OR SUPERVISOR PROCESS", () => {
    //     cy.log("🌐 Navigating to Accredited Agent Dashboard");
    //     cy.visit("https://www.cac.oasisproducts.ng/post_app/accredited-agent-dashboard");
    //
    //     cy.log("🔎 Searching for business name");
    //     cy.get("input[name='searchTerm']").should("be.visible").type("TEST 101 LTD");
    //     cy.get("button[type='submit']").should("be.visible").click();
    //
    //     cy.log("➡️ Proceeding to Dashboard");
    //     cy.contains("Proceed to Dashboard").should("be.visible").invoke("removeAttr", "target").click();
    //
    //     cy.log("APPOINTMENT OF ADMINISTRATOR, RECEIVER, RECEIVER MANAGER OR SUPERVISOR");
    //     cy.contains("APPOINTMENT OF ADMINISTRATOR, RECEIVER, RECEIVER MANAGER OR SUPERVISOR", { matchCase: false, timeout: 20000 })
    //         .should("be.visible")
    //         .click();
    //
    //     cy.get("div[class='ui center aligned basic segment'] button", { timeout: 20000 }).should("be.visible").click();
    //
    //     cy.log("Click on Start Process");
    //     cy.contains(" Start Process ").click();
    //
    //     // ============================
    //     // Details of the person who appointed or obtained an order
    //     // ============================
    //
    //     cy.log("Type in the Surname");
    //     cy.get("[name='surname']").eq(0).should('be.visible').type('Ndueso');
    //
    //     cy.log("Type in the First Name");
    //     cy.get("[name='firstname']").eq(0).should('be.visible').type('Michael');
    //
    //     cy.log("Type in the Other Name");
    //     cy.get("[name='other_name']").eq(0).should('be.visible').type('Jackson');
    //
    //     // Contact Details
    //     cy.log("Type in the Phone Number");
    //     cy.get("[name='phone_number']").eq(0).should('be.visible').type('08012345678');
    //
    //     cy.log("Type in the Email");
    //     cy.get("[name='email']").eq(0).should('be.visible').type('mndueso@oasismgt.net');
    //
    //     // Service Address
    //     cy.log("Select the Country");
    //     cy.get("#id").eq(0).should('be.visible').select('NIGERIA');
    //
    //     cy.log("Select the State");
    //     cy.get("#state").eq(0).should('be.visible').select('FCT');
    //
    //     cy.log("Select the LGA");
    //     cy.get("#lga").eq(0).should('be.visible').select('AMAC');
    //
    //     cy.log("Type in the Post Code");
    //     cy.get("[name='postcode']").eq(0).should('be.visible').type('9001234');
    //
    //     cy.log("Type in the City/Town/Village");
    //     cy.get("[name='city']").eq(0).should('be.visible').type('WUSE');
    //
    //     cy.log("Type in the House Number/Building Name");
    //     cy.get("[name='streetNumber']").eq(0).should('be.visible').type('2');
    //
    //     cy.log("Type in the Street Name");
    //     cy.xpath("/html/body/app-root/main/app-company-appointment-of-manager-form/div/div/div[2]/div/form[1]/fieldset[3]/div/div[3]/input")
    //         .scrollIntoView()
    //         .should('be.visible')
    //         .type('Parakou');
    //
    //     // Means of Identification
    //     cy.log("Select the Type");
    //     cy.xpath("/html/body/app-root/main/app-company-appointment-of-manager-form/div/div/div[2]/div/form[1]/fieldset[4]/div/div[1]/select")
    //     .select('International Passport');
    //
    //     cy.log("Type in the Number");
    //     cy.get("[name='identity_number']").eq(0).should('be.visible').type('1234567890');
    //
    //     // ============================
    //     // Appointment Details
    //     // ============================
    //
    //     // cy.log("Select the Person Type");
    //     // cy.get("select[formcontrolname='isCorporate']").eq(1).should('be.visible').select('INDIVIDUAL');
    //
    //     cy.log("Type in the Surname");
    //     cy.get("[name='surname']").eq(1).should('be.visible').type('Ndueso');
    //
    //     cy.log("Type in the First Name");
    //     cy.get("[name='firstname']").eq(1).should('be.visible').type('Michael');
    //
    //     cy.log("Type in the Other Name");
    //     cy.get("[name='other_name']").eq(1).should('be.visible').type('Jackson');
    //
    //     // Contact Details
    //     cy.log("Type in the Phone Number");
    //     cy.get("[name='phone_number']").eq(1).should('be.visible').type('08012345678');
    //
    //     cy.log("Type in the Email");
    //     cy.get("[name='email']").eq(1).should('be.visible').type('mndueso@oasismgt.net');
    //
    //     // Address
    //     cy.log("Select the Country");
    //     cy.xpath("/html/body/app-root/main/app-company-appointment-of-manager-form/div/div/div[2]/div/form[2]/fieldset[3]/div/div[1]/div[1]/select")
    //         .should('be.visible').select('NIGERIA');
    //
    //
    //     cy.log("Select the State");
    //     cy.get("#state").should('be.visible').select('FCT');
    //
    //     cy.log("Select the LGA");
    //     cy.get("#lga").should('be.visible').select('AMAC');
    //
    //     cy.log("Type in the Post Code");
    //     cy.get("[name='postcode']").eq(1).should('be.visible').type('9001234');
    //
    //     cy.log("Type in the City/Town/Village");
    //     cy.get("[name='city']").eq(1).should('be.visible').type('WUSE');
    //
    //     cy.log("Type in the House Number/Building Name");
    //     cy.get("[name='streetNumber']").eq(1).should('be.visible').type('2');
    //
    //     cy.log("Type in the Street Name");
    //     cy.get("input.ng-untouched.ng-pristine.ng-valid").eq(1).should('be.visible').type('Parakou');
    //
    //     // Means of Identification
    //     cy.log("Select the Type");
    //     cy.xpath("/html/body/app-root/main/app-company-appointment-of-manager-form/div/div/div[2]/div/form[2]/fieldset[4]/div/div[1]/select")
    //     .should('be.visible').select('International Passport');
    //
    //     cy.log("Type in the Number");
    //     cy.xpath("/html/body/app-root/main/app-company-appointment-of-manager-form/div/div/div[2]/div/form[2]/fieldset[4]/div/div[2]/input")
    //         .should('be.visible').type('1234567890');
    //
    //     // Details of Appointment
    //     cy.log("Select the Appointment Type");
    //     cy.get("select[formcontrolname='natureOfAppointment']").should('be.visible').select('Administrator');
    //
    //     cy.log("Is the appointment over 'part' or the 'whole' of the property or undertaking of the company?");
    //     cy.get("select[formcontrolname='reasonForRemoval']")
    //         .should('be.visible')
    //         .find('option')
    //         .should('have.length.greaterThan', 0)
    //         .then($opts => {
    //             // Try to find an exact match
    //             const option = [...$opts].find(o => o.textContent.trim() === "The whole of the property or undertaking of the company");
    //             if(option) {
    //                 cy.get("select[formcontrolname='reasonForRemoval']").select(option.value);
    //             } else {
    //                 // fallback to index if exact match fails
    //                 cy.get("select[formcontrolname='reasonForRemoval']").select(2);
    //                 cy.log('Fallback: Selected option by index');
    //             }
    //         });
    //
    //     // Date of Appointment
    //     cy.log("📅 Selecting Date of Date of Appointment");
    //     cy.get("input[formcontrolname='dateOfAppointment']")
    //         .should('be.visible')
    //         .clear({ force: true })
    //         .type('1996-05-12', { force: true })
    //         .click();
    //
    //     cy.log("Select the Mode of appointment");
    //     cy.get("select[formcontrolname='appointedBy']").should('be.visible').select('Under the power contained in the instrument');
    //
    //     // Authentication
    //     cy.log("Type in the Name");
    //     cy.get("input[name='fullname']").should('be.visible').type('MJ');
    //
    //     cy.log("Type in the Description");
    //     cy.get("input[name='description']").should('be.visible').type('Desctiption Testing');
    //
    //     cy.log("💾 Clicking Save & Continue");
    //     cy.get("div[class='pull-right']").should('be.visible').click();
    //     cy.wait(3000);
    //
    //     cy.log("💰 Clicking Proceed to make payment");
    //     cy.get("button[class*='right'] span").should('be.visible').click();
    //     cy.wait(20000);
    //
    //
    //     cy.log("💰 Clicking Remita to make payment");
    //     cy.get("a[class*='ui']").should('be.visible').click();
    //
    //
    // });

// it("Change of Name - Company  Process", () => {
//         cy.visit("https://www.cac.oasisproducts.ng/post_app/accredited-agent-dashboard");
//
//         cy.get("input[name='searchTerm']")
//             .should("be.visible")
//             .type("TEST 101 LTD");
//
//         cy.get("button[type='submit']").should("be.visible").click();
//
//         cy.contains("Proceed to Dashboard")
//             .should("be.visible")
//             .invoke("removeAttr", "target")
//             .click();
//
//         cy.contains("Change of Name", { matchCase: false, timeout: 20000 })
//             .should("be.visible")
//             .click();
//
//         // cy.contains("START CHANGE OF NAME", { matchCase: false, timeout: 20000 })
//         //     .should("be.visible")
//         //     .click();
//         //
//         // // Type in the Availability Code
//         // cy.get("input[formcontrolname='content']").should("be.visible").type("175449722546");
//         //
//         //
//         // // Click on the Search Button
//         // cy.get("button[class*='right']").should("be.visible").click();
//         // cy.wait(3000);
//         //
//         // // Click on the Start Button
//         // cy.contains(" Start ").should("be.visible").click();
//         //
//         // // Select the Date of Special Resolution
//         // cy.pickDate("input[name='dateOfResolution']", 15, "May", 2025);
//         //
//         // // Authentication
//         // // Type in the Fullname(s)
//         // cy.get("input[name='authenticationFullname']").should('be.visible').type('Tester 1');
//         //
//         //
//         // // Type in the Description
//         // cy.get("textarea[placeholder='Description']").should('be.visible').type('Testing Description');
//         //
//         //
//         // // Click on the Save & Continue
//         // cy.contains(" Save & Continue ").should("be.visible").click();
//         // cy.wait(3000);
//         //
//         // // Click on Proceed to payment
//         // cy.contains("Proceed to Payment").should("be.visible").click();
//         // cy.wait(10000);
//         //
//         //
//         // cy.log("💰 Clicking Remita to make payment");
//         // cy.contains(" Remita ").should('be.visible').click();
//         //
//         // cy.wait(60000);
//
//
//         // Click on Not Submitted
//         cy.get("div[class$='black'] div[class='label']").should("be.visible").click();
//
//         // Click On the Continue Button
//         cy.xpath("//button[.//i[contains(@class, 'edit')]]").click();
//
//         cy.wait(10000);
//
//         // Click on Upload Documents
//         cy.get("button[class^='ui']").should("be.visible").click();
//
//         //  Click on Attach Special Resolution Document
//         cy.get('input[type="file"]').should("be.visible").attachFile('status-report.pdf', { force: true });
//
//         //  Click on the OK Button (Manually)
//         cy.wait(3000);
//
//         //  Click on the Submit Application Button
//         cy.get("button[class^='ui']").should("be.visible").click();
//
//         //  Click on the OK Button (Manually)
//             cy.wait(3000);
//
//
//
//
//     });










});