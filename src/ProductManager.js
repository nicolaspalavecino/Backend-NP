import fs from 'fs'

class ProductManager {
    
  constructor() {
    this.products = []
    this.dirPath = './files'
    this.id = 0
    this.filePath = this.dirPath + '/Products.json'
  }

  validateFile = async () => {
    try {
      await fs.promises.mkdir(this.dirPath, { recursive: true })
      if (!fs.existsSync(this.filePath)) {
        await fs.promises.writeFile(this.filePath, '[]')
      }
      let productsFile = await fs.promises.readFile(this.filePath, 'utf-8')
      this.products = JSON.parse(productsFile)
    } catch {
      throw Error(`A database error has ocurred, error detail: ${error}`)
    }
  }

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    try {
      await this.validateFile()
      const uniqueCode = this.products.find((product) => product.code == code)??0
      if (title != '' && description != '' && price != 0 && price !='' && thumbnail!= '', code != '' && stock != 0 && stock != '') {
        if (!uniqueCode) {
          this.products.length > 0 ? this.id = this.products.reduce((acc, curr) => curr.id > acc ? curr.id : acc, 0) + 1 : 0
          const newProduct = {title: title, description: description, price: price, thumbnail: thumbnail, code: code, stock: stock, id: this.id }
          this.products = [...this.products, newProduct]
          console.log(`'${title}' has been added to products list.`)
        } else {
          console.log(`The code: ${code} already exists. Please, try a new one.`)
        }
      } else {
        console.log('Please, assign all required properties')
      }
      await fs.promises.writeFile(this.filePath, JSON.stringify(this.products))
    } catch (error) {
      throw Error(`An error ocurred creating the new product: ${JSON.stringify(newProduct)}, error detail: ${error}`)
    }
  }

  getProducts = async () => {
    try {
      await this.validateFile()
      console.log(this.products)
      return this.products
    } catch (error) {
      throw Error(`An error has ocurred by consulting the products of the file. Validate the existence of: ${JSON.stringify(this.dirPath)}, error detail: ${error}`)
    }
  }

  getProductById = async (id) => {
    try {
      await this.validateFile()
      const productById = this.products.find((product) => product.id == id)??null
      return productById
    } catch {
      throw Error(`An error has ocurred by obtaining a product by id. Validate the existence of: ${JSON.stringify(this.dirPath)}, error detail: ${error}`)
    }
  }

  updateProduct = async (id, property, value) => {
    try {
      await this.validateFile()
      const foundProduct = this.products.find((product) => product.id == id)??null
      if (foundProduct) {
        foundProduct[property] = value
        console.log('The product with id: ' + id + ' has been successfully modified.')
        console.log(foundProduct)
      } else {
        console.error('The product with id: ' + id + ' does not exist. Please, try again.')
      }
      await fs.promises.writeFile(this.filePath, JSON.stringify(this.products))
    } catch {
      throw Error(`An error has ocurred by obtaining a product by id. Validate the existence of: ${JSON.stringify(this.dirPath)}, error detail: ${error}`)
    }
  }

  deleteProduct = async (id) => {
    try {
      await this.validateFile()
      const foundProduct = this.products.find((product) => product.id == id)??null
      if (foundProduct) {
        this.products.splice(foundProduct.id, 1)
        console.log('The product with id: ' + id + ' has been successfully eliminated.')
      } else {
        console.error('The product with id: ' + id + ' does not exist. Please, try again.')
      }
      await fs.promises.writeFile(this.filePath, JSON.stringify(this.products))
    } catch {
      throw Error(`An error has ocurred by obtaining a product by id. Validate the existence of: ${JSON.stringify(this.dirPath)}, error detail: ${error}`)
    }
  }
}

export default ProductManager