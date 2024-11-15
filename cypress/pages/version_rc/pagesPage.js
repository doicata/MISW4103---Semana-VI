import { LogIn } from "./logIn";
const BASE_URL = "http://localhost:2368";

export const data = {
    "email": "d.andrades@uniandes.edu.co",
    "password": "ArpolisVI204*"
};

export function doLogIn() {
    cy.visit(BASE_URL + '/ghost/#/signin');
    LogIn.logIn(data.email, data.password);
    LogIn.logInButton();
    cy.get('a[title="Dashboard"]').should('be.visible');
}

export const CONTENT = {
    newPageButton: 'a[data-test-new-page-button=""]',
    pageTitleInput: 'textarea[data-test-editor-title-input=""]',
    pageContentInput: 'p[data-koenig-dnd-droppable="true"]',
    publishPageButton: 'button[data-test-button="publish-flow"]',
    newPageModal: 'div.epm-modal-container',
    continueCreationPageButton: 'button[data-test-button="continue"]',
    confirmCreationPageButton: 'span[data-test-task-button-state="idle"]',
    editPageButton: 'span.gh-post-list-cta.edit',
    updatePageButton: 'button.gh-btn-editor',
    goToPagesButton: 'a[data-test-link="pages"]',
    unpublishPageButton: 'button[data-test-button="update-flow"]',
}

export function addContentToPage(title, content) {
    cy.get(CONTENT.pageTitleInput).type(title)
    cy.get(CONTENT.pageContentInput).first().type(content)
}

export function confirmCreatePage() {
    cy.get(CONTENT.newPageModal).within(() => {
        cy.get(CONTENT.continueCreationPageButton).first().click() // click en continuar
        cy.get(CONTENT.confirmCreationPageButton).first().click(); //click en confirmar
    })
}


export class PagesPage {

    static doLogIn() {
        cy.fixture('properties.json').then((data) => {
            cy.visit(data.baseURL); // Go to log In URL
            LogIn.logIn(data.email, data.password); // Enter credentials
            LogIn.logInButton(); // Click on LogIn 
        });
    }

    static createPage(title, content) {}

    static deletePageByTitle(title) {
        cy.fixture('properties.json').then((data) => {
            cy.visit(data.adminBaseURL + "/#/pages"); // Go to Pages

            cy.get('div.posts-list').within(() => {
                cy.get('h3.gh-content-entry-title')
                    .first()
                    .should('contain', title)
                    .rightclick({ force: true });
                    cy.get('[data-test-button="delete"]').first().click({ force: true });
            });
        });
    }

    static addContentToPage(title, content) {
        cy.get(CONTENT.pageTitleInput).type(title)
        cy.get(CONTENT.pageContentInput).first().type(content)
    }

    static clickConfirmCreatePage() {
        cy.get(CONTENT.newPageModal).within(() => {
            cy.get(CONTENT.continueCreationPageButton).first().click() // click en continuar
            cy.get(CONTENT.confirmCreationPageButton).first().click(); //click en confirmar
        })
    }

    static getLateralMenuInPage() {
        return cy.get('button.settings-menu-toggle').first();
    }

    static getDeletePageButton() {
        return cy.get('button[data-test-button="delete-post"]').first();
    }

    static getConfirmDeleteModal() {
        return cy.get(CONTENT.newPageModal);
    }

    static clickOnDeletePage() {
        return cy.get('button[data-test-button="delete-post-confirm"]').contains('Delete').click();
    }

    static getPublishPageModal() {
        return cy.get('div[data-test-publish-flow="complete"]');
    }

    static goToPages() {
        cy.fixture('properties.json').then((data) => {
            cy.visit(data.adminBaseURL + "/#/pages"); // Go to Pages
        });
    }
}