import { Router } from "express"
const routerViews = Router()
import ProductManager from "../dao/Dao/fileSystem_classes/ProductManager.js" 
import { readLinkFilter } from "../utils.js"
import ProductManagerDB from "../dao/Dao/MongoDB_classes/ProductManager.js"

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

// router.get('/students',async (req,res)=>{
//   let page = parseInt(req.query.page);
//   if(!page) page=1;
//   //Lean es crucial para mostrar en Handlebars, ya que evita la "hidratación" del documento de mongoose,
//   //esto hace que a Handlebars llegue el documento como plain object y no como Document.
//   let result = await studentsModel.paginate({},{page,limit:5,lean:true})
//   result.prevLink = result.hasPrevPage?`http://localhost:9090/students?page=${result.prevPage}`:'';
//   result.nextLink = result.hasNextPage?`http://localhost:9090/students?page=${result.nextPage}`:'';
//   result.isValid= !(page<=0||page>result.totalPages)
//   res.render('students',result)
// })

export default routerViews 