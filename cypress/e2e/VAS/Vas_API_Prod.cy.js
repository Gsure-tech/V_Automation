import { base64Images } from "../../fixtures/base64Images";
import { HEADERS } from "../../support/constants";

const baseUrl = "https://vasapp.cac.gov.ng";

describe("Test API for Cypress Config",()=>{
    it("should get all bookings",()=>{
        cy.api('GET','https://restful-booker.herokuapp.com/booking').should((response)=>{
            expect(response.status).to.eq(200);
        })

    })
});


describe("API Validation for VAS Validation Endpoints", () => {
  it("should return 400 BAD_REQUEST when VRC has already been validated", () => {
    cy.api({
      method: "POST",
        url: `${baseUrl}/api/vas/validation/secure/company`,
      headers: HEADERS.LLC_PROD_API_KEY,
      body: {
        vrc: "77RHqau4e5",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.message).to.eq("invalid request sent");
      expect(response.body.error).to.eq("VRC has already been validated");
      expect(response.body.success).to.be.false;
    });
  });

  // GET COMPANY USING TIN API
  it("should return 200 when valid TIN and entity type is passed for Get Company Using TIN API", () => {
    cy.log(" Get Company Using TIN");
    const requestBody = {
      tin: "2521933528450"
    };

    cy.api({
      method: "POST",
      url: `${baseUrl}/api/vas/validation/tin/company`,
      headers: HEADERS.LLC_PROD_API_KEY,
      body: requestBody,
      failOnStatusCode: false, // Allow the test to continue even if status code isn't 200
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq("OK");

      // Check that the 'entity_name' exists in the response data
      expect(response.body.data).to.have.property("entity_name");
      expect(response.body.data.entity_name).to.not.be.empty;
      cy.log(response.body);
    });
  });

  it("should return 401 Unauthorized for invalid API key", () => {
    const requestBody = {
      tin: "2521933528450",
    };
    cy.request({
      method: "POST",
      url: `${baseUrl}/api/vas/validation/tin/company`,
      headers: HEADERS.INVALID_API_KEY,
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.error).to.eq("Unauthorized");
      cy.log(response.body);
    });
  });

  it("should return 400 Bad Request for incorrect TIN", () => {
    const incorrectTin = "78774829-000";
    const requestBody = {
      tin: incorrectTin};

    cy.request({
      method: "POST",
      url: `${baseUrl}/api/vas/validation/tin/company`,
      headers: HEADERS.LLC_PROD_API_KEY,
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      // expect(response.body.error).to.eq('invalid rc_number passed');
      // expect(response.body.errors).to.include('invalid rc_number passed');
      cy.log(response.body);
    });
  });

  // GENERATE TIN API (OBSOLETE)
  it("should return 200 when valid rc_number and entity_type are passed for GENERATE TIN API", () => {
    // Valid RC Number and Entity Type
    cy.request({
      method: "POST",
      url: "https://vasapp.oasisproducts.ng/api/vas/validation/tin/generate",
      headers: HEADERS.LLC_PROD_API_KEY,
      body: {
        rc_number: "7068861",
        entity_type: "24 HOUSE OF GRAPHICS AND CAFE",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq("OK");
      expect(response.body.message).to.eq("tin generated successfully");
      expect(response.body.success).to.eq(true);
    });
  });

  it("should return 400 when an invalid entity_type is passed", () => {
    // Invalid Entity Type
    cy.request({
      method: "POST",
      url: `${baseUrl}/api/vas/validation/tin/generate`,
      headers: HEADERS.LLC_PROD_API_KEY,
      body: {
        rc_number: "7068861",
        entity_type: "24 HOUSE OF GRAPHICS AND CAFE",
      },
      failOnStatusCode: false,
    }).then((response) => {
      // Assert the status code and error message
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
    });
  });

  it("should return 400 when an invalid rc_number is passed", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}/api/vas/validation/tin/generate`,
      headers: HEADERS.LLC_PROD_API_KEY,
      body: {
        rc_number: "INVALID_RC_NUMBER",
        entity_type: "BUSINESS_NAME",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.message).to.eq("invalid request sent");
      expect(response.body.error).to.eq("invalid rc_number passed");
    });
  });

  it("should return 401 Unauthorized for invalid API key", () => {
    const requestBody = {
      rc_number: "7068861"
    };
    cy.request({
      method: "POST",
      url: `${baseUrl}/api/vas/validation/tin/generate`,
      headers: HEADERS.INVALID_API_KEY,
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.error).to.eq("Unauthorized");
      cy.log(response.body);
    });
  });

  //GET COMPANY BY NAME API

  it("should return 200 and valid company data when valid rc_number and entity_name are passed for GET COMPANY BY NAME API", () => {
    cy.api({
      method: "POST",
      url: `${baseUrl}/api/vas/validation/company/name`,
      headers: HEADERS.LLC_PROD_API_KEY,
      body: {
        rc_number: "7068861",
        entity_name: "24 HOUSE OF GRAPHICS AND CAFE",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq("OK");
      expect(response.body.message).to.eq("company data");

      expect(response.body.data.entity_name).to.not.be.empty;
      expect(response.body.data.rc_number).to.not.be.empty;
      expect(response.body.data.entity_name).to.not.be.empty;
      expect(response.body.data.entity_type).to.not.be.empty;
      expect(response.body.data.address).to.not.be.empty;
      expect(response.body.data.registration_date).to.not.be.empty;
      expect(response.body.data.entity_status).to.not.be.empty;
      // expect(response.body.data.line_of_business).to.not.be.empty;
    });
  });

  it("should return 400 when an invalid rc_number is passed", () => {
    cy.api({
      method: "POST",
      url: `${baseUrl}/api/vas/validation/company/name`,
      headers: HEADERS.LLC_PROD_API_KEY,
      body: {
        rc_number: "INVALID_RC_NUMBER",
        entity_name: "24 HOUSE OF GRAPHICS AND CAFE",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.message).to.eq("invalid data");
      expect(response.body.error).to.eq("invalid rc_number passed");
    });
  });

  it("should return 401 Unauthorized for invalid API key", () => {
    const requestBody = {
      rc_number: "7068861",
      entity_name: "24 HOUSE OF GRAPHICS AND CAFE",
    };
    cy.api({
      method: "POST",
      url: `${baseUrl}/api/vas/validation/company/name`,
      headers: HEADERS.INVALID_API_KEY,
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.error).to.eq("Unauthorized");
      cy.log(response.body);
    });
  });
  //
  // //GET COMPANY BY RC NUMBER API
  it("should return 200 and valid company data when valid rc_number is passed for GET COMPANY BY RC NUMBER API", () => {
    cy.api({
      method: "POST",
      url: `${baseUrl}/api/vas/validation/company/rc`,
      headers: HEADERS.LLC_PROD_API_KEY,
      body: {
        rc_number: "635930",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq("OK");
      expect(response.body.message).to.eq("company data");

      expect(response.body.data.entity_name).to.not.be.empty;
      expect(response.body.data.rc_number).to.not.be.empty;
      expect(response.body.data.entity_name).to.not.be.empty;
      expect(response.body.data.entity_type).to.not.be.empty;
      expect(response.body.data.address).to.not.be.empty;
      expect(response.body.data.registration_date).to.not.be.empty;
      expect(response.body.data.entity_status).to.not.be.empty;
      expect(response.body.data.line_of_business).to.not.be.empty;
    });
  });
  //
  it("should return 400 when an invalid rc_number is passed", () => {
    cy.api({
      method: "POST",
      url: `${baseUrl}/api/vas/validation/company/rc`,
      headers: HEADERS.LLC_PROD_API_KEY,
      body: {
        rc_number: "INVALID_RC_NUMBER",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.message).to.eq("invalid data");
      expect(response.body.error).to.eq("invalid rc_number passed");
    });
  });

  it("should return 401 Unauthorized for invalid API key", () => {
    const requestBody = {
      rc_number: "7068861",
    };
    cy.api({
      method: "POST",
      url: `${baseUrl}/api/vas/validation/company/rc`,
      headers: HEADERS.INVALID_API_KEY,
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.error).to.eq("Unauthorized");
      cy.log(response.body);
    });
  });

  // GET COMPANY LINE OF BUSINESS API
  it("should return 200 and company line of business when valid rc_number and entity type is passed for GET COMPANY LINE OF BUSINESS API", () => {
    cy.api({
      method: "POST",
      url: `${baseUrl}/api/vas/validation/line-of-business`,
      headers: HEADERS.LLC_PROD_API_KEY,
      body: {
        rc_number: "635930",
        entity_type: "COMPANY",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq("OK");
      expect(response.body.message).to.eq("company data");
      expect(response.body.data).to.not.be.empty;
      expect(response.body.data.lineOfBusiness).to.be.an('array').and.not.be.empty;
    });
  });


  it("should return 400 when an invalid entity_type is passed", () => {
    // Invalid Entity Type
    cy.api({
      method: "POST",
      url: `${baseUrl}/api/vas/validation/line-of-business`,
      headers: HEADERS.LLC_PROD_API_KEY,
      body: {
        rc_number: "635930",
        entity_type: "INVALID_ENTITY_TYPE",
      },
      failOnStatusCode: false,
    }).then((response) => {
      // Assert the status code and error message
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
    });
  });

  it("should return 400 when an invalid rc_number is passed", () => {
    cy.api({
      method: "POST",
      url: `${baseUrl}/api/vas/validation/line-of-business`,
      headers: HEADERS.LLC_PROD_API_KEY,
      body: {
        rc_number: "INVALID_RC_NUMBER",
        entity_type: "BUSINESS_NAME",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.message).to.eq("invalid data");
    });
  });

  it("should return 401 Unauthorized for invalid API key", () => {
    const requestBody = {
      rc_number: "7068861",
      entity_type: "BUSINESS_NAME",
    };
    cy.api({
      method: "POST",
      url: `${baseUrl}/api/vas/validation/company/rc`,
      headers: HEADERS.INVALID_API_KEY,
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.error).to.eq("Unauthorized");
      cy.log(response.body);
    });
  });



  // GET COMPANY TIN API
  it("should return 200 and valid company data when valid rc_number and entity_type is passed for GET COMPANY TIN API", () => {
    cy.api({
      method: "POST",
      url: `${baseUrl}/api/vas/validation/tin`,
      headers: HEADERS.LLC_PROD_API_KEY,
      body: {
        rc_number: "7068861",
        entity_type: "BUSINESS_NAME",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq("OK");
      expect(response.body.message).to.eq("company data");
      expect(response.body.data.rc_number).to.not.be.empty;
      expect(response.body.data.entity_name).to.not.be.empty;
      expect(response.body.data.entity_type).to.not.be.empty;
      expect(response.body.data.address).to.not.be.empty;
      expect(response.body.data.registration_date).to.not.be.empty;
      expect(response.body.data.entity_status).to.not.be.empty;
      expect(response.body.data.tin).to.not.be.empty;
    });
  });

  it("should return 400 when an invalid entity_type is passed", () => {
    // Invalid Entity Type
    cy.request({
      method: "POST",
      url: `${baseUrl}/api/vas/validation/tin`,
      headers: HEADERS.LLC_PROD_API_KEY,
      body: {
        rc_number: "7068861",
        entity_type: "INVALID_ENTITY_TYPE",
      },
      failOnStatusCode: false,
    }).then((response) => {
      // Assert the status code and error message
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
    });
  });

  it("should return 400 when an invalid rc_number is passed", () => {
    cy.api({
      method: "POST",
      url: `${baseUrl}/api/vas/validation/tin`,
      headers: HEADERS.LLC_PROD_API_KEY,
      body: {
        rc_number: "INVALID_RC_NUMBER",
        entity_type: "BUSINESS_NAME",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.message).to.eq("invalid data");
      expect(response.body.error).to.eq("invalid rc_number passed");
    });
  });

  it("should return 401 Unauthorized for invalid API key", () => {
    const requestBody = {
      rc_number: "7068861",
      entity_type: "BUSINESS_NAME",
    };
    cy.api({
      method: "POST",
      url: `${baseUrl}/api/vas/validation/tin`,
      headers: HEADERS.INVALID_API_KEY,
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.error).to.eq("Unauthorized");
      cy.log(response.body);
    });
  });

  // GET COMPANY API
  it("should return 200 and valid company data when valid rc_number and entity_type is passed for GET COMPANY API", () => {
    cy.api({
      method: "POST",
      url: `${baseUrl}/api/vas/validation/company`,
      headers: HEADERS.LLC_PROD_API_KEY,
      body: {
        rc_number: "635930",
        entity_type: "COMPANY",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq("OK");
      expect(response.body.message).to.eq("company data");
      expect(response.body.data.rc_number).to.not.be.empty;
      expect(response.body.data.entity_name).to.not.be.empty;
      expect(response.body.data.entity_type).to.not.be.empty;
      expect(response.body.data.address).to.not.be.empty;
      expect(response.body.data.registration_date).to.not.be.empty;
      expect(response.body.data.entity_status).to.not.be.empty;
      expect(response.body.data.line_of_business).to.not.be.empty;
    });
  });

  it("should return 400 when an invalid entity_type is passed", () => {
    // Invalid Entity Type
    cy.api({
      method: "POST",
      url: `${baseUrl}/api/vas/validation/company`,
      headers: HEADERS.LLC_PROD_API_KEY,
      body: {
        rc_number: "7068861",
        entity_type: "INVALID_ENTITY_TYPE",
      },
      failOnStatusCode: false,
    }).then((response) => {
      // Assert the status code and error message
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
    });
  });

  it("should return 400 when an invalid rc_number is passed", () => {
    cy.api({
      method: "POST",
      url: `${baseUrl}/api/vas/validation/company`,
      headers: HEADERS.LLC_PROD_API_KEY,
      body: {
        rc_number: "INVALID_RC_NUMBER",
        entity_type: "BUSINESS_NAME",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.message).to.eq("invalid data");
      expect(response.body.error).to.eq("invalid rc_number passed");
    });
  });

  it("should return 401 Unauthorized for invalid API key", () => {
    const requestBody = {
      rc_number: "7068861",
      entity_type: "BUSINESS_NAME",
    };
    cy.api({
      method: "POST",
      url: "https://vasapp.oasisproducts.ng/api/vas/validation/company",
      headers: HEADERS.INVALID_API_KEY,
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.error).to.eq("Unauthorized");
      cy.log(response.body);
    });
  });

  // BUSINESS VALIDATION SINGLE SERVICE (PREMIUM)
  it("should return 200 and valid company data when valid RC number and entity type is passed for BUSINESS VALIDATION SINGLE SERVICE (PREMIUM)", () => {
    const requestBody = {
      rc_number: "635930",
      entity_type: "COMPANY",
    };

    cy.api({
      method: "POST",
      url: `${baseUrl}/api/vas/validation/single-service`,
      headers: HEADERS.LLC_PROD_API_KEY,
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq("OK");
      expect(response.body.message).to.eq("company data");
      expect(response.body.success).to.be.true;
      expect(response.body.data.rc_number).to.not.be.empty;
      expect(response.body.data.entity_type).to.not.be.empty;
      expect(response.body.data.entity_status).to.not.be.empty;
      expect(response.body.data.entity_name).to.not.be.empty;
      expect(response.body.data.address).to.not.be.empty;
      expect(response.body.data.affiliates)
        .to.be.an("array")
        .and.have.length.greaterThan(0);
      expect(response.body.data.line_of_business).to.not.be.empty;
    });
  });

  it("should return 401 Unauthorized for invalid API key", () => {
    const requestBody = {
      rc_number: "8082155",
      entity_type: "BUSINESS_NAME",
    };

    cy.api({
      method: "POST",
      url: `${baseUrl}/api/vas/validation/single-service`,
      headers: HEADERS.INVALID_API_KEY,
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.error).to.eq("Unauthorized");
      cy.log(response.body);
    });
  });

  it("should return 400 Bad Request for invalid rc_number", () => {
    const requestBody = {
      rc_number: "INVALID_RC",
      entity_type: "BUSINESS_NAME",
    };

    cy.api({
      method: "POST",
      url: `${baseUrl}/api/vas/validation/single-service`,
      headers: HEADERS.LLC_PROD_API_KEY,
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.message).to.eq("invalid data");
      expect(response.body.error).to.eq("invalid rc_number passed");
      expect(response.body.success).to.be.false;
      expect(response.body.errors).to.include("invalid rc_number passed");

      cy.log("Error Response:", response.body);
    });
  });

  it("should return 400 Bad Request for invalid entity_type", () => {
    const requestBody = {
      rc_number: "8082155",
      entity_type: "INVALID_TYPE",
    };

    cy.api({
      method: "POST",
      url: `${baseUrl}/api/vas/validation/single-service`,
      headers: HEADERS.LLC_PROD_API_KEY,
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      cy.log(response.body);
    });
  });

  // OPEN SEARCH COMPANY SEARCH

  it("should return 200 and valid company data when valid Company name or RC number and entity type is passed for COMPANY OPEN SEARCH", () => {
    const requestBody = {
      company_name: "24 HOUSE OF",
      filter_param: {
        search_type: "CONTAINS",
        // reg_start_date: "2025-08-05",
        // reg_end_date: "2025-10-27",
        // entity_type: "LIMITED_LIABILITY_PARTNERSHIP",
        // entity_email_address: "Peaceoasis9023@gmail.com",
        // rc_number: "27782342",
      },
    };

    cy.api({
      method: "POST",
      url:`${baseUrl}/api/vas/validation/open-search/company`,
      headers: HEADERS.LLC_PROD_API_KEY,
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq("OK");
      expect(response.body.message).to.eq("Company data");
      expect(response.body.success).to.be.true;
      const company = response.body.data[0];
      expect(company.rc_number).to.be.a("string").and.not.be.empty;
      expect(company.entity_type).to.be.a("string").and.not.be.empty;
      expect(company.entity_name).to.be.a("string").and.not.be.empty;
    });
  });

  it("should return 400 when registration start date is later than end date for COMPANY OPEN SEARCH", () => {
    const requestBody = {
      company_name: "Hassan",
      filter_param: {
        search_type: "PREFIX",
        reg_start_date: "2026-08-05", // Start date after end date
        reg_end_date: "2025-10-27", // End date before start date
        entity_type: "LIMITED_LIABILITY_PARTNERSHIP",
        entity_email_address: "Peaceoasis9023@gmail.com",
        rc_number: "27782342",
        entity_address:
          "APT. 831 013 CRISTOBAL LIGHT, WEST RUSSELCHESTER, TN 16502",
      },
    };

    cy.api({
      method: "POST",
      url: `${baseUrl}/api/vas/validation/open-search/company`,
      headers: HEADERS.LLC_PROD_API_KEY,
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.statusCode).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.success).to.be.false;
      expect(response.body.error).to.eq(
        "Registration start date must be earlier than end date"
      );
      expect(response.body.message).to.contain("invalid request sent");
      expect(response.body.errors).to.be.null;
    });
  });

  it("should return 401 Unauthorized for invalid API key", () => {
    const requestBody = {
      company_name: "Hassan",
      filter_param: {
        search_type: "PREFIX",
        reg_start_date: "2025-08-05",
        reg_end_date: "2025-10-27",
        entity_type: "LIMITED_LIABILITY_PARTNERSHIP",
        entity_email_address: "Peaceoasis9023@gmail.com",
        rc_number: "27782342",
        entity_address: "75687 Haag River, West Anh, AZ 12472",
      },
    };

    cy.api({
      method: "POST",
      url: `${baseUrl}/api/vas/validation/open-search/company`,
      headers: HEADERS.INVALID_API_KEY,
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.error).to.eq("Unauthorized");
      cy.log(response.body);
    });
  });

  // OPEN SEARCH AFFILIATE SEARCH

  it("should return 200 and valid company data when valid entities are passed for COMPANY AFFILIATE SEARCH", () => {
    const requestBody = {
      first_name: "Diedra",
      last_name: "Jast",
      filter_param: {
        phone_number: "07051690854",
        start_year_of_birth: "1995",
        end_year_of_birth: "2025",
        gender: "FEMALE",
        nationality: "NIGERIAN",
        affiliate_email_address: "peaceoasis9023@gmail.com",
      },
    };

    cy.api({
      method: "POST",
      url: `${baseUrl}/api/vas/validation/open-search/affiliate`,
      headers: HEADERS.LLC_PROD_API_KEY,
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.statusCode).to.eq(200);
      expect(response.body.status).to.eq("OK");
      expect(response.body.success).to.be.true;
      expect(response.body.message).to.eq("Affiliate data");
      expect(response.body.data).to.be.an("array").and.not.be.empty;
    });
  });

  it("should return 200 and valid company data when valid firstname and lastname is passed for COMPANY AFFILIATE SEARCH", () => {
    const requestBody = {
      first_name: "Diedra",
      last_name: "Jast",
    };

    cy.api({
      method: "POST",
      url: `${baseUrl}/api/vas/validation/open-search/affiliate`,
      headers: HEADERS.LLC_PROD_API_KEY,
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.statusCode).to.eq(200);
      expect(response.body.status).to.eq("OK");
      expect(response.body.success).to.be.true;
      expect(response.body.message).to.eq("Affiliate data");
      expect(response.body.data).to.be.an("array").and.not.be.empty;
    });
  });

  it("should return 401 Unauthorized for invalid API key", () => {
    const requestBody = {
      first_name: "Diedra",
      last_name: "Jast",
      filter_param: {
        phone_number: "07051690854",
        start_year_of_birth: "1995",
        end_year_of_birth: "2025",
        gender: "FEMALE",
        nationality: "NIGERIAN",
        affiliate_email_address: "peaceoasis9023@gmail.com",
      },
    };

    cy.api({
      method: "POST",
      url: `${baseUrl}/api/vas/validation/open-search/affiliate`,
      headers: HEADERS.INVALID_API_KEY,
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.error).to.eq("Unauthorized");
      cy.log(response.body);
    });
  });
});

// describe("API Validation for VAS Registration Endpoints", () => {
//   //  DOWNLOAD CERTIFICATE API
//
//   it("should return 200 and a certificate file as attachment when a valid rcNumber and transactionRef is passed for DOWNLOAD CERTIFICATE API ", () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/certificate`,
//       encoding: "binary", //for non-text responses
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         rcNumber: "8904270",
//         transactionRef: "VAS20251020053243601",
//       },
//     }).then((response) => {
//       expect(response.status).to.eq(200);
//       // expect(response.headers['content-type']).to.include('application/pdf');
//
//       // cy.task('saveCertificateFile', {
//       //     filename: 'certificate.pdf',
//       //     content: response.body
//       // });
//     });
//   });
//
//   it("should return 400 when an invalid rc_number and transactionRef is passed", () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/certificate`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         rcNumber: "80029",
//         transactionRef: "VAS202  27134638646",
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(400);
//       expect(response.body.status).to.eq("BAD_REQUEST");
//       expect(response.body.message).to.eq("invalid request sent");
//       expect(response.body.error).contains("error generating certificate");
//     });
//   });
//
//   it("should return 401 Unauthorized for invalid API key", () => {
//     const requestBody = {
//       rc_number: "7068861",
//       entity_type: "BUSINESS_NAME",
//     };
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/validation/company`,
//       headers: HEADERS.INVALID_API_KEY,
//       body: requestBody,
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(401);
//       expect(response.body.error).to.eq("Unauthorized");
//       cy.log(response.body);
//     });
//   });
//
//   // DOWNLOAD STATUS REPORT API
//
//   it("should return 200 and a status report file as attachment when a valid rcNumber and transactionRef is passed for DOWNLOAD STATUS REPORT API", () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/certificate/status-report`,
//       encoding: "binary", //for non-text responses
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         rcNumber: "8904270",
//         transactionRef: "VAS20251020053243601",
//       },
//     }).then((response) => {
//       expect(response.status).to.eq(200);
//       // expect(response.headers['content-type']).to.include('application/pdf');
//
//       // cy.task('saveCertificateFile', {
//       //     filename: 'certificate.pdf',
//       //     content: response.body
//       // });
//     });
//   });
//
//   it("should return 400 when an invalid rc_number and transactionRef is passed", () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/certificate/status-report`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         rcNumber: "80029",
//         transactionRef: "VAS202  27134638646",
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(400);
//       expect(response.body.status).to.eq("BAD_REQUEST");
//       expect(response.body.message).to.eq("invalid request sent");
//       expect(response.body.error).contains("error generating status report");
//     });
//   });
//
//   it("should return 401 Unauthorized for invalid API key", () => {
//     const requestBody = {
//       rc_number: "7068861",
//       entity_type: "BUSINESS_NAME",
//     };
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/validation/company`,
//       headers: HEADERS.INVALID_API_KEY,
//       body: requestBody,
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(401);
//       expect(response.body.error).to.eq("Unauthorized");
//       cy.log(response.body);
//     });
//   });
//
//   //BN COMPLIANCE API
//
//   it("Should return 200 and similarity details (basic check) for BN COMPLIANCE", () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/bn-compliance`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         proposedName: "Gsuretech Happy Ventures enterprises",
//         lineOfBusiness: "general_merchandise",
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(200);
//       expect(response.body.status).to.eq("OK");
//       expect(response.body.message).to.not.be.empty;
//       expect(response.body.data.similarNames).to.not.be.empty;
//       expect(response.body.data.mostSimilarName).to.not.be.empty;
//       expect(response.body.data.similarityScore).to.not.be.empty;
//       expect(response.body.data.complianceScore).to.not.be.empty;
//     });
//   });
//
//   it("Should return 403 Forbidden when name exist for BN COMPLIANCE", () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/bn-compliance`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         proposedName: "Gaya Demarina Galaxy",
//         lineOfBusiness: "general_merchandise",
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(403);
//       expect(response.body.status).to.eq("FORBIDDEN");
//       expect(response.body.message).to.eq("Name exist");
//       expect(response.body.errors).to.not.be.empty;
//     });
//   });
//
//   it("Should return 400 Bad Request when a single word is used as proposedName", () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/bn-compliance`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         proposedName: "Galaxy",
//         lineOfBusiness: "general_merchandise",
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(400);
//       expect(response.body.status).to.eq("BAD_REQUEST");
//       expect(response.body.message).to.eq(
//         "proposed name cant have a single word"
//       );
//     });
//   });
//
//   // BN COMPLIANCE ADVANCE CHECK
//
//   it('Should return 200, statusCode "00" with message proceed to filing (advanceCheck=true) for BN COMPLIANCE', () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/bn-compliance?advanceCheck=true`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         proposedName: "Alamaboro Collections",
//         lineOfBusiness: "general_merchandise",
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(200);
//       expect(response.body.status).to.eq("OK");
//       expect(response.body.data.message).to.not.be.empty;
//       expect(response.body.data.statusCode).to.eq("00");
//       expect(response.body.data.data.recommendedActions).to.not.be.empty;
//       expect(response.body.data.data).to.not.be.empty;
//       // expect(response.body.data.data.similarNames).to.not.be.empty;
//       // expect(response.body.data.data.mostSimilarName).to.not.be.empty;
//       expect(response.body.data.data.similarityScorePercentage).to.be.a(
//         "number"
//       );
//       expect(response.body.data.data.complianceScorePercentage).to.be.a(
//         "number"
//       );
//     });
//   });
//
//   it('Should return 200, statusCode "01" with the message OFFENSIVE_LANGUAGE like "hate" is used', () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/bn-compliance?advanceCheck=true`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         proposedName: "Malammadori hate concepts",
//         lineOfBusiness: "general_merchandise",
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(200);
//       expect(response.body.status).to.eq("OK");
//       expect(response.body.data.message).to.not.be.empty;
//       expect(response.body.data.statusCode).to.eq("01");
//       expect(response.body.data.data.recommendedActions).to.not.be.empty;
//       expect(response.body.data.data.recommendedActions[0].keywords).to.not.be
//         .empty;
//       expect(response.body.data.data.similarNames).to.not.be.empty;
//       expect(response.body.data.data.mostSimilarName).to.not.be.empty;
//       expect(response.body.data.data.similarityScorePercentage).to.be.a(
//         "number"
//       );
//       expect(response.body.data.data.complianceScorePercentage).to.be.a(
//         "number"
//       );
//     });
//   });
//
//   it('Should return 200,  statusCode "02" with the message QUALIFIER_NOT_FOUND when no qualifier is used', () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/bn-compliance?advanceCheck=true`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         proposedName: "Malammadori fololish",
//         lineOfBusiness: "general_merchandise",
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(200);
//       expect(response.body.status).to.eq("OK");
//       expect(response.body.data.message).to.eq("QUALIFIER_NOT_FOUND");
//       expect(response.body.data.statusCode).to.eq("02");
//       expect(response.body.data.data.recommendedActions).to.not.be.empty;
//       expect(response.body.data.data.recommendedActions[0].keywords).to.not.be
//         .empty;
//       expect(response.body.data.data.similarNames).to.not.be.empty;
//       expect(response.body.data.data.mostSimilarName).to.not.be.empty;
//       expect(response.body.data.data.similarityScorePercentage).to.be.a(
//         "number"
//       );
//       expect(response.body.data.data.complianceScorePercentage).to.be.a(
//         "number"
//       );
//     });
//   });
//
//   it('Should return 200, statusCode "03" with the message BUSINESS_NAME_REQUIRES_CERTIFICATE when business name require a proficiency certificate', () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/bn-compliance?advanceCheck=true`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         proposedName: "Muller Medical Ventures concepts",
//         lineOfBusiness: "general_merchandise",
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(200);
//       expect(response.body.status).to.eq("OK");
//       expect(response.body.data.message).to.eq(
//         "BUSINESS_NAME_REQUIRES_CERTIFICATE"
//       );
//       expect(response.body.data.statusCode).to.eq("03");
//       expect(response.body.data.data.recommendedActions).to.not.be.empty;
//       expect(response.body.data.data.recommendedActions[0].keywords).to.not.be
//         .empty;
//       expect(response.body.data.data.recommendedActions[0].message).to.not.be
//         .empty;
//       expect(response.body.data.data.similarNames).to.not.be.empty;
//       expect(response.body.data.data.mostSimilarName).to.not.be.empty;
//       expect(response.body.data.data.similarityScorePercentage).to.be.a(
//         "number"
//       );
//       expect(response.body.data.data.complianceScorePercentage).to.be.a(
//         "number"
//       );
//     });
//   });
//
//   it('Should return 200, statusCode "04" with the message BUSINESS_LINE_REQUIRES_CERTIFICATE when business line require a proficiency certificate', () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/bn-compliance?advanceCheck=true`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         proposedName: "Cinical concepts",
//         lineOfBusiness: "Medical practice and Consultancy",
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(200);
//       expect(response.body.status).to.eq("OK");
//       expect(response.body.data.message).to.eq(
//         "BUSINESS_LINE_REQUIRES_CERTIFICATE"
//       );
//       expect(response.body.data.statusCode).to.eq("04");
//       expect(response.body.data.data.recommendedActions).to.not.be.empty;
//       expect(response.body.data.data.recommendedActions[0].keywords).to.not.be
//         .empty;
//       expect(response.body.data.data.recommendedActions[0].message).to.not.be
//         .empty;
//       expect(response.body.data.data.similarNames).to.not.be.empty;
//       expect(response.body.data.data.mostSimilarName).to.not.be.empty;
//       expect(response.body.data.data.similarityScorePercentage).to.be.a(
//         "number"
//       );
//       expect(response.body.data.data.complianceScorePercentage).to.be.a(
//         "number"
//       );
//     });
//   });
//
//   it('Should return 200, statusCode "05" with the message PROHIBITED_BUSINESS_NAME when proposed name contains words that are prohibited', () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/bn-compliance?advanceCheck=true`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         proposedName: "Cinical Academy concepts",
//         lineOfBusiness: "Hospital",
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(200);
//       expect(response.body.status).to.eq("OK");
//       expect(response.body.data.message).to.eq("PROHIBITED_BUSINESS_NAME");
//       expect(response.body.data.statusCode).to.eq("05");
//       expect(response.body.data.data.recommendedActions).to.not.be.empty;
//       expect(response.body.data.data.recommendedActions[0].keywords).to.not.be
//         .empty;
//       expect(response.body.data.data.recommendedActions[0].message).to.not.be
//         .empty;
//       expect(response.body.data.data.mostSimilarName).to.not.be.empty;
//       expect(response.body.data.data.similarityScorePercentage).to.be.a(
//         "number"
//       );
//       expect(response.body.data.data.complianceScorePercentage).to.be.a(
//         "number"
//       );
//     });
//   });
//
//   it('Should return 200, statusCode "06" with the message PROHIBITED_BUSINESS_LINE when proposed name contains words that are prohibited', () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/bn-compliance?advanceCheck=true`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         proposedName: "Clinical concepts",
//         lineOfBusiness: "Health Academy",
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(200);
//       expect(response.body.status).to.eq("OK");
//       expect(response.body.data.message).to.eq("PROHIBITED_BUSINESS_LINE");
//       expect(response.body.data.statusCode).to.eq("06");
//       expect(response.body.data.data.recommendedActions).to.not.be.empty;
//       expect(response.body.data.data.recommendedActions[0].keywords).to.not.be
//         .empty;
//       expect(response.body.data.data.recommendedActions[0].message).to.not.be
//         .empty;
//       expect(response.body.data.data.similarityScorePercentage).to.be.a(
//         "number"
//       );
//       expect(response.body.data.data.complianceScorePercentage).to.be.a(
//         "number"
//       );
//     });
//   });
//
//   it('Should return 403 FOrbidden, statusCode "07" with the message BUSINESS_NAME_EXISTS when business name exists', () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/bn-compliance?advanceCheck=true`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         proposedName: "24 HOUSE OF GRAPHICS AND CAFE",
//         lineOfBusiness: "general_merchandise",
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(403);
//       expect(response.body.status).to.eq("FORBIDDEN");
//       // expect(response.body.data.message).to.eq("BUSINESS_NAME_EXISTS");
//       expect(response.body.message).to.eq("Name exist");
//
//       // expect(response.body.data.statusCode).to.eq("07");
//       // expect(response.body.data.data.recommendedActions).to.not.be.empty;
//       // expect(response.body.data.data.similarNames).to.not.be.empty;
//       // expect(response.body.data.data.suggestedNames).to.not.be.empty;
//       // expect(response.body.data.data.mostSimilarName).to.not.be.empty;
//       // expect(response.body.data.data.similarityScorePercentage).to.be.a(
//       //   "number"
//       // );
//       // expect(response.body.data.data.complianceScorePercentage).to.be.a(
//       //   "number"
//       // );
//     });
//   });
//
//   it('Should return 200, statusCode "08" with the message BUSINESS_NAME_TOO_SIMILAR when business is similar', () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/bn-compliance?advanceCheck=true`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         proposedName: "Gaya emarina Galaxy",
//         lineOfBusiness: "general_merchandise",
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(200);
//       expect(response.body.status).to.eq("OK");
//       expect(response.body.data.message).to.eq("BUSINESS_NAME_TOO_SIMILAR");
//       expect(response.body.data.statusCode).to.eq("08");
//       expect(response.body.data.data.recommendedActions).to.not.be.empty;
//       expect(response.body.data.data.similarNames).to.not.be.empty;
//       // expect(response.body.data.data.suggestedNames).to.not.be.empty;
//       // expect(response.body.data.data.mostSimilarName).to.not.be.empty;
//       expect(response.body.data.data.similarityScorePercentage).to.be.a(
//         "number"
//       );
//       expect(response.body.data.data.complianceScorePercentage).to.be.a(
//         "number"
//       );
//     });
//   });
//
//   it('Should return 200, statusCode "10" with the message SINGLE_WORD when a single word is used as proposed name', () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/bn-compliance?advanceCheck=true`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         proposedName: "Comrade",
//         lineOfBusiness: "general_merchandise",
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(400);
//       expect(response.body.status).to.eq("BAD_REQUEST");
//       // expect(response.body.data.message).to.eq("SINGLE_WORD");
//       expect(response.body.data.message).to.eq("proposed name cant have a single word");
//       // expect(response.body.data.statusCode).to.eq("10");
//       // expect(response.body.data.data.recommendedActions).to.not.be.empty;
//       // expect(response.body.data.data.recommendedActions[0].message).to.not.be.empty;
//       // expect(response.body.data.data.similarityScorePercentage).to.be.a(
//       //   "number"
//       // );
//       // expect(response.body.data.data.complianceScorePercentage).to.be.a(
//       //   "number"
//       // );
//     });
//   });
//
//   it('Should return 200, statusCode "12" with the message SPECIAL_CHARACTERS when special character is used in proposed name', () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/bn-compliance?advanceCheck=true`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         proposedName: "Comrade$ Ventures",
//         lineOfBusiness: "general_merchandise",
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(200);
//       expect(response.body.status).to.eq("OK");
//       expect(response.body.data.message).to.eq("SPECIAL_CHARACTERS");
//       expect(response.body.data.statusCode).to.eq("12");
//       expect(response.body.data.data.recommendedActions).to.not.be.empty;
//       expect(response.body.data.data.recommendedActions[0].message).to.not.be
//         .empty;
//       // expect(response.body.data.data.similarNames).to.not.be.empty;
//       // expect(response.body.data.data.mostSimilarName).to.not.be.empty;
//       expect(response.body.data.data.similarityScorePercentage).to.be.a(
//         "number"
//       );
//       expect(response.body.data.data.complianceScorePercentage).to.be.a(
//         "number"
//       );
//     });
//   });
//
//   // it('should return 200, statusCode "15" with the message PAYMENT_SERVICE_CONNOTATION when proposed name includes keyword like "wealth"', () => {
//   //   cy.request({
//   //     method: "POST",
//   //     url: `${baseUrl}/api/vas/engine/pre/bn-compliance?advanceCheck=true`,
//   //     headers: HEADERS.LLC_PROD_API_KEY,
//   //     body: {
//   //       proposedName: "Okpulku wealth Hub",
//   //       lineOfBusiness: "general_merchandise",
//   //     },
//   //     failOnStatusCode: false,
//   //   }).then((response) => {
//   //     expect(response.status).to.eq(200);
//   //     expect(response.body.data.message).to.eq("PAYMENT_SERVICE_CONNOTATION");
//   //     expect(response.body.data.statusCode).to.eq("15");
//
//   //     const compliance = response.body.data.data;
//
//   //     expect(compliance.recommendedActions).to.not.be.empty;
//   //     expect(compliance.recommendedActions[0].message).to.not.be.empty;
//   //     expect(compliance.recommendedActions[0].keywords).to.not.be.empty;
//
//   //     expect(compliance.similarityScorePercentage).to.be.a("number");
//   //     expect(compliance.complianceScorePercentage).to.be.a("number");
//   //   });
//   // });
//
//   it("Should return 400 Bad Request when Line of Business is not passed", () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/bn-compliance`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         proposedName: "Muller Medical concepts",
//         lineOfBusiness: "",
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(400);
//       expect(response.body.status).to.eq("BAD_REQUEST");
//       expect(response.body.message).to.not.be.empty;
//       expect(response.body.error.lineOfBusiness).to.not.be.empty;
//     });
//   });
//
//   // // BUSINESS NAME
//   it("Should return 200 when all details are complete for BUSINESS NAME REGISTRATION", () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/business-name`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         lineOfBusiness: "fashion design",
//         proprietorCity: "Abuja",
//         companyCity: "Abuja",
//         proprietorPhonenumber: "07057001119",
//         businessCommencementDate: "2024-01-21",
//         companyState: "F.C.T",
//         proprietorNationality: "Nigerian",
//         proprietorState: "F.C.T",
//         proprietorDob: "2000-01-21",
//         proprietorFirstname: "John",
//         proprietorOthername: "Peter",
//         proprietorSurname: "Okoye",
//         proposedOption1: "High Grade Collections Ventures",
//         proprietorGender: "MALE",
//         proprietorStreetNumber: "41",
//         proprietorServiceAddress: "limpopo street",
//         companyEmail: "abubakarabdul9023@gmail.com",
//         companyStreetNumber: "41",
//         proprietorEmail: "abubakarabdul9023@gmail.com",
//         companyAddress: "69 road",
//         proprietorPostcode: "900108",
//         proprietorLga: "municipal",
//         passport: base64Images.passport,
//         meansOfId: base64Images.meansOfId,
//         signature: base64Images.signature,
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(200);
//       expect(response.body.status).to.eq("OK");
//       expect(response.body.data.message).to.not.be.empty;
//     });
//   });
//
//   it("Should return 200 when business name already exist", () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/business-name`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         lineOfBusiness: "fashion design",
//         proprietorCity: "Abuja",
//         companyCity: "Abuja",
//         proprietorPhonenumber: "07057001119",
//         businessCommencementDate: "2024-01-21",
//         companyState: "F.C.T",
//         proprietorNationality: "Nigerian",
//         proprietorState: "F.C.T",
//         proprietorDob: "2000-01-21",
//         proprietorFirstname: "John",
//         proprietorOthername: "Peter",
//         proprietorSurname: "Okoye",
//         proposedOption1: "24 House of Graphics and Cafe",
//         proprietorGender: "MALE",
//         proprietorStreetNumber: "41",
//         proprietorServiceAddress: "limpopo street",
//         companyEmail: "abubakarabdul9023@gmail.com",
//         companyStreetNumber: "41",
//         proprietorEmail: "abubakarabdul9023@gmail.com",
//         companyAddress: "69 road",
//         proprietorPostcode: "900108",
//         proprietorLga: "municipal",
//         passport: base64Images.passport,
//         meansOfId: base64Images.meansOfId,
//         signature: base64Images.signature,
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(403);
//       expect(response.body.status).to.eq("OK");
//       expect(response.body.message).to.not.be.empty;
//       expect(response.body.message).contain("BUSINESS_NAME_EXISTS");
//     });
//   });
//
//   it("Should return 400 BAD_REQUEST when business name is not provided", () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/business-name`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         lineOfBusiness: "fashion design",
//         proprietorCity: "Abuja",
//         companyCity: "Abuja",
//         proprietorPhonenumber: "07057001119",
//         businessCommencementDate: "2024-01-21",
//         companyState: "F.C.T",
//         proprietorNationality: "Nigerian",
//         proprietorState: "F.C.T",
//         proprietorDob: "2000-01-21",
//         proprietorFirstname: "John",
//         proprietorOthername: "Peter",
//         proprietorSurname: "Okoye",
//         proposedOption1: "",
//         proprietorGender: "MALE",
//         proprietorStreetNumber: "41",
//         proprietorServiceAddress: "limpopo street",
//         companyEmail: "abubakarabdul9023@gmail.com",
//         companyStreetNumber: "41",
//         proprietorEmail: "abubakarabdul9023@gmail.com",
//         companyAddress: "69 road",
//         proprietorPostcode: "900108",
//         proprietorLga: "municipal",
//         passport: base64Images.passport,
//         meansOfId: base64Images.meansOfId,
//         signature: base64Images.signature,
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(400);
//       expect(response.body.status).to.eq("BAD_REQUEST");
//       expect(response.body.message).to.not.be.empty;
//       expect(response.body.errors).to.contain(
//         "proposedOption1 - Proposed option must not be blank"
//       );
//       expect(response.body.message).contain("invalid inputs");
//     });
//   });
//
//   it("Should return 400 BAD_REQUEST when proprietorFirstname is not provided", () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/business-name`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         lineOfBusiness: "fashion design",
//         proprietorCity: "Abuja",
//         companyCity: "Abuja",
//         proprietorPhonenumber: "07057001119",
//         businessCommencementDate: "2024-01-21",
//         companyState: "F.C.T",
//         proprietorNationality: "Nigerian",
//         proprietorState: "F.C.T",
//         proprietorDob: "2000-01-21",
//         proprietorFirstname: "",
//         proprietorOthername: "Peter",
//         proprietorSurname: "Okoye",
//         proposedOption1: "Empire Galaxy",
//         proprietorGender: "MALE",
//         proprietorStreetNumber: "41",
//         proprietorServiceAddress: "limpopo street",
//         companyEmail: "abubakarabdul9023@gmail.com",
//         companyStreetNumber: "41",
//         proprietorEmail: "abubakarabdul9023@gmail.com",
//         companyAddress: "69 road",
//         proprietorPostcode: "900108",
//         proprietorLga: "municipal",
//         passport: base64Images.passport,
//         meansOfId: base64Images.meansOfId,
//         signature: base64Images.signature,
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(400);
//       expect(response.body.status).to.eq("BAD_REQUEST");
//       expect(response.body.message).to.not.be.empty;
//       expect(response.body.errors).to.contain(
//         "proprietorFirstname - Proprietor firstname must not be blank"
//       );
//       expect(response.body.message).contain("invalid inputs");
//     });
//   });
//
//   it("Should return 400 BAD_REQUEST when proprietorSurname is not provided", () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/business-name`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         lineOfBusiness: "fashion design",
//         proprietorCity: "Abuja",
//         companyCity: "Abuja",
//         proprietorPhonenumber: "07057001119",
//         businessCommencementDate: "2024-01-21",
//         companyState: "F.C.T",
//         proprietorNationality: "Nigerian",
//         proprietorState: "F.C.T",
//         proprietorDob: "2000-01-21",
//         proprietorFirstname: "Monalisa",
//         proprietorOthername: "Peter",
//         proprietorSurname: "",
//         proposedOption1: "Empire Galaxy",
//         proprietorGender: "MALE",
//         proprietorStreetNumber: "41",
//         proprietorServiceAddress: "limpopo street",
//         companyEmail: "abubakarabdul9023@gmail.com",
//         companyStreetNumber: "41",
//         proprietorEmail: "abubakarabdul9023@gmail.com",
//         companyAddress: "69 road",
//         proprietorPostcode: "900108",
//         proprietorLga: "municipal",
//         passport: base64Images.passport,
//         meansOfId: base64Images.meansOfId,
//         signature: base64Images.signature,
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(400);
//       expect(response.body.status).to.eq("BAD_REQUEST");
//       expect(response.body.message).to.not.be.empty;
//       expect(response.body.errors).to.contain(
//         "proprietorSurname - Proprietor surname must not be blank"
//       );
//       expect(response.body.message).contain("invalid inputs");
//     });
//   });
//
//   it("Should return 400 BAD_REQUEST when line of business is not provided", () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/business-name`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         lineOfBusiness: "",
//         proprietorCity: "Abuja",
//         companyCity: "Abuja",
//         proprietorPhonenumber: "07057001119",
//         businessCommencementDate: "2024-01-21",
//         companyState: "F.C.T",
//         proprietorNationality: "Nigerian",
//         proprietorState: "F.C.T",
//         proprietorDob: "2000-01-21",
//         proprietorFirstname: "Monalisa",
//         proprietorOthername: "Peter",
//         proprietorSurname: "Drury",
//         proposedOption1: "Empire Galaxy",
//         proprietorGender: "MALE",
//         proprietorStreetNumber: "41",
//         proprietorServiceAddress: "limpopo street",
//         companyEmail: "abubakarabdul9023@gmail.com",
//         companyStreetNumber: "41",
//         proprietorEmail: "abubakarabdul9023@gmail.com",
//         companyAddress: "69 road",
//         proprietorPostcode: "900108",
//         proprietorLga: "municipal",
//         passport: base64Images.passport,
//         meansOfId: base64Images.meansOfId,
//         signature: base64Images.signature,
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(400);
//       expect(response.body.status).to.eq("BAD_REQUEST");
//       expect(response.body.message).to.not.be.empty;
//       expect(response.body.errors).to.contain(
//         "lineOfBusiness - Line of business must not be blank"
//       );
//       expect(response.body.message).contain("invalid inputs");
//     });
//   });
//
//   it("Should return 400 BAD_REQUEST when proprietorCity is not provided", () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/business-name`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         lineOfBusiness: "Fashion Design",
//         proprietorCity: "",
//         companyCity: "Abuja",
//         proprietorPhonenumber: "07057001119",
//         businessCommencementDate: "2024-01-21",
//         companyState: "F.C.T",
//         proprietorNationality: "Nigerian",
//         proprietorState: "F.C.T",
//         proprietorDob: "2000-01-21",
//         proprietorFirstname: "Monalisa",
//         proprietorOthername: "Peter",
//         proprietorSurname: "Drury",
//         proposedOption1: "Empire Galaxy",
//         proprietorGender: "MALE",
//         proprietorStreetNumber: "41",
//         proprietorServiceAddress: "limpopo street",
//         companyEmail: "abubakarabdul9023@gmail.com",
//         companyStreetNumber: "41",
//         proprietorEmail: "abubakarabdul9023@gmail.com",
//         companyAddress: "69 road",
//         proprietorPostcode: "900108",
//         proprietorLga: "municipal",
//         passport: base64Images.passport,
//         meansOfId: base64Images.meansOfId,
//         signature: base64Images.signature,
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(400);
//       expect(response.body.status).to.eq("BAD_REQUEST");
//       expect(response.body.message).to.not.be.empty;
//       expect(response.body.errors).to.contain(
//         "proprietorCity - must not be empty"
//       );
//       expect(response.body.message).contain("invalid inputs");
//     });
//   });
//
//   it("Should return 400 BAD_REQUEST when proprietor phone number is not provided", () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/business-name`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         lineOfBusiness: "Fashion Design",
//         proprietorCity: "FCT",
//         companyCity: "Abuja",
//         proprietorPhonenumber: "",
//         businessCommencementDate: "2024-01-21",
//         companyState: "F.C.T",
//         proprietorNationality: "Nigerian",
//         proprietorState: "F.C.T",
//         proprietorDob: "2000-01-21",
//         proprietorFirstname: "Monalisa",
//         proprietorOthername: "Peter",
//         proprietorSurname: "Drury",
//         proposedOption1: "Empire Galaxy",
//         proprietorGender: "MALE",
//         proprietorStreetNumber: "41",
//         proprietorServiceAddress: "limpopo street",
//         companyEmail: "abubakarabdul9023@gmail.com",
//         companyStreetNumber: "41",
//         proprietorEmail: "abubakarabdul9023@gmail.com",
//         companyAddress: "69 road",
//         proprietorPostcode: "900108",
//         proprietorLga: "municipal",
//         passport: base64Images.passport,
//         meansOfId: base64Images.meansOfId,
//         signature: base64Images.signature,
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(400);
//       expect(response.body.status).to.eq("BAD_REQUEST");
//       expect(response.body.message).to.not.be.empty;
//       expect(response.body.errors).to.contains(
//         "proprietorPhonenumber - Invalid phone number"
//       );
//       expect(response.body.message).contain("invalid inputs");
//     });
//   });
//
//   it("Should return 400 BAD_REQUEST when proprietor business commencement date is not provided", () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/business-name`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         lineOfBusiness: "Fashion Design",
//         proprietorCity: "Abuja",
//         companyCity: "Abuja",
//         proprietorPhonenumber: "07057001119",
//         businessCommencementDate: "",
//         companyState: "F.C.T",
//         proprietorNationality: "Nigerian",
//         proprietorState: "F.C.T",
//         proprietorDob: "2000-01-21",
//         proprietorFirstname: "Monalisa",
//         proprietorOthername: "Peter",
//         proprietorSurname: "Drury",
//         proposedOption1: "Empire Galaxy",
//         proprietorGender: "MALE",
//         proprietorStreetNumber: "41",
//         proprietorServiceAddress: "limpopo street",
//         companyEmail: "abubakarabdul9023@gmail.com",
//         companyStreetNumber: "41",
//         proprietorEmail: "abubakarabdul9023@gmail.com",
//         companyAddress: "69 road",
//         proprietorPostcode: "900108",
//         proprietorLga: "municipal",
//         passport: base64Images.passport,
//         meansOfId: base64Images.meansOfId,
//         signature: base64Images.signature,
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(400);
//       expect(response.body.status).to.eq("BAD_REQUEST");
//       expect(response.body.message).to.not.be.empty;
//       expect(response.body.errors).to.contains(
//         "businessCommencementDate - must not be empty"
//       );
//       expect(response.body.message).contain("invalid inputs");
//     });
//   });
//
//   it("Should return 400 BAD_REQUEST when comapany state is not provided", () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/business-name`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         lineOfBusiness: "Fashion Design",
//         proprietorCity: "Abaji",
//         companyCity: "Abuja",
//         proprietorPhonenumber: "07057001119",
//         businessCommencementDate: "2000-01-21",
//         companyState: "",
//         proprietorNationality: "Nigerian",
//         proprietorState: "FCT",
//         proprietorDob: "2000-01-21",
//         proprietorFirstname: "Monalisa",
//         proprietorOthername: "Peter",
//         proprietorSurname: "Drury",
//         proposedOption1: "Empire Galaxy",
//         proprietorGender: "MALE",
//         proprietorStreetNumber: "41",
//         proprietorServiceAddress: "limpopo street",
//         companyEmail: "abubakarabdul9023@gmail.com",
//         companyStreetNumber: "41",
//         proprietorEmail: "abubakarabdul9023@gmail.com",
//         companyAddress: "69 road",
//         proprietorPostcode: "900108",
//         proprietorLga: "municipal",
//         passport: base64Images.passport,
//         meansOfId: base64Images.meansOfId,
//         signature: base64Images.signature,
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(400);
//       expect(response.body.status).to.eq("BAD_REQUEST");
//       expect(response.body.message).to.not.be.empty;
//       expect(response.body.errors).to.contains(
//         "companyState - Company state must not be blank"
//       );
//       expect(response.body.message).contain("invalid inputs");
//     });
//   });
//
//   it("Should return 400 BAD_REQUEST when proprietor Nationality is not provided", () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/business-name`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         lineOfBusiness: "Fashion Design",
//         proprietorCity: "Abaji",
//         companyCity: "Abuja",
//         proprietorPhonenumber: "07057001119",
//         businessCommencementDate: "2000-01-21",
//         companyState: "FCT",
//         proprietorNationality: "",
//         proprietorState: "FCT",
//         proprietorDob: "2000-01-21",
//         proprietorFirstname: "Monalisa",
//         proprietorOthername: "Peter",
//         proprietorSurname: "Drury",
//         proposedOption1: "Empire Galaxy",
//         proprietorGender: "MALE",
//         proprietorStreetNumber: "41",
//         proprietorServiceAddress: "limpopo street",
//         companyEmail: "abubakarabdul9023@gmail.com",
//         companyStreetNumber: "41",
//         proprietorEmail: "abubakarabdul9023@gmail.com",
//         companyAddress: "69 road",
//         proprietorPostcode: "900108",
//         proprietorLga: "municipal",
//         passport: base64Images.passport,
//         meansOfId: base64Images.meansOfId,
//         signature: base64Images.signature,
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(400);
//       expect(response.body.status).to.eq("BAD_REQUEST");
//       expect(response.body.message).to.not.be.empty;
//       expect(response.body.errors).to.contains(
//         "proprietorNationality - Proprietor nationality must not be blank"
//       );
//       expect(response.body.message).contain("invalid inputs");
//     });
//   });
//
//   it("Should return 400 BAD_REQUEST when proprietor State is not provided", () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/business-name`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         lineOfBusiness: "Fashion Design",
//         proprietorCity: "Abaji",
//         companyCity: "Abuja",
//         proprietorPhonenumber: "07057001119",
//         businessCommencementDate: "2000-01-21",
//         companyState: "FCT",
//         proprietorNationality: "Nigerian",
//         proprietorState: "",
//         proprietorDob: "2000-01-21",
//         proprietorFirstname: "Monalisa",
//         proprietorOthername: "Peter",
//         proprietorSurname: "Drury",
//         proposedOption1: "Empire Galaxy",
//         proprietorGender: "MALE",
//         proprietorStreetNumber: "41",
//         proprietorServiceAddress: "limpopo street",
//         companyEmail: "abubakarabdul9023@gmail.com",
//         companyStreetNumber: "41",
//         proprietorEmail: "abubakarabdul9023@gmail.com",
//         companyAddress: "69 road",
//         proprietorPostcode: "900108",
//         proprietorLga: "municipal",
//         passport: base64Images.passport,
//         meansOfId: base64Images.meansOfId,
//         signature: base64Images.signature,
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(400);
//       expect(response.body.status).to.eq("BAD_REQUEST");
//       expect(response.body.message).to.not.be.empty;
//       expect(response.body.errors).to.contains(
//         "proprietorState - Proprietor state must not be blank"
//       );
//       expect(response.body.message).contain("invalid inputs");
//     });
//   });
//
//   it("Should return 400 BAD_REQUEST when proprietor Date of Birth is not provided", () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/business-name`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         lineOfBusiness: "Fashion Design",
//         proprietorCity: "Abaji",
//         companyCity: "Abuja",
//         proprietorPhonenumber: "07057001119",
//         businessCommencementDate: "2000-01-21",
//         companyState: "FCT",
//         proprietorNationality: "Nigerian",
//         proprietorState: "FCT",
//         proprietorDob: "",
//         proprietorFirstname: "Monalisa",
//         proprietorOthername: "Peter",
//         proprietorSurname: "Drury",
//         proposedOption1: "Empire Galaxy",
//         proprietorGender: "MALE",
//         proprietorStreetNumber: "41",
//         proprietorServiceAddress: "limpopo street",
//         companyEmail: "abubakarabdul9023@gmail.com",
//         companyStreetNumber: "41",
//         proprietorEmail: "abubakarabdul9023@gmail.com",
//         companyAddress: "69 road",
//         proprietorPostcode: "900108",
//         proprietorLga: "municipal",
//         passport: base64Images.passport,
//         meansOfId: base64Images.meansOfId,
//         signature: base64Images.signature,
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(400);
//       expect(response.body.status).to.eq("BAD_REQUEST");
//       expect(response.body.message).to.not.be.empty;
//       expect(response.body.errors).to.contains(
//         "proprietorDob - must not be empty"
//       );
//       expect(response.body.message).contains("invalid inputs");
//     });
//   });
//
//   it("Should return 400 BAD_REQUEST when proprietor Date of Birth is below 18", () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/business-name`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         lineOfBusiness: "Fashion Design",
//         proprietorCity: "Abaji",
//         companyCity: "Abuja",
//         proprietorPhonenumber: "07057001119",
//         businessCommencementDate: "2000-01-21",
//         companyState: "FCT",
//         proprietorNationality: "Nigerian",
//         proprietorState: "FCT",
//         proprietorDob: "2021-01-21",
//         proprietorFirstname: "Monalisa",
//         proprietorOthername: "Peter",
//         proprietorSurname: "Drury",
//         proposedOption1: "Munjul Equisite Hub",
//         proprietorGender: "MALE",
//         proprietorStreetNumber: "41",
//         proprietorServiceAddress: "limpopo street",
//         companyEmail: "abubakarabdul9023@gmail.com",
//         companyStreetNumber: "41",
//         proprietorEmail: "abubakarabdul9023@gmail.com",
//         companyAddress: "69 road",
//         proprietorPostcode: "900108",
//         proprietorLga: "municipal",
//         passport: base64Images.passport,
//         meansOfId: base64Images.meansOfId,
//         signature: base64Images.signature,
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(400);
//       expect(response.body.status).to.eq("BAD_REQUEST");
//       expect(response.body.message).to.not.be.empty;
//       expect(response.body.message).contains("proprietor cannot be a minor");
//     });
//   });
//
//   it("Should return 400 BAD_REQUEST when proprietor Gender is not provided", () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/business-name`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         lineOfBusiness: "Fashion Design",
//         proprietorCity: "Abaji",
//         companyCity: "Abuja",
//         proprietorPhonenumber: "07057001119",
//         businessCommencementDate: "2000-01-21",
//         companyState: "FCT",
//         proprietorNationality: "Nigerian",
//         proprietorState: "FCT",
//         proprietorDob: "2020-01-21",
//         proprietorFirstname: "Monalisa",
//         proprietorOthername: "Peter",
//         proprietorSurname: "Drury",
//         proposedOption1: "Maximum Concept Galaxy",
//         proprietorGender: "",
//         proprietorStreetNumber: "41",
//         proprietorServiceAddress: "limpopo street",
//         companyEmail: "abubakarabdul9023@gmail.com",
//         companyStreetNumber: "41",
//         proprietorEmail: "abubakarabdul9023@gmail.com",
//         companyAddress: "69 road",
//         proprietorPostcode: "900108",
//         proprietorLga: "municipal",
//         passport: base64Images.passport,
//         meansOfId: base64Images.meansOfId,
//         signature: base64Images.signature,
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(400);
//       expect(response.body.status).to.eq("BAD_REQUEST");
//       expect(response.body.message).to.contains("invalid inputs");
//       expect(response.body.errors).contains(
//         "proprietorGender - must not be empty"
//       );
//     });
//   });
//
//   it("Should return 400 BAD_REQUEST when proprietor Street number is not provided", () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/business-name`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         lineOfBusiness: "Fashion Design",
//         proprietorCity: "Abaji",
//         companyCity: "Abuja",
//         proprietorPhonenumber: "07057001119",
//         businessCommencementDate: "2000-01-21",
//         companyState: "FCT",
//         proprietorNationality: "Nigerian",
//         proprietorState: "FCT",
//         proprietorDob: "2020-01-21",
//         proprietorFirstname: "Monalisa",
//         proprietorOthername: "Peter",
//         proprietorSurname: "Drury",
//         proposedOption1: "Maximum Concept Galaxy",
//         proprietorGender: "FEMALE",
//         proprietorStreetNumber: "",
//         proprietorServiceAddress: "limpopo street",
//         companyEmail: "abubakarabdul9023@gmail.com",
//         companyStreetNumber: "41",
//         proprietorEmail: "abubakarabdul9023@gmail.com",
//         companyAddress: "69 road",
//         proprietorPostcode: "900108",
//         proprietorLga: "municipal",
//         passport: base64Images.passport,
//         meansOfId: base64Images.meansOfId,
//         signature: base64Images.signature,
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(400);
//       expect(response.body.status).to.eq("BAD_REQUEST");
//       expect(response.body.message).to.contains("invalid inputs");
//       expect(response.body.errors).contains(
//         "proprietorStreetNumber - must not be empty"
//       );
//     });
//   });
//
//   it("Should return 400 BAD_REQUEST when proprietor service address is not provided", () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/business-name`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         lineOfBusiness: "Fashion Design",
//         proprietorCity: "Abaji",
//         companyCity: "Abuja",
//         proprietorPhonenumber: "07057001119",
//         businessCommencementDate: "2000-01-21",
//         companyState: "FCT",
//         proprietorNationality: "Nigerian",
//         proprietorState: "FCT",
//         proprietorDob: "2020-01-21",
//         proprietorFirstname: "Monalisa",
//         proprietorOthername: "Peter",
//         proprietorSurname: "Drury",
//         proposedOption1: "Maximum Concept Galaxy",
//         proprietorGender: "FEMALE",
//         proprietorStreetNumber: "41",
//         proprietorServiceAddress: "",
//         companyEmail: "abubakarabdul9023@gmail.com",
//         companyStreetNumber: "41",
//         proprietorEmail: "abubakarabdul9023@gmail.com",
//         companyAddress: "69 road",
//         proprietorPostcode: "900108",
//         proprietorLga: "municipal",
//         passport: base64Images.passport,
//         meansOfId: base64Images.meansOfId,
//         signature: base64Images.signature,
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(400);
//       expect(response.body.status).to.eq("BAD_REQUEST");
//       expect(response.body.message).to.contains("invalid inputs");
//       expect(response.body.errors).contains(
//         "proprietorServiceAddress - Proprietor service address must not be blank"
//       );
//     });
//   });
//
//   it("Should return 400 BAD_REQUEST when company email is not provided", () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/business-name`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         lineOfBusiness: "Fashion Design",
//         proprietorCity: "Abaji",
//         companyCity: "Abuja",
//         proprietorPhonenumber: "07057001119",
//         businessCommencementDate: "2000-01-21",
//         companyState: "FCT",
//         proprietorNationality: "Nigerian",
//         proprietorState: "FCT",
//         proprietorDob: "2020-01-21",
//         proprietorFirstname: "Monalisa",
//         proprietorOthername: "Peter",
//         proprietorSurname: "Drury",
//         proposedOption1: "Maximum Concept Galaxy",
//         proprietorGender: "FEMALE",
//         proprietorStreetNumber: "41",
//         proprietorServiceAddress: "Jabi Lake",
//         companyEmail: "",
//         companyStreetNumber: "41",
//         proprietorEmail: "abubakarabdul9023@gmail.com",
//         companyAddress: "69 road",
//         proprietorPostcode: "900108",
//         proprietorLga: "municipal",
//         passport: base64Images.passport,
//         meansOfId: base64Images.meansOfId,
//         signature: base64Images.signature,
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(400);
//       expect(response.body.status).to.eq("BAD_REQUEST");
//       expect(response.body.message).to.contains("invalid inputs");
//       expect(response.body.errors).contains(
//         "companyEmail - Company email must not be blank"
//       );
//     });
//   });
//
//   it("Should return 400 BAD_REQUEST when company street number is not provided", () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/business-name`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         lineOfBusiness: "Fashion Design",
//         proprietorCity: "Abaji",
//         companyCity: "Abuja",
//         proprietorPhonenumber: "07057001119",
//         businessCommencementDate: "2000-01-21",
//         companyState: "FCT",
//         proprietorNationality: "Nigerian",
//         proprietorState: "FCT",
//         proprietorDob: "2020-01-21",
//         proprietorFirstname: "Monalisa",
//         proprietorOthername: "Peter",
//         proprietorSurname: "Drury",
//         proposedOption1: "Maximum Concept Galaxy",
//         proprietorGender: "FEMALE",
//         proprietorStreetNumber: "41",
//         proprietorServiceAddress: "Jabi Lake",
//         companyEmail: "abubakar@gmail.com",
//         companyStreetNumber: "",
//         proprietorEmail: "abubakarabdul9023@gmail.com",
//         companyAddress: "69 road",
//         proprietorPostcode: "900108",
//         proprietorLga: "municipal",
//         passport: base64Images.passport,
//         meansOfId: base64Images.meansOfId,
//         signature: base64Images.signature,
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(400);
//       expect(response.body.status).to.eq("BAD_REQUEST");
//       expect(response.body.message).to.contains("invalid inputs");
//       expect(response.body.errors).contains(
//         "companyStreetNumber - must not be empty"
//       );
//     });
//   });
//
//   it("Should return 400 BAD_REQUEST when proprietor email is not provided", () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/business-name`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         lineOfBusiness: "Fashion Design",
//         proprietorCity: "Abaji",
//         companyCity: "Abuja",
//         proprietorPhonenumber: "07057001119",
//         businessCommencementDate: "2000-01-21",
//         companyState: "FCT",
//         proprietorNationality: "Nigerian",
//         proprietorState: "FCT",
//         proprietorDob: "2020-01-21",
//         proprietorFirstname: "Monalisa",
//         proprietorOthername: "Peter",
//         proprietorSurname: "Drury",
//         proposedOption1: "Maximum Concept Galaxy",
//         proprietorGender: "FEMALE",
//         proprietorStreetNumber: "41",
//         proprietorServiceAddress: "Jabi Lake",
//         companyEmail: "abubakar@gmail.com",
//         companyStreetNumber: "42",
//         proprietorEmail: "",
//         companyAddress: "69 road",
//         proprietorPostcode: "900108",
//         proprietorLga: "municipal",
//         passport: base64Images.passport,
//         meansOfId: base64Images.meansOfId,
//         signature: base64Images.signature,
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(400);
//       expect(response.body.status).to.eq("BAD_REQUEST");
//       expect(response.body.message).to.contains("invalid inputs");
//       expect(response.body.errors).contains(
//         "proprietorEmail - must not be empty"
//       );
//     });
//   });
//
//   it("Should return 400 BAD_REQUEST when company address is not provided", () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/business-name`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         lineOfBusiness: "Fashion Design",
//         proprietorCity: "Abaji",
//         companyCity: "Abuja",
//         proprietorPhonenumber: "07057001119",
//         businessCommencementDate: "2000-01-21",
//         companyState: "FCT",
//         proprietorNationality: "Nigerian",
//         proprietorState: "FCT",
//         proprietorDob: "2020-01-21",
//         proprietorFirstname: "Monalisa",
//         proprietorOthername: "Peter",
//         proprietorSurname: "Drury",
//         proposedOption1: "Maximum Concept Galaxy",
//         proprietorGender: "FEMALE",
//         proprietorStreetNumber: "41",
//         proprietorServiceAddress: "Jabi Lake",
//         companyEmail: "abubakar@gmail.com",
//         companyStreetNumber: "42",
//         proprietorEmail: "abubakar@gmail.com",
//         companyAddress: "",
//         proprietorPostcode: "900108",
//         proprietorLga: "municipal",
//         passport: base64Images.passport,
//         meansOfId: base64Images.meansOfId,
//         signature: base64Images.signature,
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(400);
//       expect(response.body.status).to.eq("BAD_REQUEST");
//       expect(response.body.message).to.contains("invalid inputs");
//       expect(response.body.errors).contains(
//         "companyAddress - Company address must not be blank"
//       );
//     });
//   });
//   it("Should return 400 BAD_REQUEST when proprietor Postcode address is not provided", () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/business-name`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         lineOfBusiness: "Fashion Design",
//         proprietorCity: "Abaji",
//         companyCity: "Abuja",
//         proprietorPhonenumber: "07057001119",
//         businessCommencementDate: "2000-01-21",
//         companyState: "FCT",
//         proprietorNationality: "Nigerian",
//         proprietorState: "FCT",
//         proprietorDob: "2020-01-21",
//         proprietorFirstname: "Monalisa",
//         proprietorOthername: "Peter",
//         proprietorSurname: "Drury",
//         proposedOption1: "Maximum Concept Galaxy",
//         proprietorGender: "FEMALE",
//         proprietorStreetNumber: "41",
//         proprietorServiceAddress: "Jabi Lake",
//         companyEmail: "abubakar@gmail.com",
//         companyStreetNumber: "42",
//         proprietorEmail: "abubakar@gmail.com",
//         companyAddress: "69 Road",
//         proprietorPostcode: "",
//         proprietorLga: "municipal",
//         passport: base64Images.passport,
//         meansOfId: base64Images.meansOfId,
//         signature: base64Images.signature,
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(400);
//       expect(response.body.status).to.eq("BAD_REQUEST");
//       expect(response.body.message).to.contains("invalid inputs");
//       expect(response.body.errors).contains(
//         "proprietorPostcode - Proprietor postcode must not be blank"
//       );
//     });
//   });
//
//   it("Should return 400 BAD_REQUEST when proprietorLga is not provided", () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/business-name`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         lineOfBusiness: "Fashion Design",
//         proprietorCity: "Abaji",
//         companyCity: "Abuja",
//         proprietorPhonenumber: "07057001119",
//         businessCommencementDate: "2000-01-21",
//         companyState: "FCT",
//         proprietorNationality: "Nigerian",
//         proprietorState: "FCT",
//         proprietorDob: "2020-01-21",
//         proprietorFirstname: "Monalisa",
//         proprietorOthername: "Peter",
//         proprietorSurname: "Drury",
//         proposedOption1: "Maximum Concept Galaxy",
//         proprietorGender: "FEMALE",
//         proprietorStreetNumber: "41",
//         proprietorServiceAddress: "Jabi Lake",
//         companyEmail: "abubakar@gmail.com",
//         companyStreetNumber: "42",
//         proprietorEmail: "abubakar@gmail.com",
//         companyAddress: "69 Road",
//         proprietorPostcode: "804889",
//         proprietorLga: "",
//         passport: base64Images.passport,
//         meansOfId: base64Images.meansOfId,
//         signature: base64Images.signature,
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(400);
//       expect(response.body.status).to.eq("BAD_REQUEST");
//       expect(response.body.message).to.contains("invalid inputs");
//       expect(response.body.errors).contains(
//         "proprietorLga - Proprietor LGA must not be blank"
//       );
//     });
//   });
//
//   it("Should return 400 BAD_REQUEST when passport is not provided", () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/business-name`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         lineOfBusiness: "Fashion Design",
//         proprietorCity: "Abaji",
//         companyCity: "Abuja",
//         proprietorPhonenumber: "07057001119",
//         businessCommencementDate: "2000-01-21",
//         companyState: "FCT",
//         proprietorNationality: "Nigerian",
//         proprietorState: "FCT",
//         proprietorDob: "2020-01-21",
//         proprietorFirstname: "Monalisa",
//         proprietorOthername: "Peter",
//         proprietorSurname: "Drury",
//         proposedOption1: "Maximum Concept Galaxy",
//         proprietorGender: "FEMALE",
//         proprietorStreetNumber: "41",
//         proprietorServiceAddress: "Jabi Lake",
//         companyEmail: "abubakar@gmail.com",
//         companyStreetNumber: "42",
//         proprietorEmail: "abubakar@gmail.com",
//         companyAddress: "69 Road",
//         proprietorPostcode: "804889",
//         proprietorLga: "municipal",
//         passport: "",
//         meansOfId: base64Images.meansOfId,
//         signature: base64Images.signature,
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(400);
//       expect(response.body.status).to.eq("BAD_REQUEST");
//       expect(response.body.message).to.contains("invalid inputs");
//       expect(response.body.errors).contains("passport - must not be empty");
//     });
//   });
//
//   it("Should return 400 BAD_REQUEST when passport is not provided", () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/business-name`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         lineOfBusiness: "Fashion Design",
//         proprietorCity: "Abaji",
//         companyCity: "Abuja",
//         proprietorPhonenumber: "07057001119",
//         businessCommencementDate: "2000-01-21",
//         companyState: "FCT",
//         proprietorNationality: "Nigerian",
//         proprietorState: "FCT",
//         proprietorDob: "2020-01-21",
//         proprietorFirstname: "Monalisa",
//         proprietorOthername: "Peter",
//         proprietorSurname: "Drury",
//         proposedOption1: "Maximum Concept Galaxy",
//         proprietorGender: "FEMALE",
//         proprietorStreetNumber: "41",
//         proprietorServiceAddress: "Jabi Lake",
//         companyEmail: "abubakar@gmail.com",
//         companyStreetNumber: "42",
//         proprietorEmail: "abubakar@gmail.com",
//         companyAddress: "69 Road",
//         proprietorPostcode: "804889",
//         proprietorLga: "municipal",
//         passport: base64Images.passport,
//         meansOfId: "",
//         signature: base64Images.signature,
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(400);
//       expect(response.body.status).to.eq("BAD_REQUEST");
//       expect(response.body.message).to.contains("invalid inputs");
//       expect(response.body.errors).contains("meansOfId - must not be empty");
//     });
//   });
//
//   it("Should return 400 BAD_REQUEST when passport is not provided", () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/business-name`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         lineOfBusiness: "Fashion Design",
//         proprietorCity: "Abaji",
//         companyCity: "Abuja",
//         proprietorPhonenumber: "07057001119",
//         businessCommencementDate: "2000-01-21",
//         companyState: "FCT",
//         proprietorNationality: "Nigerian",
//         proprietorState: "FCT",
//         proprietorDob: "2020-01-21",
//         proprietorFirstname: "Monalisa",
//         proprietorOthername: "Peter",
//         proprietorSurname: "Drury",
//         proposedOption1: "Maximum Concept Galaxy",
//         proprietorGender: "FEMALE",
//         proprietorStreetNumber: "41",
//         proprietorServiceAddress: "Jabi Lake",
//         companyEmail: "abubakar@gmail.com",
//         companyStreetNumber: "42",
//         proprietorEmail: "abubakar@gmail.com",
//         companyAddress: "69 Road",
//         proprietorPostcode: "804889",
//         proprietorLga: "municipal",
//         passport: base64Images.passport,
//         meansOfId: base64Images.signature,
//         signature: "",
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(400);
//       expect(response.body.status).to.eq("BAD_REQUEST");
//       expect(response.body.message).to.contains("invalid inputs");
//       expect(response.body.errors).contains("signature - must not be empty");
//     });
//   });
//
//   // BN PRE-REG VALIDATION
//   it("Should return 200 when the BN PRE-REG VALIDATION endpoint is called", () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/bn/validation`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         companyCity: "Eti Osa",
//         companyEmail: "abubakarabdul9023@gmail.com",
//         companyState: "Lagos State",
//         businessCommencementDate: "2025-04-25",
//         companyAddress: "69, road",
//         transactionRef: "244624463442645997",
//         proposedOption1: "ketem chimasgo travels",
//         companyStreetNumber: "Gwarinpa",
//         lineOfBusiness: "fashion design",
//         proprietorFirstname: "JASPER",
//         proprietorNationality: "Nigerian",
//         proprietorPhonenumber: "08020686848s",
//         proprietorStreetNumber: "ppp, I samu, FESTAC TOWN LAGOS",
//         proprietorEmail: "abubakarabdul9023@gmail.comb@gmail.com",
//         proprietorState: "Lagos State",
//         proprietorGender: "male",
//         proprietorSurname: "CHINEDU",
//         proprietorPostcode: "100001",
//         proprietorServiceAddress: "Ikota Estate",
//         proprietorDob: "1980-05-25",
//         proprietorCity: "Eti Osa",
//         proprietorLga: "Ado/langbasa/badore",
//         proprietorOthername: "kjj",
//         passport: base64Images.passport,
//         meansOfId: base64Images.signature,
//         signature: "",
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(200);
//       expect(response.body.status).to.eq("OK");
//       expect(response.body.success).to.be.true;
//       expect(response.body.message).to.eq(
//         "validation data received successfully"
//       );
//
//       const data = response.body.data;
//       expect(data).to.have.property("proposedOption1");
//       expect(data.proposedOption1[0]).to.include(
//         "proposed name contains prohibited/restricted words"
//       );
//
//       expect(data).to.have.property("proprietorGender");
//       expect(data.proprietorGender[0]).to.include(
//         "gender type should be of MALE or FEMALE"
//       );
//
//       expect(data).to.have.property("proprietorPhonenumber");
//       expect(data.proprietorPhonenumber[0]).to.include(
//         "invalid phone number passed"
//       );
//
//       expect(data).to.have.property("proprietorEmail");
//       expect(data.proprietorEmail[0]).to.include(
//         "invalid email address passed"
//       );
//     });
//   });
//
//   // BUSINESS NAME PARTNERSHIP
//   it("should attempt to register a partner and handle success or maximum partnership limit response", () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/business-name/partner`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         transactionRef: "VAS20250527112423161",
//         lineOfBusiness: "Fashion Design",
//         proprietorCity: "Abaji",
//         companyCity: "Abuja",
//         proprietorPhonenumber: "07057001119",
//         businessCommencementDate: "2000-01-21",
//         companyState: "FCT",
//         proprietorNationality: "Nigerian",
//         proprietorState: "FCT",
//         proprietorDob: "2020-01-21",
//         proprietorFirstname: "Monalisa",
//         proprietorOthername: "Peter",
//         proprietorSurname: "Drury",
//         proposedOption1: "Maximum Concept Galaxy",
//         proprietorGender: "FEMALE",
//         proprietorStreetNumber: "41",
//         proprietorServiceAddress: "Jabi Lake",
//         companyEmail: "abubakar@gmail.com",
//         companyStreetNumber: "42",
//         proprietorEmail: "abubakar@gmail.com",
//         companyAddress: "69 Road",
//         proprietorPostcode: "804889",
//         proprietorLga: "municipal",
//         signature: base64Images.signature,
//         meansOfId: base64Images.meansOfId,
//         passport: base64Images.passport,
//         supportingDoc: base64Images.supportingDoc,
//       },
//       failOnStatusCode: false, // prevent Cypress from failing on 403
//     }).then((response) => {
//       if (response.status === 200) {
//         expect(response.body.status).to.eq("OK");
//         expect(response.body.message).to.eq("partner registered successfully");
//         expect(response.body.success).to.be.true;
//       } else if (response.status === 403) {
//         expect(response.body.status).to.eq("FORBIDDEN");
//         expect(response.body.message).to.eq(
//           "maximum partnership limit reached"
//         );
//         expect(response.body.success).to.be.false;
//       } else {
//         throw new Error(
//           `Unexpected response: ${JSON.stringify(response.body)}`
//         );
//       }
//     });
//   });
//
//   it("should return 400 BAD_REQUEST when transactionRef is invalid", () => {
//     cy.request({
//       method: "POST",
//       url: `${baseUrl}/api/vas/engine/pre/business-name/partner`,
//       headers: HEADERS.LLC_PROD_API_KEY,
//       body: {
//         transactionRef: "VAS202505271124231",
//         lineOfBusiness: "Fashion Design",
//         proprietorCity: "Abaji",
//         companyCity: "Abuja",
//         proprietorPhonenumber: "07057001119",
//         businessCommencementDate: "2000-01-21",
//         companyState: "FCT",
//         proprietorNationality: "Nigerian",
//         proprietorState: "FCT",
//         proprietorDob: "2020-01-21",
//         proprietorFirstname: "Monalisa",
//         proprietorOthername: "Peter",
//         proprietorSurname: "Drury",
//         proposedOption1: "Maximum Concept Galaxy",
//         proprietorGender: "FEMALE",
//         proprietorStreetNumber: "41",
//         proprietorServiceAddress: "Jabi Lake",
//         companyEmail: "abubakar@gmail.com",
//         companyStreetNumber: "42",
//         proprietorEmail: "abubakar@gmail.com",
//         companyAddress: "69 Road",
//         proprietorPostcode: "804889",
//         proprietorLga: "municipal",
//         signature: base64Images.signature,
//         meansOfId: base64Images.meansOfId,
//         passport: base64Images.passport,
//         supportingDoc: base64Images.supportingDoc,
//       },
//       failOnStatusCode: false,
//     }).then((response) => {
//       expect(response.status).to.eq(400);
//       expect(response.body.status).to.eq("BAD_REQUEST");
//       expect(response.body.message).to.eq("invalid transactionRef");
//       expect(response.body.success).to.be.false;
//     });
//   });
// });
