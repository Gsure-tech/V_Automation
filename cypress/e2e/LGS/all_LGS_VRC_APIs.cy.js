import { AUTH_TOKENS } from '../../support/constants';

/**
 * HELPER FUNCTION: Extracts the VRC from Mailinator and submits it in the UI
 * Optimized to be reused across all tests in this file.
 */
const fetchVrcAndSubmit = (inbox) => {
    return cy.request(`https://www.mailinator.com/api/v2/domains/public/inboxes/${inbox}`)
        .then((response) => {
            const latestMessage = response.body.msgs.sort((a, b) => b.time - a.time)[0];
            return cy.request(`https://www.mailinator.com/api/v2/domains/public/inboxes/${inbox}/messages/${latestMessage.id}`);
        })
        .then((message) => {
            const emailText = message.body.parts[0].body;
            const vrcCode = emailText.match(/\b\d{8}\b/)?.[0];

            if (!vrcCode) throw new Error("8-digit VRC Code not found in email");

            // Perform the Paste logic
            cy.get('.p-inputotp input').first().then(($input) => {
                const dataTransfer = new DataTransfer();
                dataTransfer.setData('text/plain', vrcCode);
                $input[0].dispatchEvent(new ClipboardEvent('paste', {
                    clipboardData: dataTransfer, bubbles: true, cancelable: true
                }));
                cy.wrap($input).trigger('input');
            });

            // Submit the OTP
            cy.get('.vrc-submit').click({ force: true });
        });
};

