# ENTREGA FINAL

## ARCHIVOS ADJUNTOS
Adjunta a la entrega hay un archivo zip que contiene:
### ARCHIVOS .ENV
  Carpeta que comprime los archivos .env con las variables de entorno correspondientes para el funcionamiento de la app.
### POSTMAN REQUESTS
  Archivo .json con las requests de postman que pude recopilar de las rutas que son utilizasas en la app.

## VISTAS
La app cuenta con vistas para el funcionamiento de las distintas rutas:
- Para poder tener acceso hay que correr el proyecto y en el navegador ingresar a 'http://localhost:8080/users/login' donde el usuario puede loguearse.
  Al acceder con el usuario, redirige a /current donde pueden verse los datos del mismo y hay un link que lleva a /products (página principal).
- Dependiendo el tipo de usuario la vista va a diferir, lo cual se logró a través de helpers de handlebars basándome en el tipo de rol:
  - USER: Puede ver el listado de productos, agregarlos al carrito, ver el carrito, acceder a la vista para subir los archivos y convertirse premium y además, el chat.
  - PREMIUM: Mismas vistas que user, sin acceso a la vista para convertirse premium y cuenta con un formulario para crear productos. Con respecto a la compra, sólo puede comprar los productos ajenos. Sus productos pueden ser eliminados/editados tanto por el admin como por él mismo.
  - ADMIN: Puede ver todos los productos, no puede comprarlos (no cuenta con vista de carrito), puede editarlos y elimianrlos. Además cuenta con una vista de users donde se renderizan todos los usuarios de la BD. Allí puede eliminarlos o cambair su rol.

## DEPLOY
No pude realizar el deploy de la app. Intenté hacerlo en Railway, pero por lo que entendí y hablé con algunos compañeros que les pasó lo mismo, ya no es posible realizarlo sin pagar. De hecho intenté hacer el deploy con la app de la clase (AdoptMe) siguiendo el paso a paso con el video del zoom, principalmente para independizarme de cualquier problema de mi app. Sin embargo, llegué al mismo resultado, no se pudo. Como alternativa intenté hacerlo en Netlify, considerando que el deploy de las apps de los cursos previos los realicé en esta plataforma. Lamentablemente, tampoco pude hacerlo. Por algún motivo no puede hacer el build, probé muchas cosas, lo charlé con compañeros y leí bastante buscando una solución, pero no fue posible.
