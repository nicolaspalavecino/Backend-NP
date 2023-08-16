import mongoose from 'mongoose'

const ticketCollection = 'tickets'

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    required: true
  },
  purchase_datetime: {
    type: String,
  }, 
  amount: {
    type: Number,
    required: true
  },
  purchaser: {
    type: String,
    required: true
  },
  products: {
    type:[
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'products'
        },
        quantity: {type: Number}
      }
    ]
  }
})

ticketSchema.pre('findOne', function() {
  this.populate('products.product')
})

const ticketModel = mongoose.model(ticketCollection, ticketSchema)
export default ticketModel

// Id (autogenerado por mongo)
// code: String debe autogenerarse y ser único
// purchase_datetime: Deberá guardar la fecha y hora exacta en la cual se formalizó la compra (básicamente es un created_at)
// amount: Number, total de la compra.
// purchaser: String, contendrá el correo del usuario asociado al carrito.
