# MENSAJE PARA RODRI - Reestructuración del proyecto

## Organización
Modifiqué varias cosas de cómo estaba estructurado el proyecto. Borré varias cosas que ya no estábamos usando para hacer un poco más fácil el manejo y lectura de todo porque ya se me estaba complicando, por ejemplo saqué lo de fileSystem. Los managers ahora están en la carpeta 'services' donde también está la carpeta de 'models' con los esquemas.

## Reemplazo de SESSION por JWT (login y logout)
Modifiqué las estrategias de login y logout para empezar a usar JWT en lugar de session. En el caso de login apliqué básicamente lo mismo que el profe durante las clases. Para el logout usé clearcookie() así elimina la cookie con el 'jwtCookieToken' y que me redirija al render de login.

## Aplicación de roles para login
Antes al loguearse, el usuario era redirigido a '/products' donde podía ver los productos y además sus datos de usuario. Toda esa lógica estaba aplicada para session, así que cambié todo para que funcione con jwt. En el caso del admin muestra el formulario para agregar productos.

## Helpers para handlebars
Estuve viendo cómo usar helpers porque en su momento no lo había entendido. Armé una carpeta con la función de 'isAdmin' para que me muestre el formulario cuando corresponda.

## CONSULTA ( ! )
Creo que eso es todo lo que estuve haciendo. Con todos estos cambios me surgió un problema:
### Login con Github
Como el login de github trabaja con sessions y usa el mismo endpoint '/users' (el login común lo cambié a '/products' igual pero tiene lo mismo - passportCall y authorization). Dejé un comentario del problema en esa ruta y entiendo lo que pasa, pero estuve investigando para ver cómo podría aplicar jwt a toda la estrategia de login con github y la verdad que no entiendo mucho qué puedo hacer. Honestamente no se bien por donde empezar. Así que si podés orientarme un poco te agradecería. Se que podría armar un endpoint diferente que sea solo para cuando te logueas con github, pero supongo que no es lo ideal.
