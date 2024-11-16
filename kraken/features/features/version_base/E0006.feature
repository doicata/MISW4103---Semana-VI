Feature: Ghost

@user6 @web
Scenario: E0006 - Crear un tag con nombre y descripción
  Given I navigate to page principal BS
  And I enter email y password BS
  And I wait for 1 seconds BS
  And I clic to Sign in BS
  And Página principal del administrador BS
  And Clic en la sección de Tags BS
  And Página de listado de tags BS
  And Clic en el boton New tag BS
  And Nombre del tag "New Tag" BS
  And Clic en Descripción del tag BS
  And Descripción del tag "Contenido de tag" BS
  And Clic en el boton guardar BS
  Then Clic en la sección de Tags BS
  When Valida Tag publicado en la lista de tags "New Tag" BS