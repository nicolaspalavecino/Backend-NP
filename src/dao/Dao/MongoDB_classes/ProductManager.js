import productModel from '../../models/products.models.js'

class ProductManagerDB {

  // GET PRODUCTS:
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
      throw Error(`An error has ocurred by getting the products of BD. Error detail: ${error}`)
    }
  }
  #defineStock = (stock) => {
    let s
    let n_s
    if (stock == "true") {s=1; n_s=null}
    else if (stock == "false") {s=null; n_s=1}
  }

  // CREATE PRODUCT: 
  addProduct = async (newProduct) => {
    try {
      let result = await productModel.create(newProduct)
      return result
    } catch (error) {
      throw Error(`An error has occurred by creating a product. Error detail: ${error}`)
    }
  }

  // GET PRODUCT BY ID:
  getProductById = async (id) => {
    try {
      const productById = await productModel.findOne({ _id: id })??null
      if (productById) {
        console.log(productById)
        return productById
      }
    } catch (error) {
      throw Error(`An error has occurred by getting a product by ID. Error detail: ${error}`)
    }
  }

// UPDATE PRODUCT
  updateProduct = async (id, updatedInfo) => {
    try {
      await productModel.findOneAndUpdate({ _id: id }, updatedInfo)
      let updatedProduct = await productModel.findOne({ _id: id })??null
      return updatedProduct
    } catch (error) {
      throw Error(`An error has occurred by updating a product. Error detail: ${error}`)
    }
  }

// DELETE PRODUCT
  deleteProduct = async (id) => {
    try {
      let deletedProduct = await productModel.findByIdAndRemove(id)
      return deletedProduct
    } catch (error) {
      throw Error(`An error has occurred by deleting a product. Error detail: ${error}`)
    }
  }

}

export default ProductManagerDB