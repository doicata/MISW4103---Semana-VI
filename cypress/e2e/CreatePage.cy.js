
import { 
    PagesPage, 
    CONTENT, 
} from "../pages/version_rc/pagesPage";
const PAGE_TITLE = "A New Page by Cypress";


describe('Feature: El usuario admin puede crear Pages', () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
    });

    beforeEach(()=>{
        PagesPage.doLogIn();
    });

    afterEach(() => {
        PagesPage.deletePageByTitle(PAGE_TITLE);
    })

    it("Escenario 31: Create new page", () => {
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


    it("Escenario 32: Create empty page", () => {
        //Given usuario logueado
        PagesPage.goToPages();
        cy.screenshot('../../ghost-5.96/E00012-0-RC');

        //Then Crear nueva página
        cy.get(CONTENT.newPageButton).click(); //Click on New Page
        cy.location("hash").should("contain", "#/editor/page"); // check location

        cy.intercept("PUT", "/ghost/api/admin/pages/", {}).as("createPage");

        //Then pone contenido
        let content = " To live is to risk it all.";
        let title = "A New Page by Cypress";
        PagesPage.addContentToPage(title, content);

        cy.wait(500)

        //Then pone titulo y contenido vacio
        cy.get(CONTENT.pageTitleInput).clear();
        cy.get(CONTENT.pageContentInput).first().clear();    

        cy.wait(500)
        cy.screenshot('../../ghost-5.96/E00012-1-RC');

        //Then publica la página
        cy.get(CONTENT.publishPageButton).first().click(); // click en publicar

        cy.wait(500)

        //And confirma la creacion de la Page
        PagesPage.clickConfirmCreatePage();

        cy.wait(500)
        cy.screenshot('../../ghost-5.96/E00012-2-RC');
    });
});