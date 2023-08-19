import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const productCollection = 'products'

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['ciencia', 'fantasia', 'cocina', 'novela periodistica', 'ciencia ficcion', 'novela', 'terror', 'crimen y misterio', 'romance', 'thriller'],
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  code: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  owner: {
    type: String,
    required: true,
    default: 'admin'
  },
  status: {
    type: Boolean,
    required: true,
    default: true
  },
})


productSchema.plugin(mongoosePaginate)
const productModel = mongoose.model(productCollection, productSchema)

export default productModel