# Implementación de LOGGER

## Environment
Agregué los entornos de 'DEVELOPMENT' y 'PRODUCTION' dentro de la carpeta config, junto con lo correspondiente a Singleton que hasta el momento no lo había aplicado.

## Loggers
Implementé loggers según lo que pedía la consigna. 
- Development environment: loggers de fatal a debug (todos los niveles)
- Production environment: loggers de fatal a info para que aparezca en la consola y de fatal a error para que se almacene en errors.log.
Esto fue lo que entendí de la consigna y lo que supuse que era más lógico, pero no se si interpreté bien lo que pedía, estaba un poco confuso. 

### loggerTest
Dentro de app.js hay una ruta para el endpoint /loggerTest donde hay un req.logger para cada nivel con el fin de que al ejecutarse dicha ruta en la consola se muestre los loggers correspondientes teniendo en cuenta si estamos en un entorno de production o development.

### Otras aplicaciones:
No tenía muchos console.log(), así que lo apliqué solo para testear cómo funcionaba en:
- products.controller.js para el agregado de productos
- sessions.router.js para login y register.
