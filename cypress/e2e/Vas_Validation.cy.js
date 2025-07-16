import { base64Images } from "../fixtures/base64Images";
import { HEADERS } from "../support/constants";

// describe('VAS API Integrated Service', () => {

//     it('should load the page and verify the title and check navigations', () => {

//         cy.visit("http://vas.oasisproducts.ng/");
//         cy.log('Verifying the title in heading');
//         cy.get('.vas-heading').should('include.text', 'VAS API Integrated Service');

//         cy.log('Checking if the Documentation link is present');
//         cy.get('div.landing-documentation-link > p').contains('Documentation').should('be.visible');
//         cy.log('Documentation link is visible');

//         cy.log('Clicking the Documentation link');
//         cy.get('div.landing-documentation-link > p').contains('Documentation').click();
//         cy.log('Navigating to documentation page');

//         cy.url().should('include', '/documentation-page');
//         cy.log('Navigated to the documentation page');

//         cy.log('Going back to the landing page');
//         cy.go('back');
//         cy.url().should("eq", "http://vas.oasisproducts.ng/");
//         cy.log('Returned to the landing page');

//         cy.log('Checking if the FAQs link is present');
//         cy.get('[href="/FAQs?activeIndex=0&section=BN"] > p').contains('FAQs').should('be.visible');

//         cy.log('Checking if the VRC link is present');
//         cy.get('[href="/vrc"] > p').contains('VRC').should('be.visible');

//         cy.log('Checking if the Login button is visible');
//         cy.get('button').contains('Login').should('be.visible');
//         cy.log('Clicking the Login button');
//         cy.get('button').contains('Login').click();
//         cy.log('Login button clicked successfully');

//         cy.url().should('include', '/login');
//         cy.log('Navigated to the login page');
//     });

//     it('should navigate to the signup page and verify form fields', () => {
//         cy.log('Navigating to the signup page');
//         cy.visit("http://vas.oasisproducts.ng/login");

//         // Click the "Don't have an account? Click to sign up" link
//         cy.get('a[routerlink="/create-account"]').click();
//         cy.log('Clicked the sign-up link');

//         // Verify if it navigates to the sign-up page
//         cy.url().should('include', '/create-account');
//         cy.log('Navigated to the signup page');

//         cy.log('Verifying the title on the Create Account page');
//         cy.get('strong').should('include.text', 'Create Account');

//         // Verify that all form fields are visible
//         cy.log('Verifying the email input field');
//         cy.get('input[formcontrolname="email"]').should('be.visible');

//         cy.log('Verifying the first name input field');
//         cy.get('input[placeholder="First Name"]').should('be.visible');

//         cy.log('Verifying the last name input field');
//         cy.get('input[placeholder="Last Name"]').should('be.visible');

//         cy.log('Verifying the rcNumber input field');
//         cy.get('input[formcontrolname="rcNumber"]').should('be.visible');

//         cy.log('Verifying the password input field');
//         cy.get('input[name="login[password]"]').should('be.visible');

//         cy.log('Verifying the "I agree to the Terms & Conditions" checkbox');
//         cy.get('input[formcontrolname="checked"]').should('be.visible');

//         cy.log('Verifying the SignUp button is disabled initially');
//         cy.get('.theme-form > :nth-child(8)').contains('SignUp').should('be.disabled');
//     });

//     it('should enable the SignUp button after filling all fields', () => {
//         cy.visit("http://vas.oasisproducts.ng/create-account");
//         cy.log('Entering valid email');
//         cy.get('input[formcontrolname="email"]').clear().type('test@example.com');

//         cy.log('Entering first name');
//         cy.get('input[placeholder="First Name"]').clear().type('John');

//         cy.log('Entering last name');
//         cy.get('input[placeholder="Last Name"]').clear().type('Doe');

//         cy.log('Entering RC number');
//         cy.get('input[formcontrolname="rcNumber"]').clear().type('1234567890');

//         cy.log('Entering password');
//         cy.get('input[name="login[password]"]').clear().type('P@zzw0rdd');

//         // Check the "I agree to the Terms & Conditions" checkbox
//         cy.log('Checking the Terms & Conditions checkbox');
//         cy.get('input[formcontrolname="checked"]').check();

//         cy.log('Toggling password visibility by clicking the eye icon');

//         // Verify the password is initially hidden
//         cy.get('input[formcontrolname="password"]').should('have.attr', 'type', 'password');
//         cy.log('Password field is initially hidden');

//         cy.get('.fa').click();
//         cy.log('Clicked the eye icon to show the password');

//         cy.get('input[formcontrolname="password"]').should('have.attr', 'type', 'text');
//         cy.log('Password field is now visible');

//         cy.get('.fa').click();
//         cy.log('Clicked the eye icon again to hide the password');

//         cy.get('input[formcontrolname="password"]').should('have.attr', 'type', 'password');
//         cy.log('Password field is now hidden again');

//         cy.get('.theme-form > :nth-child(8)').contains('SignUp').should('not.be.disabled');
//         cy.log('"SignUp" button is enabled after filling all fields');

//     });

//     it('should display an error message when a required field is missing', () => {
//         cy.visit("http://vas.oasisproducts.ng/create-account");
//         cy.get('input[formcontrolname="email"]').clear();
//         cy.get('input[placeholder="First Name"]').clear();
//         cy.get('input[placeholder="Last Name"]').clear();
//         cy.get('input[formcontrolname="rcNumber"]').clear();
//         cy.get('input[name="login[password]"]').clear();
//         cy.get('input[formcontrolname="checked"]').uncheck();

//         cy.get('div').should('contain.text', 'is required');

//         cy.log('Required field error messages displayed correctly');
//     });

//     it('should display an error message when fields have invalid data', () => {
//         cy.visit("http://vas.oasisproducts.ng/create-account");
//         // Enter invalid email
//         cy.get('input[formcontrolname="email"]').clear().type('invalidemail');
//         cy.get('input[placeholder="First Name"]').clear().type('John');
//         cy.get('input[placeholder="Last Name"]').clear().type('Doe');
//         cy.get('input[formcontrolname="rcNumber"]').clear().type('09404A');
//         cy.get('input[name="login[password]"]').clear().type('pazz');

//         cy.get('div').contains('invalid email address').should('be.visible');
//         // cy.get('span').contains('Invalid Rc Number').should('be.visible');
//         cy.get('div').contains('password must contain UpperCase, LowerCase and Numbers').should('be.visible');
//         cy.get('div').contains('password should have at least 8 characters').should('be.visible');

//         cy.log('Invalid field error messages displayed correctly');
//     });

// it('should display the modal for email verification after successful sign-up', () => {
//     cy.visit("http://vas.oasisproducts.ng/create-account");
//     // Sign up with valid data
//     cy.get('input[formcontrolname="email"]').clear().type(Math.random().toString(5).substring(2)+"@gmail.com");
//     cy.get('input[placeholder="First Name"]').clear().type('Ben');
//     cy.get('input[placeholder="Last Name"]').clear().type('Terry');
//     cy.get('input[formcontrolname="rcNumber"]').clear().type('1234567890');
//     cy.get('input[name="login[password]"]').clear().type('ValidPassword123');
//     cy.get('input[formcontrolname="checked"]').check();

//     cy.get('.theme-form > :nth-child(8)').contains('SignUp').click();
//     cy.log('Clicked the SignUp button with valid fields');

//     // Verify that the modal appears with the email verification message
//     cy.get('.modal-body').contains('Refer to your email to complete registration').should('be.visible');
//     cy.log('Email verification modal is displayed');

//     // Click "Done" to close the modal
//     cy.get('.modal-footer > .btn-primary').click();
//     cy.log('Clicked the "Done" button in the email verification modal');
// });

// it('should navigate to the forgot password page', () => {
//     cy.log('Navigating to the Forgot password page');
//     cy.visit("http://vas.oasisproducts.ng/login");

//     cy.get('a[routerlink="/forgot-password"]').click();
//     cy.log('Clicked the Forgot password link');

//     // Verify if it navigates to the forgot password page
//     cy.url().should('include', '/forgot-password');
//     cy.log('Navigated to the forgot password page');
// });

// it('should enable and click the "Send Reset Link" button after entering a valid email', () => {
//     cy.visit("http://vas.oasisproducts.ng/forgot-password");
//     cy.log('Entering a valid email address');
//     // Ensure the email input is available and visible
//     cy.get('input[formcontrolname="email"]').should('be.visible');

//     cy.get('input[formcontrolname="email"]').clear().type('abdulganiyu9023@gmail.com');
//     cy.log('Entered email: abdulganiyu9023@gmail.com');

//     // Verify that the "Send Reset Link" button is now enabled
//     cy.get('div.form-group').find('button').contains('Send Reset Link').should('not.be.disabled');
//     cy.log('"Send Reset Link" button is enabled after entering a valid email');

//     cy.log('Clicking the "Send Reset Link" button');
//     cy.get('div.form-group').find('button').contains('Send Reset Link').click();
//     cy.log('Clicked the Send Reset Link button');

//     // Verify the success message in modal
//     cy.get('.modal-body').contains('password reset link sent to email').should('be.visible');
//     cy.log('Password reset link sent confirmation is visible');

//     // Handle Resend Link button
//     cy.get('.btn-outline').click();
//     cy.get('.modal-body').contains('password reset link sent to email').should('be.visible');
//     cy.log('Resend Link clicked and confirmation is displayed');

//     // Handle Done button
//     cy.get('.modal-footer > .btn-primary').click();
//     cy.log('Password reset link sent confirmation is visible');
// });


// it('should display "Invalid email or password" when an incorrect email is entered with a valid password', () => {
//     cy.visit("http://vas.oasisproducts.ng/login");
//     cy.log('Entering invalid email and valid password');
//     cy.get('input[type="email"]').clear().type('invalidemail@oasismgt.net');
//     cy.get('input[formcontrolname="password"]').clear().type('Gsure9023@2025');

//     cy.get('.btn').contains('Login').click({ force: true });
//     cy.log('Clicked the Login button');

//     cy.get('.modal-body').contains('Invalid email or password').should('be.visible');
//     cy.log('Error modal displayed: Invalid email or password');

//     cy.get('.modal-footer > .btn-primary').click();
//     cy.log('Closed the error modal');
// });

// it('should display "Invalid email or password" when a valid email is entered with an incorrect password', () => {
//     cy.visit("http://vas.oasisproducts.ng/login");
//     cy.log('Entering valid email and invalid password');
//     cy.get('input[type="email"]').clear().type('aabdulganiyu@oasismgt.net');
//     cy.get('input[formcontrolname="password"]').clear().type('InvalidPassword@2025');

//     cy.get('.btn').contains('Login').click({ force: true });
//     cy.log('Clicked the Login button');

//     cy.get('.modal-body').contains('Invalid email or password').should('be.visible');
//     cy.log('Error modal displayed: Invalid email or password');

//     cy.get('.modal-footer > .btn-primary').click();
//     cy.log('Closed the error modal');
// });

// it('should display "Invalid email or password" when both email and password are incorrect', () => {
//     cy.visit("http://vas.oasisproducts.ng/login");
//     cy.log('Entering invalid email and invalid password');
//     cy.get('input[type="email"]').clear().type('invalidemail@oasismgt.net');
//     cy.get('input[formcontrolname="password"]').clear().type('InvalidPassword@2025');

//     cy.get('.btn').contains('Login').click({ force: true });
//     cy.log('Clicked the Login button');

//     cy.get('.modal-body').contains('Invalid email or password').should('be.visible');
//     cy.log('Error modal displayed: Invalid email or password');

//     cy.get('.modal-footer > .btn-primary').click();
//     cy.log('Closed the error modal');
// });

// it('should validate login button behavior and be able to login', () => {
//     cy.visit("http://vas.oasisproducts.ng/login");

//     cy.log('Clearing the email and password fields');
//     cy.get('input[type="email"]').clear();
//     cy.get('input[type="password"]').clear();

