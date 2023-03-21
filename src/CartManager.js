import fs from 'fs'

class CartManager {
  
  constructor() {
    this.carts = []
    this.dirPath = './files'
    this.id = 0
    this.filePath = this.dirPath + '/Carts.json'
    this.productsFilePath = this.dirPath + '/Products.json'
    this.products
  }

  validateFile = async () => {
    try {
      await fs.promises.mkdir(this.dirPath, { recursive: true })
      if (!fs.existsSync(this.filePath)) {
        await fs.promises.writeFile(this.filePath, '[]')
      }
      let cartsFile = await fs.promises.readFile(this.filePath, 'utf-8')
      this.carts = JSON.parse(cartsFile)
    } catch (error) {
      throw Error(`A database error has ocurred, error detail: ${error}`)
    }
  }

  checkProductsFile = async () => {
    try {
      await fs.promises.mkdir(this.dirPath, { recursive: true })
      if (!fs.existsSync(this.productsFilePath)) {
        return `Please check the '/api/products' functionalities`
      }
      let productsFile = await fs.promises.readFile(this.productsFilePath, 'utf-8')
      this.products = JSON.parse(productsFile)
    } catch (error) {
      throw Error(`A database error has ocurred, error detail: ${error}`)
    }
  }

  getCartById = async (id) => {
    try {
      await this.validateFile()
      const cartById = this.carts.find((cart) => cart.id == id)??null
      if (cartById) {
        return cartById
      }
      return `The cart with id: ${id} does not exist. Please, try again.`
    } catch {
      throw Error(`An error has ocurred by obtaining a cart by id. Validate the existence of: ${JSON.stringify(this.dirPath)}, error detail: ${error}`)
    }
  }

  addCart = async () => {
    try {
      await this.validateFile()
      this.carts.length > 0 ? this.id = this.carts.reduce((acc, curr) => curr.id > acc ? curr.id : acc, 0) + 1 : 0
      const newCart = {
        id: this.id,
        products: [],
      }
      this.carts = [...this.carts, newCart]
      await fs.promises.writeFile(this.filePath, JSON.stringify(this.carts))
      return newCart
    } catch (error) {
      throw Error(`An error ocurred creating the new cart. Validate the existence of: ${JSON.stringify(this.dirPath)}, error detail: ${error}`)
    }
  }

  addProductToCart = async (cartId, productId) => {
    try {
      await this.validateFile()
      let existsFile = await this.checkProductsFile()
      if (!(typeof(existsFile) == 'string')) {
        let cart = this.carts.find((c) => c.id === cartId)??null
        let product = this.products.find((p) => p.id == productId)??null
        if(cart && product) {
          let productInCart = cart.products.find((p) => p.id == productId)??null
          if (!productInCart) {
            let newProduct = {id: productId, quantity: 1}
            cart.products.push(newProduct)
            await fs.promises.writeFile(this.filePath, JSON.stringify(this.carts))
            return `${product.title} was successfully added to the cart (id: ${cart.id})`
          } else {
            productInCart.quantity = productInCart.quantity+1
            await fs.promises.writeFile(this.filePath, JSON.stringify(this.carts))
            return `Another unit of ${product.title} was added to the cart. Actual count: ${productInCart.quantity+1}`
          }
        }
        return `Please check if the cart with id: ${cartId} or the product with id: ${productId} exists`
        }
      return existsFile
    } catch (error) {
      throw Error(`An error ocurred adding the product to cart. Validate the existence of: ${JSON.stringify(this.dirPath)}, error detail: ${error}`)
    }
  }

  deleteProductFromCart = async (cartId, productId) => {
    try {
      await this.validateFile()
      await this.checkProductsFile()
      let cart = this.carts.find((c) => c.id === cartId)??null
      let product = this.products.find((p) => p.id == productId)??null
      if(cart && product) {
        let productInCart = cart.products.find((p) => p.id == productId)??null
        if (productInCart) {
          cart.products.splice(cart.products.indexOf(productInCart), 1)
          await fs.promises.writeFile(this.filePath, JSON.stringify(this.carts))
          return `${product.title} was successfully deleted from the cart (id: ${cart.id})`
        } 
        return `Please check if the cart with id: ${cartId} or the product with id: ${productId} exists`
      }
    } catch (error) {
      throw Error(`An error ocurred deleting the product from cart. Validate the existence of: ${JSON.stringify(this.dirPath)}, error detail: ${error}`)
    }
  }
}

export default CartManager