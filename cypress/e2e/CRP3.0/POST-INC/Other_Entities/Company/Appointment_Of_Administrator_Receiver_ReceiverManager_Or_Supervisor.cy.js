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


   it("APPOINTMENT OF ADMINISTRATOR, RECEIVER, RECEIVER MANAGER OR SUPERVISOR PROCESS", () => {
        cy.log("🌐 Navigating to Accredited Agent Dashboard");
        cy.visit("https://www.cac.oasisproducts.ng/post_app/accredited-agent-dashboard");

        cy.log("🔎 Searching for business name");
        cy.get("input[name='searchTerm']").should("be.visible").type("TEST 101 LTD");
        cy.get("button[type='submit']").should("be.visible").click();

        cy.log("➡️ Proceeding to Dashboard");
        cy.contains("Proceed to Dashboard").should("be.visible").invoke("removeAttr", "target").click();

        cy.log("APPOINTMENT OF ADMINISTRATOR, RECEIVER, RECEIVER MANAGER OR SUPERVISOR");
        cy.contains("APPOINTMENT OF ADMINISTRATOR, RECEIVER, RECEIVER MANAGER OR SUPERVISOR", { matchCase: false, timeout: 20000 })
            .should("be.visible")
            .click();

        cy.get("div[class='ui center aligned basic segment'] button", { timeout: 20000 }).should("be.visible").click();

        cy.log("Click on Start Process");
        cy.contains(" Start Process ").click();

        // ============================
        // Details of the person who appointed or obtained an order
        // ============================

        cy.log("Type in the Surname");
        cy.get("[name='surname']").eq(0).should('be.visible').type('Ndueso');

        cy.log("Type in the First Name");
        cy.get("[name='firstname']").eq(0).should('be.visible').type('Michael');

        cy.log("Type in the Other Name");
        cy.get("[name='other_name']").eq(0).should('be.visible').type('Jackson');

        // Contact Details
        cy.log("Type in the Phone Number");
        cy.get("[name='phone_number']").eq(0).should('be.visible').type('08012345678');

        cy.log("Type in the Email");
        cy.get("[name='email']").eq(0).should('be.visible').type('mndueso@oasismgt.net');

        // Service Address
        cy.log("Select the Country");
        cy.get("#id").eq(0).should('be.visible').select('NIGERIA');

        cy.log("Select the State");
        cy.get("#state").eq(0).should('be.visible').select('FCT');

        cy.log("Select the LGA");
        cy.get("#lga").eq(0).should('be.visible').select('AMAC');

        cy.log("Type in the Post Code");
        cy.get("[name='postcode']").eq(0).should('be.visible').type('9001234');

        cy.log("Type in the City/Town/Village");
        cy.get("[name='city']").eq(0).should('be.visible').type('WUSE');

        cy.log("Type in the House Number/Building Name");
        cy.get("[name='streetNumber']").eq(0).should('be.visible').type('2');

        cy.log("Type in the Street Name");
        cy.xpath("/html/body/app-root/main/app-company-appointment-of-manager-form/div/div/div[2]/div/form[1]/fieldset[3]/div/div[3]/input")
            .scrollIntoView()
            .should('be.visible')
            .type('Parakou');

        // Means of Identification
        cy.log("Select the Type");
        cy.xpath("/html/body/app-root/main/app-company-appointment-of-manager-form/div/div/div[2]/div/form[1]/fieldset[4]/div/div[1]/select")
        .select('International Passport');

        cy.log("Type in the Number");
        cy.get("[name='identity_number']").eq(0).should('be.visible').type('1234567890');

        // ============================
        // Appointment Details
        // ============================

        // cy.log("Select the Person Type");
        // cy.get("select[formcontrolname='isCorporate']").eq(1).should('be.visible').select('INDIVIDUAL');

        cy.log("Type in the Surname");
        cy.get("[name='surname']").eq(1).should('be.visible').type('Ndueso');

        cy.log("Type in the First Name");
        cy.get("[name='firstname']").eq(1).should('be.visible').type('Michael');

        cy.log("Type in the Other Name");
        cy.get("[name='other_name']").eq(1).should('be.visible').type('Jackson');

        // Contact Details
        cy.log("Type in the Phone Number");
        cy.get("[name='phone_number']").eq(1).should('be.visible').type('08012345678');

        cy.log("Type in the Email");
        cy.get("[name='email']").eq(1).should('be.visible').type('mndueso@oasismgt.net');

        // Address
        cy.log("Select the Country");
        cy.xpath("/html/body/app-root/main/app-company-appointment-of-manager-form/div/div/div[2]/div/form[2]/fieldset[3]/div/div[1]/div[1]/select")
            .should('be.visible').select('NIGERIA');


        cy.log("Select the State");
        cy.get("#state").should('be.visible').select('FCT');

        cy.log("Select the LGA");
        cy.get("#lga").should('be.visible').select('AMAC');

        cy.log("Type in the Post Code");
        cy.get("[name='postcode']").eq(1).should('be.visible').type('9001234');

        cy.log("Type in the City/Town/Village");
        cy.get("[name='city']").eq(1).should('be.visible').type('WUSE');

        cy.log("Type in the House Number/Building Name");
        cy.get("[name='streetNumber']").eq(1).should('be.visible').type('2');

        cy.log("Type in the Street Name");
        cy.get("input.ng-untouched.ng-pristine.ng-valid").eq(1).should('be.visible').type('Parakou');

        // Means of Identification
        cy.log("Select the Type");
        cy.xpath("/html/body/app-root/main/app-company-appointment-of-manager-form/div/div/div[2]/div/form[2]/fieldset[4]/div/div[1]/select")
        .should('be.visible').select('International Passport');

        cy.log("Type in the Number");
        cy.xpath("/html/body/app-root/main/app-company-appointment-of-manager-form/div/div/div[2]/div/form[2]/fieldset[4]/div/div[2]/input")
            .should('be.visible').type('1234567890');

        // Details of Appointment
        cy.log("Select the Appointment Type");
        cy.get("select[formcontrolname='natureOfAppointment']").should('be.visible').select('Administrator');

        cy.log("Is the appointment over 'part' or the 'whole' of the property or undertaking of the company?");
        cy.get("select[formcontrolname='reasonForRemoval']")
            .should('be.visible')
            .find('option')
            .should('have.length.greaterThan', 0)
            .then($opts => {
                // Try to find an exact match
                const option = [...$opts].find(o => o.textContent.trim() === "The whole of the property or undertaking of the company");
                if(option) {
                    cy.get("select[formcontrolname='reasonForRemoval']").select(option.value);
                } else {
                    // fallback to index if exact match fails
                    cy.get("select[formcontrolname='reasonForRemoval']").select(2);
                    cy.log('Fallback: Selected option by index');
                }
            });

        // Date of Appointment
        cy.log("📅 Selecting Date of Date of Appointment");
        cy.get("input[formcontrolname='dateOfAppointment']")
            .should('be.visible')
            .clear({ force: true })
            .type('1996-05-12', { force: true })
            .click();

        cy.log("Select the Mode of appointment");
        cy.get("select[formcontrolname='appointedBy']").should('be.visible').select('Under the power contained in the instrument');

        // Authentication
        cy.log("Type in the Name");
        cy.get("input[name='fullname']").should('be.visible').type('MJ');

        cy.log("Type in the Description");
        cy.get("input[name='description']").should('be.visible').type('Desctiption Testing');

        cy.log("💾 Clicking Save & Continue");
        cy.get("div[class='pull-right']").should('be.visible').click();
        cy.wait(3000);

        cy.log("💰 Clicking Proceed to make payment");
        cy.get("button[class*='right'] span").should('be.visible').click();
        cy.wait(20000);


        cy.log("💰 Clicking Remita to make payment");
        cy.get("a[class*='ui']").should('be.visible').click();


    });
});