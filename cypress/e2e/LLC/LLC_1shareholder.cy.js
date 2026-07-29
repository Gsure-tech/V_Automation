import { base64Images } from "../../fixtures/base64Images";
import { HEADERS } from "../../support/constants";

// NAME RESERVATION, COMPANY REGISTRATION & SHARE REGISTRATION TESTS
describe("LLC Registration API Flow", () => {
  let reservationCode;
  let transactionRef;
  let affiliateKeyIndividual1;
  let affiliateKeyIndividual2;
  let affiliateKeyPSC1;
  let affiliateKeyPSC2;
  let affiliateKeyCorporate;
  let stampDutyPaymentUrl;
    // const baseUrl = "https://vasapp.oasisproducts.ng";
    const baseUrl = "https://vasapp.oasisproducts.ng";

    // A. COMPLIANCE CHECK USING PROPOSED NAME
    it("should check compliance using the proposedName", () => {
        // Define the payload based on your Postman body
        const payload = {
            lineOfBusiness: "ICT",
            proposedName: "Hexagraph LIMITED",
            companyType: "PRIVATE_COMPANY_LIMITED_BY_SHARES",
        };

        cy.api({
            method: "POST",
            // Ensure the path includes '/api' as shown in your Postman screenshot
            url: `${baseUrl}/api/vas/llc/compliance`,
            headers: HEADERS.VALID_API_KEY,
            body: payload,
            failOnStatusCode: false // Helps debug if the server returns 4xx or 500
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.status).to.eq("OK");
            expect(response.body.statusCode).to.eq(200);
            const data = response.body.data;

            // 3. Validate Compliance Data
            expect(data.proposedName).to.eq(payload.proposedName);

            // Check the first recommended action message
            expect(data.recommendedActions[0].message).to.contain("Proceed to filing");

            // Validate scores are numbers
            expect(data.complianceScorePercentage).to.be.a("number");
            expect(data.similarityScorePercentage).to.be.a("number");

            cy.log('Compliance Check Passed: ' + data.recommendedActions[0].message);
        });
    });

  //  SUCCESSFUL NAME RESERVATION
  it("should return 200 and reservation details when a unique proposedName is submitted", () => {
    const proposedName = `TestThursday${Date.now()} Academy Limited`;

    cy.api({
      method: "POST",
      url: `${baseUrl}/api/vas/llc/name-reservation`,
      headers: HEADERS.VALID_API_KEY,
      body: {
        proposedName,
        companyTypes: "PRIVATE_COMPANY_LIMITED_BY_SHARES",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq("OK");
      expect(response.body.message).to.eq("Name reserved");

      reservationCode = response.body.data.reservationCode;
      expect(reservationCode).to.not.be.empty;

      expect(response.body.data.nextStepUrl).to.not.be.empty;
      expect(response.body.data.createdDate).to.not.be.empty;
      expect(response.body.data.expiryDate).to.not.be.empty;

      cy.log(`Reservation code : ${reservationCode}`)
        cy.log(`Proposed name : ${proposedName}`)
        cy.wait(1500);
    });
  });

  // NEGATIVE TEST: NAME ALREADY EXISTS
  it("should return 400 when the proposed name already exists", () => {
    cy.api({
      method: "POST",
      url: `${baseUrl}/api/vas/llc/name-reservation`,
      headers: HEADERS.VALID_API_KEY,
      failOnStatusCode: false,
      body: {
        proposedName: "Zarah Academy Enterprise",
        companyTypes: "PRIVATE_COMPANY_LIMITED_BY_SHARES",
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("Bad Request");
      expect(response.body.message).to.eq("Name already exist");
    });
  });

  // REGISTER COMPANY – INVALID RESERVATION CODE
  it("should return 400 Bad Request when an invalid reservationCode is used to register name", () => {
    cy.api({
      method: "POST",
      url: `${baseUrl}/api/vas/llc/company`,
      headers: HEADERS.VALID_API_KEY,
      failOnStatusCode: false,
      body: {
        reservationCode: "VAS17647518358",
        companyType: "PRIVATE_COMPANY_LIMITED_BY_SHARES",
          natureOfBusinessCategory: "TRANSPORTATION",
          natureOfBusiness: "ROAD TRANSPORTATION SERVICES",
        principalActivityDescription:
          "Production of packaged fruit juices and bottled water",
        companyEmail: "peaceoasis9023@gmail.com",
        phoneNumber: "07033223322",
        companyAddress: {
          registeredAddress: {
            state: "Lagos",
            lga: "Ikeja",
            city: "Ikeja",
            street: "15A Adeola Odeku Street",
          },
          headOffice: {
            state: "Lagos",
            lga: "Eti-Osa",
            city: "Victoria Island",
            street: "45B Ahmadu Bello Way",
          },
        },
        objectsOfMem: [
          "Organize and manage public prize draws",
          "Provide betting services for sports events",
          "Administer state-regulated chance games",
          "Offer wagering on athletic competitions",
          "Facilitate community fundraising through raffles",
        ],
      },
    }).then((resp) => {
      expect(resp.status).to.eq(400);
      expect(resp.body.status).to.eq("Bad Request");
      expect(resp.body.message).to.eq(
        "invalid reservation code, provide a valid reservation code or a proposed name",
      );
    });
  });

  // REGISTER COMPANY – INVALID DATA CODE
  it("should return 400 BAD_api with message 'Invalid Data Provided'when invalid data is used to register name", () => {
    cy.api({
      method: "POST",
      url: `${baseUrl}/api/vas/llc/company`,
      headers: HEADERS.VALID_API_KEY,
      failOnStatusCode: false,
      body: {
        reservationCode: "VAS17647518358",
        companyType: "PRIVATE_COMPANY_LIMITED_BY_SHARES",
          natureOfBusinessCategory: "TRANSPORTATION",
          natureOfBusiness: "ROAD TRANSPORTATION SERVICES",
        principalActivityDescription:
          "Production of packaged fruit juices and bottled water",
        companyEmail: "peaceoasis9023@gmail.com",
        phoneNumber: "070332323322",
        companyAddress: {
          registeredAddress: {
            state: "Lagos",
            lga: "Ikeja",
            city: "Ikeja",
            street: "15A Adeola Odeku Street",
          },
          headOffice: {
            state: "Lagos",
            lga: "Eti-Osa",
            city: "Victoria Island",
            street: "45B Ahmadu Bello Way",
          },
        },
      },
    }).then((resp) => {
      expect(resp.status).to.eq(400);
      expect(resp.body.status).to.eq("Bad Request");
      expect(resp.body.message).to.eq("Invalid data provided");
    });
  });

  // COMPANY REGISTRATION USING reservationCode SUCCESS
  it("should use the reservationCode from the name reservation to create a company", function () {
    transactionRef = `VAS${Date.now()}`; // unique ID for this test run

    cy.api({
      method: "POST",
      url: `${baseUrl}/api/vas/llc/company`,
      headers: HEADERS.VALID_API_KEY,
      body: {
        transactionRef,
        reservationCode,
        companyType: "PRIVATE_COMPANY_LIMITED_BY_SHARES",
        natureOfBusinessCategory: "TRANSPORTATION",
        natureOfBusiness: "ROAD TRANSPORTATION SERVICES",
        principalActivityDescription:
          "Production of packaged fruit juices and bottled water",
        companyEmail: "peaceoasis9023@gmail.com",
        phoneNumber: "07033223322",
        companyAddress: {
          registeredAddress: {
            state: "Lagos",
            lga: "Ikeja",
            city: "Ikeja",
            street: "15A Adeola Odeku Street",
          },
          headOffice: {
            state: "Lagos",
            lga: "Eti-Osa",
            city: "Victoria Island",
            street: "45B Ahmadu Bello Way",
          },
        },
        objectsOfMem: [
          "Organize and manage public prize draws",
          "Provide betting services for sports events",
          "Administer state-regulated chance games",
          "Offer wagering on athletic competitions",
          "Facilitate community fundraising through raffles",
        ],
      },
    }).then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.body.status).to.eq("OK");
      expect(resp.body.message).to.eq("Company created");

      expect(resp.body.data.transactionRef).to.eq(transactionRef);
      expect(resp.body.data.nextStepUrl).to.not.be.empty;
      cy.log(`Transaction Ref: ${transactionRef}`);
      cy.wait(1500);
    });
  });

  // REGISTER COMPANY – TransactionRef ALREADY EXISTS
  it("should return 400 with message 'Transaction Ref already exist for this process' when registering a company with an already-used TransactionRef", function () {
    cy.api({
      method: "POST",
      url: `${baseUrl}/api/vas/llc/company`,
      headers: HEADERS.VALID_API_KEY,
      failOnStatusCode: false,
      body: {
        transactionRef,
        reservationCode,
        companyType: "PRIVATE_COMPANY_LIMITED_BY_SHARES",
          natureOfBusinessCategory: "TRANSPORTATION",
          natureOfBusiness: "ROAD TRANSPORTATION SERVICES",
        principalActivityDescription:
          "Production of packaged fruit juices and bottled water",
        companyEmail: "peaceoasis9023@gmail.com",
        phoneNumber: "07033223322",
        companyAddress: {
          registeredAddress: {
            state: "Lagos",
            lga: "Ikeja",
            city: "Ikeja",
            street: "15A Adeola Odeku Street",
          },
          headOffice: {
            state: "Lagos",
            lga: "Eti-Osa",
            city: "Victoria Island",
            street: "45B Ahmadu Bello Way",
          },
        },
        objectsOfMem: [
          "Organize and manage public prize draws",
          "Provide betting services for sports events",
          "Administer state-regulated chance games",
          "Offer wagering on athletic competitions",
          "Facilitate community fundraising through raffles",
        ],
      },
    }).then((resp) => {
      expect(resp.status).to.eq(400);
      expect(resp.body.status).to.eq("Bad Request");
      expect(resp.body.message).to.eq(
        "Transaction Ref already exist for this process",
      );
    });
  });

  // REGISTER COMPANY – NAME ALREADY EXISTS
  it("should return 400 when registering a company with an already-used name", function () {
    cy.api({
      method: "POST",
      url: `${baseUrl}/api/vas/llc/company`,
      headers: HEADERS.VALID_API_KEY,
      failOnStatusCode: false,
      body: {
        reservationCode,
        companyType: "PRIVATE_COMPANY_LIMITED_BY_SHARES",
          natureOfBusinessCategory: "TRANSPORTATION",
          natureOfBusiness: "ROAD TRANSPORTATION SERVICES",
        principalActivityDescription:
          "Production of packaged fruit juices and bottled water",
        companyEmail: "peaceoasis9023@gmail.com",
        phoneNumber: "07033223322",
        companyAddress: {
          registeredAddress: {
            state: "Lagos",
            lga: "Ikeja",
            city: "Ikeja",
            street: "15A Adeola Odeku Street",
          },
          headOffice: {
            state: "Lagos",
            lga: "Eti-Osa",
            city: "Victoria Island",
            street: "45B Ahmadu Bello Way",
          },
        },
        objectsOfMem: [
          "Organize and manage public prize draws",
          "Provide betting services for sports events",
          "Administer state-regulated chance games",
          "Offer wagering on athletic competitions",
          "Facilitate community fundraising through raffles",
        ],
      },
    }).then((resp) => {
      expect(resp.status).to.eq(400);
      expect(resp.body.status).to.eq("Bad Request");
      expect(resp.body.message).to.eq("Name already exist");
    });
  });

  // COMPANY REGISTRATION UPDATE USING reservationCode
  it("should update registration using the transactionRef", function () {
    cy.api({
      method: "PUT",
      url: `${baseUrl}/api/vas/llc/company`,
      headers: HEADERS.VALID_API_KEY,
      body: {
        transactionRef,
        reservationCode,
        companyType: "PRIVATE_COMPANY_LIMITED_BY_SHARES",
          natureOfBusinessCategory: "TRANSPORTATION",
          natureOfBusiness: "ROAD TRANSPORTATION SERVICES",
        principalActivityDescription:
          "Production of packaged fruit juices and bottled water",
        companyEmail: "joyoasis9023@gmail.com",
        phoneNumber: "07033223322",
        companyAddress: {
          registeredAddress: {
            state: "Lagos",
            lga: "Ikeja",
            city: "Ikeja",
            street: "15A Adeola Odeku Street",
          },
          headOffice: {
            state: "Lagos",
            lga: "Eti-Osa",
            city: "Victoria Island",
            street: "45B Ahmadu Bello Way",
          },
        },
        objectsOfMem: [
          "Organize and manage public prize draws",
          "Provide betting services for sports events",
          "Administer state-regulated chance games",
          "Offer wagering on athletic competitions",
          "Facilitate community fundraising through raffles",
        ],
      },
    }).then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.body.status).to.eq("OK");
      expect(resp.body.message).to.eq("Company updated");
      expect(resp.body.data).to.eq("Company Data updated");
      cy.wait(1500);
    });
  });

  // 3. REGISTER SHARES USING SAME transactionRef
  it("should register share details using the same transactionRef", () => {
    cy.api({
      method: "POST",
      url: `${baseUrl}/api/vas/llc/shares`,
      headers: HEADERS.VALID_API_KEY,
      body: {
        transactionRef,
        ordinaryIssuedShare: 20000000.0,
        // preferenceIssuedShare: 5000000.0,
        pricePerShare: 2000000.0,
      },
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.status).to.eq("OK");
        expect(response.body.message).to.eq("Share details created");

        const data = response.body.data;
        expect(data.transactionRef).to.eq(transactionRef);

        expect(Number(data.shareCapital)).to.be.greaterThan(0);

// Check ordinaryShare values
        expect(data.shareDetails.ordinaryShare.issuedShare).to.be.a("string");
        expect(Number(data.shareDetails.ordinaryShare.issuedShare)).to.be.greaterThan(0);

        expect(data.shareDetails.ordinaryShare.pricePerShare).to.be.a("string");
        expect(data.shareDetails.ordinaryShare.shareDivision).to.be.a("number");
//         expect(data.shareDetails.preferenceShare.issuedShare).to.be.a("string");
//         expect(Number(data.shareDetails.preferenceShare.issuedShare)).to.set.eq(0);

// nextStepUrl Check
        expect(data.nextStepUrl).to.be.a("string");
        expect(data.nextStepUrl).to.not.be.empty;
    });
  });

