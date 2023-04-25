import { Router } from "express"
const routerViews = Router()
import ProductManager from "../dao/Dao/fileSystem_classes/ProductManager.js" 
import { readLinkFilter } from "../utils.js"
import ProductManagerDB from "../dao/Dao/MongoDB_classes/ProductManager.js"
import CartManagerDB from "../dao/Dao/MongoDB_classes/CartManager.js"

let productManager = new ProductManager()

// Listado de productos utilizando Handlebars:
routerViews.get('/', async (req, res) => {
  let result = await productManager.getProducts()
  res.render('home', { result })
})

// Listado de productos utilizando Handlebars + Websockets: 
routerViews.get('/realtimeproducts', async (req, res) => {
  res.render('realTimeProducts')
})

let productManagerDB = new ProductManagerDB ()
// Route to render products with pagination:
routerViews.get('/products', async (req, res) => {
  let products = await productManagerDB.getProducts(req.query)
  let link_filter = readLinkFilter(req.query)
  products.prevLink = products.hasPrevPage? `http://localhost:8080/products?${link_filter}page=${products.prevPage}`:'None'
  products.nextLink = products.hasNextPage? `http://localhost:8080/products?${link_filter}page=${products.nextPage}`:'None'
  products.status = products ? "success" : "error"
  res.render('products', products)
})

let cartManagerDB = new CartManagerDB()
// Route to render a cart with products:
routerViews.get('/carts/:cid', async (req, res) => {
  let result = await cartManagerDB.getCartById(req.params.cid)
  res.render('cart', result )
  console.log(result)
  console.log(result.products[0])
})


export default routerViews 