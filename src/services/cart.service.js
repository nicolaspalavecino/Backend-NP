import cartModel from "./models/carts.models.js"
import productModel from './models/products.models.js'
import mongoose from "mongoose"

class CartService {

  // ADD CART:
  addCart = async (cart) => {
    try {
      let newCart = await cartModel.create(cart)
      return newCart
    } catch (error) {
      throw Error(`An error ocurred creating the new cart. Error detail: ${error}`)
    }
  }

  // GET CART BY ID:
  getCartById = async (cartId) => {
    try {
      let result = await cartModel.findById(cartId).populate('products')
      return result.toObject()
    } catch (error) {
      return (`An error occurred while retrieving the cart. Error detail: ${error}`)
    }
  }

  // ADD PRODUCT TO CART:
  addProductToCart = async (cartId, productId) => {
    try {
      let cart = await cartModel.findOne({ _id: cartId })
      let product = await productModel.findOne({ _id: productId })
      if(cart && product) {
        let productInCart = cart.products.find(p => p.product._id == productId)??null
        if(!productInCart) {
          let newProduct = {product: productId, quantity: 1}
          await cartModel.findByIdAndUpdate({_id: cartId}, { $push: {products: newProduct }})
          return `${product.title} was successfully added to the cart (id: ${cartId})`
        } else { 
          productInCart.quantity = productInCart.quantity+1
          console.log(productInCart)
          await cartModel.findByIdAndUpdate({_id: cartId}, { products: productInCart })
          return `Another unit of ${product.title} was added to the cart. Actual count: ${productInCart.quantity}`
        }
      }
      return `Please check if the cart (ID: ${cartId}) or product (ID: ${product} exists)`
    } catch (error) {
      return (`An error ocurred adding the product to the cart. Error detail: ${error}`)
    }
  }

  // UPDATE PRODUCT QUANTITY IN CART: 
  updateProductQuantity = async (cartId, productId, newQuantity) => {
    try {
      let cart = await cartModel.findOne({ _id: cartId })??null
      let product = await productModel.findOne({ _id: productId })??null
      if(cart && product) {
        let productInCart = cart.products.find((p) => p.product._id == productId)??null
        if (productInCart) {
          productInCart.quantity = newQuantity
          await cartModel.findByIdAndUpdate({ _id: cartId }, { products: productInCart })
          return `The quantity of ${product.title} was modified. Actual count: ${productInCart.quantity}`
        } else { 
          return `${product.title} was not found in the cart (ID: ${cartId})`
        }
      }
      return `Please check if the cart (ID: ${cartId}) or product (ID: ${product} exists)`
    } catch (error) {
      return (`An error ocurred updating the product's quantity. Error detail: ${error}`)
    }
  }

  // DELETE PRODUCT FROM CART:
  deleteProductFromCart = async (cartId, productId) => {
    try {
      let cart = await cartModel.findOne({ _id: cartId })??null
      let product = await productModel.findOne({ _id: productId })??null
      if(cart && product) {
        let productInCart = cart.products.find((p) => p.product._id == productId)??null
        if (productInCart) {
          cart.products.splice(cart.products.indexOf(productInCart), 1)
          await cartModel.findByIdAndUpdate({ _id: cartId }, cart)
          return `${product.title} was successfully deleted from the cart (id: ${cartId})`
          }
        return `${product.title} was not found in the cart (ID: ${cartId})`
      }
      return `Please check if the cart (ID: ${cartId}) or the product (ID: ${productId}) exists`
    } catch (error) {
      return (`An error ocurred deleting the product from cart. Error detail: ${error}`)
    }
  }

// DELETE ALL PRODUCTS FROM CART:
  deleteAllFromCart = async (cartId) => {
    try {
      await cartModel.findByIdAndUpdate({ _id: cartId }, { products: [] })
      return `All products were successfully deleted from cart (ID: ${cartId})`
    } catch (error) {
      return (`An error ocurred deleting all products from cart. Error detail: ${error}`)
    }
  }
}

export default CartService