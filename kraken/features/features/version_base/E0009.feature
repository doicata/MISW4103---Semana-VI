Feature: Ghost

@user9 @web
Scenario: E0009 - Crear un tag duplicado nombre y la descripción.
  Given I navigate to page principal
  And I enter email y password
  And I wait for 1 seconds
  And I clic to Sign in
  And Página principal del administrador
  And Clic en la sección de Tags
  And Página de listado de tags
  And Clic en el boton New tag
  And Nombre del tag "New Tag1"
  And Clic en Descripción del tag
  And Descripción del tag "Contenido de tag1"
  And Clic en el boton guardar
  And Clic en la sección de Tags
  And Valida Tag publicado en la lista de tags "New Tag1"
  And Clic en el boton New tag
  And Nombre del tag "New Tag1"
  And Clic en Descripción del tag
  And Descripción del tag "Contenido de tag1"
  And Clic en el boton guardar
  Then Clic en la sección de Tags
  When Valida Tag publicado en la lista de tags "New Tag1"