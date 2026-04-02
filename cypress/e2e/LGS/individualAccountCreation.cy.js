describe("LGS Individual Account Creation Flow", () => {
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
const uniqueEmail = `joyoasis9023+${timestamp}@gmail.com`;
  

  it("should create an individual account",()=>{
    cy.visit(`${baseUrl}/auth/login`);
    cy.get('.auth-card > :nth-child(1) > .text-center > a').click();
    cy.get(':nth-child(1) > .account-type-picker').contains("Individual Account").click();
    cy.get('.btn').contains("Continue").click();
    cy.get(':nth-child(1) > .form-group > .form-control').clear().type("JoyTest");
    cy.get(':nth-child(2) > .form-group > .form-control').clear().type("Doe");
    cy.get(':nth-child(3) > .form-group > .form-control').clear().type(uniqueEmail);
    cy.get(':nth-child(4) > .form-group > .form-control').clear().type("08033223322");
    cy.get('.input-group > .form-control').clear().type("Gsure9023@2026");
    cy.get('.btn').contains("Submit").click();
    cy.wait(7000)
    cy.get('.title').contains("Registration Successful");
    cy.get(':nth-child(1) > .description').contains("We’ve sent a verification link to your email address.")
    cy.get('.btn').contains("Proceed to Login");
  
  })

});
