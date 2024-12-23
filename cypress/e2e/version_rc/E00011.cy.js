
import { 
    PagesPage, 
    CONTENT, 
} from "../../pages/version_rc/pagesPage";
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
        cy.screenshot('../../ghost-5.96/E00011-0-RC');

        //Then Crear nueva página
        cy.get(CONTENT.newPageButton).click(); //Click on New Page
        cy.location("hash").should("contain", "#/editor/page"); // check location

        //Then pone contenido
        let content = "To live is to risk it all.";
        PagesPage.addContentToPage(PAGE_TITLE, content);

        cy.wait(1000);

        //Then publica la página
        cy.get(CONTENT.publishPageButton).first().click(); // click en publicar

        cy.wait(500);
        cy.screenshot('../../ghost-5.96/E00011-1-RC');

        //And confirma creacion de la página 
        PagesPage.clickConfirmCreatePage();

        cy.wait(500);

        // Then verifica que existe una Page creada
        PagesPage.getPublishPageModal().within(() => {
            cy.get('h2').should('contain', PAGE_TITLE);
        });

        // Toma Screenshot
        cy.screenshot('../../ghost-5.96/E00011-2-RC');

        cy.wait(500);
        PagesPage.closeModal();
    });
});