import { AUTH_TOKENS } from '../../support/constants';

/**
 * HELPER FUNCTION: Extracts the VRC from Mailinator and submits it in the UI
 * Optimized to be reused across all tests in this file.
 */

describe("TIN Service", () => {
    const apiUrl = "http://41.207.248.246:9088";

    it("should successfully retrieve company data using GET_COMPANY_BY_TIN", () => {
            cy.request({
                method: 'POST',
                url: `${apiUrl}/api/ls/validation/vas-services/tin/GET_COMPANY_BY_TIN`,
                qs: {
                    apiMode: 'DEV',
                    tin: '27460809-0001'
                },
                headers: {
                    'X-LGS-TOKEN': AUTH_TOKENS.VALID_LGS_TOKEN,
                    'Content-Type': 'application/json'
                },
                body: {}
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.success).to.be.true;
                const data = response.body.data;
                expect(data.rc_number).to.not.be.empty;
                expect(data.tin).to.not.be.empty;
                expect(data.entity_name).to.not.be.empty;
                expect(data.entity_type).to.not.be.empty;
                expect(data.entity_status).to.not.be.empty;
            });
    });


});