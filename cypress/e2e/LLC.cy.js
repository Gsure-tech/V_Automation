import { HEADERS } from "../support/constants";

// NAME RESERVATION, COMPANY REGISTRATION & SHARE REGISTRATION TESTS
describe("LLC Registration API Flow", () => {

  let reservationCode;    // For step 1 → step 2
  let transactionRef;     // For step 2 → step 3


  // 1. SUCCESSFUL NAME RESERVATION
  it("should return 200 and reservation details when a unique proposedName is submitted", () => {

    const proposedName = `Model${Date.now()} Academy Enterprise`;

    cy.request({
      method: "POST",
      url: "http://41.207.248.246:9088/api/vas/llc/name-reservation",
      headers: HEADERS.VALID_API_KEY,
      body: {
        proposedName,
        companyTypes: "PRIVATE_COMPANY_LIMITED_BY_SHARES"
      }
    }).then((response) => {

      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq("OK");
      expect(response.body.message).to.eq("Name reserved");

      reservationCode = response.body.data.reservationCode;
      expect(reservationCode).to.not.be.empty;

      expect(response.body.data.nextStepUrl).to.not.be.empty;

      cy.wait(1500);
    });
  });



  // 2. COMPANY REGISTRATION USING reservationCode
  it("should use the reservationCode from the name reservation to create a company", function () {

    transactionRef = `VAS${Date.now()}`;   // unique ID for this test run

    cy.request({
      method: "POST",
      url: "http://41.207.248.246:9088/api/vas/llc/company",
      headers: HEADERS.VALID_API_KEY,
      body: {
        transactionRef,
        reservationCode,
        companyType: "PRIVATE_COMPANY_LIMITED_BY_SHARES",
        natureOfBusinessCategory: "Manufacturing",
        natureOfBusiness: "Food and Beverage Processing",
        principalActivityDescription: "Production of packaged fruit juices and bottled water",
        companyEmail: "peaceoasis9023@gmailcom",
        phoneNumber: "07033223322",
        companyAddress: {
          registeredAddress: {
            state: "Lagos",
            lga: "Ikeja",
            city: "Ikeja",
            street: "15A Adeola Odeku Street"
          },
          headOffice: {
            state: "Lagos",
            lga: "Eti-Osa",
            city: "Victoria Island",
            street: "45B Ahmadu Bello Way"
          }
        },
        objectsOfMem: [
          "Organize and manage public prize draws",
          "Provide betting services for sports events",
          "Administer state-regulated chance games",
          "Offer wagering on athletic competitions",
          "Facilitate community fundraising through raffles"
        ]
      }
    }).then((resp) => {

      expect(resp.status).to.eq(200);
      expect(resp.body.status).to.eq("OK");
      expect(resp.body.message).to.eq("Company created");

      expect(resp.body.data.transactionRef).to.eq(transactionRef);
      expect(resp.body.data.nextStepUrl).to.not.be.empty;

      cy.wait(1500);
    });
  });


   // 2b. COMPANY REGISTRATION UPDATE USING reservationCode
  it("should use the reservationCode from the name reservation to create a company", function () {

    transactionRef = `VAS${Date.now()}`;   // unique ID for this test run

    cy.request({
      method: "PUT",
      url: "http://41.207.248.246:9088/api/vas/llc/company",
      headers: HEADERS.VALID_API_KEY,
      body: {
        transactionRef,
        reservationCode,
        companyType: "PRIVATE_COMPANY_LIMITED_BY_SHARES",
        natureOfBusinessCategory: "Manufacturing",
        natureOfBusiness: "Food and Beverage Processing",
        principalActivityDescription: "Production of packaged fruit juices and bottled water",
        companyEmail: "joyoasis9023@gmailcom",
        phoneNumber: "07033223322",
        companyAddress: {
          registeredAddress: {
            state: "Lagos",
            lga: "Ikeja",
            city: "Ikeja",
            street: "15A Adeola Odeku Street"
          },
          headOffice: {
            state: "Lagos",
            lga: "Eti-Osa",
            city: "Victoria Island",
            street: "45B Ahmadu Bello Way"
          }
        },
        objectsOfMem: [
          "Organize and manage public prize draws",
          "Provide betting services for sports events",
          "Administer state-regulated chance games",
          "Offer wagering on athletic competitions",
          "Facilitate community fundraising through raffles"
        ]
      }
    }).then((resp) => {

      expect(resp.status).to.eq(200);
      expect(resp.body.status).to.eq("OK");
      expect(resp.body.message).to.eq("Company  updated");
      expect(resp.body.data).to.eq("Company Data updated")
      cy.wait(1500);
    });
  });



// 3. REGISTER SHARES USING SAME transactionRef
it("should register share details using the same transactionRef", () => {

  cy.request({
    method: "POST",
    url: "http://41.207.248.246:9088/api/vas/llc/shares",
    headers: HEADERS.VALID_API_KEY,
    body: {
      transactionRef,
      ordinaryIssuedShare: 2500000.00,
      pricePerShare: 10.50,
      preferenceIssuedShare: 500000.00
    }
  }).then((response) => {

    expect(response.status).to.eq(200);
    expect(response.body.status).to.eq("OK");
    expect(response.body.message).to.eq("Share details created");

    const data = response.body.data;

    // Transaction Ref Check
    expect(data.transactionRef).to.eq(transactionRef);

    expect(data.shareCapital).to.be.a("number");
    expect(data.shareCapital).to.be.greaterThan(0);
    expect(data.shareDetails.ordinaryShare.issuedShare).to.be.a("number");
    expect(data.shareDetails.ordinaryShare.issuedShare).to.be.greaterThan(0);
    expect(data.shareDetails.preferenceShare.issuedShare).to.be.a("number");
    expect(data.shareDetails.preferenceShare.issuedShare).to.be.greaterThan(0);
    expect(data.nextStepUrl).to.be.a("string");
    expect(data.nextStepUrl).to.not.be.empty;
  });
});



  // 4. NEGATIVE TEST: NAME ALREADY EXISTS
  it("should return 400 when the proposed name already exists", () => {

    cy.request({
      method: "POST",
      url: "http://41.207.248.246:9088/api/vas/llc/name-reservation",
      headers: HEADERS.VALID_API_KEY,
      failOnStatusCode: false,
      body: {
        proposedName: "Zarah Academy Enterprise",
        companyTypes: "PRIVATE_COMPANY_LIMITED_BY_SHARES"
      }
    }).then((response) => {

      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.message).to.eq("Name already exist");
    });
  });

});
