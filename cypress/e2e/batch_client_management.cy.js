describe("LGS Batct Client Registration Flow", () => {
  const baseUrl = "http://lgs.oasisproducts.ng";

//   it("create registration campaign successfully (Bulk Payment)", () => {
//     cy.log("Opening application form for new registration");
//     cy.visit(`${baseUrl}/client`);
//     cy.get("#clientEmail").clear().type("abubakarabdul9023+1@gmail.com");
//     cy.get("#clientLogin").clear().type("Gsure9023@2025");
//     cy.get(".button-submit")
//       .should("contain.text", "Submit")
//       .should("be.visible")
//       .click();
//     cy.url().should("include", "/client/management");
//     cy.get('[style="display: flex; gap: 12px; flex-wrap: wrap;"] > .actionBtn')
//       .should("contain.text", "Create Registration Campaign")
//       .should("be.visible")
//       .click();
//     cy.get('#registrations').clear().type(2);
//     cy.get('.createBatch > .creation-container').click();
//     cy.wait(2000)
//     cy.get('[style="border: none; background: #219653;"]')
//       .should("contain.text", "Bulk Payment")
//       .should("be.visible")
//       .click();
//       cy.wait(80000);
//       cy.get('.title').should("contain.text","create new campaign")

//       cy.log("Downloading Bulk Template sample");
//       cy.get('[style="background-color: #229653;"]').click();
//       cy.get('[style="background-color: #092933; border: 0.2px solid #229653;"]')
//       .should("contain.text","Browse File")
//       .should("be.visible")
//       .click()
//       cy,wait(60000);
        // cy.get('.fa').click();
        //     cy.get('.logout')
        //     .should("contain.text","Logout")
        //     .should("be.visible")
        //     .click(); 
//   });


//   it("create registration campaign successfully (Pay Per Registration)", () => {
//     cy.log("Opening application form for new registration");
//     cy.visit(`${baseUrl}/client`);
//     cy.get("#clientEmail").clear().type("abubakarabdul9023+1@gmail.com");
//     cy.get("#clientLogin").clear().type("Gsure9023@2025");
//     cy.get(".button-submit")
//       .should("contain.text", "Submit")
//       .should("be.visible")
//       .click();
//     cy.url().should("include", "/client/management");
//     cy.get('[style="display: flex; gap: 12px; flex-wrap: wrap;"] > .actionBtn')
//       .should("contain.text", "Create Registration Campaign")
//       .should("be.visible")
//       .click();
//     cy.get('#registrations').clear().type(2);
//     cy.get('.createBatch > .creation-container').click();
//     cy.wait(2000)
//     cy.get('[style="border: 0.5px solid #FFFFFF; background: #023037;"]')
//     .should("contain.text","Pay Per Registration")
//     .should("be.visible")
//     .click();

//     cy.log("Setting up markup price")
//     cy.get('form.ng-untouched > .markup-input').clear().type("500");
//     cy.get('[style="margin-top: 30px; gap: 10px; width: 100%; display: flex;"] > :nth-child(1)')
//     .should("contain.text","Save & Continue")
//     .should("be.visible")
//     .click();
//     cy.get('[style="background-color: #092933; border: 0.2px solid #229653;"]').click();
//     cy.wait(60000)
        // cy.get('.fa').click();
        // cy.get('.logout')
        // .should("contain.text","Logout")
        // .should("be.visible")
        // .click(); 
    
//   });


//   it("create registration campaign successfully (Pay Per Registration) without setting markup price", () => {
//     cy.log("Opening application form for new registration");
//     cy.visit(`${baseUrl}/client`);
//     cy.get("#clientEmail").clear().type("abubakarabdul9023+1@gmail.com");
//     cy.get("#clientLogin").clear().type("Gsure9023@2025");
//     cy.get(".button-submit")
//       .should("contain.text", "Submit")
//       .should("be.visible")
//       .click();
//     cy.url().should("include", "/client/management");
//     cy.get('[style="display: flex; gap: 12px; flex-wrap: wrap;"] > .actionBtn')
//       .should("contain.text", "Create Registration Campaign")
//       .should("be.visible")
//       .click();
//     cy.get('#registrations').clear().type(2);
//     cy.get('.createBatch > .creation-container').click();
//     cy.wait(2000)
//     cy.get('[style="border: 0.5px solid #FFFFFF; background: #023037;"]')
//     .should("contain.text","Pay Per Registration")
//     .should("be.visible")
//     .click();

//     cy.log("Clicking the Skip & Continue button")
//     cy.get('[style="background: #023037; border: 0.5px solid #FFFFFF;"]')
//     .should("contain.text","Skip & Continue")
//     .should("be.visible")
//     .click();
//     cy.wait(2000)
//     cy.get('.fa').click();
//     cy.get('.logout')
//     .should("contain.text","Logout")
//     .should("be.visible")
//     .click();  
//     cy.url().should("include", "/client");
    
//   });


//    it("should display error when the number of registration is greater than the slot allocated", () => {
//     cy.log("Opening application form for new registration");
//     cy.visit(`${baseUrl}/client`);
//     cy.get("#clientEmail").clear().type("abubakarabdul9023+1@gmail.com");
//     cy.get("#clientLogin").clear().type("Gsure9023@2025");
//     cy.get(".button-submit")
//       .should("contain.text", "Submit")
//       .should("be.visible")
//       .click();
//     cy.url().should("include", "/client/management");
//     cy.get('[style="display: flex; gap: 12px; flex-wrap: wrap;"] > .actionBtn')
//       .should("contain.text", "Create Registration Campaign")
//       .should("be.visible")
//       .click();
//     cy.get('#registrations').clear().type(40);
//     cy.get('.createBatch > .creation-container').click();
//    cy.get('.text-danger').should("contains.text","Please reduce the number of registrations.")
//   });

// it("Add Individual customer by searching, using campaingn_id and the action button", () => {
//     cy.log("Opening application form for new registration");
//     cy.visit(`${baseUrl}/client`);
//     cy.get("#clientEmail").clear().type("abubakarabdul9023+1@gmail.com");
//     cy.get("#clientLogin").clear().type("Gsure9023@2025");
//     cy.get(".button-submit")
//       .should("contain.text", "Submit")
//       .should("be.visible")
//       .click();
//     cy.url().should("include", "/client/management");
//     cy.get('.search-input').clear().type("251224142540592");
//     cy.get('.search-btn')
//           .should("contain.text", "Search")
//       .should("be.visible")
//       .click();
//       cy.get('.d-inline-block > .actionBtn')
//         .should("contain.text", "Action")
//       .should("be.visible")
//       .click();
//       cy.get('.dropdown-menu > :nth-child(1)').click();
//       cy.get('#customerFirstName').clear().type("Hassana");
//       cy.get('#customerLastName').clear().type("Giggs");
//       cy.get('#customerEmail').clear().type("joyoasis9023@gmail.com");
//       cy.get('.button-submit > .ng-star-inserted')
//       .should("contain.text", "Save & Continue")
//       .should("be.visible")
//       .click();
    
//   });

 

    it("should search customer uploaded using the customer's transactionRef", () => {
    cy.log("Opening application form for new registration");
    cy.visit(`${baseUrl}/client`);
    cy.get("#clientEmail").clear().type("abubakarabdul9023+1@gmail.com");
    cy.get("#clientLogin").clear().type("Gsure9023@2025");
    cy.get(".button-submit")
      .should("contain.text", "Submit")
      .should("be.visible")
      .click();
    cy.url().should("include", "/client/management");
    cy.get(':nth-child(1) > :nth-child(6) > .d-inline-block > .actionBtn')
        .should("contain.text", "Action")
      .should("be.visible")
      .click();
  
      cy.get(':nth-child(1) > :nth-child(6) > .d-inline-block > .dropdown-menu > .dropdown-li').click();
      cy.get(':nth-child(2) > div > aside > .search-input').clear().type("INV20251210154808-846");
      cy.get(':nth-child(2) > div > aside > .search-btn').click();
  });
});
