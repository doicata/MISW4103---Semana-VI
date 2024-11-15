import { LogIn } from "../../pages/version_base/logIn";
import { PostPage } from "../../pages/version_base/postPage";
import { PrincipalPage } from "../../pages/version_base/principalPage";
import { faker } from '@faker-js/faker';
const data = require('../../fixtures/properties.json');

Cypress.on("uncaught:exception", (err, runnable) => {
    if (err.message.includes("The play() request was interrupted")) {
      return false;
    }
  });

describe('Escenarios E2E para Ghost', function () {

  beforeEach(() => {
    cy.fixture('properties.json').then((data) => {
        //Vistamos sitio de Ghost
        cy.visit(data.baseURL);

        //Iniciamos sesion
        LogIn.logIn(data.email, data.password);
        LogIn.logInButton();
    });
  });

    it('E0003 - Editar el titulo de un post previamente creado', function () {
        //Given que voy a la sección de posts
      PrincipalPage.clickPosts();
      // cy.screenshot('E0001-1-BS');

      //And el administrador ve la página de listado de posts
      PostPage.getTitleSection().should('include.text', 'Posts');
      // cy.screenshot('E0001-2-BS');

      //And le da click en el boton New Post
      PostPage.clickNewPost();
      // cy.screenshot('E0001-3-BS');

      //And el administrador ve la página de creación de post
      PostPage.creationPostPage().should('have.value', '');
      // cy.screenshot('E0001-4-BS');

      //And escribe el titulo del post
      let titulo = faker.lorem.word();
      PostPage.writeTitle(titulo);
      // cy.screenshot('E0001-5-BS');

      //And da click en contenido
      PostPage.clickInContent();

      //And escribe el contenido del post
      let contenido = faker.lorem.words();
      PostPage.writeContent(contenido);

      //And le da click en el boton de Publish
      PostPage.publishPostButton();
      // cy.screenshot('E0001-8-BS');

      //And le da click en el boton Publish post, right now
      PostPage.publishPostButtonFinal();
      cy.wait(1000);
      // cy.screenshot('E0001-10-BS');

      //And se devuelve a la lista de posts
      PostPage.clickBackToPosts();
      cy.wait(1000);

      //And le da click en el post creado
      PostPage.lastPostCreated(titulo, 'click');

      //And edite el titulo del post
      let tituloEditado = faker.lorem.word();
      PostPage.writeTitle(tituloEditado);

      //And le de en el dropdwon de update
      PostPage.updatePostButton();
      cy.wait(1000);

      //And le de en el boton de Update
      PostPage.updatePostButtonFinal();
      cy.wait(1000);
      
      //When se devuelve a la lista de posts
      PostPage.clickBackToPosts();
      cy.wait(1000);

      //Then el post editado se encuentra en la lista de posts
      PostPage.lastPostCreated(tituloEditado, 'notClick');
  });
});