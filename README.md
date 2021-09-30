# Este es el Demo Portal Bancario de Clientix #

## Proposito: 
Mostrar la funcionalidad de API/Web Service de el sistema de [Clientix](http://www.alenet.com/index.php/en/our-products/clientix-crm).

## Autores:
Sebastian Ignacio Alegrett Morreo : Ivan Mrnsk y el Clientix API Developer Team.

## Funcionalidad:
La funcionalidad de el portal va a conyevar la serie completa de herramientas que proporciona el sistema CRM de CLientix © [AleNet, Inc](http://www.alenet.com/index.php/en/).
  * Log In : Two Factored Authentication.
  * Sign Up: Two Step Sign Up.
  * Account Security Features
  * Account Customer Service Features 
  * Account Trusts (Fideicomisos)
  * Multiple Language Usage
  * Account Transactions
  * Account Information
  * And More...

## Configuracion de el Proyecto:
  * *App.js* : Base Oficial del render de la aplicacion, todo el routing de el portal pasa por aqui. 
  * *Index.js* : El transfer de la aplicacion al Index.html que es adonde se publica la construccion final de la aplición.
  * *Components* : Los distintos componentes de el portal de ALeNet, El *Navbar.js*, *Button.js* y otros diseños especificos a la pagina.
  * *Pages* : Todas Las paginas de el sitio estan guardads y llaman a los distintos componentes de *Components* para componer su look final.
  * Ultimo Dato: ***Varias funciones estan regadas por el folder de Components, estas funciones son las que hacern llamados al APIREST.PHP de Clientix.***
    * Funciones como: *UseForm.js* o *getAccountInfo()* que hacen las llamadas especificas al API de Alenet.

### Clientix API Documentation: Pronto se estara publicando un SUB-REPOSITORIO a este repositorio que contendra la información y los llamados a cada especifico ENDPOINT llamado a través de el portal.

### DEPLOYMENT: Todo el Deployment se hace a travez de NETLIFY.COM y esta CONECTADO a este repositorio. Los respectivos miembros del equipo tendran accesso al deployment site en NETLIFY con la cuenta de EQUIPO ALeNet, Inc.

# TODOS LOS CAMBIOS DEBERAN PASAR POR AQUI ANTES DE ENTRAR EN EL PORTAL: FAVOR DE NO TOCAR EL PROYECTO SIN CONTACTAR A @salegrettm o @salegrett 
