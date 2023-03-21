import { Router } from "express"
const routerCarts = Router()
import CartManager from "../CartManager.js"

let cartManager = new CartManager()

routerCarts.post('/', async (req, res) => {
  let result = await cartManager.addCart()
  res.send(result)
})

routerCarts.get('/:cid', async (req, res) => {
  let result = await cartManager.getCartById(parseInt(req.params.cid))
  if (typeof(result.id) == "number") {
    res.send(result)
  } else {
    res.send(result)
  }
})

routerCarts.post('/:cid/products/:pid', async (req, res) => {
  let cartId = parseInt(req.params.cid)
  let productId = parseInt(req.params.pid)
  let result = await cartManager.addProductToCart(cartId, productId)
  res.send(result)
})

routerCarts.delete('/:cid/products/:pid', async (req, res) => {
  let cartId = parseInt(req.params.cid)
  let productId = parseInt(req.params.pid)
  let result = await cartManager.deleteProductFromCart(cartId, productId)
  res.send(result)
})

export default routerCarts