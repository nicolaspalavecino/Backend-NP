# Documentar API

## Configuración de Swagger
Dentro de app.js se realizó la configuración de Swagger para poder iniciar con la documentación. Se designnó la ruta: '/apidocs' para visualizar los documentos correspondientes al módulo de 'products' y 'carts'.

## Carpeta DOCS
Contiene todos los archivos .yaml que se muestran a través de Swagger.
### Routes
Cuenta con los módulos de carts y products junto con un archivo de tags para poder referenciar las rutas correspondientes a cada uno de los módulos. 

### Schemas
Contiene los esquemas correspondientes a los modelos de BD de cart y product. Además, existe un archivo .yaml denominado 'productInCart.yaml' que esquematiza la estructura del producto dentro del array correspondiente al modelo de cart.

Adicionalmente, en los casos donde se utiliza req.body dentro de la ruta, se creó un esquema que corresponde a la información que se pasa mediante el body. Por ejemplo, las propiedades que el usuario debe definir para crear un producto mediante la ruta 'addProduct'.