//     // Check that the "Login" button is disabled when both fields are empty
//     cy.get('.theme-form > :nth-child(5)').contains('Login').should('be.disabled');
//     cy.log('Login button is disabled when email and password are empty');


//     cy.log('Entering empty email and valid password');
//     cy.get('input[type="email"]').clear();
//     cy.get('input[type="password"]').clear().type('Gsure9023@2025');

//     cy.get('.theme-form > :nth-child(5)').contains('Login').should('be.disabled');
//     cy.log('Login button is disabled when email is empty');

//     cy.log('Entering valid email and empty password');
//     cy.get('input[type="email"]').clear().type('abdulganiyu9023@gmail.com');
//     cy.get('input[type="password"]').clear();

//     cy.get('.theme-form > :nth-child(5)').contains('Login').should('be.disabled');
//     cy.log('Login button is disabled when password is empty');

//     cy.log('Entering valid email and valid password to enable the "Login" button');
//     cy.get('input[type="email"]').clear().type('joyoasis9023@gmail.com');
//     cy.get('input[type="password"]').clear().type('Gsure9023@2025');

//     // Verify the "Login" button is enabled when both email and password are provided
//     cy.get('.theme-form > :nth-child(5)').contains('Login').should('not.be.disabled');
//     cy.log('"Login" button is enabled when both email and password are entered');


//     cy.log('Toggling password visibility by clicking the eye icon');

//     // Verify the password is initially hidden (type="password")
//     cy.get('input[formcontrolname="password"]').should('have.attr', 'type', 'password');
//     cy.log('Password field is initially hidden');

//     cy.get('.fa').click();
//     cy.log('Clicked the eye icon to show the password');

//     cy.get('input[formcontrolname="password"]').should('have.attr', 'type', 'text');
//     cy.log('Password field is now visible');


//     cy.get('.fa').click();
//     cy.log('Clicked the eye icon again to hide the password');

//     cy.get('input[formcontrolname="password"]').should('have.attr', 'type', 'password');
//     cy.log('Password field is now hidden again');

//     cy.get('div[class="checkbox"]').click();
//     cy.log('Checked the "Remember Password" checkbox');

//     cy.log('Clicking the Login button');
//     cy.get('button').contains('Login').click();
//     cy.log('Login button clicked successfully');

//     cy.log('Verifying the URL after successful login');
//     // cy.wait(3000);
//     cy.url({ timeout: 30000 }).should('include', 'dashboard');
//     cy.log('Successfully logged in and redirected to dashboard');



//     cy.log('Clicking on the collapse icon to toggle the menu');
//     cy.get('.collapse-icon').click();

//     // Assert the dashboard section is visible
//     cy.log('Checking if the dashboard and transaction sections are visible');
//     cy.get('[routerlink="/user/dashboard"]').should('be.visible');
//     cy.get('[routerlink="/user/transactions"]').should('be.visible');
//     cy.get('[style="margin-bottom: 0px; height: 50px;"]').should('be.visible');
//     cy.get('[style="margin-top: 23px; margin-bottom: 0px; height: 50px;"]').should('be.visible');

//     // Collapse the sidebar again
//     cy.log('Clicking on the collapse icon to close the sidebar');
//     cy.get('.collapse-icon').click();

//     // Assert specific sidebar menu items are visible
//     cy.log('Checking if the Dashboard menu is visible in the collapsed state');
//     cy.get('[routerlink="/user/dashboard"]> .sidebar-link').contains('Dashboard').should('be.visible');

//     cy.log('Checking if the Transaction menu is visible in the collapsed state');
//     cy.get('[routerlink="/user/transactions"]> .sidebar-link').contains('Transaction').should('be.visible');

//     cy.log('Checking if the Products & Services menu is visible in the collapsed state');
//     cy.get('[style="margin-bottom: 0px; height: 50px;"] > .sidebar-link').contains('Products & Services').should('be.visible');

//     cy.log('Clicking on the Products & Services menu to expand');
//     cy.get('[style="margin-bottom: 0px; height: 50px;"] > .sidebar-link').click();

//     cy.log('Checking if Business Registration is visible under Products & Services');
//     cy.get('#collapseExample2 > div > ul > .product-list').contains('Business Registration').should('be.visible');

//     cy.log('Checking if Business Validation is visible under Products & Services');
//     cy.get('#collapseExample2 > div > ul > .product-list2').contains('Business Validation').should('be.visible');

//     cy.log('Checking if the Bulk Services menu is visible');
//     cy.get('[style="margin-top: 23px; margin-bottom: 0px; height: 50px;"]>.sidebar-link').contains('Bulk services').should('be.visible');

//     cy.log('Clicking on the Bulk Services menu to expand');
//     cy.get('[style="margin-top: 23px; margin-bottom: 0px; height: 50px;"]>.sidebar-link').click();

//     cy.log('Checking if New Process is visible under Bulk Services');
//     cy.get('#collapseExample > div > ul > .product-list').contains('New Process').should('be.visible');

//     cy.log('Checking if Reporting Dashboard is visible under Bulk Services');
//     cy.get('#collapseExample > div > ul > .product-list2').contains('Reporting Dashboard').should('be.visible');

// });


// });

// describe('API Validation for VAS Validation Endpoints', () => {

//     it('should return 400 BAD_REQUEST when VRC has already been validated', () => {
//         cy.request({
//             method: 'POST',
//             url: 'http://vasapp.oasisproducts.ng/api/vas/validation/secure/company',
//             headers: HEADERS.VALID_API_KEY,
//             body: {
//                 vrc: "5OBZex7WxA"
//             },
//             failOnStatusCode: false
//         }).then((response) => {
//             expect(response.status).to.eq(400);
//             expect(response.body.status).to.eq('BAD_REQUEST');
//             expect(response.body.message).to.eq('invalid request sent');
//             expect(response.body.error).to.eq('VRC has already been validated');
//             expect(response.body.success).to.be.false;
//         });
//     });

//     // GET COMPANY USING TIN API
//     it('should return 200 when valid TIN and entity type is passed for Get Company Using TIN API', () => {
//         cy.log(' Get Company Using TIN')
//         const requestBody = {
//             tin: '78774829-0001',
//             entity_type: 'INCORPORATED_TRUSTEE'
//         };

//         cy.request({
//             method: 'POST',
//             url: 'http://vasapp.oasisproducts.ng/api/vas/validation/tin/company',
//             headers: HEADERS.VALID_API_KEY,
//             body: requestBody,
//             failOnStatusCode: false // Allow the test to continue even if status code isn't 200
//         }).then((response) => {
//             expect(response.status).to.eq(200);
//             expect(response.body.status).to.eq('OK');

//             // Check that the 'entity_name' exists in the response data
//             expect(response.body.data).to.have.property('entity_name');
//             expect(response.body.data.entity_name).to.not.be.empty;
//              cy.log(response.body);
//         });
//     });

//     it('should return 401 Unauthorized for invalid API key', () => {


//         const requestBody = {
//             tin: '78774829-0001',
//             entity_type: 'INCORPORATED_TRUSTEE'
//         };
//         cy.request({
//             method: 'POST',
//             url: 'http://vasapp.oasisproducts.ng/api/vas/validation/tin/company',
//             headers: HEADERS.INVALID_API_KEY,
//             body: requestBody,
//             failOnStatusCode: false
//         }).then((response) => {
//             expect(response.status).to.eq(401);
//             expect(response.body.error).to.eq('Unauthorized');
//             cy.log(response.body);
//         });
//     });

//     it('should return 400 Bad Request for incorrect TIN', () => {
//         const incorrectTin = '78774829-000';
//         const requestBody = {
//             tin: incorrectTin,
//             entity_type: 'INCORPORATED_TRUSTEE'
//         };
//         cy.request({
//             method: 'POST',
//             url: 'http://vasapp.oasisproducts.ng/api/vas/validation/tin/company',
//            headers: HEADERS.VALID_API_KEY,
//             body: requestBody,
//             failOnStatusCode: false
//         }).then((response) => {
//             expect(response.status).to.eq(400);
//             // expect(response.body.error).to.eq('invalid rc_number passed');
//             // expect(response.body.errors).to.include('invalid rc_number passed');
//             cy.log(response.body);
//         });
//     });


//     // GENERATE TIN API
//     it('should return 200 when valid rc_number and entity_type are passed for GENERATE TIN API', () => {
//         // Valid RC Number and Entity Type
//         cy.request({
//             method: 'POST',
//             url: 'http://vasapp.oasisproducts.ng/api/vas/validation/tin/generate',
//           headers: HEADERS.VALID_API_KEY,
//             body: {
//                 "rc_number": "35147935",
//                 "entity_type":"INCORPORATED_TRUSTEE"
//             }
//         }).then((response) => {
//             expect(response.status).to.eq(200);
//             expect(response.body.status).to.eq('OK');
//             expect(response.body.message).to.eq('tin generated successfully');
//             expect(response.body.success).to.eq(true);
//         });
//     });

//     it('should return 400 when an invalid entity_type is passed', () => {
//             // Invalid Entity Type
//             cy.request({
//                 method: 'POST',
//                 url: 'http://vasapp.oasisproducts.ng/api/vas/validation/tin/generate',
//                 headers: HEADERS.VALID_API_KEY,
//                 body: {
//                     "rc_number": "35147935",
//                     "entity_type": "INVALID_ENTITY_TYPE"
//                 },
//                 failOnStatusCode: false
//             }).then((response) => {
//                 // Assert the status code and error message
//                 expect(response.status).to.eq(400);
//                 expect(response.body.status).to.eq('BAD_REQUEST');
//             });
//         });

//     it('should return 400 when an invalid rc_number is passed', () => {
//             cy.request({
//                 method: 'POST',
//                 url: 'http://vasapp.oasisproducts.ng/api/vas/validation/tin/generate',
//                 headers: HEADERS.VALID_API_KEY,
//                 body: {
//                     "rc_number": "INVALID_RC_NUMBER",
//                     "entity_type": "INCORPORATED_TRUSTEE"
//                 },
//                 failOnStatusCode: false
//             }).then((response) => {
//                 expect(response.status).to.eq(400);
//                 expect(response.body.status).to.eq('BAD_REQUEST');
//                 expect(response.body.message).to.eq('invalid request sent');
//                 expect(response.body.error).to.eq('invalid rc_number passed');
//             });
//         });

//     it('should return 401 Unauthorized for invalid API key', () => {

//         const requestBody = {
//             "rc_number": "35147935",
//             "entity_type":"INCORPORATED_TRUSTEE"
//         };
//         cy.request({
//             method: 'POST',
//             url: 'http://vasapp.oasisproducts.ng/api/vas/validation/tin/generate',
//             headers: HEADERS.INVALID_API_KEY,
//             body: requestBody,
//             failOnStatusCode: false
//         }).then((response) => {
//             expect(response.status).to.eq(401);
//             expect(response.body.error).to.eq('Unauthorized');
//             cy.log(response.body);
//         });
//     });

//     //GET COMPANY BY NAME API
//     it('should return 200 and valid company data when valid rc_number and entity_name are passed for GET COMPANY BY NAME API', () => {
//         cy.request({
//             method: 'POST',
//             url: 'http://vasapp.oasisproducts.ng/api/vas/validation/company/name',
//           headers: HEADERS.VALID_API_KEY,
//             body: {
//                 "rc_number": "8002153",
//                 "entity_name": "Comrade Joint Ventures"
//             }
//         }).then((response) => {
//             expect(response.status).to.eq(200);
//             expect(response.body.status).to.eq('OK');
//             expect(response.body.message).to.eq('company data');

//             expect(response.body.data.entity_name).to.not.be.empty;
//             expect(response.body.data.rc_number).to.not.be.empty;
//             expect(response.body.data.entity_name).to.not.be.empty;
//             expect(response.body.data.entity_type).to.not.be.empty;
//             expect(response.body.data.address).to.not.be.empty;
//             expect(response.body.data.registration_date).to.not.be.empty;
//             expect(response.body.data.entity_status).to.not.be.empty;
//             expect(response.body.data.line_of_business).to.not.be.empty;
//         });
//     });

