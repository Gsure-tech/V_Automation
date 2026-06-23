describe("World Map", () =>{
    it("should visit world map", () =>{
        cy.visit('https://marketrun.vercel.app');
        cy.get('.text-red-500').click();
    })
})