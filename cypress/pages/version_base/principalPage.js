export class PrincipalPage {
    static getTitle() {
        return cy.get('.gh-nav-menu-details-sitetitle', { timeout: 10000 });
    }
    static clickPosts() {
        return cy.get('[href="#/posts/"]').first().click({ force: true });
    }

    static clickPages() {
        return cy.get('[data-test-nav="pages"]').click({ force: true });
    }

    static clickTags() {
        return cy.get('[href="#/tags/"]').click({ force: true });
    }

    static visitMembers(BASE_URL) {
        return cy.visit(BASE_URL + "ghost/#/members");
    }
}
