import CartService from '../services/cart.service.js'
import EmailService from '../services/email.service.js'

const cartService = new CartService()
const emailService = new EmailService()

export const addCart = async (req, res) => {
  let result = await cartService.addCart(req.body)
  res.status(201).send(result)
}

export const getCartById = async (req, res) => {
  let result = await cartService.getCartById(req.params.cid)
  res.status(201).send(result)
}

export const addProductToCart = async (req, res) => {
  let result = await cartService.addProductToCart(req.params.cid, req.params.pid)
  res.status(201).send(result)
}

export const updateProductQuantity = async (req, res) => {
  let quantity = Object.keys(req.body)[0] == 'quantity' ? Object.values(req.body)[0] : Object.keys(req.body)[0]
  if (typeof(quantity) == 'number') {
    let result = await cartService.updateProductQuantity(req.params.cid, req.params.pid, quantity)
    typeof(result) == 'string' ? res.status(405).send(result) : res.status(201).send(result)
  } else {
    res.status(402).send(`'${quantity}' is not valid. Please, try again.`)
  }
}

export const deleteProductFromCart = async (req, res) => {
  let result = await cartService.deleteProductFromCart(req.params.cid, req.params.pid)
  res.status(201).send(result)
}

export const deleteAllFromCart = async (req, res) => {
  let result = await cartService.deleteAllFromCart(req.params.cid)
  res.status(201).send(result)
}

export const purchaseCart = async (req, res) => {
  let result = await cartService.purchaseCart(req.params.cid)
  await emailService.sendEmail(result) // LLAMO AL MÉTODO DE SERVICE PARA ENVIAR EL MAIL!
  res.status(202).send(result)
}