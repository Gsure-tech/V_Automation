describe("LGS Individual Account Creation Flow", () => {
  const baseUrl = "https://registry.lgs.oasisproducts.ng";

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
const uniqueEmail = `joyoasis9023+${timestamp}@gmail.com`;
  

  it("should register a Business name using store front link",()=>{
    cy.visit(`${baseUrl}/storefront/cafe24/`);
      cy.get('[style="background-color: rgb(28, 217, 255);"] > p').click();
      cy.get('#BusinessName').type(uniqueBusinessName);
      cy.get('#lineOfBusiness').select("Content creation");
      cy.get('.submitBtn').contains("Check compliance").click();
      cy.wait(7000);
      cy.get('#companyStreetNumber').type("21");
      cy.get('#companyStateOfResidence').select("Lagos State");
      cy.get('#companyAddress').type("No.12 College road");
      cy.get('#companyCity').type("Mafoluku");
      cy.get('#companyEmail').type("joyoasis9023@gmail.com")
      cy.get('.submitBtn').contains("Continue").click();
      cy.get('#NIN').type("70123456789");
      cy.get('.submitBtn').click();
      // cy.contains("Enter Manually").click({force:true});
      // cy.get('[style="background-color: transparent; border: 1px solid var(--lgs-4-color, #006481); backdrop-filter: blur(30px); margin-top: 10px; color: rgb(0, 100, 129);"]').click();
      //
      // cy.get('#proprietorFirstName').type("Joyce");
      // cy.get('#proprietorLastName').type("Mooner");
      // cy.get('#proprietorOtherName').type("Joe");
      // cy.get('#proprietorPhoneNumber').type("07033223322");
      cy.get('#proprietorEmail').type("joyoasis9023@gmail.com");
      // cy.get('#proprietorGender').select("Female");
      cy.get('#proprietorStreetNumber').type("21");
      cy.get('#proprietorState').select("Lagos State");
      cy.get('#proprietorCity').type("Ladipo");
      cy.get('#proprietorLga').select("Ikeja");
      // cy.get('#proprietorDob').type('2000-04-02');
      cy.get('#proprietorServiceAddress').type("No 11, college road");
      cy.get('.nextBtn').click();
      //
      cy.get('[label="Proprietor Signature"] > .fileUpload-choose')
          .find('input[type="file"]')
          .selectFile('cypress/fixtures/gamma1.png', { force: true });

      cy.get('[label="Proprietor ID"] > .fileUpload-choose')
          .find('input[type="file"]')
          .selectFile('cypress/fixtures/gamma1.png', { force: true });

      cy.get('[label="Proprietor Photograph"] > .fileUpload-choose')
          .find('input[type="file"]')
          .selectFile('cypress/fixtures/gamma1.png', { force: true });

      cy.get('[label="Supporting Document"] > .fileUpload-choose')
          .find('input[type="file"]')
          .selectFile('cypress/fixtures/gamma1.png', { force: true });
      cy.get('.submitBtn').contains("Continue to Payment").click();
      cy.get('.inputField').type("joyoasis9023@gmail.com");
      cy.get('.status-button').click();

  })

});
