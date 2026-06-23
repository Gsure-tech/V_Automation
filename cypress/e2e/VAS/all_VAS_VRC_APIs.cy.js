import {HEADERS} from '../../support/constants';

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
            // GIYZPBVJ2GYIP6MRPKM52A5ORWL6KA4Q
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
    const apiUrl = "https://vasapp.oasisproducts.ng";

    it("should successfully retrieve company data using VRC GET_SHARE_CAPITAL_INFO", () => {
        cy.visit("https://vas.oasisproducts.ng/vrc");
        cy.get('.formInput').clear().type("56013734");
        cy.get('.formInput-select').select("LIMITED_PARTNERSHIP");
        cy.wait(2000);
        cy.get('.sendOtp').click({ force: true });
        cy.wait(4000);
        cy.get('.success-card').contains("An otp has been successful");
        cy.wait(9000);

        // REUSED LOGIC CALLED HERE
        fetchVrcAndSubmit('abdulg');
        cy.get('.copy-vrc').parent().invoke('text').then((rawText) => {
            const cleanedVrc = rawText.replace('Copy', '').trim();
            cy.request({
                method: 'POST',
                url: `${apiUrl}/api/vas/validation/secure/share-capital`,
                headers: HEADERS.VALID_API_KEY,
                body: {vrc: cleanedVrc}
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.success).to.be.true;
                const data = response.body.data;
                expect(data.rc_number).to.not.be.empty;
                expect(data.company_name).to.not.be.empty;
                expect(data.share_capital).to.be.a('number');
            });
        });
    });

    it("should successfully retrieve company data using VRC GET_SHARE_DISTRIBUTION_INFO", () => {
        cy.visit("https://vas.oasisproducts.ng/vrc");
        cy.get('.formInput').clear().type("56013734");
        cy.get('.formInput-select').select("LIMITED_PARTNERSHIP");
        cy.wait(2000);
        cy.get('.sendOtp').click({ force: true });
        cy.wait(4000);
        cy.get('.success-card', { timeout: 10000 }).contains("An otp has been successful");
        cy.wait(9000);

        // REUSED LOGIC CALLED HERE
        fetchVrcAndSubmit('abdulg');

        cy.get('.copy-vrc').parent().invoke('text').then((rawText) => {
            const cleanedVrc = rawText.replace('Copy', '').trim();
            cy.request({
                method: 'POST',
                url: `${apiUrl}/api/vas/validation/secure/shares-distribution`,
                headers: HEADERS.VALID_API_KEY,
                body: {vrc: cleanedVrc},
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.success).to.be.true;
                const data = response.body.data;
                expect(data.rc_number).to.not.be.empty;
                expect(data.affiliates).to.not.be.empty;
            });
        });
    });

    it("should successfully retrieve company data using VRC GET_WINDING_UP_INFO", () => {
        cy.visit("https://vas.oasisproducts.ng/vrc");
        cy.get('.formInput').clear().type("56013734");
        cy.get('.formInput-select').select("LIMITED_PARTNERSHIP");
        cy.wait(2000);
        cy.get('.sendOtp').click({ force: true });
        cy.wait(4000);
        cy.get('.success-card').contains("An otp has been successful");
        cy.wait(9000);

        // REUSED LOGIC CALLED HERE
        fetchVrcAndSubmit('abdulg');

        cy.get('.copy-vrc').parent().invoke('text').then((rawText) => {
            const cleanedVrc = rawText.replace('Copy', '').trim();
            cy.request({
                method: 'POST',
                url: `${apiUrl}/api/vas/validation/secure/wind-up`,
                headers: HEADERS.VALID_API_KEY,
                body: {vrc: cleanedVrc},
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.success).to.be.true;
                expect(response.body.message).to.contains("winding up info by company")
                const data = response.body.data;
                expect(data.rc_number).to.not.be.empty;
                expect(data.winding_up_type).to.not.be.empty;
                expect(data.company_name).to.not.be.empty;
                expect(data.winding_up_stage).to.not.be.empty;
                expect(data.publication).to.not.be.empty;
            });
        });
    });

    it("should successfully retrieve company data using VRC GET_AFFILIATE_INFO", () => {
        cy.visit("https://vas.oasisproducts.ng/vrc");
        cy.get('.formInput').clear().type("56013734");
        cy.get('.formInput-select').select("LIMITED_PARTNERSHIP");
        cy.wait(2000);
        cy.get('.sendOtp').click({ force: true });
        cy.wait(4000);
        cy.get('.success-card').contains("An otp has been successful");
        cy.wait(9000);

        // REUSED LOGIC CALLED HERE
        fetchVrcAndSubmit('abdulg');

        cy.get('.copy-vrc').parent().invoke('text').then((rawText) => {
            const cleanedVrc = rawText.replace('Copy', '').trim();
            cy.request({
                method: 'POST',
                url: `${apiUrl}/api/vas/validation/secure/company-affiliates`,
                qs: { apiMode: 'DEV', vrc: cleanedVrc },
                headers: HEADERS.VALID_API_KEY,
                body: {vrc: cleanedVrc},
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.success).to.be.true;
                const data = response.body.data;
                expect(data.rc_number).to.not.be.empty;
                expect(data.affiliates).to.not.be.empty;
            });
        });
    });

    it("should successfully retrieve company data using VRC GET_CERTIFICATE", () => {
        cy.visit("https://vas.oasisproducts.ng/vrc");
        cy.get('.formInput').clear().type("56013734");
        cy.get('.formInput-select').select("LIMITED_PARTNERSHIP");
        cy.wait(2000);
        cy.get('.sendOtp').click({ force: true });
        cy.wait(4000);
        cy.get('.success-card').contains("An otp has been successful");
        cy.wait(9000);

        // REUSED LOGIC CALLED HERE
        fetchVrcAndSubmit('abdulg');

        cy.get('.copy-vrc').parent().invoke('text').then((rawText) => {
            const cleanedVrc = rawText.replace('Copy', '').trim();
            cy.request({
                method: 'POST',
                url: `${apiUrl}/api/vas/validation/secure/certificate`,
                headers: HEADERS.VALID_API_KEY,
                body: {vrc: cleanedVrc},
            }).then((response) => {
                expect(response.status).to.eq(200);
            });
        });
    });

    it("should successfully retrieve company data using VRC GET_STATUS_REPORT", () => {
        cy.visit("https://vas.oasisproducts.ng/vrc");
        cy.get('.formInput').clear().type("56013734");
        cy.get('.formInput-select').select("LIMITED_PARTNERSHIP");
        cy.wait(2000);
        cy.get('.sendOtp').click({ force: true });
        cy.wait(4000);
        cy.get('.success-card').contains("An otp has been successful");
        cy.wait(9000);

        // REUSED LOGIC CALLED HERE
        fetchVrcAndSubmit('abdulg');

        cy.get('.copy-vrc').parent().invoke('text').then((rawText) => {
            const cleanedVrc = rawText.replace('Copy', '').trim();
            cy.request({
                method: 'POST',
                url: `${apiUrl}/api/vas/validation/secure/status-report`,
                headers: HEADERS.VALID_API_KEY,
                body: {vrc: cleanedVrc},
            }).then((response) => {
                expect(response.status).to.eq(200);
            });
        });
    });

    it("should successfully retrieve company data using VRC GET_ASSETS", () => {
        cy.visit("https://vas.oasisproducts.ng/vrc");
        cy.get('.formInput').clear().type("56013734");
        cy.get('.formInput-select').select("LIMITED_PARTNERSHIP");
        cy.wait(2000);
        cy.get('.sendOtp').click({ force: true });
        cy.wait(4000);
        cy.get('.success-card').contains("An otp has been successful");
        cy.wait(9000);

        // REUSED LOGIC CALLED HERE
        fetchVrcAndSubmit('abdulg');

        cy.get('.copy-vrc').parent().invoke('text').then((rawText) => {
            const cleanedVrc = rawText.replace('Copy', '').trim();
            cy.request({
                method: 'POST',
                url: `${apiUrl}/api/vas/validation/secure/assets`,
                headers: HEADERS.VALID_API_KEY,
                body: {vrc: cleanedVrc},
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.success).to.be.true;
                expect(response.body.message).to.contains("address history list by company")
                const data = response.body.data;
                expect(data.rc_number).to.not.be.empty;
                expect(data.company_name).to.not.be.empty;
                expect(data.charges).to.not.be.empty;
            });
        });
    });

    it("should successfully retrieve company data using VRC GET_COMPANY", () => {
        cy.visit("https://vas.oasisproducts.ng/vrc");
        cy.get('.formInput').clear().type("56013734");
        cy.get('.formInput-select').select("LIMITED_PARTNERSHIP");
        cy.wait(2000);
        cy.get('.sendOtp').click({ force: true });
        cy.wait(4000);
        cy.get('.success-card').contains("An otp has been successful");
        cy.wait(9000);

        // REUSED LOGIC CALLED HERE
        fetchVrcAndSubmit('abdulg');

        cy.get('.copy-vrc').parent().invoke('text').then((rawText) => {
            const cleanedVrc = rawText.replace('Copy', '').trim();
            cy.request({
                method: 'POST',
                url: `${apiUrl}/api/vas/validation/secure/company`,
                headers: HEADERS.VALID_API_KEY,
                body: {vrc: cleanedVrc},
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.success).to.be.true;
                const data = response.body.data;
                expect(data.rc_number).to.not.be.empty;
                expect(data.entity_name).to.not.be.empty;
                expect(data.entity_type).to.not.be.empty;
                expect(data.objectives).to.not.be.empty;
            });
        });
    });
});