import mongoose from 'mongoose'

const userCollection = 'users'

const userSchema = new mongoose.Schema({
    first_name: {
      type: String, 
      required: true
    },
    last_name: {
      type: String, 
      required: true
    },
    email: {
      type: String, 
      unique: true
    },
    age: {
      type: Number, 
      required: true
    },
    password: {
      type: String, 
      required: true
    },
    role: {
      type: String, 
      default: 'user', 
      enum: ['user', 'admin']
    }
})

const userModel = mongoose.model(userCollection, userSchema)
export default userModel