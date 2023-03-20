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

  verifyProperties = async (product) => {
    if (!product.title || !product.category || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock || !product.status) {
      return false
    } else {
      return true
    }
  }

  addProduct = async (product) => {
    try {
      await this.validateFile()
      const uniqueCode = this.products.find((p) => p.code == product.code)??0
      if (this.verifyProperties(product)) {
        if (!uniqueCode) {
          this.products.length > 0 ? this.id = this.products.reduce((acc, curr) => curr.id > acc ? curr.id : acc, 0) + 1 : 0
          const newProduct = {
            title: product.title, 
            description: product.description, 
            category: product.category, 
            price: product.price, 
            thumbnail: product.thumbnail, 
            code: product.code, 
            stock: product.stock, 
            status: product.status, 
            id: this.id 
          }
          this.products = [...this.products, newProduct]
          await fs.promises.writeFile(this.filePath, JSON.stringify(this.products))
          return newProduct
        } else {
          // console.log(`The code: ${code} already exists. Please, try a new one.`)
          return `The code: ${product.code} already exists. Please, try a new one.`
        }
      } else {
        // console.log('Please, assign all required properties')
        return 'Please, assign all required properties'
      }
    } catch (error) {
      throw Error(`An error ocurred creating the new product: ${product}, error detail: ${error}`)
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

  updateProduct = async (id, properties, newValues) => {
    try {
      await this.validateFile()
      const foundProduct = this.products.find((product) => product.id == id)??null
      if (foundProduct) {
        let validProperty = true
        properties.forEach(x => {
          if(!(Object.keys(foundProduct).includes(x))) {
            validProperty = false
          }
        })
        if(!validProperty) {
          return 'Please, check for correct entries of properties keys or names'
        }
        properties.forEach(p => {
          foundProduct[p] = newValues[properties.indexOf(p)]    
        })
        await fs.promises.writeFile(this.filePath, JSON.stringify(this.products))
        return foundProduct
      } else {
        return `The product with id: ${id} does not exist. Please, try again.`
      }
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