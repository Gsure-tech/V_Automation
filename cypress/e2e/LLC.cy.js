import { base64Images } from "../fixtures/base64Images";
import { HEADERS } from "../support/constants";

// NAME RESERVATION, COMPANY REGISTRATION & SHARE REGISTRATION TESTS
describe("LLC Registration API Flow", () => {

  let reservationCode;  
  let transactionRef;     
  let affiliateKeyIndividual; 
  let affiliateKeyCorporate; 

// A. COMPLIANCE CHECK USING PROPOSED NAME
it("should check compliance using the proposedName",() => {

  // Sending the compliance check request
  cy.request({
    method: "POST",
    url: "http://41.207.248.246:9088/api/vas/llc/compliance",
    headers: HEADERS.VALID_API_KEY,
    body: {
      lineOfBusiness: "ICT",
      proposedName: "GSURETECH ENTERPRISE MOMENTUM TRADERS LTD",
      companyType: "PRIVATE_COMPANY_LIMITED_BY_SHARES"
    }
  }).then((resp) => {
    // Verifying the response status and message
    expect(resp.status).to.eq(200);
    expect(resp.body.status).to.eq("OK");

    // Verifying the data in the response
    const data = resp.body.data;
    
    expect(data.recommendedActions).to.have.length.greaterThan(0);
    expect(data.recommendedActions[0].message).to.eq("Proceed to filing");
    expect(data.complianceScorePercentage).to.be.a("number"); 
    expect(data.similarityScorePercentage).to.be.a("number");
    cy.wait(1500);
  });
});


  //  SUCCESSFUL NAME RESERVATION
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
      expect(response.body.data.createdDate).to.not.be.empty;
      expect(response.body.data.expiryDate).to.not.be.empty;

      cy.wait(1500);
    });
  });



   // NEGATIVE TEST: NAME ALREADY EXISTS
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


// REGISTER COMPANY – INVALID RESERVATION CODE
it("should return 400 BAD_REQUEST when an invalid reservationCode is used to register name", () => {
  cy.request({
    method: "POST",
    url: "http://41.207.248.246:9088/api/vas/llc/company",
    headers: HEADERS.VALID_API_KEY,
    failOnStatusCode: false,
    body: {
      reservationCode: "VAS17647518358",
      companyType: "PRIVATE_COMPANY_LIMITED_BY_SHARES",
        natureOfBusinessCategory: "Manufacturing",
        natureOfBusiness: "Food and Beverage Processing",
        principalActivityDescription: "Production of packaged fruit juices and bottled water",
        companyEmail: "peaceoasis9023@gmail.com",
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
    expect(resp.status).to.eq(400);
    expect(resp.body.status).to.eq("BAD_REQUEST");
    expect(resp.body.message).to.eq("invalid reservation code, provide a valid reservation code or a proposed name");
  });
});

// REGISTER COMPANY – INVALID DATA CODE
it("should return 400 BAD_REQUEST with message 'Invalid Data Provided'when invalid data is used to register name", () => {
  cy.request({
    method: "POST",
    url: "http://41.207.248.246:9088/api/vas/llc/company",
    headers: HEADERS.VALID_API_KEY,
    failOnStatusCode: false,
    body: {
      reservationCode: "VAS17647518358",
      companyType: "PRIVATE_COMPANY_LIMITED_BY_SHARES",
      natureOfBusinessCategory: "Manufacturing",
      natureOfBusiness: "Food and Beverage Processing",
      principalActivityDescription:
        "Production of packaged fruit juices and bottled water",
      companyEmail: "peaceoasis9023@gmail.com",
      phoneNumber: "070332323322",
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
      }
    }
  }).then((resp) => {
    expect(resp.status).to.eq(400);
    expect(resp.body.status).to.eq("BAD_REQUEST");
    expect(resp.body.message).to.eq("Invalid data provided");
  });
});




  // COMPANY REGISTRATION USING reservationCode SUCCESS
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
        companyEmail: "peaceoasis9023@gmail.com",
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

  // REGISTER COMPANY – TransactionRef ALREADY EXISTS
