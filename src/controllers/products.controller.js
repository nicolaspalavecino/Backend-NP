import ProductService from '../services/product.service.js'
import { readLinkFilter } from '../utils.js'

const productService = new ProductService()

export const getProducts = async (req, res) => {
  try {
    let products = await productService.getProducts(req.query)
    let link_filter = readLinkFilter(req.query)
    products.prevLink = products.hasPrevPage? `http://localhost:8080/api/products?${link_filter}page=${products.prevPage}`:'None'
    products.nextLink = products.hasNextPage? `http://localhost:8080/api/products?${link_filter}page=${products.nextPage}`:'None'
    products.status = products ? "success" : "error"
    res.status(201).send(products)
  } catch (error) {
    res.status(500).send({error: 'No se pueden obtener productos con Mongoose', message: error})
  }
}

export const addProduct = async (req, res) => {
  let result = await productService.addProduct(req.body)
  if (!result.status) {
    res.status(501).send(result)
  } else {
    res.status(201).send({status: 'Success', message: `Product successfully added to the list with id: ${result.id}`})
  }
}

export const getProductById = async (req, res) => {
  let result = await productService.getProductById(req.params.pid)
  if(!result.status) {
    res.status(501).send(result)
  } else {
    res.send(result)
  }
}

export const updateProduct = async (req, res) => {
  let productId = req.params.pid
  let update = await productService.updateProduct(productId, req.body)
  console.log('Producto actualizado:')
  console.log(update)
  if (!update.status) {
    res.status(501).send(update)
  } else {
    res.send({status: 'Success', message: `Product with ID: ${productId} was successfully updated`})
  }
}

export const deleteProduct = async (req, res) => {
  let productId = req.params.pid
  let deletedProduct = await productService.deleteProduct(productId)
  if (!deletedProduct.status) {
    res.send(deletedProduct)
  } else {
    res.send({status: 'Success', message: `Product with ID: ${productId} was successfully deleted`})
  }
}