//     it('should return 400 when an invalid rc_number is passed', () => {
//         cy.request({
//             method: 'POST',
//             url: 'http://vasapp.oasisproducts.ng/api/vas/validation/company/name',
//           headers: HEADERS.VALID_API_KEY,
//             body: {
//                 "rc_number": "INVALID_RC_NUMBER",
//                 "entity_name": "JG Group"
//             },
//             failOnStatusCode: false
//         }).then((response) => {
//             expect(response.status).to.eq(400);
//             expect(response.body.status).to.eq('BAD_REQUEST');
//             expect(response.body.message).to.eq('invalid data');
//             expect(response.body.error).to.eq('invalid rc_number passed');
//         });
//     });

//     it('should return 401 Unauthorized for invalid API key', () => {

//         const requestBody = {
//             "rc_number":"35147935",
//             "entity_name":"JG Group"
//         };
//         cy.request({
//             method: 'POST',
//             url: 'http://vasapp.oasisproducts.ng/api/vas/validation/company/name',
//             headers: HEADERS.INVALID_API_KEY,
//             body: requestBody,
//             failOnStatusCode: false
//         }).then((response) => {
//             expect(response.status).to.eq(401);
//             expect(response.body.error).to.eq('Unauthorized');
//             cy.log(response.body);
//         });
//     });

//     //GET COMPANY BY RC NUMBER API
//     it('should return 200 and valid company data when valid rc_number is passed for GET COMPANY BY RC NUMBER API', () => {
//         cy.request({
//             method: 'POST',
//             url: 'http://vasapp.oasisproducts.ng/api/vas/validation/company/rc',
//           headers: HEADERS.VALID_API_KEY,
//             body: {
//                 "rc_number": "8002153"
//             }
//         }).then((response) => {
//             expect(response.status).to.eq(200);
//             expect(response.body.status).to.eq('OK');
//             expect(response.body.message).to.eq('company data');

//             expect(response.body.data.entity_name).to.not.be.empty;
//             expect(response.body.data.rc_number).to.not.be.empty;
//             expect(response.body.data.entity_name).to.not.be.empty;
//             expect(response.body.data.entity_type).to.not.be.empty;
//             expect(response.body.data.address).to.not.be.empty;
//             expect(response.body.data.registration_date).to.not.be.empty;
//             expect(response.body.data.entity_status).to.not.be.empty;
//             expect(response.body.data.line_of_business).to.not.be.empty;
//         });
//     });

//     it('should return 400 when an invalid rc_number is passed', () => {
//         cy.request({
//             method: 'POST',
//             url: 'http://vasapp.oasisproducts.ng/api/vas/validation/company/rc',
//             headers:HEADERS.VALID_API_KEY,
//             body: {
//                 "rc_number": "INVALID_RC_NUMBER"
//             },
//             failOnStatusCode: false
//         }).then((response) => {
//             expect(response.status).to.eq(400);
//             expect(response.body.status).to.eq('BAD_REQUEST');
//             expect(response.body.message).to.eq('invalid data');
//             expect(response.body.error).to.eq('invalid rc_number passed');
//         });
//     });

//     it('should return 401 Unauthorized for invalid API key', () => {

//         const requestBody = {
//             "rc_number":"35147935"
//         };
//         cy.request({
//             method: 'POST',
//             url: 'http://vasapp.oasisproducts.ng/api/vas/validation/company/rc',
//             headers: HEADERS.INVALID_API_KEY,
//             body: requestBody,
//             failOnStatusCode: false
//         }).then((response) => {
//             expect(response.status).to.eq(401);
//             expect(response.body.error).to.eq('Unauthorized');
//             cy.log(response.body);
//         });
//     });

//     // GET COMPANY LINE OF BUSINESS API
//     it('should return 200 and company line of business when valid rc_number and entity type is passed for GET COMPANY LINE OF BUSINESS API', () => {
//         cy.request({
//             method: 'POST',
//             url: 'http://vasapp.oasisproducts.ng/api/vas/validation/line-of-business',
//           headers: HEADERS.VALID_API_KEY,
//             body: {
//                 "rc_number": "7214181",
//                 "entity_type": "BUSINESS_NAME"
//             }
//         }).then((response) => {
//             expect(response.status).to.eq(200);
//             expect(response.body.status).to.eq('OK');
//             expect(response.body.message).to.eq('company data');
//             expect(response.body.success).to.be.true;
//             expect(response.body.data).to.be.an('array').that.is.not.empty;
//         });
//     });

//     it('should return 400 when an invalid entity_type is passed', () => {
//             // Invalid Entity Type
//             cy.request({
//                 method: 'POST',
//                 url: 'http://vasapp.oasisproducts.ng/api/vas/validation/line-of-business',
//                 headers: HEADERS.VALID_API_KEY,
//                 body: {
//                     "rc_number": "7214181",
//                     "entity_type": "INVALID_ENTITY_TYPE"
//                 },
//                 failOnStatusCode: false
//             }).then((response) => {
//                 // Assert the status code and error message
//                 expect(response.status).to.eq(400);
//                 expect(response.body.status).to.eq('BAD_REQUEST');
//             });
//         });

//     it('should return 400 when an invalid rc_number is passed', () => {
//             cy.request({
//                 method: 'POST',
//                 url: 'http://vasapp.oasisproducts.ng/api/vas/validation/line-of-business',
//                 headers: HEADERS.VALID_API_KEY,
//                 body: {
//                     "rc_number": "INVALID_RC_NUMBER",
//                     "entity_type": "INCORPORATED_TRUSTEE"
//                 },
//                 failOnStatusCode: false
//             }).then((response) => {
//                 expect(response.status).to.eq(400);
//                 expect(response.body.status).to.eq('BAD_REQUEST');
//                 expect(response.body.message).to.eq('invalid data');
//                 expect(response.body.error).to.eq('invalid rc_number passed');
//             });
//         });


//     it('should return 401 Unauthorized for invalid API key', () => {

//         const requestBody = {
//             "rc_number": "7214181",
//             "entity_type": "BUSINESS_NAME"
//         };
//         cy.request({
//             method: 'POST',
//             url: 'http://vasapp.oasisproducts.ng/api/vas/validation/company/rc',
//             headers: HEADERS.INVALID_API_KEY,
//             body: requestBody,
//             failOnStatusCode: false
//         }).then((response) => {
//             expect(response.status).to.eq(401);
//             expect(response.body.error).to.eq('Unauthorized');
//             cy.log(response.body);
//         });
//     });


//     // GET COMPANY TIN API
//     it('should return 200 and valid company data when valid rc_number and entity_type is passed for GET COMPANY TIN API', () => {
//         cy.request({
//             method: 'POST',
//             url: 'http://vasapp.oasisproducts.ng/api/vas/validation/tin',
//           headers: HEADERS.VALID_API_KEY,
//             body: {
//                 "rc_number": "7214181",
//                 "entity_type": "BUSINESS_NAME"
//             }
//         }).then((response) => {
//             expect(response.status).to.eq(200);
//             expect(response.body.status).to.eq('OK');
//             expect(response.body.message).to.eq('company data');
//             expect(response.body.data.rc_number).to.not.be.empty;
//             expect(response.body.data.entity_name).to.not.be.empty;
//             expect(response.body.data.entity_type).to.not.be.empty;
//             expect(response.body.data.address).to.not.be.empty;
//             expect(response.body.data.registration_date).to.not.be.empty;
//             expect(response.body.data.entity_status).to.not.be.empty;
//             expect(response.body.data.tin).to.not.be.empty;
//         });
//     });

//     it('should return 400 when an invalid entity_type is passed', () => {
//         // Invalid Entity Type
//         cy.request({
//             method: 'POST',
//             url: 'http://vasapp.oasisproducts.ng/api/vas/validation/tin',
//           headers: HEADERS.VALID_API_KEY,
//             body: {
//                 "rc_number": "7214181",
//                 "entity_type": "INVALID_ENTITY_TYPE"
//             },
//             failOnStatusCode: false
//         }).then((response) => {
//             // Assert the status code and error message
//             expect(response.status).to.eq(400);
//             expect(response.body.status).to.eq('BAD_REQUEST');
//         });
//     });

//     it('should return 400 when an invalid rc_number is passed', () => {
//         cy.request({
//             method: 'POST',
//             url: 'http://vasapp.oasisproducts.ng/api/vas/validation/tin',
//           headers: HEADERS.VALID_API_KEY,
//             body: {
//                 "rc_number": "INVALID_RC_NUMBER",
//                 "entity_type": "INCORPORATED_TRUSTEE"
//             },
//             failOnStatusCode: false
//         }).then((response) => {
//             expect(response.status).to.eq(400);
//             expect(response.body.status).to.eq('BAD_REQUEST');
//             expect(response.body.message).to.eq('invalid data');
//             expect(response.body.error).to.eq('invalid rc_number passed');
//         });
//     });

//     it('should return 401 Unauthorized for invalid API key', () => {

//         const requestBody = {
//             "rc_number": "7214181",
//             "entity_type": "BUSINESS_NAME"
//         };
//         cy.request({
//             method: 'POST',
//             url: 'http://vasapp.oasisproducts.ng/api/vas/validation/tin',
//             headers: HEADERS.INVALID_API_KEY,
//             body: requestBody,
//             failOnStatusCode: false
//         }).then((response) => {
//             expect(response.status).to.eq(401);
//             expect(response.body.error).to.eq('Unauthorized');
//             cy.log(response.body);
//         });
//     });

//     // GET COMPANY API
//     it('should return 200 and valid company data when valid rc_number and entity_type is passed for GET COMPANY API', () => {
//         cy.request({
//             method: 'POST',
//             url: 'http://vasapp.oasisproducts.ng/api/vas/validation/company',
//           headers: HEADERS.VALID_API_KEY,
//             body: {
//                 "rc_number": "7214181",
//                 "entity_type": "BUSINESS_NAME"
//             }
//         }).then((response) => {
//             expect(response.status).to.eq(200);
//             expect(response.body.status).to.eq('OK');
//             expect(response.body.message).to.eq('company data');
//             expect(response.body.data.rc_number).to.not.be.empty;
//             expect(response.body.data.entity_name).to.not.be.empty;
//             expect(response.body.data.entity_type).to.not.be.empty;
//             expect(response.body.data.address).to.not.be.empty;
//             expect(response.body.data.registration_date).to.not.be.empty;
//             expect(response.body.data.entity_status).to.not.be.empty;
//             expect(response.body.data.line_of_business).to.not.be.empty;
//         });
//     });

//     it('should return 400 when an invalid entity_type is passed', () => {
//         // Invalid Entity Type
//         cy.request({
//             method: 'POST',
//             url: 'http://vasapp.oasisproducts.ng/api/vas/validation/company',
//           headers: HEADERS.VALID_API_KEY,
//             body: {
//                 "rc_number": "7214181",
//                 "entity_type": "INVALID_ENTITY_TYPE"
//             },
//             failOnStatusCode: false
//         }).then((response) => {
//             // Assert the status code and error message
//             expect(response.status).to.eq(400);
//             expect(response.body.status).to.eq('BAD_REQUEST');
//         });
//     });

//     it('should return 400 when an invalid rc_number is passed', () => {
//         cy.request({
//             method: 'POST',
//             url: 'http://vasapp.oasisproducts.ng/api/vas/validation/company',
//           headers: HEADERS.VALID_API_KEY,
//             body: {
//                 "rc_number": "INVALID_RC_NUMBER",
//                 "entity_type": "INCORPORATED_TRUSTEE"
//             },
//             failOnStatusCode: false
//         }).then((response) => {
//             expect(response.status).to.eq(400);
//             expect(response.body.status).to.eq('BAD_REQUEST');
//             expect(response.body.message).to.eq('invalid data');
//             expect(response.body.error).to.eq('invalid rc_number passed');
//         });
//     });

//     it('should return 401 Unauthorized for invalid API key', () => {

