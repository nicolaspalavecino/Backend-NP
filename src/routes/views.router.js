import { Router } from "express"
import { authorization, passportCall, readLinkFilter } from "../utils.js"
import ProductService from "../services/product.service.js"
import CartService from "../services/cart.service.js"
import cookieParser from "cookie-parser"

const router = Router()

let productService = new ProductService ()
let cartService = new CartService()

// Route to render products with pagination:
router.get('/products', passportCall('login'), authorization(['user', 'admin']), async (req, res) => {
  let products = await productService.getProducts(req.query)
  let link_filter = readLinkFilter(req.query)
  products.prevLink = products.hasPrevPage? `http://localhost:8080/products?${link_filter}page=${products.prevPage}`:'None'
  products.nextLink = products.hasNextPage? `http://localhost:8080/products?${link_filter}page=${products.nextPage}`:'None'
  products.status = products ? "success" : "error"
  let data = { products: products , user: req.user }
  res.render('products', data)
})

// Route to render a cart with products:
router.get('/carts/:cid', async (req, res) => {
  let result = await cartService.getCartById(req.params.cid)
  res.render('cart', result )
  console.log(result)
  console.log(result.products[0])
})

//Cookie management:
router.use(cookieParser('NPfirm'))

router.get('/setCookie', (req, res) => {
  res.cookie('CookieNP', 'This is a cookie', {maxAge: 60000, signed: true }).send('Cookie')
})

router.get('/getCookie', (req, res) => {
  res.send(req.signedCookies)
})

router.get('/deleteCookie', (req, res) => {
  res.clearCookie('CookieNP').send('Cookie was successfully deleted')
})

export default router 