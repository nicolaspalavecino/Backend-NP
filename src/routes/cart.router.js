import { Router } from "express"
const routerCarts = Router()
import CartManagerDB from "../dao/Dao/MongoDB_classes/CartManager.js"
// import CartManager from '../dao/Dao/fileSystem_classes/CartManager.js'

let cartManagerDB = new CartManagerDB()

// ADD CART
routerCarts.post('/', async (req, res) => {
  let result = await cartManagerDB.addCart(req.body)
  res.send(result)
})

// GET CART BY ID:
// routerCarts.get('/:cid', async (req, res) => {
//   let result = await cartManager.getCartById(parseInt(req.params.cid))
//   if (typeof(result.id) == "number") {
//     res.send(result)
//   } else {
//     res.send(result)
//   }
// })

// ADD PRODUCT TO CART:
routerCarts.post('/:cid/products/:pid', async (req, res) => {
  let cartId = req.params.cid
  let productId = req.params.pid
  let result = await cartManagerDB.addProductToCart(cartId, productId)
  res.send(result)
})

// routerCarts.post('/:cid/products/:pid', async (req, res) => {
//   let cartId = parseInt(req.params.cid)
//   let productId = parseInt(req.params.pid)
//   let result = await cartManager.addProductToCart(cartId, productId)
//   res.send(result)
// })

// DELETE PRODUCT FROM CART:
routerCarts.delete('/:cid/products/:pid', async (req, res) => {
  let cartId = req.params.cid
  let productId = req.params.pid
  let result = await cartManagerDB.deleteProductFromCart(cartId, productId)
  res.send(result)
})




// CartRoutes using fileSystem:

// let cartManager = new CartManager()

// routerCarts.post('/', async (req, res) => {
//   let result = await cartManager.addCart()
//   res.send(result)
// })

// routerCarts.get('/:cid', async (req, res) => {
//   let result = await cartManager.getCartById(parseInt(req.params.cid))
//   if (typeof(result.id) == "number") {
//     res.send(result)
//   } else {
//     res.send(result)
//   }
// })

// routerCarts.post('/:cid/products/:pid', async (req, res) => {
//   let cartId = parseInt(req.params.cid)
//   let productId = parseInt(req.params.pid)
//   let result = await cartManager.addProductToCart(cartId, productId)
//   res.send(result)
// })

// routerCarts.delete('/:cid/products/:pid', async (req, res) => {
//   let cartId = parseInt(req.params.cid)
//   let productId = parseInt(req.params.pid)
//   let result = await cartManager.deleteProductFromCart(cartId, productId)
//   res.send(result)
// })

export default routerCarts