// 4. REGISTER AFFILIATE - INDIVIDUAL 1st
    it("should register an individual affiliate using the same transactionRef AS 1st Affiliate", () => {
        cy.api({
            method: "POST",
            url: `${baseUrl}/api/vas/llc/affiliates`,
            headers: HEADERS.VALID_API_KEY,
            body: {
                transactionRef: transactionRef,
                individual: {
                    surname: "Adamu",
                    firstname: "John",
                    otherName: "Doe",
                    occupation: "Software Engineer",
                    nationality: "Nigerian",
                    dob: "1990-01-01",
                    gender: "MALE",
                    email: "johnterry9023@gmail.com",
                    phoneNumber: "08023456789",
                    affiliateType: ["DIRECTOR", "SHAREHOLDER"],
                    serviceAddress: {
                        country: "Nigeria",
                        state: "Lagos",
                        lga: "Ikeja",
                        city: "Ikeja",
                        streetInfo: "15A Allen Avenue",
                    },
                    residentialAddress: {
                        country: "Nigeria",
                        state: "Lagos",
                        lga: "Eti-Osa",
                        city: "Lekki",
                        streetInfo: "45B Admiralty Way",
                    },
                    meansOfId: {
                        idType: "NIN",
                        idNumber: "70123456789",
                        image: base64Images.passport,
                    },
                    signature: base64Images.passport,
                    isShareholder: true,
                    shareAllotment: {
                        allottedOrdinaryShares: 20000000.0 // Kept as numeric float matching Postman
                    }
                },
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.success).to.be.true;
            expect(response.body.statusCode).to.eq(200);
            expect(response.body.status).to.eq("OK");
            expect(response.body.message).to.eq("Affiliate created");

            const data = response.body.data;

            // Validate and capture Affiliate Key safely
            expect(data.affiliateKey).to.be.a("string");
            expect(data.affiliateKey).to.not.be.empty;

            // Assigning the dynamic key to your tracking variable
            affiliateKeyIndividual1 = data.affiliateKey;

            // Validate Next Step URL
            expect(data.nextStepUrl).to.be.a("string");
            expect(data.nextStepUrl).to.not.be.empty;

            cy.log(`1st Affiliate Key: ${affiliateKeyIndividual1}`);
        });
    });

  // 5. REGISTER AFFILIATE - INDIVIDUAL 2nd
    it("should register an individual affiliate using the same transactionRef AS 2nd Affiliate", () => {
        cy.api({
            method: "POST",
            url: `${baseUrl}/api/vas/llc/affiliates`,
            headers: HEADERS.VALID_API_KEY,
            body: {
                transactionRef: transactionRef,
                individual: {
                    surname: "Emem",
                    firstname: "Kenny",
                    otherName: "Gimmy",
                    occupation: "Software Engineer",
                    nationality: "Nigerian",
                    dob: "1990-05-12",
                    gender: "MALE",
                    email: "johnterry9023@gmail.com",
                    phoneNumber: "08023456789",
                    affiliateType: ["WITNESS"],
                    serviceAddress: {
                        country: "Nigeria",
                        state: "Lagos",
                        lga: "Ikeja",
                        city: "Ikeja",
                        streetInfo: "15A Allen Avenue",
                    },
                    residentialAddress: {
                        country: "Nigeria",
                        state: "Lagos",
                        lga: "Eti-Osa",
                        city: "Lekki",
                        streetInfo: "45B Admiralty Way",
                    },
                    meansOfId: {
                        idType: "NIN",
                        idNumber: "70123456789",
                        image: base64Images.passport,
                    },
                    signature: base64Images.passport,
                    isShareholder: false,
                    // shareAllotment: {
                    //     allottedOrdinaryShares: 1000000.0
                    // }
                },
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.success).to.be.true;
            expect(response.body.statusCode).to.eq(200);
            expect(response.body.status).to.eq("OK");
            expect(response.body.message).to.eq("Affiliate created");

            const data = response.body.data;

            // Validate and capture Affiliate Key safely
            expect(data.affiliateKey).to.be.a("string");
            expect(data.affiliateKey).to.not.be.empty;

            // Assigning the dynamic key to your tracking variable
            affiliateKeyIndividual2 = data.affiliateKey;

            // Validate Next Step URL
            expect(data.nextStepUrl).to.be.a("string");
            expect(data.nextStepUrl).to.not.be.empty;

            cy.log(`1st Affiliate Key: ${affiliateKeyIndividual2}`);
        });
    });


   // 5. REGISTER AFFILIATE - INDIVIDUAL 3nd
    it("should register an individual affiliate using the same transactionRef AS 3nd Affiliate", () => {
        cy.api({
            method: "POST",
            url: `${baseUrl}/api/vas/llc/affiliates`,
            headers: HEADERS.VALID_API_KEY,
            body: {
                transactionRef: transactionRef,
                individual: {
                    surname: "Musa",
                    firstname: "Joseph",
                    otherName: "Tems",
                    occupation: "Software Engineer",
                    nationality: "Nigerian",
                    dob: "1990-05-12",
                    gender: "MALE",
                    email: "johnterry9023@gmail.com",
                    phoneNumber: "08023456789",
                    affiliateType: ["DIRECTOR"],
                    serviceAddress: {
                        country: "Nigeria",
                        state: "Lagos",
                        lga: "Ikeja",
                        city: "Ikeja",
                        streetInfo: "15A Allen Avenue",
                    },
                    residentialAddress: {
                        country: "Nigeria",
                        state: "Lagos",
                        lga: "Eti-Osa",
                        city: "Lekki",
                        streetInfo: "45B Admiralty Way",
                    },
                    meansOfId: {
                        idType: "NIN",
                        idNumber: "70123456789",
                        image: base64Images.passport,
                    },
                    signature: base64Images.passport,
                    isShareholder: false,
                    // shareAllotment: {
                    //     allottedOrdinaryShares: 1000000.0
                    // }
                },
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.success).to.be.true;
            expect(response.body.statusCode).to.eq(200);
            expect(response.body.status).to.eq("OK");
            expect(response.body.message).to.eq("Affiliate created");

            const data = response.body.data;

            // Validate and capture Affiliate Key safely
            expect(data.affiliateKey).to.be.a("string");
            expect(data.affiliateKey).to.not.be.empty;

            // Assigning the dynamic key to your tracking variable
            affiliateKeyIndividual2 = data.affiliateKey;

            // Validate Next Step URL
            expect(data.nextStepUrl).to.be.a("string");
            expect(data.nextStepUrl).to.not.be.empty;

            cy.log(`1st Affiliate Key: ${affiliateKeyIndividual2}`);
        });
    });



