
import { 
    PagesPage, 
    CONTENT, 
} from "../../utils/pages";
const PAGE_TITLE = "A New Page by Cypress";


describe('Test feature pages', () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
    });

    beforeEach(()=>{
        PagesPage.doLogIn();
    });

    afterEach(() => {
        PagesPage.deletePageByTitle(PAGE_TITLE);
    })

    it("Escenario 011: Create new page", () => {
        //Given usuario logueado
        PagesPage.goToPages();

        //Then Crear nueva página
        cy.get(CONTENT.newPageButton).click(); //Click on New Page
        cy.location("hash").should("contain", "#/editor/page"); // check location

        //Then pone contenido
        let content = " To live is to risk it all.";
        PagesPage.addContentToPage(PAGE_TITLE, content);

        cy.wait(1000)

        //Then publica la página
        cy.get(CONTENT.publishPageButton).first().click(); // click en publicar

        cy.wait(500)

        //And confirma creacion de la página 
        PagesPage.clickConfirmCreatePage();

        cy.wait(500)

        // Then verifica que existe una Page creada
        PagesPage.getPublishPageModal.within(() => {
            cy.get('h2').should('contain', PAGE_TITLE);
            cy.get('p').should('contain', content);
        });

        // Toma Screenshot
        cy.screenshot('New Page')
    });
});