//         const requestBody = {
//             "rc_number": "7214181",
//             "entity_type": "BUSINESS_NAME"
//         };
//         cy.request({
//             method: 'POST',
//             url: 'http://vasapp.oasisproducts.ng/api/vas/validation/company',
//             headers: HEADERS.INVALID_API_KEY,
//             body: requestBody,
//             failOnStatusCode: false
//         }).then((response) => {
//             expect(response.status).to.eq(401);
//             expect(response.body.error).to.eq('Unauthorized');
//             cy.log(response.body);
//         });
//     });

//     // BUSINESS VALIDATION SINGLE SERVICE (PREMIUM)

//     it('should return 200 and valid company data when valid RC number and entity type is passed for BUSINESS VALIDATION SINGLE SERVICE (PREMIUM)', () => {
//         const requestBody = {
//             rc_number: "8002155",
//             entity_type: "BUSINESS_NAME"
//         };

//         cy.request({
//             method: 'POST',
//             url: 'http://vasapp.oasisproducts.ng/api/vas/validation/single-service',
//             headers: HEADERS.VALID_API_KEY,
//             body: requestBody,
//             failOnStatusCode: false
//         }).then((response) => {
//             expect(response.status).to.eq(200);
//             expect(response.body.status).to.eq('OK');
//             expect(response.body.message).to.eq('company data');
//             expect(response.body.success).to.be.true;
//             expect(response.body.data.rc_number).to.not.be.empty;
//             expect(response.body.data.entity_type).to.not.be.empty;
//             expect(response.body.data.entity_status).to.not.be.empty;
//             expect(response.body.data.entity_name).to.not.be.empty;
//             expect(response.body.data.address).to.not.be.empty;
//             expect(response.body.data.affiliates).to.be.an('array').and.have.length.greaterThan(0);

//         });
//     });
//     it('should return 401 Unauthorized for invalid API key', () => {
//         const requestBody = {
//             "rc_number": "8082155",
//             "entity_type": "BUSINESS_NAME"
//         };

//         cy.request({
//             method: 'POST',
//             url: 'http://vasapp.oasisproducts.ng/api/vas/validation/single-service',
//             headers: HEADERS.INVALID_API_KEY,
//             body: requestBody,
//             failOnStatusCode: false
//         }).then((response) => {
//             expect(response.status).to.eq(401);
//             expect(response.body.error).to.eq('Unauthorized');
//             cy.log(response.body);
//         });
//     });

//     it('should return 400 Bad Request for invalid rc_number', () => {
//         const requestBody = {
//             rc_number: "INVALID_RC",
//             entity_type: "BUSINESS_NAME"
//         };

//         cy.request({
//             method: 'POST',
//             url: 'http://vasapp.oasisproducts.ng/api/vas/validation/single-service',
//             headers: HEADERS.VALID_API_KEY,
//             body: requestBody,
//             failOnStatusCode: false
//         }).then((response) => {
//             expect(response.status).to.eq(400);
//             expect(response.body.status).to.eq('BAD_REQUEST');
//             expect(response.body.message).to.eq('invalid data');
//             expect(response.body.error).to.eq('invalid rc_number passed');
//             expect(response.body.success).to.be.false;
//             expect(response.body.errors).to.include('invalid rc_number passed');

//             cy.log('Error Response:', response.body);
//         });
//     });

//     it('should return 400 Bad Request for invalid entity_type', () => {
//         const requestBody = {
//             "rc_number": "8082155",
//             "entity_type": "INVALID_TYPE"
//         };

//         cy.request({
//             method: 'POST',
//             url: 'http://vasapp.oasisproducts.ng/api/vas/validation/single-service',
//             headers: HEADERS.VALID_API_KEY,
//             body: requestBody,
//             failOnStatusCode: false
//         }).then((response) => {
//             expect(response.status).to.eq(400);
//             expect(response.body.status).to.eq('BAD_REQUEST');
//             cy.log(response.body);
//         });
//     });



// });




