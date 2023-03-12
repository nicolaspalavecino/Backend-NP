import ProductManager  from "./ProductManager.js"
const productManager = new ProductManager()

let checkProductManager = async () => {
    await productManager.addProduct('Libro 1', 'Drama', 200, 'Sin imagen', 'abc123', 25)
    await productManager.addProduct('Libro 2', 'Terror', 200, 'Sin imagen', 'abc124', 25)
    await productManager.addProduct('Libro 3', 'Aventura', 200, 'Sin imagen', 'abc125', 25)
    await productManager.addProduct('Libro 4', 'Biografía', 200, 'Sin imagen', 'abc126', 25)
    await productManager.addProduct('Libro 5', 'Ciencia ficción', 200, 'Sin imagen', 'abc127', 25)
    await productManager.addProduct('Libro 6', 'Romance', 200, 'Sin imagen', 'abc128', 25)
    await productManager.addProduct('Libro 7', 'Mitología', 200, 'Sin imagen', 'abc129', 25)
    await productManager.addProduct('Libro 8', 'Historia', 200, 'Sin imagen', 'abc114', 25)
    await productManager.addProduct('Libro 9', 'Ciencia', 200, 'Sin imagen', 'abc120', 25)
    await productManager.addProduct('Libro 10', 'Psicología', 200, 'Sin imagen', 'abc147', 25)
}
checkProductManager()
