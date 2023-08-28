import productModel from './models/products.models.js'

export default class ProductService {

  getProducts = async (query) => {
    try {
      let limit = query.limit ? parseInt(query.limit) : 10
      let page = query.page ? parseInt(query.page) : 1

      let order = {}
      if (query.sort == 'asc') { order.price = 1 }
      else if (query.sort == 'desc') { order.price = -1}
      
      let s_params = query.stock ? this.#defineStock(query.stock) : undefined
      let query_a = query.category ? query.category.toLowerCase() : undefined
      
      let conditions = {}
      query_a ? conditions.category = {$eq: query_a} : {}
      s_params ? conditions.$or = [{stock: {$lt: s_params.n_s}},{stock: {$gte: s_params.s}}] : {}
      
      let result = productModel.paginate(productModel.find(conditions).sort(order), {page: page, limit: limit, lean: true})
      return result
    } catch (error) {
      return `An error has ocurred by getting the products of BD. Error detail: ${error}`
    }
  }
  #defineStock = (stock) => {
    let s
    let n_s
    if (stock == 'true') {s=1; n_s=null}
    else if (stock == 'false') {s=null; n_s=1}
  }

  addProduct = async (newProduct) => {
    try {
      let result = await productModel.create(newProduct)
      return result
    } catch (error) {
      return `An error has occurred by creating a product. Error detail: ${error}`
    }
  }

  getProductById = async (id) => {
    try {
      const productById = await productModel.findOne({ _id: id })??null
      if (productById) {
        return productById
      }
    } catch (error) {
      return `An error has occurred by getting a product by ID. Error detail: ${error}`
    }
  }

  updateProduct = async (id, updatedInfo) => {
    try {
      await productModel.findOneAndUpdate({ _id: id }, updatedInfo)
      let updatedProduct = await productModel.findOne({ _id: id })??null
      return updatedProduct
    } catch (error) {
      return `An error has occurred by updating a product. Error detail: ${error}`
    }
  }

  deleteProduct = async (id) => {
    try {
      let deletedProduct = await productModel.findOneAndDelete({ _id: id })
      if (deletedProduct !== null) {
        return deletedProduct
      }
        return `Product with ID: ${id} was not found!`
    } catch (error) {
      return `An error has occurred by deleting a product. Error detail: ${error}`
    }
  }
}