it("should return 400 with message 'Transaction Ref already exist for this process' when registering a company with an already-used TransactionRef", function () {
  cy.request({
    method: "POST",
    url: "http://41.207.248.246:9088/api/vas/llc/company",
    headers: HEADERS.VALID_API_KEY,
    failOnStatusCode: false,
    body: {
      transactionRef,
      reservationCode,
      companyType: "PRIVATE_COMPANY_LIMITED_BY_SHARES",
        natureOfBusinessCategory: "Manufacturing",
        natureOfBusiness: "Food and Beverage Processing",
        principalActivityDescription: "Production of packaged fruit juices and bottled water",
        companyEmail: "peaceoasis9023@gmail.com",
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
    expect(resp.status).to.eq(400);
    expect(resp.body.status).to.eq("BAD_REQUEST");
    expect(resp.body.message).to.eq("Transaction Ref already exist for this process");
  });
});



  // REGISTER COMPANY – NAME ALREADY EXISTS
it("should return 400 when registering a company with an already-used name", function () {
  cy.request({
    method: "POST",
    url: "http://41.207.248.246:9088/api/vas/llc/company",
    headers: HEADERS.VALID_API_KEY,
    failOnStatusCode: false,
    body: {
      reservationCode,
      companyType: "PRIVATE_COMPANY_LIMITED_BY_SHARES",
        natureOfBusinessCategory: "Manufacturing",
        natureOfBusiness: "Food and Beverage Processing",
        principalActivityDescription: "Production of packaged fruit juices and bottled water",
        companyEmail: "peaceoasis9023@gmail.com",
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
    expect(resp.status).to.eq(400);
    expect(resp.body.status).to.eq("BAD_REQUEST");
    expect(resp.body.message).to.eq("Name already exist");
  });
});

   // COMPANY REGISTRATION UPDATE USING reservationCode
  it("should update registration using the transactionRef", function () {
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
        companyEmail: "joyoasis9023@gmail.com",
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

// 4. REGISTER AFFILIATE - INDIVIDUAL
it("should register an individual affiliate using the same transactionRef", () => {

  cy.request({
    method: "POST",
    url: "http://41.207.248.246:9088/api/vas/llc/affiliates",
    headers: HEADERS.VALID_API_KEY,
    body: {
      transactionRef: transactionRef,
      individual: {
        surname: "John",
        firstname: "Terry",
        otherName: "Senior",
        occupation: "Software Engineer",
        nationality: "Nigerian",
        dob: "1990-05-12",
        gender: "MALE",
        email: "johnterry9023@gmail.com",
        phoneNumber: "08023456789",
        affiliateType: "DIRECTOR",
        serviceAddress: {
          country: "Nigeria",
          state: "Lagos",
          lga: "Ikeja",
          city: "Ikeja",
          streetInfo: "15A Allen Avenue"
        },
        residentialAddress: {
          country: "Nigeria",
          state: "Lagos",
          lga: "Eti-Osa",
          city: "Lekki",
          streetInfo: "45B Admiralty Way"
        },
        meansOfId: {
          idType: "NIN",
          idNumber: "12345678901",
          image: base64Images.meansOfId
        },
        signature: base64Images.signature,
        passport: base64Images.passport,
        isShareholder: true,
        shareAllotment: {
          allottedOrdinaryShares: 5000.00,
          allottedPreferenceShares: 1000.00
        }
      }
    }
  }).then((response) => {

    expect(response.status).to.eq(200);
    expect(response.body.status).to.eq("OK");
    expect(response.body.message).to.eq("Affiliate created");

    const data = response.body.data;

    // Verify affiliate key
    expect(data.affiliateKey).to.be.a("string");
    expect(data.affiliateKey).to.not.be.empty;
    affiliateKeyIndividual = response.body.data.affiliateKey;

    // Verify next step URL
    expect(data.nextStepUrl).to.be.a("string");
    expect(data.nextStepUrl).to.not.be.empty;

  });
});


// 5. REGISTER AFFILIATE - CORPORATE
it("should register a corporate affiliate using the same transactionRef", () => {

  cy.request({
    method: "POST",
    url: "http://41.207.248.246:9088/api/vas/llc/affiliates",
    headers: HEADERS.VALID_API_KEY,
    body: {
      transactionRef: transactionRef,
      corporate: {
        isForeign: false,
        rcNumber: "RC1234567",
        companyName: "TechNova Solutions Ltd",
        contactPhoneNumber: "08098765432",
        contactEmail: "info@technova.com",
        contactSignature:base64Images.signature,
        affiliateType: "SHAREHOLDER",
        serviceAddress: {
          country: "Nigeria",
          state: "Abuja",
          lga: "AMAC",
          city: "Abuja",
          streetInfo: "Plot 22, Central Business District"
        },
        isShareholder: true,
        shareAllotment: {
          allottedOrdinaryShares: 20000.0,
          allottedPreferenceShares: 5000.0
        }
      }
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.status).to.eq("OK");
    expect(response.body.message).to.eq("Affiliate created");

    const data = response.body.data;

    // Validate affiliate key
    expect(data.affiliateKey).to.be.a("string");
    expect(data.affiliateKey).to.not.be.empty;
    affiliateKeyCorporate = response.body.data.affiliateKey;
    // Validate nextStepUrl
    expect(data.nextStepUrl).to.be.a("string");
    expect(data.nextStepUrl).to.not.be.empty;
  });

});


  // 4b. UPDATE INDIVIDUAL AFFILIATE
it("should update the individual affiliate details", () => {
    cy.request({
      method: "PUT",
      url: "http://41.207.248.246:9088/api/vas/llc/affiliates",
      headers: HEADERS.VALID_API_KEY,
      body: {
        transactionRef: transactionRef,
        affiliateKey: affiliateKeyIndividual, 
        surname: "Joycee",
        firstname: "Kemi",
        otherName: "Kolawole",
        occupation: "Senior Software Engineer",
        dob: "1990-05-12",
        gender: "FEMALE",
        email: "joyoasis9023@gmail.com",
        phoneNumber: "08033499949",
        affiliateType: "DIRECTOR",
        serviceAddress: {
          country: "Nigeria",
          state: "Lagos",
          lga: "Ikeja",
          city: "Ikeja",
          streetInfo: "15A Allen Avenue"
        },
        residentialAddress: {
          country: "Nigeria",
          state: "Lagos",
          lga: "Eti-Osa",
          city: "Lekki",
          streetInfo: "45B Admiralty Way"
        },
        meansOfId: {
          idType: "NIN",
          idNumber: "IND202511250842060000000099",
          image: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9YqTbtQAAAAASUVORK5CYII="
        },
        signature: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9YqTbtQAAAAASUVORK5CYII=",
        isShareholder: true,
        shareAllotment: {
          allottedOrdinaryShares: 7500.00,
          allottedPreferenceShares: 2000.00
        }
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq("OK");
      expect(response.body.message).to.eq("Affiliate Updated");
  
    });
  });


  // 5b. UPDATE CORPORATE AFFILIATE
  it("should update the corporate affiliate details", () => {
    cy.request({
      method: "PUT",
       url: "http://41.207.248.246:9088/api/vas/llc/affiliates",
      headers: HEADERS.VALID_API_KEY,
      body: {
        transactionRef: transactionRef,
        affiliateKey: affiliateKeyCorporate,  
        isForeign: false,
        rcNumber: "RC1234567",
        companyName: "TechNova Solutions Ltd",
        contactPhoneNumber: "07033443322",
        contactEmail: "info@technova.com",
        contactSignature: "base64encodedstring-signature",
        affiliateType: "SHAREHOLDER",
        serviceAddress: {
          country: "Nigeria",
          state: "Abuja",
          lga: "AMAC",
          city: "Abuja",
          streetInfo: "Plot 22, Central Business District"
        },
        isShareholder: true,
        shareAllotment: {
          allottedOrdinaryShares: 20000.00,
          allottedPreferenceShares: 5000.00
        }
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq("OK");
      expect(response.body.message).to.eq("Affiliate Updated");
    });
  });

// 7. DELETE AFFILIATE – INVALID affiliate_id / transaction_ref
it("should return 400 when deleting affiliate with invalid affiliate_id or transaction_ref", () => {
  cy.request({
    method: "DELETE",
    url: "http://41.207.248.246:9088/api/vas/llc/affiliates",
    headers: HEADERS.VALID_API_KEY,
    failOnStatusCode: false,
    body: {
      affiliate_id: "IND2025120210210599190000284",
      transaction_ref: "VAS202512021008297530"
    }
  }).then((resp) => {
    expect(resp.status).to.eq(400);
    expect(resp.body.status).to.eq("BAD_REQUEST");
    expect(resp.body.message).to.eq(
      "Invalid affiliate key or transactionRef passed"
    );
    expect(resp.body.data).to.be.null;
    expect(resp.body.success).to.be.false;
  });
});

//  DELETE AFFILIATE – SUCCESS 
it("should delete an affiliate successfully and return 200", function() {
  cy.request({
    method: "DELETE",
    url: "http://41.207.248.246:9088/api/vas/llc/affiliates",
    headers: HEADERS.VALID_API_KEY,
    failOnStatusCode: false,
    body: {
      affiliate_id: affiliateKeyCorporate,
      transaction_ref: transactionRef
    }
  }).then((deleteResp) => {
     expect(deleteResp.status).to.eq(200);
     expect(deleteResp.body.status).to.eq("OK");
     expect(deleteResp.body.message).to.eq("Affiliate deleted");
     expect(deleteResp.body.data.affiliateKey).to.eq(affiliateKeyCorporate);
     expect(deleteResp.body.success).to.be.true;
  });
});





  it("should successfully submit the company registration", () => {
    cy.request({
      method: "POST",
      url: "http://41.207.248.246:9088/api/vas/llc/register",
      headers: HEADERS.VALID_API_KEY,
      body: {
        transactionRef: transactionRef 
      }
    }).then((response) => {
      expect(response.status).to.eq(200);  // Assert status is 200 OK
      // Validate registration details in the response
      expect(response.body.registration).to.have.property("transactionRef");
      expect(response.body.registration).to.have.property("transactionRef");
      expect(response.body.registration.transactionRef).to.eq(transactionRef);  

      expect(response.body.registration).to.have.property("proposedName");
      expect(response.body.registration.proposedName).to.not.be.empty;
      expect(response.body.registration).to.have.property("reservationCode");
      expect(response.body.registration.reservationCode).to.eq(reservationCode);  

      expect(response.body.registration).to.have.property("natureOfBusiness");
      expect(response.body.registration.natureOfBusiness).to.not.be.empty; 

      // Validate share details
      expect(response.body.shares).to.have.property("shareCapital");
      expect(response.body.shares.shareCapital).to.be.a("number");  
      expect(response.body.shares.shareCapital).to.be.greaterThan(0);



      expect(response.body.shares).to.have.property("ordinaryIssuedShare");
      expect(response.body.shares.ordinaryIssuedShare).to.be.a("number");  
      expect(response.body.shares.ordinaryIssuedShare).to.be.greaterThan(0); 

      expect(response.body.shares).to.have.property("preferenceIssuedShare");
      expect(response.body.shares.preferenceIssuedShare).to.be.a("number"); 
      expect(response.body.shares.preferenceIssuedShare).to.be.greaterThan(0)

      // Validate statutory payment information
      expect(response.body.statutoryPayment).to.have.property("paid");
      expect(response.body.statutoryPayment.paid).to.eq(true); 

      expect(response.body.statutoryPayment).to.have.property("statutoryFee");
      expect(response.body.statutoryPayment.statutoryFee).to.be.a("number");   
      expect(response.body.statutoryPayment.statutoryFee).to.be.greaterThan(0);  
    });
  });

});
