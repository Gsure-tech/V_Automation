describe("Bulk Service Approval", () => {
  beforeEach(() => {
    cy.visit("http://bulk.oasisproducts.ng");
    cy.wait(1000);
    cy.get(".login-section").trigger("mouseover");

    cy.get(":nth-child(4) > .login-input", { timeout: 10000 }).should(
      "be.visible"
    );
    cy.get('[style="margin-bottom: 0;"] > .login-input').should("be.visible");
  });

  it("Shows error when both username and password are wrong", () => {
    cy.get(":nth-child(4) > .login-input").clear().type("wrong_username");
    cy.get('[style="margin-bottom: 0;"] > .login-input')
      .clear()
      .type("wrong_pass");

    cy.get(".signIn-btn").click();

    cy.get(".error").should("contain.text", "Error");
    cy.get(".infoParagraph").should(
      "contain.text",
      "unauthorized - Bad credentials"
    );
  });

  it("Shows error when username is wrong and password is correct", () => {
    cy.get(":nth-child(4) > .login-input").clear().type("wrong_username");
    cy.get('[style="margin-bottom: 0;"] > .login-input')
      .clear()
      .type("passwor1");

    cy.get(".signIn-btn").click();

    cy.get(".error").should("contain.text", "Error");
    cy.get(".infoParagraph").should(
      "contain.text",
      "unauthorized - Bad credentials"
    );
  });

  it("Shows error when username is correct and password is wrong", () => {
    cy.get(":nth-child(4) > .login-input").clear().type("vas_admin");
    cy.get('[style="margin-bottom: 0;"] > .login-input')
      .clear()
      .type("wrong_pass");

    cy.get(".signIn-btn").click();

    cy.get(".error").should("contain.text", "Error");
    cy.get(".infoParagraph").should(
      "contain.text",
      "unauthorized - Bad credentials"
    );
  });

  it("Logs in successfully with correct credentials", () => {
    cy.get(":nth-child(4) > .login-input").clear().type("vas_admin");
    cy.get('[style="margin-bottom: 0;"] > .login-input')
      .clear()
      .type("password");

    cy.get(".signIn-btn").click();

    cy.url({ timeout: 15000 }).should("include", "/Registration");
    cy.contains("BUSINESS REGISTRATION").should("be.visible");
  });
});
