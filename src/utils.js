import { fileURLToPath } from 'url'
import { dirname } from 'path'
import ProductManager from './classes/ProductManager.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

let productManager = new ProductManager()
let productsList = await productManager.getProducts()

export {
  __dirname,
  productsList
} 

