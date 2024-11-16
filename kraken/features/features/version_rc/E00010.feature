Feature: Ghost

@user10 @web
Scenario: E00010 - Crear tag con caracteres especiales.
  Given I navigate to page principal
  And I enter email y password
  And I wait for 1 seconds
  And I clic to Sign in
  And Página principal del administrador
  And Clic en la sección de Tags
  And Página de listado de tags
  And Clic en el boton New tag
  And Nombre del tag con caracteres especiales "$%&$%&$%"
  And Clic en Descripción del tag
  And Descripción del tag "dsfghjklhjfgchgjkjlñl34567890345678"
  And Clic en el boton guardar
  Then Clic en la sección de Tags
  When Valida Tag publicado en la lista de tags "$%&$%&$%"