Feature: Ghost

@user7 @web
Scenario: E0007 - Editar un tag con su descripción
  Given I navigate to page principal
  And I enter email y password
  And I wait for 1 seconds
  And I clic to Sign in
  And Página principal del administrador
  And Clic en la sección de Tags
  And Página de listado de tags
  And Clic en el boton New tag
  And Nombre del tag "Tag 7"
  And Clic en Descripción del tag
  And Descripción del tag "Contenido de tag 7"
  And Clic en el boton guardar
  And Clic en la sección de Tags
  And Página de listado de tags
  And Clic en el tag "Tag 7"
  And I wait for 1 seconds
  And Clic en Descripción del tag
  And Descripción del tag "Contenido de tag"
  And Clic en el boton guardar
  And I wait for 1 seconds
  Then Clic en la sección de Tags
  When Valida Tag publicado en la lista de tags "Tag 7"