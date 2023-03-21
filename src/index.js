import express from 'express'
import routerProducts from './routes/products.router.js'
import routerCarts from './routes/cart.router.js'
// import ProductManager from './ProductManager.js'

const app = express()
const PORT = 8080

// let productManager = new ProductManager()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/products', routerProducts)
app.use('/api/carts', routerCarts)

app.listen (PORT, () => {
  console.log(`Server run on port: ${PORT}`)
})

// 1) Llamado desde el navegador a los primeros X cantidad de productos o al listado completo de productos:
// app.get('/products', async (req, res) => {
//   let result = await productManager.getProducts()
//   let limit = parseInt(req.query.limit)??null
//   if (limit) {
//     let newArray = result.slice(0, limit)
//     res.send(newArray)
//   } else {
//     res.send(result)
//   }
// })

// 2) Llamado desde el navegador a un producto mediante id específico:
// app.get('/products/:pid', async (req, res) => {
//   let foundProduct = await productManager.getProductById(parseInt(req.params.pid))
//   if(foundProduct) {
//     res.send(foundProduct)
//   } else {
//     res.send({status: 'error', message: 'Product with this id cannot be found'})
//   }
// })