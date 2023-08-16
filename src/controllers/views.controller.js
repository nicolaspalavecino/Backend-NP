import { readLinkFilter } from "../utils.js"
import ProductService from "../services/product.service.js"
import CartService from "../services/cart.service.js"
import UserService from "../services/user.service.js"
import { environment } from "../config/config.js"
import TicketService from "../services/ticket.service.js"

let productService = new ProductService ()
let cartService = new CartService()
let userService = new UserService()
let ticketService = new TicketService()

export const renderLogin = async (req, res) => {
  try {
    res.render('login')
  } catch (error) {
    res.render('error', error)
  }
}

export const renderRegister = async (req, res) => {
  try {
    res.render('register')
  } catch (error) {
    res.render('error', error)
  }
}

export const renderProfile = async (req, res) => {
  try {
    let data = { user: req.user }
    res.render('profile', data)
  } catch (error) {
    res.render('error', error)
  }
}

export const renderProducts = async (req, res) => {
  try {
    let products = await productService.getProducts(req.query)
    let link_filter = readLinkFilter(req.query)
    products.prevLink = products.hasPrevPage? `http://localhost:8080/products?${link_filter}page=${products.prevPage}`:'None'
    products.nextLink = products.hasNextPage? `http://localhost:8080/products?${link_filter}page=${products.nextPage}`:'None'
    products.status = products ? "success" : "error"
    let user = await userService.getUser(req.user.email)
    req.user.role = user.role
    req.user.documents = user.documents
    let data = { products: products , user: req.user }
    if (environment === 'testing') {
      res.status(200).send({ status: 'Success', payload: data })
    } else {
      res.render('products', data)
    }  
  } catch (error) {
    res.render('error', error)
  }
}

export const renderCart = async (req, res) => {
  try {
    let cart = await cartService.getCartById(req.params.cid)
    let tickets = await ticketService.getUserTickets(req.user.email)
    let data = { cart: cart, user: req.user, tickets: tickets }
    if (environment === 'testing') {
      res.status(200).send({ status: 'Success', payload: data })
    } else {
      res.render('cart', data )
    }
  } catch (error) {
    res.render('error', error)
  }
}

export const renderChat = async (req, res) => {
  try {
    let data = { user: req.user }
    res.render('chat', data)
  } catch (error) {
    res.render('error', error)
  }
}

export const renderRestorePassword = async (req, res) => {
  try {
    res.render('restorePassword')
  } catch (error) {
    res.render('error', error)
  }
}

export const renderPremium = async (req, res) => {
  try {
    let data = { user: req.user }
    res.render('premium', data)
  } catch (error) {
    res.render('error', error)
  }
}

export const renderUsers = async (req, res) => {
  try {
    let users = await userService.getAllUsers()
    let data = { users: users, admin: req.user }
    res.render('users', data)
  } catch (error) {
    res.render('error', error)
  }
}