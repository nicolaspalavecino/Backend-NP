import { Router } from "express"
const routerViews = Router()
import ProductManager from "../ProductManager.js"

let productManager = new ProductManager()

// Listado de productos utilizando Handlebars:
routerViews.get('/', async (req, res) => {
  let result = await productManager.getProducts()
  res.render('home', { result })
})

// Listado de productos utilizando Handlebars + Websockets: 
routerViews.get('/realtimeproducts', async (req, res) => {
  let result = await productManager.getProducts()
  res.render('realtimeproducts', { result })
})

export default routerViews 