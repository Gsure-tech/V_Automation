// @ts-ignore
// @ts-ignore
/// <reference types="cypress-mailslurp" />

describe("CAC Landing Page UI Tests", () => {

  beforeEach(() => {
    cy.log("test plan will cover Visual , Functional and ux requirement")
    cy.visit("https://cac.oasisproducts.ng"); //
    cy.get("button.btn.btn-success.rounded-pill.px-5").click()
  })


  // it.skip("Logo and navigation",()=>{
  //   cy.log("Validate Logo is visible")
  //   // cy.get("img[alt=]")
  // } )
  //
  // it("Validate navigation Links",()=>{
  //
  //   // forms for objection and contact us
  //   const navLinks: string[] = [
  //     "Objection For IT & LTD/GTE",
  //     "Contact Us",
  //   ]
  //   const headLink:string[] =[
  //     "Help",
  //     "FAQs",
  //   ]
  //
  //   headLink.forEach((head: string)=>{
  //     cy.contains("a", head)
  //         .should("be.visible")
  //         .and("have.attr",
  //             "href")
  //   })
  //
  //   navLinks.forEach((i: string)=>{
  //     cy.contains( i)
  //         .should("be.visible")
  //         .and("have.attr",
  //             "href")
  //         .then((href)=>{
  //           // @ts-ignore
  //           cy.visit(href);
  //
  //           //validate url
  //           cy.url().should("include",href);
  //           cy.log(href)
  //           // cy.request(href).its(status).should("eq",200);
  //           cy.go(-1);
  //         })
  //     // if (i === "Contact Us") {
  //     //
  //     //     cy.get("select[name='category']")
  //     //         .should("be.visible")
  //     //         .find("option")
  //     //         .each(($option) => {
  //     //             const optionText = $option.text().trim();
  //     //             cy.get("select[name='category']").select(optionText);
  //     //             cy.get("select[name='category']").should("have.value", $option.val());
  //     //         });
  //     //     cy.intercept("POST","/pre_backend_service/api/complaint/save").as("sumitContact");
  //     //     cy.get("textarea[class='form-control ng-untouched ng-pristine ng-invalid']").type("i have an issue sir");
  //     //     cy.get("input[type='text']").type("company")
  //     //     cy.get("input[formcontrolname='phone']").type("09033456774")
  //     //     cy.get("input[formcontrolname='email']").type("ok@mailinator.com")
  //     //     cy.wait("@sumitContact").its("response.statusCode").should("eq", 200);
  //     //
  //     // }
  //     // if (i=="Objection For IT & LTD/GTE"){
  //     //
  //     // }
  //
  //
  //     cy.go("back");
  //   })
  // })

  it("Sign Up flow",()=>{

    //  CREATE ACCOUNT
    cy.contains("Sign Up").click();

    // cy.log("When User already registered continue Registration")
    // cy.get("input[placeholder='Username / Email / Phone number']")
    //     .type("0102345894");
    // //click search button
    // cy.get("button[class$='p-2']").click();
    //
    // cy.log("Confirm App status");
    // // cy.get("div > div:nth-of-type(1) > div:nth-of-type(4) > button").click


    const regTypes= [
      // {
        //registration for pub user
      //   regLabel:"Public User",
      //   expectedF:{
      //
      //   },
      //
      //   formField:{
      //     "input[placeholder='Enter Surname']":"chima",
      //     "input[placeholder='Enter First Name']":"backpack",
      //     "input[placeholder='Enter Other Name']":"gerald",
      //     "input[placeholder='Select Date']":"1999-06-06",
      //     "select[formcontrolname='gender']":{ type: "select", value: "Male" },
      //     "select[formcontrolname='nationality']":{ type: "select", value: "NIGERIA" },
      //     "input[placeholder='Phone number']":"9033546085",
      //     "input[formcontrolname='email']":"onyii133@mailinator.com",
      //     "input[formcontrolname='confirmEmail']":"onyii133@mailinator.com",
      //     "input[placeholder='Enter User Name']":"onyii133",
      //     "input[formcontrolname='password']":"Password1",
      //     "input[formcontrolname='confirmPassword']":"Password1",
      //     "input[placeholder='Enter Job Description']":"onyi",
      //     "select[formcontrolname='meansOfIdentification']": { type: "select", value: "National ID Card" },
      //     // "select[formcontrolname='meansOfIdentification']":"National Identification Number",
      //     "input[placeholder='Enter Identity Number']":"onyi",
      //     "select[formcontrolname='country']": { type: "select", value: "Nigeria" },
      //     "select[formcontrolname='state']": {type: "select", value: "Fct"},
      //     "select[formcontrolname='lga']":  {type: "select", value: "Amac"},
      //     "input[placeholder='Enter Postal Code']":"onyi",
      //     "input[placeholder='Enter City/Town/Village']":"onyi",
      //     "input[placeholder='Enter House / Building Number']":"9 udi plaza",
      //     "input[placeholder='Enter Street Name']":"parakou",
      //
      //   },
      // },


      {
        //reg for accredited agent
        regLabel:"Accredited Agent",
        expectedF:{

        },
        formField:{
          "[name = 'agentTypeId']":{ type: "select", value: "Nigerian Bar Association Individual" },
          // "select[name='agentTypeValue']":{ type: "select", value: "Nigerian Bar Association Individual" },
          "input[placeholder='Enter Surname']":"Ndueso",
          "input[placeholder='Enter First Name']":"Michael",
          "input[placeholder='Enter Other Name']":"Jackson",
          "input[placeholder='Select Date']":"1999-06-06",
          "select[formcontrolname='gender']":{ type: "select", value: "Male" },
          "select[formcontrolname='nationality']":{type: "select", value: "NIGERIA"},
          "input[placeholder='Phone number']":"7014329006",
          "input[formcontrolname='email']":"jevmis@mailslurp.biz",
          "input[formcontrolname='confirmEmail']":"jevmis@mailslurp.biz",
          "input[placeholder='Enter User Name']":"jevmis28",
          "input[formcontrolname='password']":"*Mndueso3",
          "input[formcontrolname='confirmPassword']":"*Mndueso3",
          "input[placeholder='Enter Job Description']":"Legal practisioner",
          // "select[formcontrolname='meansOfIdentification']": { type: "select", value: "National Identification Number" },
          "select[formcontrolname='meansOfIdentification']":"National ID Card",
          "input[placeholder='Enter Identity Number']":"123456789",
          "select[formcontrolname='country']": { type: "select", value: "Nigeria" },
          "select[formcontrolname='state']": {type: "select", value: "Fct"},
          "select[formcontrolname='lga']":  {type: "select", value: "Amac"},
          "input[placeholder='Enter Postal Code']":"12345",
          "input[placeholder='Enter City/Town/Village']":"QWERTY",
          "input[placeholder='Enter House / Building Number']":"9 udi plaza",
          "input[placeholder='Enter Street Name']":"parakou",
        },
      },

      //     //registeration for IP
      //     regLabel:"Insolvency Practitioner",
      //     expectedF:{
      //
      //     },
      //     formField:{
      //         "input[placeholder='Enter Surname']":"chima",
      //         "input[placeholder='Enter First Name']":"backpack",
      //         "input[placeholder='Enter Other Name']":"gerald",
      //         "input[placeholder='Select Date']":"1999-06-06",
      //         ":nth-child(1) > .row > :nth-child(5)":{ type: "select", value: "Male" },
      //         "input[placeholder='Phone number']":"9033546085",
      //         "input[placeholder='Enter Email']":"onyii233@mailinator.com",
      //         "input[formcontrolname='confirmEmail']":"onyii233@mailinator.com",
      //         "input[placeholder='Enter User Name']":"onyi",
      //         "input[placeholder='Enter Password']":"Jude2",
      //         "input[formcontrolname='confirmPassword']":"Jude2",
      //         "input[placeholder='Enter Job Description']":"onyi",
      //         // "select[formcontrolname='meansOfIdentification']": { type: "select", value: "National Identification Number" },
      //         "select[formcontrolname='meansOfIdentification']":"National Identification Number",
      //         "input[placeholder='Enter Identity Number']":"onyi",
      //         "select[formcontrolname='country']": { type: "select", value: "Nigeria" },
      //         "select[formcontrolname='state']": {type: "select", value: "Value"},
      //         "select[formcontrolname='lga']":  {type: "select", value: "Value"},
      //         "input[placeholder='Enter Postal Code']":"onyi",
      //         "input[placeholder='Enter City/Town/Village']":"onyi",
      //         "input[placeholder='Enter House / Building Number']":"9 udi plaza",
      //         "input[placeholder='Enter Street Name']":"parakou",
      //     },
      // },
      // {
      //   //registeration for Entity account
      //   regLabel:"Entity Account",
      //   expectedF:{
      //
      //   },
      //   formField:{
      //     "input[placeholder='Enter Surname']":"chima",
      //     "input[placeholder='Enter First Name']":"backpack",
      //     "input[placeholder='Enter Other Name']":"gerald",
      //     "input[placeholder='Select Date']":"1999-06-06",
      //     ":nth-child(1) > .row > :nth-child(5)":{ type: "select", value: "Male" },
      //     "input[placeholder='Phone number']":"9033546085",
      //     "input[placeholder='Enter Email']":"onyii233@mailinator.com",
      //     "input[formcontrolname='confirmEmail']":"onyii233@mailinator.com",
      //     "input[placeholder='Enter User Name']":"onyi",
      //     "input[placeholder='Enter Password']":"Jude2",
      //     "input[formcontrolname='confirmPassword']":"Jude2",
      //     "input[placeholder='Enter Job Description']":"onyi",
      //     // "select[formcontrolname='meansOfIdentification']": { type: "select", value: "National Identification Number" },
      //     "select[formcontrolname='meansOfIdentification']":"National Identification Number",
      //     "input[placeholder='Enter Identity Number']":"onyi",
      //     "select[formcontrolname='country']": { type: "select", value: "Nigeria" },
      //     "select[formcontrolname='state']": {type: "select", value: "Value"},
      //     "select[formcontrolname='lga']":  {type: "select", value: "Value"},
      //     "input[placeholder='Enter Postal Code']":"onyi",
      //     "input[placeholder='Enter City/Town/Village']":"onyi",
      //     "input[placeholder='Enter House / Building Number']":"9 udi plaza",
      //     "input[placeholder='Enter Street Name']":"parakou",
      //
      //   },
      // },
    ];



    regTypes.forEach((regType)=>{
      //for each regtype let the object check for expected field and fill
      cy.log(`fill forms from object ${regType.regLabel}`);
      cy.contains("span", regType.regLabel).click();
      cy.log(regType.regLabel);
      cy.get('.text-center > .btn').click();


      //Expected entries must form should be visible
      Object.entries(regType.expectedF || {}).forEach(([sel] ) => {
        cy.get(sel).should("be.visible");
      });


      Object.entries(regType.formField).forEach(([sel,ent])=>{
        cy.get(sel).should("exist").then($el => {
          const tagName = $el.prop("tagName").toLowerCase();

          if (typeof ent === "object" && ent.type === "select") {
            cy.get(sel).select(ent.value);
          } else if (tagName === "select" && typeof ent === "string") {
            // handles case where value is passed as a string
            cy.get(sel).select(ent);
          }else if(typeof ent === "string"){
            cy.get(sel)
            cy.get(sel).clear()
            cy.get(sel).type(ent);
          }

          // other reference  which could serve as a reusable component in the Command
          // cy.get(sel).should("exist").then(($input) => {
          //     cy.wrap($input).clear().type(ent);
          // });
        });

      });
      // if (regType.regLabel==="Public User"){
      if (regType.regLabel==="Accredited Agent"){
        //validate submit
        // cy.contains(`button[class='btn-success']`).should("exist");
        // cy.contains("Register").should("exist")
        cy.contains(" Save & Continue ").should("exist")
            .click({ force: true });


        //  PREVIEW
        cy.contains(" Save & Continue ").should("exist")
            .click({ force: true });

      }

    });

  });


  // it.skip("Checking for all Nav Links",()=>{
  //
  //   const headerNav = [1,2,3,4];
  //   headerNav.forEach((i) => {
  //     cy.get(`html > body > app-root > app-header > header > div:nth-of-type(1) > div > ul > li:nth-of-type(${i}) > a`)
  //         .should("be.visible");
  //   });
  //
  // })
  //
  // it.skip("Check previous registeration",()=>{
  //   cy.log("Checking Buttons Username | Email| Phone number | Accredditted Number")
  //   cy.log("Username Login")
  //   cy.get("html > body > app-root > app-header > header > div:nth-of-type(2) > div > ul > li:nth-of-type(2) > a")
  //       .click()
  // })

  // it("Login (positive then negative case)/reserve /register",()=> {
  //   //api url contains/auth/login check data error
  //   cy.visit("auth/login");
  //
  //   //get email login
  //   //cy.get("html > body > app-root > main > app-auth-layout > div > div > div:nth-of-type(2) > app-login > div > div > div:nth-of-type(1) > div:nth-of-type(2)").click();
  //
  //
  //   //type static registered username and password
  //   const inbox = "helenmail";
  //   const uName = "helenodoma";
  //   let pWord = "Scrumptious@272227";
  //
  //   cy.get(':nth-child(1) > .form-control').type(uName).trigger('change');
  //   cy.get(':nth-child(2) > .form-control').type(pWord).trigger('change');
  //   cy.get(".btn-success.w-100").click();


    /**   // Define the inbox URL
     const inboxUrl = 'https://www.mailinator.com/api/v2/inbox?to=helenmail';

     // Make a request to get the inbox data
     cy.request(inboxUrl).then((response) => {
     // Check if the request was successful
     expect(response.status).to.eq(200);

     // Extract the messages from the response
     const messages = response.body.messages;
     console.log(messages);

     // Check if there are messages available
     if (messages.length > 0) {
     // Get the last message
     const lastMessage = messages[0]; // Assuming the latest message is first

     // Extract the 2FA code from the subject or body
     const codeMatch = lastMessage.subject.match(/(\d{6})/) || lastMessage.body.match(/(\d{6})/);

     if (codeMatch) {
     const twoFACode = codeMatch[1]; // Extract the code
     cy.log(`2FA Code: ${twoFACode}`); // Log the code
     } else {
     cy.log('2FA Code not found');
     }
     } else {
     cy.log('No messages found in the inbox');
     }
     });

     });
     //----------------------------deprecated
     // mailurp api create email integration
     //const mailslurp = new MailSlurp({ apiKey: "8d307f35c15af3a0ea197c27271e1a8fad9b9fa48b1fcd6bcf0eefd0355a4d94" });
     // cy.mailslurp().then(mailslurp => mailslurp.createInbox())
     //     .then(inbox=>{
     //         cy.log(`Inbox id ${inbox.id}`)
     //         cy.wrap(inbox.id).as('inboxId')
     //         cy.wrap(inbox.emailAddress).as('emailAddress')
     //         expect(inbox.emailAddress).to.contain("@mailslurp")
     //     })
     //
     // cy.then( function (){
     //         expect(this.emailAddress).to.exist;
     //         cy.get(':nth-child(1) > .form-control').type('emailAddress').trigger('change');
     //         cy.get(':nth-child(2) > .form-control').type(pWord).trigger('change');
     //         cy.get(".btn-success.w-100").click();
     //         cy.wait(120000)
     //     }
     // )
     //
     //
     // //receive emails
     // it("can receive confirmation code by email", function () {
     //     // app will send user an email containing a code, use mailslurp to wait for the latest email
     //     cy.mailslurp()
     //         // use inbox id and a timeout of 30 seconds
     //         .then(mailslurp => mailslurp.waitForLatestEmail(this.inboxId, 30000, true))
     //         // extract the confirmation code from the email body
     //         .then(email => /.*verification code is (\d{6})./.exec(email.body!!)!![1])
     //         // fill out the confirmation form and submit
     //         .then(code => {
     //             cy.get("[name=code]").type(code).trigger('change');
     //             cy.get("[data-test=confirm-sign-up-confirm-button]").click();
     //         })
     // });



     // email mailinator
     // visit https://www.mailinator.com/v4/public/inboxes.jsp?to=onnyedikachi
     // open the email html > body > div > main > div:nth-of-type(2) > div:nth-of-type(3) > div > div:nth-of-type(4) > div > div > table > tbody > tr:nth-of-type(1) > td:nth-of-type(2)
     // check if this span contains number html > body > div > span
     // cy.contains('2FA Code:').parent().find('span').invoke('text').then((spanText) => {
     //   const dynamicNumber = spanText.trim();
     //   cy.log(`2FA Code number: ${dynamicNumber}`);
     // });

     **/
  // })



  //Functional
  //Signup redirection, Login and auth, Readeable Notice, Public search ,, External links new tab


  //performance
  //Loadtime, alt images ,
// })




});