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
      // Creación del directorio:
      await fs.promises.mkdir(this.dirPath, { recursive: true })
      // El archivo no existe:
      if (!fs.existsSync(this.filePath)) {
        // Creación del archivo vacío:
        await fs.promises.writeFile(this.filePath, '[]')
      }
      // El archivo existe: 
      // Verificar contenido del archivo:
      let productsFile = await fs.promises.readFile(this.filePath, 'utf-8')
      this.products = JSON.parse(productsFile)
    } catch {
      throw Error(`Error al consultar la base de datos, detalle del error: ${error}`)
    }
  }

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    try {
      await this.validateFile()
      // Verificación de datos ingresados por el usuario:
      const uniqueCode = this.products.find((product) => product.code == code)??0
      if (title != '' && description != '' && price != 0 && price !='' && thumbnail!= '', code != '' && stock != 0 && stock != '') {
        if (!uniqueCode) {
          // Id autoincrementable:
          this.products.length > 0 ? this.id = this.products.reduce((acc, curr) => curr.id > acc ? curr.id : acc, 0) + 1 : 0
          // Creación del objeto producto:
          const newProduct = {title: title, description: description, price: price, thumbnail: thumbnail, code: code, stock: stock, id: this.id }
          // Adición del nuevo producto al array:
          this.products = [...this.products, newProduct]
          console.log(`Se ha añadido ${title} a la lista de productos`)
        } else {
          console.log(`El código: ${code} ya existe. Por favor, asigne un nuevo código.`)
        }
      } else {
        console.log('Por favor, asigne todas las propiedades necesarias')
      }
      await fs.promises.writeFile(this.filePath, JSON.stringify(this.products))
    } catch (error) {
      throw Error(`Error creando producto nuevo: ${JSON.stringify(newProduct)}, detalle del error: ${error}`)
    }
  }

  getProducts = async () => {
    try {
      await this.validateFile()
      // Obtención del listado de productos:
      console.log(this.products)
      return this.products
    } catch (error) {
      throw Error(`Error consultando los productos del archivo. Valide la existencia de: ${JSON.stringify(this.dirPath)}, detalle del error: ${error}`)
    }
  }

  getProductById = async (id) => {
    try {
      await this.validateFile()
      // Búsqueda del producto por id dentro del array:
      const productById = this.products.find((product) => product.id == id)??null
      return productById
    } catch {
      throw Error(`Error obteniendo producto mediante id. Valide la existencia de: ${JSON.stringify(this.dirPath)}, detalle del error: ${error}`)
    }
  }

  updateProduct = async (id, property, value) => {
    try {
      await this.validateFile()
      // Búsqueda del producto por id:
      const foundProduct = this.products.find((product) => product.id == id)??null
      if (foundProduct) {
        // Adición o modificación de una propiedad y/o valor del objeto:
        foundProduct[property] = value
        console.log('Se modificó exitosamente el producto con el id: ' + id)
        console.log(foundProduct)
      } else {
        console.error('El producto con el id: ' + id + ' que desea modificar no existe. Por favor, inténtelo nuevamente.')
      }
      await fs.promises.writeFile(this.filePath, JSON.stringify(this.products))
    } catch {
      throw Error(`Error obteniendo producto mediante id. Valide la existencia de: ${JSON.stringify(this.dirPath)}, detalle del error: ${error}`)
    }
  }

  deleteProduct = async (id) => {
    try {
      await this.validateFile()
      // Búsqueda del producto por id:
      const foundProduct = this.products.find((product) => product.id == id)??null
      if (foundProduct) {
        // Eliminación del producto seleccionado:
        this.products.splice(foundProduct.id, 1)
        console.log('Se ha eliminado exitosamente el producto con el Id: ' + id)
      } else {
        console.error('No existe ningùn producto con el Id: ' + id )
      }
      await fs.promises.writeFile(this.filePath, JSON.stringify(this.products))
    } catch {
      throw Error(`Error obteniendo producto mediante id. Valide la existencia de: ${JSON.stringify(this.dirPath)}, detalle del error: ${error}`)
    }
  }
}

export default ProductManager