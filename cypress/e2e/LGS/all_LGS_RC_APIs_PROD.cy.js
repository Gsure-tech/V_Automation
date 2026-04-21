import { LGS_PROD_APIKEY } from '../../support/constants';

describe("RC Services", () => {
    const apiUrl = "https://app.legalservices.com.ng";

    it("should successfully retrieve company data using GET_COMPANY_BY_NAME", () => {
        cy.request({
            method: 'POST',
            url: `${apiUrl}/api/ls/validation/vas-services/rc/GET_COMPANY_BY_NAME`,
            qs: {
                apiMode: 'DEV'
            },
            headers: {
                'Content-Type': 'application/json',
                'X-LGS-TOKEN': LGS_PROD_APIKEY.LGS_PROD_TOKEN
            },
            body: {
                "rcNumber": "21005567",
                "entityType": "LIMITED_PARTNERSHIP",
                "entityName": "string"
            }
        }).then((response) => {
            // 1. Assert Status Code
            expect(response.status).to.eq(200);

            // 2. Assert Top Level Structure
            expect(response.body.status).to.eq("OK");
            expect(response.body.success).to.be.true;
            expect(response.body.message).to.contains("retrieved successfully");

            // 3. Assert Specific Data Values
            const data = response.body.data;
            expect(data.rc_number).to.not.be.empty;
            expect(data.rc_number).to.be.a('string');
            expect(data.entity_name).to.not.be.empty;
            expect(data.entity_name).to.be.a('string');
            expect(data.entity_status).to.not.be.empty
        });
    });

    it("should successfully retrieve company data Using - GET_COMPANY", () => {
        cy.request({
            method: 'POST',
            url: `${apiUrl}/api/ls/validation/vas-services/rc/GET_COMPANY`,
            qs: {
                apiMode: 'DEV'
            },
            headers: {
                'Content-Type': 'application/json',
                'X-LGS-TOKEN': LGS_PROD_APIKEY.LGS_PROD_TOKEN
            },
            body: {
                "rcNumber": "21005567",
                "entityType": "LIMITED_PARTNERSHIP",
                "entityName": "string"
            }
        }).then((response) => {
            // 1. Assert Status Code
            expect(response.status).to.eq(200);

            // 2. Assert Top Level Structure
            expect(response.body.status).to.eq("OK");
            expect(response.body.success).to.be.true;
            expect(response.body.message).to.contains("retrieved successfully");

            // 3. Assert Specific Data Values
            const data = response.body.data;
            expect(data.rc_number).to.not.be.empty;
            expect(data.rc_number).to.be.a('string');
            expect(data.entity_name).to.not.be.empty;
            expect(data.entity_name).to.be.a('string');
            expect(data.entity_status).to.not.be.empty
        });
    });

    it("should successfully retrieve company data Using - GET_COMPANY_TIN", () => {
        cy.request({
            method: 'POST',
            url: `${apiUrl}/api/ls/validation/vas-services/rc/GET_COMPANY_TIN`,
            qs: {
                apiMode: 'DEV'
            },
            headers: {
                'Content-Type': 'application/json',
                'X-LGS-TOKEN': LGS_PROD_APIKEY.LGS_PROD_TOKEN
            },
            body: {
                "rcNumber": "81019191",
                "entityType": "LIMITED_PARTNERSHIP",
                "entityName": "string"
            }
        }).then((response) => {
            // 1. Assert Status Code
            expect(response.status).to.eq(200);

            // 2. Assert Top Level Structure
            expect(response.body.status).to.eq("OK");
            expect(response.body.success).to.be.true;
            expect(response.body.message).to.contains("retrieved successfully");

            // 3. Assert Specific Data Values
            const data = response.body.data;
            expect(data.rc_number).to.not.be.empty;
            expect(data.rc_number).to.be.a('string');
            expect(data.entity_name).to.not.be.empty;
            expect(data.entity_name).to.be.a('string');
            expect(data.entity_status).to.not.be.empty
        });
    });

    it("should successfully retrieve company data Using - GET_COMPANY_LINE_OF_BUSINESS", () => {
        cy.request({
            method: 'POST',
            url: `${apiUrl}/api/ls/validation/vas-services/rc/GET_COMPANY_LINE_OF_BUSINESS`,
            qs: {
                apiMode: 'DEV'
            },
            headers: {
                'Content-Type': 'application/json',
                'X-LGS-TOKEN': LGS_PROD_APIKEY.LGS_PROD_TOKEN
            },
            body: {
                "rcNumber": "21005567",
                "entityType": "LIMITED_PARTNERSHIP",
                "entityName": "string"
            }
        }).then((response) => {
            // 1. Assert Status Code
            expect(response.status).to.eq(200);

            // 2. Assert Top Level Structure
            expect(response.body.status).to.eq("OK");
            expect(response.body.success).to.be.true;
            expect(response.body.message).to.contains("retrieved successfully");

            // 3. Assert Specific Data Values
            const data = response.body.data;
            expect(data.lineOfBusiness).to.not.be.empty;
        });
    });

    it("should successfully retrieve company data Using - GET_FULL_COMPANY_DATA", () => {
        cy.request({
            method: 'POST',
            url: `${apiUrl}/api/ls/validation/vas-services/rc/GET_FULL_COMPANY_DATA`,
            qs: {
                apiMode: 'DEV'
            },
            headers: {
                'Content-Type': 'application/json',
                'X-LGS-TOKEN': LGS_PROD_APIKEY.LGS_PROD_TOKEN
            },
            body: {
                "rcNumber": "21005567",
                "entityType": "LIMITED_PARTNERSHIP",
                "entityName": "string"
            }
        }).then((response) => {
            // 1. Assert Status Code
            expect(response.status).to.eq(200);

            // 2. Assert Top Level Structure
            expect(response.body.status).to.eq("OK");
            expect(response.body.success).to.be.true;
            expect(response.body.message).to.contains("retrieved successfully");

            // 3. Assert Specific Data Values
            const data = response.body.data;
            expect(data.rc_number).to.not.be.empty;
            expect(data.rc_number).to.be.a('string');
            expect(data.entity_name).to.not.be.empty;
            expect(data.entity_name).to.be.a('string');
            expect(data.entity_status).to.not.be.empty
        });
    });
});
