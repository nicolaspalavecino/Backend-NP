import cartModel from "./models/carts.models.js"
import productModel from './models/products.models.js'
import ticketModel from "./models/tickets.model.js"
import userModel from "./models/users.models.js"
import ProductService from "./product.service.js"

const productService = new ProductService()

export default class CartService {

  addCart = async (cart) => {
    try {
      let newCart = await cartModel.create(cart)
      return newCart
    } catch (error) {
      throw Error(`An error ocurred creating the new cart. Error detail: ${error}`)
    }
  }

  getCartById = async (cartId) => {
    try {
      let result = await cartModel.findById(cartId).populate('products')
      return result.toObject()
    } catch (error) {
      return (`An error occurred while retrieving the cart. Error detail: ${error}`)
    }
  }

  addProductToCart = async (cartId, productId, productTitle) => {
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
          await cartModel.findByIdAndUpdate({_id: cartId}, cart)
          return `Another unit of ${product.title} was added to the cart. Actual count: ${productInCart.quantity}`
        }
      }
      return `Please check if the cart (ID: ${cartId}) or product (ID: ${product} exists)`
    } catch (error) {
      return (`An error ocurred adding the product to the cart. Error detail: ${error}`)
    }
  }

  updateProductQuantity = async (cartId, productId, newQuantity) => {
    try {
      let cart = await cartModel.findOne({ _id: cartId })??null
      let product = await productModel.findOne({ _id: productId })??null
      if(cart && product) {
        let productInCart = cart.products.find((p) => p.product._id == productId)??null
        if (productInCart) {
          productInCart.quantity = newQuantity
          await cartModel.findByIdAndUpdate({ _id: cartId }, cart)  
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

  deleteAllFromCart = async (cartId) => {
    try {
      await cartModel.findByIdAndUpdate({ _id: cartId }, { products: [] })
      return `All products were successfully deleted from cart (ID: ${cartId})`
    } catch (error) {
      return (`An error ocurred deleting all products from cart. Error detail: ${error}`)
    }
  }

  purchaseCart = async (cartId) => {
    try {
      let cart = await cartModel.findOne({ _id: cartId })
      let user = await userModel.findOne({ cartId: cartId })
      let stock = this.#checkStock(cart)
      if (cart && user && stock.available) {
        let ticket = this.#createOrder(cart, user)
        this.deleteAllFromCart(cartId)
        cart.products.forEach((p) => {
          productService.updateProduct(p.product.id, {
            stock: p.product.stock - p.quantity
          })
        })
        return ticket
      } else {
        let nonStockProducts = []
        stock.notAvailable.forEach((p) => {
          let foundProduct = cart.products.find((c) => c.product.id == p)
          nonStockProducts.push(foundProduct)
        })
        nonStockProducts.forEach((x) => {
          cart.products.splice(cart.products.indexOf(x),1)
        })
        let ticket = this.#createOrder(cart, user)
        this.deleteAllFromCart(cartId)
        stock.notAvailable.forEach((z) => {
          this.addProductToCart(cartId, z)
        })
        cart.products.forEach((p) => {
          productService.updateProduct(p.product.id, {
            stock: p.product.stock - p.quantity
          })
        })
        return ticket
      }
    } catch (error) {
      return(`An error ocurred purchasing the cart. Error detail: ${error}`)
    }
  }

  #totalAmount = (cart) => {
    let total = 0
    cart.products.forEach(p => {
      total = total + (p.product.price*p.quantity)
    })
    return total
  }
  
  #checkStock = (cart) => {
    let availableStock = true
    let notAvailable = []
    cart.products.forEach(p => {
      let cq = p.quantity
      let pq = p.product.stock
      if(cq <= pq) {
        availableStock = true
      } else {
        availableStock = false
        notAvailable.push(p.product.id)
      }
    })
    notAvailable.length > 0 ? availableStock = false : availableStock = true
    let data = { available: availableStock, notAvailable: notAvailable }
    return data
  }

  #createOrder = async (cart, user) => {
    let newAmount = this.#totalAmount(cart)
      let newTicket = {
        code: Math.floor(Math.random()*200000+1).toString(),
        purchase_datetime: Date.now(),
        amount: newAmount,
        purchaser: user.email,
        products: cart.products
      }
      console.log(newTicket)
      let ticket = await ticketModel.create(newTicket)
      return ticket
  }
}

