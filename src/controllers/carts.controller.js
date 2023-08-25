import CartService from '../services/cart.service.js'
import EmailService from '../services/email.service.js'

const cartService = new CartService()
const emailService = new EmailService()

export const addCart = async (req, res) => {
  try {
    let result = await cartService.addCart(req.body)
    res.status(201).send(result)
  } catch (error) {
    res.status(500).json({ status: 'Error', message: 'An error ocurred while trying to create a cart', detail: error })
  }
}

export const getCartById = async (req, res) => {
  try {
    let result = await cartService.getCartById(req.params.cid)
    res.status(201).send(result)
  } catch (error) {
    res.status(500).json({ status: 'Error', message: 'An error ocurred while trying to get a cart', detail: error })
  }

}

export const addProductToCart = async (req, res) => {
  try {
    let result = await cartService.addProductToCart(req.params.cid, req.params.pid)
    res.status(201).json({ status: 'Success', payload: result })
  } catch (error) {
    res.status(500).json({ status: 'Error', message: 'An error ocurred while trying add a product to the cart', detail: error })
  }
}

export const updateProductQuantity = async (req, res) => {
  try {
    let quantity = Object.keys(req.body)[0] == 'quantity' ? Object.values(req.body)[0] : Object.keys(req.body)[0]
    if (typeof(quantity) == 'number') {
      let result = await cartService.updateProductQuantity(req.params.cid, req.params.pid, quantity)
      typeof(result) == 'string' ? res.status(405).send(result) : res.status(201).send(result)
    } else {
      res.status(402).send(`'${quantity}' is not valid. Please, try again.`)
    }
  } catch (error) {
    res.status(500).json({ status: 'Error', message: 'An error ocurred while trying to update product quantity', detail: error })
  }
}

export const deleteProductFromCart = async (req, res) => {
  try {
    let result = await cartService.deleteProductFromCart(req.params.cid, req.params.pid)
    if (typeof(result) == 'object') {
      res.status(201).json({ status: 'Success', payload: result })
    } else {
      res.status(404).json({ status: 'Error', message: result })
    }
  } catch (error) {
    res.status(500).json({ status: 'Error', message: 'An error ocurred while trying to delete the product from cart', detail: error })
  }
}

export const deleteAllFromCart = async (req, res) => {
  try {
    let result = await cartService.deleteAllFromCart(req.params.cid)
    res.status(201).json({ status: 'Success', message: result })
  } catch (error) {
    res.status(500).json({ status: 'Error', message: 'An error ocurred while trying to delete all products from cart', detail: error })  
  }
}

export const purchaseCart = async (req, res) => {
  try {
    let result = await cartService.purchaseCart(req.params.cid)
    await emailService.sendEmail(result) // LLAMO AL MÉTODO DE SERVICE PARA ENVIAR EL MAIL!
    res.status(202).send(result)
  } catch (error) {
    res.status(500).json({ status: 'Error', message: 'An error ocurred while trying to purchase cart', detail: error })  
  }
}