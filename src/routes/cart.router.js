import { Router } from "express"
import CartService from '../services/cart.service.js'

const router = Router()
let cartService = new CartService()

// ADD CART
router.post('/', async (req, res) => {
  let result = await cartService.addCart(req.body)
  res.status(201).send(result)
})

// GET CART BY ID:
router.get('/:cid', async (req, res) => {
  let result = await cartService.getCartById(req.params.cid)
  console.log(result)
  res.status(201).send(result)
})

// ADD PRODUCT TO CART:
router.post('/:cid/products/:pid', async (req, res) => {
  let result = await cartService.addProductToCart(req.params.cid, req.params.pid)
  res.status(201).send(result)
})

// UPDATE PRODUCT QUANTITY IN CART
router.put('/:cid/products/:pid', async (req, res) => {
  let quantity = Object.keys(req.body)[0] == 'quantity' ? Object.values(req.body)[0] : Object.keys(req.body)[0]
  if (typeof(quantity) == 'number') {
    let result = await cartService.updateProductQuantity(req.params.cid, req.params.pid, quantity)
    typeof(result) == 'string' ? res.status(405).send(result) : res.status(201).send(result)
  } else {
    res.status(402).send(`'${quantity}' is not valid. Please, try again.`)
  }
})

// DELETE PRODUCT FROM CART:
router.delete('/:cid/products/:pid', async (req, res) => {
  let result = await cartService.deleteProductFromCart(req.params.cid, req.params.pid)
  res.status(201).send(result)
})

// DELETE ALL PRODUCTS FROM CART:
router.delete('/:cid', async (req, res) => {
  let result = await cartService.deleteAllFromCart(req.params.cid)
  res.status(201).send(result)
})

export default router