describe("API Validation for VAS Registration Endpoints", () => {
  //  DOWNLOAD CERTIFICATE API

  it("should return 200 and a certificate file as attachment when a valid rcNumber and transactionRef is passed for DOWNLOAD CERTIFICATE API ", () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/certificate",
      encoding: "binary", //for non-text responses
      headers: HEADERS.VALID_API_KEY,
      body: {
        rcNumber: "8002149",
        transactionRef: "VAS20250427134638646",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      // expect(response.headers['content-type']).to.include('application/pdf');

      // cy.task('saveCertificateFile', {
      //     filename: 'certificate.pdf',
      //     content: response.body
      // });
    });
  });

  it("should return 400 when an invalid rc_number and transactionRef is passed", () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/certificate",
      headers: HEADERS.VALID_API_KEY,
      body: {
        rcNumber: "80029",
        transactionRef: "VAS202  27134638646",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.message).to.eq("invalid request sent");
      expect(response.body.error).contains("error generating certificate");
    });
  });

  it("should return 401 Unauthorized for invalid API key", () => {
    const requestBody = {
      rc_number: "7214181",
      entity_type: "BUSINESS_NAME",
    };
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/validation/company",
      headers: HEADERS.INVALID_API_KEY,
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.error).to.eq("Unauthorized");
      cy.log(response.body);
    });
  });

  // DOWNLOAD STATUS REPORT API

  it("should return 200 and a status report file as attachment when a valid rcNumber and transactionRef is passed for DOWNLOAD STATUS REPORT API", () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/certificate/status-report",
      encoding: "binary", //for non-text responses
      headers: HEADERS.VALID_API_KEY,
      body: {
        rcNumber: "8002149",
        transactionRef: "VAS20250427134638646",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      // expect(response.headers['content-type']).to.include('application/pdf');

      // cy.task('saveCertificateFile', {
      //     filename: 'certificate.pdf',
      //     content: response.body
      // });
    });
  });

  it("should return 400 when an invalid rc_number and transactionRef is passed", () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/certificate/status-report",
      headers: HEADERS.VALID_API_KEY,
      body: {
        rcNumber: "80029",
        transactionRef: "VAS202  27134638646",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.message).to.eq("invalid request sent");
      expect(response.body.error).contains("error generating status report");
    });
  });

  it("should return 401 Unauthorized for invalid API key", () => {
    const requestBody = {
      rc_number: "7214181",
      entity_type: "BUSINESS_NAME",
    };
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/validation/company",
      headers: HEADERS.INVALID_API_KEY,
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.error).to.eq("Unauthorized");
      cy.log(response.body);
    });
  });

  //BN COMPLIANCE API

  it("Should return 200 and similarity details (basic check) for BN COMPLIANCE", () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/bn-compliance",
      headers: HEADERS.VALID_API_KEY,
      body: {
        proposedName: "Gsuretech Happy Ventures enterprises",
        lineOfBusiness: "general_merchandise",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq("OK");
      expect(response.body.message).to.not.be.empty;
      expect(response.body.data.similarNames).to.not.be.empty;
      expect(response.body.data.mostSimilarName).to.not.be.empty;
      expect(response.body.data.similarityScore).to.not.be.empty;
      expect(response.body.data.complianceScore).to.not.be.empty;
    });
  });

  it("Should return 403 Forbidden when name exist for BN COMPLIANCE", () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/bn-compliance",
      headers: HEADERS.VALID_API_KEY,
      body: {
        proposedName: "Gaya Demarina Galaxy",
        lineOfBusiness: "general_merchandise",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(403);
      expect(response.body.status).to.eq("FORBIDDEN");
      expect(response.body.message).to.eq("Name exist");
      expect(response.body.errors).to.not.be.empty;
    });
  });

  it("Should return 400 Bad Request when a single word is used as proposedName", () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/bn-compliance",
      headers: HEADERS.VALID_API_KEY,
      body: {
        proposedName: "Galaxy",
        lineOfBusiness: "general_merchandise",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.message).to.eq(
        "proposed name cant have a single word"
      );
    });
  });

  // BN COMPLIANCE ADVANCE CHECK

  it('Should return 200, statusCode "00" with message proceed to filing (advanceCheck=true) for BN COMPLIANCE', () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/bn-compliance?advanceCheck=true",
      headers: HEADERS.VALID_API_KEY,
      body: {
        proposedName: "Alamaboro Collections",
        lineOfBusiness: "general_merchandise",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq("OK");
      expect(response.body.data.message).to.not.be.empty;
      expect(response.body.data.statusCode).to.eq("00");
      expect(response.body.data.data.recommendedActions).to.not.be.empty;
      expect(response.body.data.data).to.not.be.empty;
      expect(response.body.data.data.similarNames).to.not.be.empty;
      expect(response.body.data.data.mostSimilarName).to.not.be.empty;
      expect(response.body.data.data.similarityScorePercentage).to.be.a(
        "number"
      );
      expect(response.body.data.data.complianceScorePercentage).to.be.a(
        "number"
      );
    });
  });

  it('Should return 200, statusCode "01" with the message OFFENSIVE_LANGUAGE like "hate" is used', () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/bn-compliance?advanceCheck=true",
      headers: HEADERS.VALID_API_KEY,
      body: {
        proposedName: "Malammadori hate concepts",
        lineOfBusiness: "general_merchandise",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq("OK");
      expect(response.body.data.message).to.not.be.empty;
      expect(response.body.data.statusCode).to.eq("01");
      expect(response.body.data.data.recommendedActions).to.not.be.empty;
      expect(response.body.data.data.recommendedActions[0].keywords).to.not.be
        .empty;
      expect(response.body.data.data.similarNames).to.not.be.empty;
      expect(response.body.data.data.mostSimilarName).to.not.be.empty;
      expect(response.body.data.data.similarityScorePercentage).to.be.a(
        "number"
      );
      expect(response.body.data.data.complianceScorePercentage).to.be.a(
        "number"
      );
    });
  });

  it('Should return 200,  statusCode "02" with the message QUALIFIER_NOT_FOUND when no qualifier is used', () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/bn-compliance?advanceCheck=true",
      headers: HEADERS.VALID_API_KEY,
      body: {
        proposedName: "Blessed Grills",
        lineOfBusiness: "general_merchandise",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq("OK");
      expect(response.body.data.message).to.eq("QUALIFIER_NOT_FOUND");
      expect(response.body.data.statusCode).to.eq("02");
      expect(response.body.data.data.recommendedActions).to.not.be.empty;
      expect(response.body.data.data.recommendedActions[0].keywords).to.not.be
        .empty;
      expect(response.body.data.data.similarNames).to.not.be.empty;
      expect(response.body.data.data.mostSimilarName).to.not.be.empty;
      expect(response.body.data.data.similarityScorePercentage).to.be.a(
        "number"
      );
      expect(response.body.data.data.complianceScorePercentage).to.be.a(
        "number"
      );
    });
  });

  it('Should return 200, statusCode "03" with the message BUSINESS_NAME_REQUIRES_CERTIFICATE when business name require a proficiency certificate', () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/bn-compliance?advanceCheck=true",
      headers: HEADERS.VALID_API_KEY,
      body: {
        proposedName: "Muller Medical Ventures concepts",
        lineOfBusiness: "general_merchandise",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq("OK");
      expect(response.body.data.message).to.eq(
        "BUSINESS_NAME_REQUIRES_CERTIFICATE"
      );
      expect(response.body.data.statusCode).to.eq("03");
      expect(response.body.data.data.recommendedActions).to.not.be.empty;
      expect(response.body.data.data.recommendedActions[0].keywords).to.not.be
        .empty;
      expect(response.body.data.data.recommendedActions[0].message).to.not.be
        .empty;
      expect(response.body.data.data.similarNames).to.not.be.empty;
      expect(response.body.data.data.mostSimilarName).to.not.be.empty;
      expect(response.body.data.data.similarityScorePercentage).to.be.a(
        "number"
      );
      expect(response.body.data.data.complianceScorePercentage).to.be.a(
        "number"
      );
    });
  });

  it('Should return 200, statusCode "04" with the message BUSINESS_LINE_REQUIRES_CERTIFICATE when business line require a proficiency certificate', () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/bn-compliance?advanceCheck=true",
      headers: HEADERS.VALID_API_KEY,
      body: {
        proposedName: "Cinical concepts",
        lineOfBusiness: "Hospital",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq("OK");
      expect(response.body.data.message).to.eq(
        "BUSINESS_LINE_REQUIRES_CERTIFICATE"
      );
      expect(response.body.data.statusCode).to.eq("04");
      expect(response.body.data.data.recommendedActions).to.not.be.empty;
      expect(response.body.data.data.recommendedActions[0].keywords).to.not.be
        .empty;
      expect(response.body.data.data.recommendedActions[0].message).to.not.be
        .empty;
      expect(response.body.data.data.similarNames).to.not.be.empty;
      expect(response.body.data.data.mostSimilarName).to.not.be.empty;
      expect(response.body.data.data.similarityScorePercentage).to.be.a(
        "number"
      );
      expect(response.body.data.data.complianceScorePercentage).to.be.a(
        "number"
      );
    });
  });

  it('Should return 200, statusCode "05" with the message PROHIBITED_BUSINESS_NAME when proposed name contains words that are prohibited', () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/bn-compliance?advanceCheck=true",
      headers: HEADERS.VALID_API_KEY,
      body: {
        proposedName: "Cinical Academy concepts",
        lineOfBusiness: "Hospital",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq("OK");
      expect(response.body.data.message).to.eq("PROHIBITED_BUSINESS_NAME");
      expect(response.body.data.statusCode).to.eq("05");
      expect(response.body.data.data.recommendedActions).to.not.be.empty;
      expect(response.body.data.data.recommendedActions[0].keywords).to.not.be
        .empty;
      expect(response.body.data.data.recommendedActions[0].message).to.not.be
        .empty;
      expect(response.body.data.data.mostSimilarName).to.not.be.empty;
      expect(response.body.data.data.similarityScorePercentage).to.be.a(
        "number"
      );
      expect(response.body.data.data.complianceScorePercentage).to.be.a(
        "number"
      );
    });
  });

  it('Should return 200, statusCode "06" with the message PROHIBITED_BUSINESS_LINE when proposed name contains words that are prohibited', () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/bn-compliance?advanceCheck=true",
      headers: HEADERS.VALID_API_KEY,
      body: {
        proposedName: "Clinical concepts",
        lineOfBusiness: "Health Academy",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq("OK");
      expect(response.body.data.message).to.eq("PROHIBITED_BUSINESS_LINE");
      expect(response.body.data.statusCode).to.eq("06");
      expect(response.body.data.data.recommendedActions).to.not.be.empty;
      expect(response.body.data.data.recommendedActions[0].keywords).to.not.be
        .empty;
      expect(response.body.data.data.recommendedActions[0].message).to.not.be
        .empty;
      expect(response.body.data.data.similarityScorePercentage).to.be.a(
        "number"
      );
      expect(response.body.data.data.complianceScorePercentage).to.be.a(
        "number"
      );
    });
  });

  it('Should return 200, statusCode "07" with the message BUSINESS_NAME_EXISTS when business name exists', () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/bn-compliance?advanceCheck=true",
      headers: HEADERS.VALID_API_KEY,
      body: {
        proposedName: "Comrade Joint Ventures",
        lineOfBusiness: "general_merchandise",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq("OK");
      expect(response.body.data.message).to.eq("BUSINESS_NAME_EXISTS");
      expect(response.body.data.statusCode).to.eq("07");
      expect(response.body.data.data.recommendedActions).to.not.be.empty;
      // expect(response.body.data.data.similarNames).to.not.be.empty;
      // expect(response.body.data.data.suggestedNames).to.not.be.empty;
      // expect(response.body.data.data.mostSimilarName).to.not.be.empty;
      expect(response.body.data.data.similarityScorePercentage).to.be.a(
        "number"
      );
      expect(response.body.data.data.complianceScorePercentage).to.be.a(
        "number"
      );
    });
  });

  it('Should return 200, statusCode "08" with the message BUSINESS_NAME_TOO_SIMILAR when business is similar', () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/bn-compliance?advanceCheck=true",
      headers: HEADERS.VALID_API_KEY,
      body: {
        proposedName: "Gaya emarina Galaxy",
        lineOfBusiness: "general_merchandise",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq("OK");
      expect(response.body.data.message).to.eq("BUSINESS_NAME_TOO_SIMILAR");
      expect(response.body.data.statusCode).to.eq("08");
      expect(response.body.data.data.recommendedActions).to.not.be.empty;
      expect(response.body.data.data.similarNames).to.not.be.empty;
      // expect(response.body.data.data.suggestedNames).to.not.be.empty;
      // expect(response.body.data.data.mostSimilarName).to.not.be.empty;
      expect(response.body.data.data.similarityScorePercentage).to.be.a(
        "number"
      );
      expect(response.body.data.data.complianceScorePercentage).to.be.a(
        "number"
      );
    });
  });

  it('Should return 200, statusCode "10" with the message SINGLE_WORD when a single word is used as proposed name', () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/bn-compliance?advanceCheck=true",
      headers: HEADERS.VALID_API_KEY,
      body: {
        proposedName: "Comrade",
        lineOfBusiness: "general_merchandise",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq("OK");
      expect(response.body.data.message).to.eq("SINGLE_WORD");
      expect(response.body.data.statusCode).to.eq("10");
      expect(response.body.data.data.recommendedActions).to.not.be.empty;
      expect(response.body.data.data.recommendedActions[0].message).to.not.be
        .empty;
      expect(response.body.data.data.similarityScorePercentage).to.be.a(
        "number"
      );
      expect(response.body.data.data.complianceScorePercentage).to.be.a(
        "number"
      );
    });
  });

  it('Should return 200, statusCode "12" with the message SPECIAL_CHARACTERS when special character is used in proposed name', () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/bn-compliance?advanceCheck=true",
      headers: HEADERS.VALID_API_KEY,
      body: {
        proposedName: "Comrade$ Ventures",
        lineOfBusiness: "general_merchandise",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq("OK");
      expect(response.body.data.message).to.eq("SPECIAL_CHARACTERS");
      expect(response.body.data.statusCode).to.eq("12");
      expect(response.body.data.data.recommendedActions).to.not.be.empty;
      expect(response.body.data.data.recommendedActions[0].message).to.not.be
        .empty;
      // expect(response.body.data.data.similarNames).to.not.be.empty;
      // expect(response.body.data.data.mostSimilarName).to.not.be.empty;
      expect(response.body.data.data.similarityScorePercentage).to.be.a(
        "number"
      );
      expect(response.body.data.data.complianceScorePercentage).to.be.a(
        "number"
      );
    });
  });

  it('should return 200, statusCode "15" with the message PAYMENT_SERVICE_CONNOTATION when proposed name includes keyword like "wealth"', () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/bn-compliance?advanceCheck=true",
      headers: HEADERS.VALID_API_KEY,
      body: {
        proposedName: "Okpulku wealth Hub",
        lineOfBusiness: "general_merchandise",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.message).to.eq("PAYMENT_SERVICE_CONNOTATION");
      expect(response.body.data.statusCode).to.eq("15");

      const compliance = response.body.data.data;

      expect(compliance.recommendedActions).to.not.be.empty;
      expect(compliance.recommendedActions[0].message).to.not.be.empty;
      expect(compliance.recommendedActions[0].keywords).to.not.be.empty;

      expect(compliance.similarityScorePercentage).to.be.a("number");
      expect(compliance.complianceScorePercentage).to.be.a("number");
    });
  });

  it("Should return 400 Bad Request when Line of Business is not passed", () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/bn-compliance",
      headers: HEADERS.VALID_API_KEY,
      body: {
        proposedName: "Muller Medical concepts",
        lineOfBusiness: "",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.message).to.not.be.empty;
      expect(response.body.error.lineOfBusiness).to.not.be.empty;
    });
  });

  // // BUSINESS NAME
  it("Should return 200 when all details are complete for BUSINESS NAME REGISTRATION", () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/business-name",
      headers: HEADERS.VALID_API_KEY,
      body: {
        lineOfBusiness: "fashion design",
        proprietorCity: "Abuja",
        companyCity: "Abuja",
        proprietorPhonenumber: "07057001119",
        businessCommencementDate: "2024-01-21",
        companyState: "F.C.T",
        proprietorNationality: "Nigerian",
        proprietorState: "F.C.T",
        proprietorDob: "2000-01-21",
        proprietorFirstname: "John",
        proprietorOthername: "Peter",
        proprietorSurname: "Okoye",
        proposedOption1: "High Grade Collections Ventures",
        proprietorGender: "MALE",
        proprietorStreetNumber: "41",
        proprietorServiceAddress: "limpopo street",
        companyEmail: "abubakarabdul9023@gmail.com",
        companyStreetNumber: "41",
        proprietorEmail: "abubakarabdul9023@gmail.com",
        companyAddress: "69 road",
        proprietorPostcode: "900108",
        proprietorLga: "municipal",
        passport: base64Images.passport,
        meansOfId: base64Images.meansOfId,
        signature: base64Images.signature,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq("OK");
      expect(response.body.data.message).to.not.be.empty;
    });
  });

  it("Should return 403 when business name already exist", () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/business-name",
      headers: HEADERS.VALID_API_KEY,
      body: {
        lineOfBusiness: "fashion design",
        proprietorCity: "Abuja",
        companyCity: "Abuja",
        proprietorPhonenumber: "07057001119",
        businessCommencementDate: "2024-01-21",
        companyState: "F.C.T",
        proprietorNationality: "Nigerian",
        proprietorState: "F.C.T",
        proprietorDob: "2000-01-21",
        proprietorFirstname: "John",
        proprietorOthername: "Peter",
        proprietorSurname: "Okoye",
        proposedOption1: "Oga & Sons Ventures",
        proprietorGender: "MALE",
        proprietorStreetNumber: "41",
        proprietorServiceAddress: "limpopo street",
        companyEmail: "abubakarabdul9023@gmail.com",
        companyStreetNumber: "41",
        proprietorEmail: "abubakarabdul9023@gmail.com",
        companyAddress: "69 road",
        proprietorPostcode: "900108",
        proprietorLga: "municipal",
        passport: base64Images.passport,
        meansOfId: base64Images.meansOfId,
        signature: base64Images.signature,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(403);
      expect(response.body.status).to.eq("FORBIDDEN");
      expect(response.body.message).to.not.be.empty;
      expect(response.body.message).contain("Name already used ");
    });
  });

  it("Should return 400 BAD_REQUEST when business name is not provided", () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/business-name",
      headers: HEADERS.VALID_API_KEY,
      body: {
        lineOfBusiness: "fashion design",
        proprietorCity: "Abuja",
        companyCity: "Abuja",
        proprietorPhonenumber: "07057001119",
        businessCommencementDate: "2024-01-21",
        companyState: "F.C.T",
        proprietorNationality: "Nigerian",
        proprietorState: "F.C.T",
        proprietorDob: "2000-01-21",
        proprietorFirstname: "John",
        proprietorOthername: "Peter",
        proprietorSurname: "Okoye",
        proposedOption1: "",
        proprietorGender: "MALE",
        proprietorStreetNumber: "41",
        proprietorServiceAddress: "limpopo street",
        companyEmail: "abubakarabdul9023@gmail.com",
        companyStreetNumber: "41",
        proprietorEmail: "abubakarabdul9023@gmail.com",
        companyAddress: "69 road",
        proprietorPostcode: "900108",
        proprietorLga: "municipal",
        passport: base64Images.passport,
        meansOfId: base64Images.meansOfId,
        signature: base64Images.signature,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.message).to.not.be.empty;
      expect(response.body.errors).to.contain(
        "proposedOption1 - Proposed option must not be blank"
      );
      expect(response.body.message).contain("invalid inputs");
    });
  });

  it("Should return 400 BAD_REQUEST when proprietorFirstname is not provided", () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/business-name",
      headers: HEADERS.VALID_API_KEY,
      body: {
        lineOfBusiness: "fashion design",
        proprietorCity: "Abuja",
        companyCity: "Abuja",
        proprietorPhonenumber: "07057001119",
        businessCommencementDate: "2024-01-21",
        companyState: "F.C.T",
        proprietorNationality: "Nigerian",
        proprietorState: "F.C.T",
        proprietorDob: "2000-01-21",
        proprietorFirstname: "",
        proprietorOthername: "Peter",
        proprietorSurname: "Okoye",
        proposedOption1: "Empire Galaxy",
        proprietorGender: "MALE",
        proprietorStreetNumber: "41",
        proprietorServiceAddress: "limpopo street",
        companyEmail: "abubakarabdul9023@gmail.com",
        companyStreetNumber: "41",
        proprietorEmail: "abubakarabdul9023@gmail.com",
        companyAddress: "69 road",
        proprietorPostcode: "900108",
        proprietorLga: "municipal",
        passport: base64Images.passport,
        meansOfId: base64Images.meansOfId,
        signature: base64Images.signature,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.message).to.not.be.empty;
      expect(response.body.errors).to.contain(
        "proprietorFirstname - Proprietor firstname must not be blank"
      );
      expect(response.body.message).contain("invalid inputs");
    });
  });

  it("Should return 400 BAD_REQUEST when proprietorSurname is not provided", () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/business-name",
      headers: HEADERS.VALID_API_KEY,
      body: {
        lineOfBusiness: "fashion design",
        proprietorCity: "Abuja",
        companyCity: "Abuja",
        proprietorPhonenumber: "07057001119",
        businessCommencementDate: "2024-01-21",
        companyState: "F.C.T",
        proprietorNationality: "Nigerian",
        proprietorState: "F.C.T",
        proprietorDob: "2000-01-21",
        proprietorFirstname: "Monalisa",
        proprietorOthername: "Peter",
        proprietorSurname: "",
        proposedOption1: "Empire Galaxy",
        proprietorGender: "MALE",
        proprietorStreetNumber: "41",
        proprietorServiceAddress: "limpopo street",
        companyEmail: "abubakarabdul9023@gmail.com",
        companyStreetNumber: "41",
        proprietorEmail: "abubakarabdul9023@gmail.com",
        companyAddress: "69 road",
        proprietorPostcode: "900108",
        proprietorLga: "municipal",
        passport: base64Images.passport,
        meansOfId: base64Images.meansOfId,
        signature: base64Images.signature,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.message).to.not.be.empty;
      expect(response.body.errors).to.contain(
        "proprietorSurname - Proprietor surname must not be blank"
      );
      expect(response.body.message).contain("invalid inputs");
    });
  });

  it("Should return 400 BAD_REQUEST when line of business is not provided", () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/business-name",
      headers: HEADERS.VALID_API_KEY,
      body: {
        lineOfBusiness: "",
        proprietorCity: "Abuja",
        companyCity: "Abuja",
        proprietorPhonenumber: "07057001119",
        businessCommencementDate: "2024-01-21",
        companyState: "F.C.T",
        proprietorNationality: "Nigerian",
        proprietorState: "F.C.T",
        proprietorDob: "2000-01-21",
        proprietorFirstname: "Monalisa",
        proprietorOthername: "Peter",
        proprietorSurname: "Drury",
        proposedOption1: "Empire Galaxy",
        proprietorGender: "MALE",
        proprietorStreetNumber: "41",
        proprietorServiceAddress: "limpopo street",
        companyEmail: "abubakarabdul9023@gmail.com",
        companyStreetNumber: "41",
        proprietorEmail: "abubakarabdul9023@gmail.com",
        companyAddress: "69 road",
        proprietorPostcode: "900108",
        proprietorLga: "municipal",
        passport: base64Images.passport,
        meansOfId: base64Images.meansOfId,
        signature: base64Images.signature,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.message).to.not.be.empty;
      expect(response.body.errors).to.contain(
        "lineOfBusiness - Line of business must not be blank"
      );
      expect(response.body.message).contain("invalid inputs");
    });
  });

  it("Should return 400 BAD_REQUEST when proprietorCity is not provided", () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/business-name",
      headers: HEADERS.VALID_API_KEY,
      body: {
        lineOfBusiness: "Fashion Design",
        proprietorCity: "",
        companyCity: "Abuja",
        proprietorPhonenumber: "07057001119",
        businessCommencementDate: "2024-01-21",
        companyState: "F.C.T",
        proprietorNationality: "Nigerian",
        proprietorState: "F.C.T",
        proprietorDob: "2000-01-21",
        proprietorFirstname: "Monalisa",
        proprietorOthername: "Peter",
        proprietorSurname: "Drury",
        proposedOption1: "Empire Galaxy",
        proprietorGender: "MALE",
        proprietorStreetNumber: "41",
        proprietorServiceAddress: "limpopo street",
        companyEmail: "abubakarabdul9023@gmail.com",
        companyStreetNumber: "41",
        proprietorEmail: "abubakarabdul9023@gmail.com",
        companyAddress: "69 road",
        proprietorPostcode: "900108",
        proprietorLga: "municipal",
        passport: base64Images.passport,
        meansOfId: base64Images.meansOfId,
        signature: base64Images.signature,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.message).to.not.be.empty;
      expect(response.body.errors).to.contain(
        "proprietorCity - must not be empty"
      );
      expect(response.body.message).contain("invalid inputs");
    });
  });

  it("Should return 400 BAD_REQUEST when proprietor phone number is not provided", () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/business-name",
      headers: HEADERS.VALID_API_KEY,
      body: {
        lineOfBusiness: "Fashion Design",
        proprietorCity: "FCT",
        companyCity: "Abuja",
        proprietorPhonenumber: "",
        businessCommencementDate: "2024-01-21",
        companyState: "F.C.T",
        proprietorNationality: "Nigerian",
        proprietorState: "F.C.T",
        proprietorDob: "2000-01-21",
        proprietorFirstname: "Monalisa",
        proprietorOthername: "Peter",
        proprietorSurname: "Drury",
        proposedOption1: "Empire Galaxy",
        proprietorGender: "MALE",
        proprietorStreetNumber: "41",
        proprietorServiceAddress: "limpopo street",
        companyEmail: "abubakarabdul9023@gmail.com",
        companyStreetNumber: "41",
        proprietorEmail: "abubakarabdul9023@gmail.com",
        companyAddress: "69 road",
        proprietorPostcode: "900108",
        proprietorLga: "municipal",
        passport: base64Images.passport,
        meansOfId: base64Images.meansOfId,
        signature: base64Images.signature,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.message).to.not.be.empty;
      expect(response.body.errors).to.contains(
        "proprietorPhonenumber - Invalid phone number"
      );
      expect(response.body.message).contain("invalid inputs");
    });
  });

  it("Should return 400 BAD_REQUEST when proprietor business commencement date is not provided", () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/business-name",
      headers: HEADERS.VALID_API_KEY,
      body: {
        lineOfBusiness: "Fashion Design",
        proprietorCity: "Abuja",
        companyCity: "Abuja",
        proprietorPhonenumber: "07057001119",
        businessCommencementDate: "",
        companyState: "F.C.T",
        proprietorNationality: "Nigerian",
        proprietorState: "F.C.T",
        proprietorDob: "2000-01-21",
        proprietorFirstname: "Monalisa",
        proprietorOthername: "Peter",
        proprietorSurname: "Drury",
        proposedOption1: "Empire Galaxy",
        proprietorGender: "MALE",
        proprietorStreetNumber: "41",
        proprietorServiceAddress: "limpopo street",
        companyEmail: "abubakarabdul9023@gmail.com",
        companyStreetNumber: "41",
        proprietorEmail: "abubakarabdul9023@gmail.com",
        companyAddress: "69 road",
        proprietorPostcode: "900108",
        proprietorLga: "municipal",
        passport: base64Images.passport,
        meansOfId: base64Images.meansOfId,
        signature: base64Images.signature,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.message).to.not.be.empty;
      expect(response.body.errors).to.contains(
        "businessCommencementDate - must not be empty"
      );
      expect(response.body.message).contain("invalid inputs");
    });
  });

  it("Should return 400 BAD_REQUEST when comapany state is not provided", () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/business-name",
      headers: HEADERS.VALID_API_KEY,
      body: {
        lineOfBusiness: "Fashion Design",
        proprietorCity: "Abaji",
        companyCity: "Abuja",
        proprietorPhonenumber: "07057001119",
        businessCommencementDate: "2000-01-21",
        companyState: "",
        proprietorNationality: "Nigerian",
        proprietorState: "FCT",
        proprietorDob: "2000-01-21",
        proprietorFirstname: "Monalisa",
        proprietorOthername: "Peter",
        proprietorSurname: "Drury",
        proposedOption1: "Empire Galaxy",
        proprietorGender: "MALE",
        proprietorStreetNumber: "41",
        proprietorServiceAddress: "limpopo street",
        companyEmail: "abubakarabdul9023@gmail.com",
        companyStreetNumber: "41",
        proprietorEmail: "abubakarabdul9023@gmail.com",
        companyAddress: "69 road",
        proprietorPostcode: "900108",
        proprietorLga: "municipal",
        passport: base64Images.passport,
        meansOfId: base64Images.meansOfId,
        signature: base64Images.signature,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.message).to.not.be.empty;
      expect(response.body.errors).to.contains(
        "companyState - Company state must not be blank"
      );
      expect(response.body.message).contain("invalid inputs");
    });
  });

  it("Should return 400 BAD_REQUEST when proprietor Nationality is not provided", () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/business-name",
      headers: HEADERS.VALID_API_KEY,
      body: {
        lineOfBusiness: "Fashion Design",
        proprietorCity: "Abaji",
        companyCity: "Abuja",
        proprietorPhonenumber: "07057001119",
        businessCommencementDate: "2000-01-21",
        companyState: "FCT",
        proprietorNationality: "",
        proprietorState: "FCT",
        proprietorDob: "2000-01-21",
        proprietorFirstname: "Monalisa",
        proprietorOthername: "Peter",
        proprietorSurname: "Drury",
        proposedOption1: "Empire Galaxy",
        proprietorGender: "MALE",
        proprietorStreetNumber: "41",
        proprietorServiceAddress: "limpopo street",
        companyEmail: "abubakarabdul9023@gmail.com",
        companyStreetNumber: "41",
        proprietorEmail: "abubakarabdul9023@gmail.com",
        companyAddress: "69 road",
        proprietorPostcode: "900108",
        proprietorLga: "municipal",
        passport: base64Images.passport,
        meansOfId: base64Images.meansOfId,
        signature: base64Images.signature,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.message).to.not.be.empty;
      expect(response.body.errors).to.contains(
        "proprietorNationality - Proprietor nationality must not be blank"
      );
      expect(response.body.message).contain("invalid inputs");
    });
  });

  it("Should return 400 BAD_REQUEST when proprietor State is not provided", () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/business-name",
      headers: HEADERS.VALID_API_KEY,
      body: {
        lineOfBusiness: "Fashion Design",
        proprietorCity: "Abaji",
        companyCity: "Abuja",
        proprietorPhonenumber: "07057001119",
        businessCommencementDate: "2000-01-21",
        companyState: "FCT",
        proprietorNationality: "Nigerian",
        proprietorState: "",
        proprietorDob: "2000-01-21",
        proprietorFirstname: "Monalisa",
        proprietorOthername: "Peter",
        proprietorSurname: "Drury",
        proposedOption1: "Empire Galaxy",
        proprietorGender: "MALE",
        proprietorStreetNumber: "41",
        proprietorServiceAddress: "limpopo street",
        companyEmail: "abubakarabdul9023@gmail.com",
        companyStreetNumber: "41",
        proprietorEmail: "abubakarabdul9023@gmail.com",
        companyAddress: "69 road",
        proprietorPostcode: "900108",
        proprietorLga: "municipal",
        passport: base64Images.passport,
        meansOfId: base64Images.meansOfId,
        signature: base64Images.signature,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.message).to.not.be.empty;
      expect(response.body.errors).to.contains(
        "proprietorState - Proprietor state must not be blank"
      );
      expect(response.body.message).contain("invalid inputs");
    });
  });

  it("Should return 400 BAD_REQUEST when proprietor Date of Birth is not provided", () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/business-name",
      headers: HEADERS.VALID_API_KEY,
      body: {
        lineOfBusiness: "Fashion Design",
        proprietorCity: "Abaji",
        companyCity: "Abuja",
        proprietorPhonenumber: "07057001119",
        businessCommencementDate: "2000-01-21",
        companyState: "FCT",
        proprietorNationality: "Nigerian",
        proprietorState: "FCT",
        proprietorDob: "",
        proprietorFirstname: "Monalisa",
        proprietorOthername: "Peter",
        proprietorSurname: "Drury",
        proposedOption1: "Empire Galaxy",
        proprietorGender: "MALE",
        proprietorStreetNumber: "41",
        proprietorServiceAddress: "limpopo street",
        companyEmail: "abubakarabdul9023@gmail.com",
        companyStreetNumber: "41",
        proprietorEmail: "abubakarabdul9023@gmail.com",
        companyAddress: "69 road",
        proprietorPostcode: "900108",
        proprietorLga: "municipal",
        passport: base64Images.passport,
        meansOfId: base64Images.meansOfId,
        signature: base64Images.signature,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.message).to.not.be.empty;
      expect(response.body.errors).to.contains(
        "proprietorDob - must not be empty"
      );
      expect(response.body.message).contains("invalid inputs");
    });
  });

  it("Should return 400 BAD_REQUEST when proprietor Date of Birth is below 18", () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/business-name",
      headers: HEADERS.VALID_API_KEY,
      body: {
        lineOfBusiness: "Fashion Design",
        proprietorCity: "Abaji",
        companyCity: "Abuja",
        proprietorPhonenumber: "07057001119",
        businessCommencementDate: "2000-01-21",
        companyState: "FCT",
        proprietorNationality: "Nigerian",
        proprietorState: "FCT",
        proprietorDob: "2021-01-21",
        proprietorFirstname: "Monalisa",
        proprietorOthername: "Peter",
        proprietorSurname: "Drury",
        proposedOption1: "Munjul Equisite Hub",
        proprietorGender: "MALE",
        proprietorStreetNumber: "41",
        proprietorServiceAddress: "limpopo street",
        companyEmail: "abubakarabdul9023@gmail.com",
        companyStreetNumber: "41",
        proprietorEmail: "abubakarabdul9023@gmail.com",
        companyAddress: "69 road",
        proprietorPostcode: "900108",
        proprietorLga: "municipal",
        passport: base64Images.passport,
        meansOfId: base64Images.meansOfId,
        signature: base64Images.signature,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.message).to.not.be.empty;
      expect(response.body.message).contains("proprietor cannot be a minor");
    });
  });

  it("Should return 400 BAD_REQUEST when proprietor Gender is not provided", () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/business-name",
      headers: HEADERS.VALID_API_KEY,
      body: {
        lineOfBusiness: "Fashion Design",
        proprietorCity: "Abaji",
        companyCity: "Abuja",
        proprietorPhonenumber: "07057001119",
        businessCommencementDate: "2000-01-21",
        companyState: "FCT",
        proprietorNationality: "Nigerian",
        proprietorState: "FCT",
        proprietorDob: "2020-01-21",
        proprietorFirstname: "Monalisa",
        proprietorOthername: "Peter",
        proprietorSurname: "Drury",
        proposedOption1: "Maximum Concept Galaxy",
        proprietorGender: "",
        proprietorStreetNumber: "41",
        proprietorServiceAddress: "limpopo street",
        companyEmail: "abubakarabdul9023@gmail.com",
        companyStreetNumber: "41",
        proprietorEmail: "abubakarabdul9023@gmail.com",
        companyAddress: "69 road",
        proprietorPostcode: "900108",
        proprietorLga: "municipal",
        passport: base64Images.passport,
        meansOfId: base64Images.meansOfId,
        signature: base64Images.signature,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.message).to.contains("invalid inputs");
      expect(response.body.errors).contains(
        "proprietorGender - must not be empty"
      );
    });
  });

  it("Should return 400 BAD_REQUEST when proprietor Street number is not provided", () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/business-name",
      headers: HEADERS.VALID_API_KEY,
      body: {
        lineOfBusiness: "Fashion Design",
        proprietorCity: "Abaji",
        companyCity: "Abuja",
        proprietorPhonenumber: "07057001119",
        businessCommencementDate: "2000-01-21",
        companyState: "FCT",
        proprietorNationality: "Nigerian",
        proprietorState: "FCT",
        proprietorDob: "2020-01-21",
        proprietorFirstname: "Monalisa",
        proprietorOthername: "Peter",
        proprietorSurname: "Drury",
        proposedOption1: "Maximum Concept Galaxy",
        proprietorGender: "FEMALE",
        proprietorStreetNumber: "",
        proprietorServiceAddress: "limpopo street",
        companyEmail: "abubakarabdul9023@gmail.com",
        companyStreetNumber: "41",
        proprietorEmail: "abubakarabdul9023@gmail.com",
        companyAddress: "69 road",
        proprietorPostcode: "900108",
        proprietorLga: "municipal",
        passport: base64Images.passport,
        meansOfId: base64Images.meansOfId,
        signature: base64Images.signature,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.message).to.contains("invalid inputs");
      expect(response.body.errors).contains(
        "proprietorStreetNumber - must not be empty"
      );
    });
  });

  it("Should return 400 BAD_REQUEST when proprietor service address is not provided", () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/business-name",
      headers: HEADERS.VALID_API_KEY,
      body: {
        lineOfBusiness: "Fashion Design",
        proprietorCity: "Abaji",
        companyCity: "Abuja",
        proprietorPhonenumber: "07057001119",
        businessCommencementDate: "2000-01-21",
        companyState: "FCT",
        proprietorNationality: "Nigerian",
        proprietorState: "FCT",
        proprietorDob: "2020-01-21",
        proprietorFirstname: "Monalisa",
        proprietorOthername: "Peter",
        proprietorSurname: "Drury",
        proposedOption1: "Maximum Concept Galaxy",
        proprietorGender: "FEMALE",
        proprietorStreetNumber: "41",
        proprietorServiceAddress: "",
        companyEmail: "abubakarabdul9023@gmail.com",
        companyStreetNumber: "41",
        proprietorEmail: "abubakarabdul9023@gmail.com",
        companyAddress: "69 road",
        proprietorPostcode: "900108",
        proprietorLga: "municipal",
        passport: base64Images.passport,
        meansOfId: base64Images.meansOfId,
        signature: base64Images.signature,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.message).to.contains("invalid inputs");
      expect(response.body.errors).contains(
        "proprietorServiceAddress - Proprietor service address must not be blank"
      );
    });
  });

  it("Should return 400 BAD_REQUEST when company email is not provided", () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/business-name",
      headers: HEADERS.VALID_API_KEY,
      body: {
        lineOfBusiness: "Fashion Design",
        proprietorCity: "Abaji",
        companyCity: "Abuja",
        proprietorPhonenumber: "07057001119",
        businessCommencementDate: "2000-01-21",
        companyState: "FCT",
        proprietorNationality: "Nigerian",
        proprietorState: "FCT",
        proprietorDob: "2020-01-21",
        proprietorFirstname: "Monalisa",
        proprietorOthername: "Peter",
        proprietorSurname: "Drury",
        proposedOption1: "Maximum Concept Galaxy",
        proprietorGender: "FEMALE",
        proprietorStreetNumber: "41",
        proprietorServiceAddress: "Jabi Lake",
        companyEmail: "",
        companyStreetNumber: "41",
        proprietorEmail: "abubakarabdul9023@gmail.com",
        companyAddress: "69 road",
        proprietorPostcode: "900108",
        proprietorLga: "municipal",
        passport: base64Images.passport,
        meansOfId: base64Images.meansOfId,
        signature: base64Images.signature,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.message).to.contains("invalid inputs");
      expect(response.body.errors).contains(
        "companyEmail - Company email must not be blank"
      );
    });
  });

  it("Should return 400 BAD_REQUEST when company street number is not provided", () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/business-name",
      headers: HEADERS.VALID_API_KEY,
      body: {
        lineOfBusiness: "Fashion Design",
        proprietorCity: "Abaji",
        companyCity: "Abuja",
        proprietorPhonenumber: "07057001119",
        businessCommencementDate: "2000-01-21",
        companyState: "FCT",
        proprietorNationality: "Nigerian",
        proprietorState: "FCT",
        proprietorDob: "2020-01-21",
        proprietorFirstname: "Monalisa",
        proprietorOthername: "Peter",
        proprietorSurname: "Drury",
        proposedOption1: "Maximum Concept Galaxy",
        proprietorGender: "FEMALE",
        proprietorStreetNumber: "41",
        proprietorServiceAddress: "Jabi Lake",
        companyEmail: "abubakar@gmail.com",
        companyStreetNumber: "",
        proprietorEmail: "abubakarabdul9023@gmail.com",
        companyAddress: "69 road",
        proprietorPostcode: "900108",
        proprietorLga: "municipal",
        passport: base64Images.passport,
        meansOfId: base64Images.meansOfId,
        signature: base64Images.signature,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.message).to.contains("invalid inputs");
      expect(response.body.errors).contains(
        "companyStreetNumber - must not be empty"
      );
    });
  });

  it("Should return 400 BAD_REQUEST when proprietor email is not provided", () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/business-name",
      headers: HEADERS.VALID_API_KEY,
      body: {
        lineOfBusiness: "Fashion Design",
        proprietorCity: "Abaji",
        companyCity: "Abuja",
        proprietorPhonenumber: "07057001119",
        businessCommencementDate: "2000-01-21",
        companyState: "FCT",
        proprietorNationality: "Nigerian",
        proprietorState: "FCT",
        proprietorDob: "2020-01-21",
        proprietorFirstname: "Monalisa",
        proprietorOthername: "Peter",
        proprietorSurname: "Drury",
        proposedOption1: "Maximum Concept Galaxy",
        proprietorGender: "FEMALE",
        proprietorStreetNumber: "41",
        proprietorServiceAddress: "Jabi Lake",
        companyEmail: "abubakar@gmail.com",
        companyStreetNumber: "42",
        proprietorEmail: "",
        companyAddress: "69 road",
        proprietorPostcode: "900108",
        proprietorLga: "municipal",
        passport: base64Images.passport,
        meansOfId: base64Images.meansOfId,
        signature: base64Images.signature,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.message).to.contains("invalid inputs");
      expect(response.body.errors).contains(
        "proprietorEmail - must not be empty"
      );
    });
  });

  it("Should return 400 BAD_REQUEST when company address is not provided", () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/business-name",
      headers: HEADERS.VALID_API_KEY,
      body: {
        lineOfBusiness: "Fashion Design",
        proprietorCity: "Abaji",
        companyCity: "Abuja",
        proprietorPhonenumber: "07057001119",
        businessCommencementDate: "2000-01-21",
        companyState: "FCT",
        proprietorNationality: "Nigerian",
        proprietorState: "FCT",
        proprietorDob: "2020-01-21",
        proprietorFirstname: "Monalisa",
        proprietorOthername: "Peter",
        proprietorSurname: "Drury",
        proposedOption1: "Maximum Concept Galaxy",
        proprietorGender: "FEMALE",
        proprietorStreetNumber: "41",
        proprietorServiceAddress: "Jabi Lake",
        companyEmail: "abubakar@gmail.com",
        companyStreetNumber: "42",
        proprietorEmail: "abubakar@gmail.com",
        companyAddress: "",
        proprietorPostcode: "900108",
        proprietorLga: "municipal",
        passport: base64Images.passport,
        meansOfId: base64Images.meansOfId,
        signature: base64Images.signature,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.message).to.contains("invalid inputs");
      expect(response.body.errors).contains(
        "companyAddress - Company address must not be blank"
      );
    });
  });
  it("Should return 400 BAD_REQUEST when proprietor Postcode address is not provided", () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/business-name",
      headers: HEADERS.VALID_API_KEY,
      body: {
        lineOfBusiness: "Fashion Design",
        proprietorCity: "Abaji",
        companyCity: "Abuja",
        proprietorPhonenumber: "07057001119",
        businessCommencementDate: "2000-01-21",
        companyState: "FCT",
        proprietorNationality: "Nigerian",
        proprietorState: "FCT",
        proprietorDob: "2020-01-21",
        proprietorFirstname: "Monalisa",
        proprietorOthername: "Peter",
        proprietorSurname: "Drury",
        proposedOption1: "Maximum Concept Galaxy",
        proprietorGender: "FEMALE",
        proprietorStreetNumber: "41",
        proprietorServiceAddress: "Jabi Lake",
        companyEmail: "abubakar@gmail.com",
        companyStreetNumber: "42",
        proprietorEmail: "abubakar@gmail.com",
        companyAddress: "69 Road",
        proprietorPostcode: "",
        proprietorLga: "municipal",
        passport: base64Images.passport,
        meansOfId: base64Images.meansOfId,
        signature: base64Images.signature,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.message).to.contains("invalid inputs");
      expect(response.body.errors).contains(
        "proprietorPostcode - Proprietor postcode must not be blank"
      );
    });
  });

  it("Should return 400 BAD_REQUEST when proprietorLga is not provided", () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/business-name",
      headers: HEADERS.VALID_API_KEY,
      body: {
        lineOfBusiness: "Fashion Design",
        proprietorCity: "Abaji",
        companyCity: "Abuja",
        proprietorPhonenumber: "07057001119",
        businessCommencementDate: "2000-01-21",
        companyState: "FCT",
        proprietorNationality: "Nigerian",
        proprietorState: "FCT",
        proprietorDob: "2020-01-21",
        proprietorFirstname: "Monalisa",
        proprietorOthername: "Peter",
        proprietorSurname: "Drury",
        proposedOption1: "Maximum Concept Galaxy",
        proprietorGender: "FEMALE",
        proprietorStreetNumber: "41",
        proprietorServiceAddress: "Jabi Lake",
        companyEmail: "abubakar@gmail.com",
        companyStreetNumber: "42",
        proprietorEmail: "abubakar@gmail.com",
        companyAddress: "69 Road",
        proprietorPostcode: "804889",
        proprietorLga: "",
        passport: base64Images.passport,
        meansOfId: base64Images.meansOfId,
        signature: base64Images.signature,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.message).to.contains("invalid inputs");
      expect(response.body.errors).contains(
        "proprietorLga - Proprietor LGA must not be blank"
      );
    });
  });

  it("Should return 400 BAD_REQUEST when passport is not provided", () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/business-name",
      headers: HEADERS.VALID_API_KEY,
      body: {
        lineOfBusiness: "Fashion Design",
        proprietorCity: "Abaji",
        companyCity: "Abuja",
        proprietorPhonenumber: "07057001119",
        businessCommencementDate: "2000-01-21",
        companyState: "FCT",
        proprietorNationality: "Nigerian",
        proprietorState: "FCT",
        proprietorDob: "2020-01-21",
        proprietorFirstname: "Monalisa",
        proprietorOthername: "Peter",
        proprietorSurname: "Drury",
        proposedOption1: "Maximum Concept Galaxy",
        proprietorGender: "FEMALE",
        proprietorStreetNumber: "41",
        proprietorServiceAddress: "Jabi Lake",
        companyEmail: "abubakar@gmail.com",
        companyStreetNumber: "42",
        proprietorEmail: "abubakar@gmail.com",
        companyAddress: "69 Road",
        proprietorPostcode: "804889",
        proprietorLga: "municipal",
        passport: "",
        meansOfId: base64Images.meansOfId,
        signature: base64Images.signature,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.message).to.contains("invalid inputs");
      expect(response.body.errors).contains("passport - must not be empty");
    });
  });

  it("Should return 400 BAD_REQUEST when passport is not provided", () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/business-name",
      headers: HEADERS.VALID_API_KEY,
      body: {
        lineOfBusiness: "Fashion Design",
        proprietorCity: "Abaji",
        companyCity: "Abuja",
        proprietorPhonenumber: "07057001119",
        businessCommencementDate: "2000-01-21",
        companyState: "FCT",
        proprietorNationality: "Nigerian",
        proprietorState: "FCT",
        proprietorDob: "2020-01-21",
        proprietorFirstname: "Monalisa",
        proprietorOthername: "Peter",
        proprietorSurname: "Drury",
        proposedOption1: "Maximum Concept Galaxy",
        proprietorGender: "FEMALE",
        proprietorStreetNumber: "41",
        proprietorServiceAddress: "Jabi Lake",
        companyEmail: "abubakar@gmail.com",
        companyStreetNumber: "42",
        proprietorEmail: "abubakar@gmail.com",
        companyAddress: "69 Road",
        proprietorPostcode: "804889",
        proprietorLga: "municipal",
        passport: base64Images.passport,
        meansOfId: "",
        signature: base64Images.signature,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.message).to.contains("invalid inputs");
      expect(response.body.errors).contains("meansOfId - must not be empty");
    });
  });

  it("Should return 400 BAD_REQUEST when passport is not provided", () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/business-name",
      headers: HEADERS.VALID_API_KEY,
      body: {
        lineOfBusiness: "Fashion Design",
        proprietorCity: "Abaji",
        companyCity: "Abuja",
        proprietorPhonenumber: "07057001119",
        businessCommencementDate: "2000-01-21",
        companyState: "FCT",
        proprietorNationality: "Nigerian",
        proprietorState: "FCT",
        proprietorDob: "2020-01-21",
        proprietorFirstname: "Monalisa",
        proprietorOthername: "Peter",
        proprietorSurname: "Drury",
        proposedOption1: "Maximum Concept Galaxy",
        proprietorGender: "FEMALE",
        proprietorStreetNumber: "41",
        proprietorServiceAddress: "Jabi Lake",
        companyEmail: "abubakar@gmail.com",
        companyStreetNumber: "42",
        proprietorEmail: "abubakar@gmail.com",
        companyAddress: "69 Road",
        proprietorPostcode: "804889",
        proprietorLga: "municipal",
        passport: base64Images.passport,
        meansOfId: base64Images.signature,
        signature: "",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.message).to.contains("invalid inputs");
      expect(response.body.errors).contains("signature - must not be empty");
    });
  });

  // BN PRE-REG VALIDATION
  it("Should return 200 when the BN PRE-REG VALIDATION endpoint is called", () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/bn/validation",
      headers: HEADERS.VALID_API_KEY,
      body: {
        companyCity: "Eti Osa",
        companyEmail: "abubakarabdul9023@gmail.com",
        companyState: "Lagos State",
        businessCommencementDate: "2025-04-25",
        companyAddress: "69, road",
        transactionRef: "244624463442645997",
        proposedOption1: "ketem chimasgo travels",
        companyStreetNumber: "Gwarinpa",
        lineOfBusiness: "fashion design",
        proprietorFirstname: "JASPER",
        proprietorNationality: "Nigerian",
        proprietorPhonenumber: "08020686848s",
        proprietorStreetNumber: "ppp, I samu, FESTAC TOWN LAGOS",
        proprietorEmail: "abubakarabdul9023@gmail.comb@gmail.com",
        proprietorState: "Lagos State",
        proprietorGender: "male",
        proprietorSurname: "CHINEDU",
        proprietorPostcode: "100001",
        proprietorServiceAddress: "Ikota Estate",
        proprietorDob: "1980-05-25",
        proprietorCity: "Eti Osa",
        proprietorLga: "Ado/langbasa/badore",
        proprietorOthername: "kjj",
        passport: base64Images.passport,
        meansOfId: base64Images.signature,
        signature: "",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq("OK");
      expect(response.body.success).to.be.true;
      expect(response.body.message).to.eq(
        "validation data received successfully"
      );

      const data = response.body.data;
      expect(data).to.have.property("proposedOption1");
      expect(data.proposedOption1[0]).to.include(
        "proposed name contains prohibited/restricted words"
      );

      expect(data).to.have.property("proprietorGender");
      expect(data.proprietorGender[0]).to.include(
        "gender type should be of MALE or FEMALE"
      );

      expect(data).to.have.property("proprietorPhonenumber");
      expect(data.proprietorPhonenumber[0]).to.include(
        "invalid phone number passed"
      );

      expect(data).to.have.property("proprietorEmail");
      expect(data.proprietorEmail[0]).to.include(
        "invalid email address passed"
      );
    });
  });

  // BUSINESS NAME PARTNERSHIP
  // BUSINESS NAME PARTNERSHIP
  it("should attempt to register a partner and handle success or maximum partnership limit response", () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/business-name/partner",
      headers: HEADERS.VALID_API_KEY,
      body: {
        transactionRef: "VAS20250527112423161",
        lineOfBusiness: "Fashion Design",
        proprietorCity: "Abaji",
        companyCity: "Abuja",
        proprietorPhonenumber: "07057001119",
        businessCommencementDate: "2000-01-21",
        companyState: "FCT",
        proprietorNationality: "Nigerian",
        proprietorState: "FCT",
        proprietorDob: "2020-01-21",
        proprietorFirstname: "Monalisa",
        proprietorOthername: "Peter",
        proprietorSurname: "Drury",
        proposedOption1: "Maximum Concept Galaxy",
        proprietorGender: "FEMALE",
        proprietorStreetNumber: "41",
        proprietorServiceAddress: "Jabi Lake",
        companyEmail: "abubakar@gmail.com",
        companyStreetNumber: "42",
        proprietorEmail: "abubakar@gmail.com",
        companyAddress: "69 Road",
        proprietorPostcode: "804889",
        proprietorLga: "municipal",
        signature: base64Images.signature,
        meansOfId: base64Images.meansOfId,
        passport: base64Images.passport,
        supportingDoc: base64Images.supportingDoc,
      },
      failOnStatusCode: false, // prevent Cypress from failing on 403
    }).then((response) => {
      if (response.status === 200) {
        expect(response.body.status).to.eq("OK");
        expect(response.body.message).to.eq("partner registered successfully");
        expect(response.body.success).to.be.true;
      } else if (response.status === 403) {
        expect(response.body.status).to.eq("FORBIDDEN");
        expect(response.body.message).to.eq(
          "maximum partnership limit reached"
        );
        expect(response.body.success).to.be.false;
      } else {
        throw new Error(
          `Unexpected response: ${JSON.stringify(response.body)}`
        );
      }
    });
  });

  it("should return 400 BAD_REQUEST when transactionRef is invalid", () => {
    cy.request({
      method: "POST",
      url: "http://vasapp.oasisproducts.ng/api/vas/engine/pre/business-name/partner",
      headers: HEADERS.VALID_API_KEY,
      body: {
        transactionRef: "VAS202505271124231",
        lineOfBusiness: "Fashion Design",
        proprietorCity: "Abaji",
        companyCity: "Abuja",
        proprietorPhonenumber: "07057001119",
        businessCommencementDate: "2000-01-21",
        companyState: "FCT",
        proprietorNationality: "Nigerian",
        proprietorState: "FCT",
        proprietorDob: "2020-01-21",
        proprietorFirstname: "Monalisa",
        proprietorOthername: "Peter",
        proprietorSurname: "Drury",
        proposedOption1: "Maximum Concept Galaxy",
        proprietorGender: "FEMALE",
        proprietorStreetNumber: "41",
        proprietorServiceAddress: "Jabi Lake",
        companyEmail: "abubakar@gmail.com",
        companyStreetNumber: "42",
        proprietorEmail: "abubakar@gmail.com",
        companyAddress: "69 Road",
        proprietorPostcode: "804889",
        proprietorLga: "municipal",
        signature: base64Images.signature,
        meansOfId: base64Images.meansOfId,
        passport: base64Images.passport,
        supportingDoc: base64Images.supportingDoc,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq("BAD_REQUEST");
      expect(response.body.message).to.eq("invalid transactionRef");
      expect(response.body.success).to.be.false;
    });
  });
});
