describe("Generate API Key", () => {
    const baseUrl = "https://developer.lgs.oasisproducts.ng/";

    it("should login and generate API Key", () => {
        // 1. Generate a unique suffix using the current timestamp
        const uniqueId = Date.now();
        const keyName = `Staging Test Key ${uniqueId}`;

        cy.viewport(1440, 900);
        cy.intercept('GET', 'https://api.iconify.design/**', { body: {} });
        cy.intercept('GET', 'https://api.unisvg.com/**', { body: {} });

        cy.visit(baseUrl);

        cy.get('button.get-started').click({ force: true });

        cy.origin('https://lgs.oasisproducts.ng', () => {
            cy.get('input[type="email"]', { timeout: 20000 }).should('be.visible');
            cy.get('input[type="email"]').type("joyoasis9023@gmail.com");
            cy.get('input[type="password"]').type("Gsure9023@2025");
            cy.get('button').contains(/Sign\s*In/i).click({ force: true });
        });

        // Use stable text selectors where possible for the sidebar
        cy.contains('a', 'API Keys').click({ force: true });

        // Click the "Create" button
        cy.get("button[class='buttons']").click({ force: true });

        // Type the unique key name
        cy.get("input[placeholder='e.g. Production Key']")
            .clear()
            .type(keyName);

        // Submit the form
        cy.get("div[class='center'] button").click({ force: true });

        // Verify success message
        cy.get("[data-pc-section='messagetext']", { timeout: 10000 })
            .should("contain", "API key created successfully");
    });
});