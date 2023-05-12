import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const productCollection = 'products'

const stringTypeSchemaUniqueRequired = {
  type: String,
  unique: true,
  required: true
}

const stringTypeSchemaRequired = {
  type: String,
  required: true
}

const numberTypeSchemaUniqueRequired = {
  type: Number,
  unique: true,
  required: true
}

const numberTypeSchemaRequired = {
  type: Number,
  required: true
}

const booleanTypeSchemaRequired = {
  type: Boolean,
  required: true
}

const productSchema = new mongoose.Schema({
  title: stringTypeSchemaRequired,
  category: {
    type: String,
    required: true,
    enum: ['ciencia', 'fantasia', 'cocina', 'novela periodistica', 'ciencia ficcion', 'novela', 'terror']
  },
  description: stringTypeSchemaRequired,
  price: numberTypeSchemaRequired,
  thumbnail: stringTypeSchemaRequired,
  code: numberTypeSchemaUniqueRequired,
  stock: numberTypeSchemaRequired,
  status: booleanTypeSchemaRequired,
})

productSchema.plugin(mongoosePaginate)
const productModel = mongoose.model(productCollection, productSchema)

export default productModel