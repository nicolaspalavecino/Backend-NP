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

  addCart = async () => {
    try {
      let newCart = await cartModel.create({ products: [] })
      return newCart
    } catch (error) {
      throw Error(`An error ocurred creating the new cart. Error detail: ${error}`)
    }
  }

  // GET CART BY ID:

  // ADD PRODUCT TO CART:
  addProductToCart = async (cartId, productId) => {
    try {
      let cart = await cartModel.findOne({ _id: cartId })??null
      let product = await productModel.findOne({ _id: productId })??null
      if(cart && product) {
        let productInCart = cart.products.find((p) => p._id === productId)??null
        if (!productInCart) {
          let newProduct = {_id: productId, quantity: 1}
          let result = await cartModel.findByIdAndUpdate({ _id: cartId }, { $push:{ "products": newProduct} })
          console.log(`${product.title} was successfully added to the cart (id: ${cartId})`)
          return result
        } else {
          productInCart.quantity = productInCart.quantity+1
          console.log(productInCart)
          let result = await cartModel.findByIdAndUpdate({ _id: cartId }, { products: productInCart })
          console.log(`Another unit of ${product.title} was added to the cart. Actual count: ${productInCart.quantity}`)
          return result
        }
      }
    } catch (error) {
      throw Error(`An error ocurred adding the product to the cart. Error detail: ${error}`)
    }
  }

  // DELETE PRODUCT FROM CART:
  deleteProductFromCart = async (cartId, productId) => {
    try {
      let cart = await cartModel.findOne({ _id: cartId })??null
      let product = await productModel.findOne({ _id: productId })??null
      if(cart && product) {
        let productInCart = cart.products.find((p) => p._id === productId)??null
        if (productInCart) {
          // cart.products.splice(cart.products.indexOf(productInCart), 1)
          // console.log(cart.products)
          return `${product.title} was successfully deleted from the cart (id: ${cartId})`
          }
        return `Please check if the cart with id: ${cartId} or the product with id: ${productId} exists`
      }
    } catch (error) {
    throw Error(`An error ocurred deleting the product from cart. Error detail: ${error}`)
    }
  }

}

// deleteProductFromCart = async (cartId, productId) => {
//   try {
//     await this.validateFile()
//     await this.checkProductsFile()
//     let cart = this.carts.find((c) => c.id === cartId)??null
//     let product = this.products.find((p) => p.id == productId)??null
//     if(cart && product) {
//       let productInCart = cart.products.find((p) => p.id == productId)??null
//       if (productInCart) {
//         cart.products.splice(cart.products.indexOf(productInCart), 1)
//         await fs.promises.writeFile(this.filePath, JSON.stringify(this.carts))
//         return `${product.title} was successfully deleted from the cart (id: ${cart.id})`
//       } 
//       return `Please check if the cart with id: ${cartId} or the product with id: ${productId} exists`
//     }
//   } catch (error) {
//     throw Error(`An error ocurred deleting the product from cart. Validate the existence of: ${JSON.stringify(this.dirPath)}, error detail: ${error}`)
//   }
// }


export default CartManagerDB