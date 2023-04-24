import mongoose, { mongo } from 'mongoose'

const cartCollection = 'carts'

const cartSchema = new mongoose.Schema({
    // code: {
    //     type: Number,
    //     required: true,
    //     unique: true
    // },
    products: {
        type: Array,
        required: true
    }
})

const cartModel = mongoose.model(cartCollection, cartSchema)
export default cartModel