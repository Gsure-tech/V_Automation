describe("Buy Token", () => {
    const baseUrl = "https://developer.lgs.oasisproducts.ng/";

    it("should login and buy token", () => {
        cy.viewport(1440, 900);

        cy.intercept('GET', 'https://api.iconify.design/**', { body: {} });
        cy.intercept('GET', 'https://api.unisvg.com/**', { body: {} });

        cy.visit(baseUrl);


        cy.get('button.get-started').click({ force: true });


        cy.origin('https://lgs.oasisproducts.ng', () => {
            cy.get('input[type="email"]', { timeout: 20000 }).should('be.visible');

            // Now you can finish the login
            cy.get('input[type="email"]').type("joyoasis9023@gmail.com");
            cy.get('input[type="password"]').type("Gsure9023@2025");
            cy.get('button').contains(/Sign\s*In/i).click({ force: true });

            // cy.get("a[routerlink='/dev/payments'] p").click();
            // cy.get('.bottom-half > ul > :nth-child(3) > a').click({ force: true });

        });
        cy.get('.bottom-half > ul > :nth-child(3) > a').click({ force: true });

        cy.get("html > body > app-root > intranet-html-template > main > body > article > app-token-and-payments > aside:nth-of-type(1) > button > p").click({ force: true });
        cy.get('ul > :nth-child(1) > .regular-text').click({ force: true });
        cy.get("input[min='1']").clear().type("200");

        cy.get("div[class='center'] button").click({ force: true });
        cy.get("div[data-pc-section='messagecontent']").contains("Tokens purchased successfully");

    });
});