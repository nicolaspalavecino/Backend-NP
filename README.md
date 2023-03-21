# Backend-NP - Preentrega 1

## Products: '/api/products'

### **ProductManager**: 

Clase constructora con los métodos:
- getProducts
- getProductById
- addProduct
- updateProduct
- deleteProduct

Además existe un método extra denominado **'validateFile'** donde se constata la existencia del directorio 'files' y el archivo 'Products.json' donde se cargarán los productos. En caso de que el archivo no existe lo crea y si ya existe, obtiene la información necesaria para ser aplicada a los métodos previos. Este método es ejecutado dentro de la misma clase constructora cada vez que se accede a alguno de los métodos listados. 

### **Products Router**:

#### - POST (raíz): 
Inserta un producto dentro del archivo *Products.json* que se encuentra en el directorio *files*. En caso de no existir este directorio y archivo, es creado a partir de este mismo request. Aplica el método **'addProduct' de ProductManager**.

#### - GET (raíz): 
Devuelve el contenido del archivo *Products.json*. Si este no existe, se crea a partir del mismo request. Aplica el método **'getProducts' de ProductManager**.

#### - GET (:pid): 
Devuelve el producto que se encuentre dentro del archivo *Products.json* cuyo ID coincida con el valor enviado al servidor como ':pid'. En caso de no encontrarse ningún producto con dicho ID, devolverá un mensaje de advertencia. Aplica el método **'getProductById' de ProductManager**.

#### - PUT (:pid): 
Permite modificar la información del producto cuyo ID coincida con el enviado al servidor como ':pid'. No es necesario enviar todo el producto con la información nueva, simplemente se puede enviar la información correspondiente a dicha propiedad o propiedades que se desee modificar, aplicando el formato OBJECT en Postman. Por ejemplo: { "title": "modified title" }. En caso de que se envíe una propiedad inexistente o se intente modificar el ID de un producto, un aviso será devuelto desde la aplicación. Aplica el método **'updateProduct' de ProductManager**.

#### - DELETE (:pid): 
Permite eliminar el producto cuyo ID coincida con el enviado al servidor como ':pid'. En caso de no encontrarse ningún producto con dicho ID, devolverá un mensaje de advertencia. Aplica el método **'deleteProduct' de ProductManager**.

## Carts: '/api/carts'

### **CartManager**: 

Clase constructora con los métodos:
- addCart
- getCartById
- addProductToCart
- deleteProductFromCart

Además existe un método extra denominado **'validateFile'** donde se constata la existencia del directorio 'files' y el archivo 'Carts.json' donde se cargarán los carts. En caso de que el archivo no existe lo crea y si ya existe, obtiene la información necesaria para ser aplicada a los métodos previos. Este método es ejecutado dentro de la misma clase constructora cada vez que se accede a alguno de los métodos listados.

Adicionalmente existe el método **'checkProductsFile'** que verifica la existencia de un archivo *Products.json* al momento de ejecutar los métodos que agregan o quitan productos del cart. Suponiendo que no exista ningún producto, impide la ejecución de estos métodos.

### **Carts Router**:

#### - POST (raíz): 
Inserta un cart dentro del archivo *Carts.json* que se encuentra en el directorio *files*. En caso de no existir este directorio y archivo, es creado a partir de este mismo request. El objeto 'cart' cuenta con dos propiedades, un ID y products que consiste en un array vacío donde eventualmente se cargan los productos. Aplica el método **'addCart' de Cartanager**. 

#### - GET (:cid): 
Devuelve el cart que se encuentre dentro del archivo *Carts.json* cuyo ID coincida con el valor enviado al servidor como ':cid'. En caso de no encontrarse ningún producto con dicho ID, devolverá un mensaje de advertencia. Aplica el método **'getCartById' de CartManager**.

#### - POST (:cid/products/:pid):
Inserta un producto con el ID especificado (:pid) al cart con el ID indicado (:cid). En el caso de que no exista un producto o un cart con dichos IDs, devuelve un mensaje de advertencia. Aplica el método **'addProductToCart' de CartManager**.

#### - DELETE (:cid/products/:pid):
Elimina un producto con el ID especificado (:pid) deñ cart con el ID indicado (:cid). En el caso de que no exista un producto o un cart con dichos IDs, devuelve un mensaje de advertencia. Aplica el método **'deleteProductFromCart' de CartManager**.


