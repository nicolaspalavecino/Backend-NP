import { fileURLToPath } from 'url'
import { dirname } from 'path'
import ProductManager from './dao/Dao/fileSystem_classes/ProductManager.js'
import { Router } from "express"
import bcrypt from 'bcrypt'

const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

// Lista de productos utilizando fileSystem:
let productManager = new ProductManager()
export let productsList = await productManager.getProducts()

// Concatenación de FILTROS en links: 
export const readLinkFilter = (filter) => {
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

// Create Hash:
export const createHash = password =>  bcrypt.hashSync(password, bcrypt.genSaltSync(10))

// Validate Password:
export const validPassword = (user, password) => { // -> esta función se la llama en el login, en sessions.router.js
    return bcrypt.compareSync(password, user.password)
}

// Authorization:
export const authorization = (req, res, next) => {
  if(req.session.user === 'Pepe' && req.session.admin) {
    return next()
  } else {
    return res.status(403).send('User not authorized to access this resource!')
  }
}
