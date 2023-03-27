import { Router } from "express"
const routerProducts = Router()
import ProductManager from "../classes/ProductManager.js"

let productManager = new ProductManager()

// 1) Llamado desde el navegador a los primeros X cantidad de productos o al listado completo de productos:
routerProducts.get('/', async (req, res) => {
  let result = await productManager.getProducts()
  let limit = parseInt(req.query.limit)??null
  if (limit) {
    let newArray = result.slice(0, limit)
    res.send(newArray)
  } else {
    res.send(result)
  }
})

// 2) Llamado desde el navegador a un producto mediante id específico:
routerProducts.get('/:pid', async (req, res) => {
  let result = await productManager.getProductById(parseInt(req.params.pid))
  if(!result.status) {
    res.send(result)
  } else {
    res.send(result)
  }
})

// 3) Agregar productos:
routerProducts.post('/', async (req, res) => {
  let newProduct = req.body
  let result = await productManager.addProduct(newProduct)
  if (!result.status) {
    res.send(result)
  } else {
    res.send({status: 'Success', message: `Product successfully added to the list with id: ${result.id}`})
  }
})

// 4) Actualizar información de un producto:
routerProducts.put('/:pid', async (req, res) => {
  let productId = parseInt(req.params.pid)
  let productUpdated = req.body
  let newParams = Object.keys(productUpdated)
  let newValues = Object.values(productUpdated)

  let update = await productManager.updateProduct(productId, newParams, newValues)
  if (!update.status) {
    res.send(update)
  } else {
    res.send({status: 'Success', message: `Product with ID: ${productId} was successfully updated`})
  }
})

// 5) Eliminar productos:
routerProducts.delete('/:pid', async (req, res) => {
  let productId = parseInt(req.params.pid)

  let deletedProduct = await productManager.deleteProduct(productId)
  if (!deletedProduct.status) {
    res.send(deletedProduct)
  } else {
    res.send({status: 'Success', message: `Product with ID: ${productId} was successfully deleted`})
  }
})

export default routerProducts