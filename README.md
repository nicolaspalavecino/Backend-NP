# OPTIMIZACIÓN - customError & Mocking

## Custom Error
Dentro de services creé una carpeta 'error' que contiene:
- error-enum.js: Diccionario con los códigos de error
- error.middleware.js: Middleware para manejar el error en el controller
- customError.js: Clase para crear el error con las distintas propiedades
- Carpera de messages: Contiene archivos js con mensajes que paso como 'cause' dentro del error creado.

Este customError lo apliqué al formulario para crear productos, para eso hay que loguearse de la siguiente usuario:
- email: adminCoder@coder.com
- contraseña: adminCod3r123

En ese caso renderiza la página con el formulario para agregar productos. 
El customError lo apliqué al controller de addProduct dentro de products.controller.js (El código previo está comentado). En el caso de que alguno de los valores requeridos sea 'falsy' genera el error que se pasa a través del catch. Hice algunos cambios dentro del archivo 'uploadProduct.js' de public para que el usuario desde la app pueda ver el error. Ahí paso un mensaje específico en un alert y a través de la consola del navegador muestro el mensaje de 'cause' que en el controller lo paso como 'detail'. Así el usuario puede acceder a la consola y ver más info sobre el error generado. 
Por el momento sólo lo aplico a esto que es lo que se pedía en el testing y también lo agregué para el login del usuario.

## Mocking Products
- Dentro de services creé una carpeta 'mock' que contiene un archivo 'products.mock.js'. En este archivo utilizo faker (versión "^7.6.0"). Tengo una función createMockItem donde especifico todos los parámetros del objeto que faker tiene que completar y una función generateProducts donde especifico la cantidad de productos que deben ser creados y pusheados a un array vacío.
- Esta última función la llamo en el GET que creé dentro de 'mock.router.js' que utiliza el endpoint '/mockingproducts'. Devuelvo este array de productos en la respuesta con un .json() para facilitar la lectura. Son 100 productos como está especificado en la consigna de las diapos.
