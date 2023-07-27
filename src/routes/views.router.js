import { Router } from "express"
import { authorization, passportCall, readLinkFilter } from "../utils.js"
import ProductService from "../services/product.service.js"
import CartService from "../services/cart.service.js"
import UserService from "../services/user.service.js"
import { environment } from "../config/config.js"

const router = Router()

let productService = new ProductService ()
let cartService = new CartService()
let userService = new UserService()


// Route to render products with pagination:
router.get('/products', passportCall('login'), authorization(['user', 'premium', 'admin']), async (req, res) => {
  let products = await productService.getProducts(req.query)
  let link_filter = readLinkFilter(req.query)
  products.prevLink = products.hasPrevPage? `http://localhost:8080/products?${link_filter}page=${products.prevPage}`:'None'
  products.nextLink = products.hasNextPage? `http://localhost:8080/products?${link_filter}page=${products.nextPage}`:'None'
  products.status = products ? "success" : "error"
  let user = await userService.getUser(req.user.email)
  req.user.role = user.role
  let data = { products: products , user: req.user }
  if (environment === 'testing') {
    res.status(200).send({ status: 'Success', payload: data})
  } else {
    res.render('products', data)
  }  
})

// Route to render a cart with products:
router.get('/carts/:cid', passportCall('login'), authorization(['user', 'premium', 'admin']), async (req, res) => {
  let cart = await cartService.getCartById(req.params.cid)
  let data = { cart: cart, user: req.user }
  res.render('cart', data )
})

// Route to current user:
router.get('/current', passportCall('login'), authorization(['user', 'premium', 'admin']), async (req, res) => {
  let data = { user: req.user }
  res.render('profile', data)
})

// Route to messages:
router.get('/messages/:uid', passportCall('login'), authorization(['user', 'premium', 'admin']), async (req, res) => {
  let data = { user: req.user }
  res.render('chat', data)
})

// Route to restore password:
router.get('/restorePassword', async (req, res) => {
  res.render('restorePassword')
})

export default router 