// REGISTER PSC 1
//     it("should add a person with significant control (PSC) 1", () => {
//         cy.api({
//             method: "POST",
//             url: `${baseUrl}/api/vas/llc/psc`,
//             headers: HEADERS.VALID_API_KEY,
//             body: {
//                 transactionRef: transactionRef,
//                 affiliateKey: affiliateKeyIndividual1,
//                 // individual: {
//                 //   surname: "Lekan",
//                 //   firstname: "Chinedu",
//                 //   otherName: "Moses",
//                 //   occupation: "Civil Engineer",
//                 //   nationality: "Nigerian",
//                 //   dob: "1988-05-15",
//                 //   gender: "MALE",
//                 //   email: "chidi.adepoju@example.com",
//                 //   phoneNumber: "09011223344",
//                 //   affiliateType: ["PSC"],
//                 //   serviceAddress: {
//                 //     country: "NIGERIA",
//                 //     state: "LAGOS",
//                 //     lga: "IKEJA",
//                 //     city: "Lagos",
//                 //     streetInfo: "15 Adeola Odeku Street, Victoria Island",
//                 //   },
//                 //   residentialAddress: {
//                 //     country: "NIGERIA",
//                 //     state: "IMO",
//                 //     lga: "MBAITOLI",
//                 //     city: "Owerri",
//                 //     streetInfo: "12 Okija Road, opposite Modern Market",
//                 //   },
//                 //   meansOfId: {
//                 //     idType: "NIN",
//                 //     idNumber: "70123456789",
//                 //     image: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9YqTbtQAAAAASUVORK5CYII=",
//                 //   },
//                 //   signature: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9YqTbtQAAAAASUVORK5CYII=",
//                 //   passport: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9YqTbtQAAAAASUVORK5CYII=",
//                 // },
//                 ownsIndirectShares: false,
//                 // indirectShareDetails: {
//                 //     sharePercent: "5",
//                 //     legalOwners: [
//                 //         {
//                 //             affiliateKey: affiliateKeyIndividual1,
//                 //             sharePercent: "5"
//                 //         }
//                 //     ]
//                 // },
//                 ownsDirectShares: true,
//                 directShareDetails: {
//                     sharePercent: "100",
//                     legalOwners: [
//                         {
//                             // Using the affiliateKey from the Individual/Director registration step
//                             affiliateKey: affiliateKeyIndividual1,
//                             sharePercent: "100",
//                         },
//                     ],
//                 },
//                 isPep: true,
//                 pepDetails: {
//                     reasonForPep: "Former government official",
//                     pepType: "DOMESTIC_PEP",
//                     roleOfPep: "Former Minister",
//                     officeOfPep: "Ministry of Finance",
//                 },
//                 isPscAffiliated: true,
//                 pscAffiliateDetails: {
//                     entityName: "Amigo and Sons Inc",
//                     entityNumber: "RC9098778",
//                     isAffiliatePlc: true,
//                     plcDetails: {
//                         stockExchangeId: "NGX",
//                         identifierCode: "AMIG",
//                         tickerCode: "AMIG.NG",
//                     },
//                     isAffiliateStateOwned: false,
//                 },
//                 canChangeDirectors: true,
//                 hasSignificantControlOfCompany: true,
//             },
//         }).then((response) => {
//             expect(response.status).to.eq(200);
//             expect(response.body.status).to.eq("OK");
//             expect(response.body.message).to.eq("PSC created successfully");
//             expect(response.body.success).to.be.true;
//
//             // Capture the PSC affiliateKey safely
//             const data = response.body.data;
//             expect(data.affiliateKey).to.be.a("string").and.not.be.empty;
//
//             // Assign to tracking variable
//             const affiliateKeyPSC1 = data.affiliateKey;
//
//             cy.log(`Stored PSC 1 Affiliate Key: ${affiliateKeyPSC1}`);
//         });
//     });


