import cartModel from "../../models/carts.models.js"
import productModel from "../../models/products.models.js"

class CartManagerDB {

  // ADD CART:
  // addCart = async (newCart) => {
  //   try {
  //     const checkCode = await cartModel.find({ code: newCart.code })??null
  //     if (checkCode.queue == []) {
  //       !newCart.products ? newCart.products = [] : {}
  //       let createdCart = await cartModel.create(newCart)
  //       return createdCart
  //     }
  //     return `There is already an existing cart with the code: ${newCart.code}, try again`
  //   } catch (error) {
  //     throw Error(`An error ocurred creating the new cart. Error detail: ${error}`)
  //   }
  // }

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
      let cartById = await cartModel.findOne({ _id: cartId })
      return cartById
    } catch (error) {
      throw Error(`An error ocurred creating the new cart. Error detail: ${error}`)
    }
  }

  // ADD PRODUCT TO CART:
  addProductToCart = async (cartId, productId) => {
    try {
      let cart = await cartModel.findOne({ _id: cartId })??null
      let product = await productModel.findOne({ _id: productId })??null
      if(cart && product) {
        let productInCart = cart.products.find(p => p._id == productId)??null
        if(!productInCart) {
          let newProduct = {_id: productId, quantity: 1}
          cart.products.push(newProduct)                
          await cartModel.findByIdAndUpdate({_id: cartId}, cart)
          return `${product.title} was successfully added to the cart (id: ${cartId})`
        } else { 
          productInCart.quantity = productInCart.quantity+1
          console.log(productInCart)
          await cartModel.findByIdAndUpdate({_id: cartId}, cart)
          return `Another unit of ${product.title} was added to the cart. Actual count: ${productInCart.quantity}`
        }
      }
      return `Please check if the cart (ID: ${cartId}) or the product (ID: ${product} exists)`
    } catch (error) {
      throw Error(`An error ocurred adding the product to the cart. Error detail: ${error}`)
    }
  }

  // UPDATE PRODUCT QUANTITY IN CART: 
  updateProductQuantity = async (cartId, productId, newQuantity) => {
    try {
      let cart = await cartModel.findOne({ _id: cartId })??null
      let product = await productModel.findOne({ _id: productId })??null
      if(cart && product) {
        let productInCart = cart.products.find((p) => p._id == productId)??null
        if (productInCart) {
          productInCart.quantity = newQuantity
          await cartModel.findByIdAndUpdate({ _id: cartId }, { products: productInCart })
          return `The quantity of ${product.title} was modified. Actual count: ${productInCart.quantity}`
        } else { 
          return `${product.title} was not found in the cart with Id: ${cartId})`
        }
      }
    } catch (error) {
      throw Error(`An error ocurred updating the product's quantity. Error detail: ${error}`)
    }
  }

  // DELETE PRODUCT FROM CART:
  deleteProductFromCart = async (cartId, productId) => {
    try {
      let cart = await cartModel.findOne({ _id: cartId })??null
      let product = await productModel.findOne({ _id: productId })??null
      if(cart && product) {
        let productInCart = cart.products.find((p) => p._id == productId)??null
        if (productInCart) {
          cart.products.splice(cart.products.indexOf(productInCart), 1)
          await cartModel.findByIdAndUpdate({ _id: cartId }, cart)
          return `${product.title} was successfully deleted from the cart (id: ${cartId})`
          }
        return `Please check if the cart with id: ${cartId} or the product with id: ${productId} exists`
      }
    } catch (error) {
      return (`An error ocurred deleting the product from cart. Error detail: ${error}`)
    }
  }

// DELETE ALL PRODUCTS FROM CART:
  deleteAllFromCart = async (cartId) => {
    try {
      await cartModel.findByIdAndUpdate({ _id: cartId }, { products: [] })
      return `All products were successfully deleted from cart with id: ${cartId}`
    } catch (error) {
      return (`An error ocurred deleting all products from cart. Error detail: ${error}`)
    }
  }
}

export default CartManagerDB