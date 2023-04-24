import { fileURLToPath } from 'url'
import { dirname } from 'path'
import ProductManager from './dao/Dao/fileSystem_classes/ProductManager.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Lista de productos utilizando fileSystem:
let productManager = new ProductManager()
let productsList = await productManager.getProducts()

// Concatenación de FILTROS en links: 
const readLinkFilter = (filter) => {
  let filterLinkString = ''
  filter.page ? delete filter.page : {}
  let filter_keys = Object.keys(filter)
  let filter_values = Object.values(filter)
  let filter_pairs = filter_keys.concat(filter_values)
  if (filter_pairs != []) {
      for (let i=0; i< (filter_pairs.length/2); i++){
          let string = `${filter_pairs[i]}=${filter_pairs[i+filter_pairs.length/2]}&`
          filterLinkString += string
      }
      return filterLinkString
  }
}

export {
  __dirname,
  productsList,
  readLinkFilter
} 

