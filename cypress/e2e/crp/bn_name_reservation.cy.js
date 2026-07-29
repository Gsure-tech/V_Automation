describe("CAC Portal Landing Page Flow", () => {
    const baseUrl = "https://www.cac.oasisproducts.ng";

    beforeEach(() => {
        cy.viewport(1440, 900);
    });

    it("should successfully load the CAC landing page and verify major elements", () => {
        // 1. Visit the new CAC sub-domain portal
        cy.visit(baseUrl);
        // cy.get('ngb-modal-window.fade').click();
        cy.get('.ng-untouched').click();
        cy.get('a[href="/auth/login"]').click();
        cy.get('input[type="text"]').click();
        cy.get('input.ng-dirty').type('okeke2');
        cy.get('input.ng-invalid').type("Pass34566AGG@0");
        cy.get('button.btn').click();
        cy.wait(50000)
        cy.get('a.text-uppercase').click();
        cy.get('select[formcontrolname="businessClassification"]').select('2');
        cy.get('select.form-control.ng-invalid').select('6993');
        cy.get('button.btn-primary').click();
        cy.get('input.ng-invalid').click();
        cy.get('input.ng-dirty').type('epTest Limited');
        cy.get('form.ng-invalid div:nth-child(2) label.form-label').click();
        cy.get('select[formcontrolname="natureOfBusinessCategory"]').select('2');
        cy.get('select.form-control.ng-invalid').select('199119');
        cy.get('button.btn-success').click();
        cy.get('div.footer-btn').click();
        cy.get('button.btn-success').click();
        cy.get('svg[data-icon="iconoir:copy"]').click();
        cy.get('button.remita-btn').click();
    });
});