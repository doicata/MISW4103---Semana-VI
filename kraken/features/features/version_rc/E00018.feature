Feature: Ghost - Validación de Email Inválido y Longitud de Nota

@user1 @web
Scenario: E0018 - Validación de Email Inválido y Longitud de Nota
  Given I navigate to page principal
  And Tomo pantallazo "E00018-0-RC.png"
  And I enter email y password
  And I wait for 1 seconds
  And Tomo pantallazo "E00018-1-RC.png"
  And I clic to Sign in
  And Clic en la sección de Members
  And Tomo pantallazo "E00018-2-RC.png"
  And Clic en el botón de New Member
  And Contenido de member con email inválido y nota larga
  And Tomo pantallazo "E00018-3-RC.png"
  And Clic en Save Member
  When Verifica mensaje de error de email inválido
  And Tomo pantallazo "E00018-4-RC.png"
  Then Verifica contador de caracteres de nota