describe("VRC Services", () => {
    const apiUrl = "http://41.207.248.246:9088";

    it("should successfully retrieve company data using GET_SHARE_CAPITAL_INFO", () => {
        cy.visit("https://vas.oasisproducts.ng/vrc");
        cy.get('.formInput').clear().type("56013734");
        cy.get('.formInput-select').select("LIMITED_PARTNERSHIP");
        cy.wait(2000);
        cy.get('.sendOtp').click({ force: true });
        cy.wait(2000);
        cy.get('.success-card').contains("An otp has been successful");
        cy.wait(9000);

        // REUSED LOGIC CALLED HERE
        fetchVrcAndSubmit('abdulg');

        cy.get('.copy-vrc').parent().invoke('text').then((rawText) => {
            const cleanedVrc = rawText.replace('Copy', '').trim();
            cy.request({
                method: 'POST',
                url: `${apiUrl}/api/ls/validation/vas-services/vrc/GET_SHARE_CAPITAL_INFO`,
                qs: { apiMode: 'DEV', vrc: cleanedVrc },
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
                expect(data.share_capital).to.be.a('number');
            });
        });
    });

    it("should successfully retrieve company data using GET_SHARE_DISTRIBUTION_INFO", () => {
        cy.visit("https://vas.oasisproducts.ng/vrc");
        cy.get('.formInput').clear().type("56013734");
        cy.get('.formInput-select').select("LIMITED_PARTNERSHIP");
        cy.wait(2000);
        cy.get('.sendOtp').click({ force: true });
        cy.get('.success-card', { timeout: 10000 }).contains("An otp has been successful");
        cy.wait(9000);

        // REUSED LOGIC CALLED HERE
        fetchVrcAndSubmit('abdulg');

        cy.get('.copy-vrc').parent().invoke('text').then((rawText) => {
            const cleanedVrc = rawText.replace('Copy', '').trim();
            cy.request({
                method: 'POST',
                url: `${apiUrl}/api/ls/validation/vas-services/vrc/GET_SHARE_DISTRIBUTION_INFO`,
                qs: { apiMode: 'DEV', vrc: cleanedVrc },
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
                expect(data.affiliates).to.not.be.empty;
            });
        });
    });

    it("should successfully retrieve company data using GET_WINDING_UP_INFO", () => {
        cy.visit("https://vas.oasisproducts.ng/vrc");
        cy.get('.formInput').clear().type("56013734");
        cy.get('.formInput-select').select("LIMITED_PARTNERSHIP");
        cy.wait(2000);
        cy.get('.sendOtp').click({ force: true });
        cy.wait(2000);
        cy.get('.success-card').contains("An otp has been successful");
        cy.wait(9000);

        // REUSED LOGIC CALLED HERE
        fetchVrcAndSubmit('abdulg');

        cy.get('.copy-vrc').parent().invoke('text').then((rawText) => {
            const cleanedVrc = rawText.replace('Copy', '').trim();
            cy.request({
                method: 'POST',
                url: `${apiUrl}/api/ls/validation/vas-services/vrc/GET_WINDING_UP_INFO`,
                qs: { apiMode: 'DEV', vrc: cleanedVrc },
                headers: {
                    'X-LGS-TOKEN': AUTH_TOKENS.VALID_LGS_TOKEN,
                    'Content-Type': 'application/json'
                },
                body: {}
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.success).to.be.true;
                expect(response.body.message).to.contains("data retrieved successfully")
                const data = response.body.data;
                expect(data.rc_number).to.not.be.empty;
                expect(data.winding_up_type).to.not.be.empty;
                expect(data.company_name).to.not.be.empty;
                expect(data.winding_up_stage).to.not.be.empty;
                expect(data.publication).to.not.be.empty;
            });
        });
    });

    it("should successfully retrieve company data using GET_AFFILIATE_INFO", () => {
        cy.visit("https://vas.oasisproducts.ng/vrc");
        cy.get('.formInput').clear().type("56013734");
        cy.get('.formInput-select').select("LIMITED_PARTNERSHIP");
        cy.wait(2000);
        cy.get('.sendOtp').click({ force: true });
        cy.wait(2000);
        cy.get('.success-card').contains("An otp has been successful");
        cy.wait(9000);

        // REUSED LOGIC CALLED HERE
        fetchVrcAndSubmit('abdulg');

        cy.get('.copy-vrc').parent().invoke('text').then((rawText) => {
            const cleanedVrc = rawText.replace('Copy', '').trim();
            cy.request({
                method: 'POST',
                url: `${apiUrl}/api/ls/validation/vas-services/vrc/GET_AFFILIATE_INFO`,
                qs: { apiMode: 'DEV', vrc: cleanedVrc },
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
                expect(data.affiliates).to.not.be.empty;
            });
        });
    });

    it("should successfully retrieve company data using GET_CERTIFICATE", () => {
        cy.visit("https://vas.oasisproducts.ng/vrc");
        cy.get('.formInput').clear().type("56013734");
        cy.get('.formInput-select').select("LIMITED_PARTNERSHIP");
        cy.wait(2000);
        cy.get('.sendOtp').click({ force: true });
        cy.wait(2000);
        cy.get('.success-card').contains("An otp has been successful");
        cy.wait(9000);

        // REUSED LOGIC CALLED HERE
        fetchVrcAndSubmit('abdulg');

        cy.get('.copy-vrc').parent().invoke('text').then((rawText) => {
            const cleanedVrc = rawText.replace('Copy', '').trim();
            cy.request({
                method: 'POST',
                url: `${apiUrl}/api/ls/validation/vas-services/vrc/GET_CERTIFICATE`,
                qs: { apiMode: 'DEV', vrc: cleanedVrc },
                headers: {
                    'X-LGS-TOKEN': AUTH_TOKENS.VALID_LGS_TOKEN,
                    'Content-Type': 'application/json'
                },
                body: {}
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.success).to.be.true;
                expect(response.body.message).to.contains("data retrieved successfully")
                expect(response.body.data).to.not.be.empty;
            });
        });
    });

    it("should successfully retrieve company data using GET_STATUS_REPORT", () => {
        cy.visit("https://vas.oasisproducts.ng/vrc");
        cy.get('.formInput').clear().type("56013734");
        cy.get('.formInput-select').select("LIMITED_PARTNERSHIP");
        cy.wait(2000);
        cy.get('.sendOtp').click({ force: true });
        cy.wait(2000);
        cy.get('.success-card').contains("An otp has been successful");
        cy.wait(9000);

        // REUSED LOGIC CALLED HERE
        fetchVrcAndSubmit('abdulg');

        cy.get('.copy-vrc').parent().invoke('text').then((rawText) => {
            const cleanedVrc = rawText.replace('Copy', '').trim();
            cy.request({
                method: 'POST',
                url: `${apiUrl}/api/ls/validation/vas-services/vrc/GET_STATUS_REPORT`,
                qs: { apiMode: 'DEV', vrc: cleanedVrc },
                headers: {
                    'X-LGS-TOKEN': AUTH_TOKENS.VALID_LGS_TOKEN,
                    'Content-Type': 'application/json'
                },
                body: {}
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.success).to.be.true;
                expect(response.body.message).to.contains("data retrieved successfully")
                expect(response.body.data).to.not.be.empty;
            });
        });
    });

    it("should successfully retrieve company data using GET_ASSETS", () => {
        cy.visit("https://vas.oasisproducts.ng/vrc");
        cy.get('.formInput').clear().type("56013734");
        cy.get('.formInput-select').select("LIMITED_PARTNERSHIP");
        cy.wait(2000);
        cy.get('.sendOtp').click({ force: true });
        cy.wait(2000);
        cy.get('.success-card').contains("An otp has been successful");
        cy.wait(9000);

        // REUSED LOGIC CALLED HERE
        fetchVrcAndSubmit('abdulg');

        cy.get('.copy-vrc').parent().invoke('text').then((rawText) => {
            const cleanedVrc = rawText.replace('Copy', '').trim();
            cy.request({
                method: 'POST',
                url: `${apiUrl}/api/ls/validation/vas-services/vrc/GET_ASSETS`,
                qs: { apiMode: 'DEV', vrc: cleanedVrc },
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
                expect(data.company_name).to.not.be.empty;
                expect(data.charges).to.not.be.empty;

            });
        });
    });


});