import { Router } from "express"
const routerViews = Router()
import ProductManager from "../dao/Dao/fileSystem_classes/ProductManager.js" 

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

export default routerViews 