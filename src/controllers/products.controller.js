import ProductService from '../services/product.service.js'
import { readLinkFilter } from '../utils.js'
import CustomError from '../services/errors/customError.js'
import { createProductError } from '../services/errors/messages/product-error.message.js'
import EErrors from '../services/errors/error-enum.js'

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
  try {
    let product = req.body
    console.log(product)
    if (!product.title || !product.category || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock ) {
      CustomError.createError({
        name: 'Product creation error',
        cause: createProductError(product),
        message: 'Please complete all the fields! Check console for more information about the required properties.',
        code: EErrors.INVALID_TYPE_ERROR
      })
    }
    let result = await productService.addProduct(product)
    req.logger.info(`Product successfully added to the list with name: ${result.title} and ID: ${result.id}`)
    res.status(201).json({ status: 'Success', message: `Product successfully added to the list with id: ${result.id}`, payload: result})
  } catch (error) {
    req.logger.error(error.message)
    res.status(400).json({ status: 'Error', message: error.message, detail: error.cause })
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
  try {
    let productId = req.params.pid
    let updatedInfo = { [req.body.property]: req.body.value }
    let update = await productService.updateProduct(productId, updatedInfo)
    if (typeof(update) == 'object') {
      req.logger.info('Producto actualizado: ' + update)
      res.status(201).json({ status: 'Success', message: `The product '${update.title}' was successfully updated!`})
    }
  } catch (error) {
    res.status(500).json({ status: 'Error', message: `An error ocurred while trying to update a product: ${error}`})
  }
}

export const deleteProduct = async (req, res) => {
  let productId = req.params.pid
  let deletedProduct = await productService.deleteProduct(productId)
  if(typeof(deletedProduct) == 'object') {
    res.status(201).json({ status: 'Success', message: 'The product was successfully deleted!', payload: deletedProduct})
  } else {
    res.status(500).json({ status: 'Error', message: 'An error ocurred while trying to delete product'})
  }
}