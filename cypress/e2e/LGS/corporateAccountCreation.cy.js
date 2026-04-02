describe("LGS Corporate Account Creation Flow", () => {
  const baseUrl = "https://lgs.oasisproducts.ng";
  // const uniqueName = `Mandatory ${Date.now()} Hub`;

const date = new Date();
const day = date.toLocaleString('default', { day: 'numeric' });
const month = date.toLocaleString('default', { month: 'short' });
const hours = String(date.getHours()).padStart(2, '0');
const mins = String(date.getMinutes()).padStart(2, '0');
const secs = String(date.getSeconds()).padStart(2, '0');

const timestamp = `${month}${day}-${hours}${mins}${secs}`;
const uniqueBusinessName = `TesterPitch-${timestamp} Hub`;
const uniqueName = `TesterPitch-${timestamp}`;

// 2. Create the unique sub-addressed email
const uniqueEmail = `peaceoasis9023+${hours}${mins}${secs}@gmail.com`;

    it("should return RC number is already used when an already used rc number is used",()=>{
        cy.visit(`${baseUrl}/auth/login`);
        cy.get('.auth-card > :nth-child(1) > .text-center > a').click();
        cy.get(':nth-child(2) > .account-type-picker').contains("Corporate Account").click();
        cy.get('.btn').contains("Continue").click();
        cy.get(':nth-child(1) > .form-group > .form-control').clear().type("JoyTest");
        cy.get(':nth-child(2) > .form-group > .form-control').clear().type("Doe");
        cy.get(':nth-child(3) > .form-group > .form-control').clear().type(uniqueEmail);
        cy.get(':nth-child(4) > .form-group > .form-control').clear().type("08033223322");
        cy.get('.input-group > .form-control').clear().type("Gsure9023@2026");
        cy.get('.btn').contains("Next: Company Info").click();
        cy.wait(2000);
        cy.get(':nth-child(1) > .form-control').type('599491');
        // cy.get(':nth-child(1) > .form-control').clear().type("807743");
        cy.wait(2000);


        // 2. Upload to the 5th child (likely Certificate)
        cy.get('div:nth-child(4) lgs-file-uploader')
            .find('input[type="file"]')
            .selectFile('cypress/fixtures/gamma1.png', { force: true });

// 2. Upload to the 5th child (likely Status Report)
        cy.get('div:nth-child(5) lgs-file-uploader')
            .find('input[type="file"]')
            .selectFile('cypress/fixtures/status-report.pdf', { force: true });

        // Using the specific parent structure to ensure we hit the right button
        cy.get('lgs-corporate-workspace-creation .pt-4 > button')
            .contains('Submit')
            .click({ force: true });
        cy.get('div.pt-4 > .btn').click();
        cy.wait(5000)
        cy.get('.flex-grow-1 > div').contains("RC number is already used");

        cy.wait(7000)
        // cy.get('.title').contains("Registration Successful");
        // cy.get(':nth-child(1) > .description').contains("We’ve sent a verification link to your email address.")
        // cy.get('.btn').contains("Proceed to Login");

    })

  it("should create a Corporate account",()=>{
    cy.visit(`${baseUrl}/auth/login`);
    cy.get('.auth-card > :nth-child(1) > .text-center > a').click();
    cy.get(':nth-child(2) > .account-type-picker').contains("Corporate Account").click();
    cy.get('.btn').contains("Continue").click();
    cy.get(':nth-child(1) > .form-group > .form-control').clear().type("JoyTest");
    cy.get(':nth-child(2) > .form-group > .form-control').clear().type("Doe");
    cy.get(':nth-child(3) > .form-group > .form-control').clear().type("peaceoasis9023+28@gmail.com");
    cy.get(':nth-child(4) > .form-group > .form-control').clear().type("08033223322");
    cy.get('.input-group > .form-control').clear().type("Gsure9023@2026");
    cy.get('.btn').contains("Next: Company Info").click();
    cy.wait(2000);
      cy.get(':nth-child(1) > .form-control').type('732367');
    // cy.get(':nth-child(1) > .form-control').clear().type("807743");
    cy.wait(2000);


    // 2. Upload to the 5th child (likely Certificate)
      cy.get('div:nth-child(4) lgs-file-uploader')
          .find('input[type="file"]')
          .selectFile('cypress/fixtures/certificate.pdf', { force: true });

// 2. Upload to the 5th child (likely Status Report)
      cy.get('div:nth-child(5) lgs-file-uploader')
          .find('input[type="file"]')
          .selectFile('cypress/fixtures/status-report.pdf', { force: true });

      // Using the specific parent structure to ensure we hit the right button
      cy.get('lgs-corporate-workspace-creation .pt-4 > button')
          .contains('Submit')
          .click({ force: true });
      cy.get('div.pt-4 > .btn').click();


      cy.wait(20000)
      cy.get('.title').contains("Registration Successful");
      cy.get(':nth-child(1) > .description').contains("We’ve sent a verification link to your email address.")
      cy.get('.btn').contains("Proceed to Login");
  
  })

});
