Feature: Ghost

@user7 @web
Scenario: E0007 - Editar un tag con su descripción
  Given I navigate to page principal
  And I enter email y password BS
  And I wait for 1 seconds BS
  And I clic to Sign in BS
  And Página principal del administrador BS
  And Clic en la sección de Tags BS
  And Página de listado de tags BS
  And Clic en el boton New tag BS
  And Nombre del tag "Tag 7" BS
  And Clic en Descripción del tag BS
  And Descripción del tag "Contenido de tag 7" BS
  And Clic en el boton guardar BS
  And Clic en la sección de Tags BS
  And Página de listado de tags BS
  And Clic en el tag "Tag 7" BS
  And I wait for 1 seconds BS
  And Clic en Descripción del tag BS
  And Descripción del tag "Contenido de tag" BS
  And Clic en el boton guardar BS
  And I wait for 1 seconds BS
  Then Clic en la sección de Tags BS
  When Valida Tag publicado en la lista de tags "Tag 7" BS