// REGISTER PSC 2
it("should add a person with significant control (PSC) 2", () => {
  cy.log(`Stored PSC 2 Affiliate Key: ${affiliateKeyIndividual2}`),
  cy.api({
    method: "POST",
    url: `${baseUrl}/api/vas/llc/psc`,
    headers: HEADERS.VALID_API_KEY,
    body: {
      transactionRef: transactionRef,
      // affiliateKey: affiliateKeyIndividual2,
      individual: {
        surname: "Lekan",
        firstname: "Chinedu",
        otherName: "Moses",
        occupation: "Civil Engineer",
        nationality: "Nigerian",
        dob: "1988-05-15",
        gender: "MALE",
        email: "chidi.adepoju@example.com",
        phoneNumber: "09011223344",
        affiliateType: ["PSC"],
        serviceAddress: {
          country: "NIGERIA",
          state: "LAGOS",
          lga: "IKEJA",
          city: "Lagos",
          streetInfo: "15 Adeola Odeku Street, Victoria Island",
        },
        residentialAddress: {
          country: "NIGERIA",
          state: "IMO",
          lga: "MBAITOLI",
          city: "Owerri",
          streetInfo: "12 Okija Road, opposite Modern Market",
        },
        meansOfId: {
          idType: "NIN",
          idNumber: "70123456789",
          image: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9YqTbtQAAAAASUVORK5CYII=",
        },
        signature: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9YqTbtQAAAAASUVORK5CYII=",
        passport: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9YqTbtQAAAAASUVORK5CYII=",
      },
        ownsIndirectShares: true,
        indirectShareDetails: {
            sharePercent: "100",
            legalOwners: [
                {
                    affiliateKey: affiliateKeyIndividual1,
                    sharePercent: "100"
                }
            ]
        },
        ownsDirectShares: false,
        // directShareDetails: {
        //   sharePercent: "50",
        //   legalOwners: [
        //     {
        //       // Using the affiliateKey from the Individual/Director registration step
        //       affiliateKey: affiliateKeyIndividual2,
        //       sharePercent: "50",
        //     },
        //   ],
        // },
        isPep: true,
        pepDetails: {
          reasonForPep: "Former government official",
          pepType: "DOMESTIC_PEP",
          roleOfPep: "Former Minister",
          officeOfPep: "Ministry of Finance",
        },
        isPscAffiliated: true,
        pscAffiliateDetails: {
          entityName: "Amigo and Sons Inc",
          entityNumber: "218287",
          isAffiliatePlc: true,
          plcDetails: {
            stockExchangeId: "NGX",
            identifierCode: "AMIG",
            tickerCode: "AMIG.NG",
          },
          isAffiliateStateOwned: false,
        },
        canChangeDirectors: true,
        hasSignificantControlOfCompany: true,
      },
  }).then((response) => {
    // Asserting the success status based on your sample response
    cy.log(`Stored PSC 2 Affiliate Key: ${affiliateKeyPSC2}`);
    cy.log(`Stored PSC 2 Affiliate Key: ${affiliateKeyIndividual2}`);
    expect(response.status).to.eq(200);
    expect(response.body.status).to.eq("OK");
    expect(response.body.message).to.eq("PSC created successfully");
    expect(response.body.success).to.be.true;

    // Capture the PSC affiliateKey for the final registration step
    const data = response.body.data;
    expect(data.affiliateKey).to.be.a("string").and.not.be.empty;

    // Storing the value globally/locally for the next it block
    affiliateKeyPSC2 = data.affiliateKey;

    cy.log(`Stored PSC 2 Affiliate Key: ${affiliateKeyPSC2}`);
  });
});


