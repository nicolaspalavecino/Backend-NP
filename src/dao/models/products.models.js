import mongoose from 'mongoose'

const productCollection = 'products'

const stringTypeSchemaUniqueRequired = {
  type: String,
  unique: true,
  require: true
}

const stringTypeSchemaRequired = {
  type: String,
  require: true
}

const numberTypeSchemaUniqueRequired = {
  type: Number,
  unique: true,
  require: true
}

const numberTypeSchemaRequired = {
  type: Number,
  require: true
}

const booleanTypeSchemaRequired = {
  type: Boolean,
  require: true
}

const productSchema = new mongoose.Schema({
  title: stringTypeSchemaRequired,
  category: stringTypeSchemaRequired,
  description: stringTypeSchemaRequired,
  price: numberTypeSchemaRequired,
  thumbnail: stringTypeSchemaRequired,
  code: numberTypeSchemaUniqueRequired,
  stock: numberTypeSchemaRequired,
  status: booleanTypeSchemaRequired
})

const productModel = mongoose.model(productCollection, productSchema)