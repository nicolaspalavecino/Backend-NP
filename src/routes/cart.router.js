import { Router } from "express"
const routerCarts = Router()
import CartManagerDB from '../services/cart.service.js'

let cartManagerDB = new CartManagerDB()

// ADD CART
routerCarts.post('/', async (req, res) => {
  let result = await cartManagerDB.addCart(req.body)
  res.status(201).send(result)
})

// GET CART BY ID:
routerCarts.get('/:cid', async (req, res) => {
  let result = await cartManagerDB.getCartById(req.params.cid)
  console.log(result)
  res.status(201).send(result)
})


// ADD PRODUCT TO CART:
routerCarts.post('/:cid/products/:pid', async (req, res) => {
  let result = await cartManagerDB.addProductToCart(req.params.cid, req.params.pid)
  res.status(201).send(result)
})

// UPDATE PRODUCT QUANTITY IN CART
routerCarts.put('/:cid/products/:pid', async (req, res) => {
  let quantity = Object.keys(req.body)[0] == 'quantity' ? Object.values(req.body)[0] : Object.keys(req.body)[0]
  if (typeof(quantity) == 'number') {
    let result = await cartManagerDB.updateProductQuantity(req.params.cid, req.params.pid, quantity)
    typeof(result) == 'string' ? res.status(405).send(result) : res.status(201).send(result)
  } else {
    res.status(402).send(`'${quantity}' is not valid. Please, try again.`)
  }
})

// DELETE PRODUCT FROM CART:
routerCarts.delete('/:cid/products/:pid', async (req, res) => {
  let result = await cartManagerDB.deleteProductFromCart(req.params.cid, req.params.pid)
  res.status(201).send(result)
})

// DELETE ALL PRODUCTS FROM CART:
routerCarts.delete('/:cid', async (req, res) => {
  let result = await cartManagerDB.deleteAllFromCart(req.params.cid)
  res.status(201).send(result)
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