//SUBMIT REGISTRATION
it("should successfully submit the company registration", () => {
  cy.api({
    method: "POST",
    url: `${baseUrl}/api/vas/llc/register`,
      qs: {
          priorityService: true
      },
    headers: HEADERS.VALID_API_KEY,
    body: {
      transactionRef: transactionRef,
    },
  }).then((response) => {
      expect(response.status).to.eq(200);
      const body = response.body;

// 1. Validate Top Level Properties (PascalCase to match payload)
      expect(body).to.have.property("ID").to.be.a("string");

// 2. Validate Registration Object
      const reg = body.Registration;
      expect(reg.TransactionRef).to.eq(transactionRef);
      expect(reg.ProposedName).to.be.a("string").and.not.be.empty;
      expect(reg.ReservationCode).to.eq(reservationCode);
      expect(reg.NatureOfBusiness).to.not.be.empty;

// Validate ObjectsOfMem is an array and has items
      expect(reg.ObjectsOfMem).to.be.an("array").and.have.length.at.least(1);

// Validate Address array structure
      expect(reg.Address).to.be.an("array").and.have.length.at.least(1);
      expect(reg.Address[0]).to.have.property("Type");

// 3. Validate Shares Object (Converting numeric strings to Numbers)
      const shares = body.Shares;
      expect(shares.ShareCapital).to.be.a("string");
      expect(Number(shares.ShareCapital)).to.be.at.least(0);


// 6. Logs for debugging
      cy.log(`Final Registration ID: ${body.ID}`);
      cy.log(`Transaction Ref: ${reg.TransactionRef}`);
      cy.log(`Statutory Fee Paid: ${payment.StatutoryFee}`);
  });
});

//CHECK REGISTRATION STATUS
    it("should successfully check the status of the registration using the current transactionRef", () => {
        // Ensure the transactionRef exists before proceeding
        expect(transactionRef).to.not.be.undefined;
        cy.wait(9000);
        cy.api({
            method: 'GET',
            url: `${baseUrl}/api/vas/llc/status/${transactionRef}`,
            headers: HEADERS.VALID_API_KEY
        }).then((response) => {
            // 1. Assert Basic Response Info
            expect(response.status).to.eq(200);
            expect(response.body.statusCode).to.eq(200);
            expect(response.body.status).to.eq("OK");
            expect(response.body.success).to.be.true;

            // 2. Assert Data Structure
            const data = response.body.data;

            // Since it was just submitted, the status should be PENDING or similar
            expect(data.status).to.be.oneOf(["PENDING", "QUERIED", "APPROVED"]);
            expect(data.transactionRef).to.eq(transactionRef);

            expect(data.data.entityName).to.not.be.empty;

            // Log for visibility in the runner
            cy.log(`Current Status for ${transactionRef}: ${data.status}`);
        });
    });

});
