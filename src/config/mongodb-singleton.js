import mongoose from 'mongoose'
import config from './config.js'

export default class MongoSingleton {
  static #instance
  
  constructor() {
    this.#connectMongoDB()
  }

  static getInstance() {
    if (this.#instance) {
      console.log('Ya se ha abierto una conexión a MongoDB')
    } else {
      this.#instance = new MongoSingleton()
    }
    return this.#instance
  }

  #connectMongoDB = async () => {
    try {
      await mongoose.connect(config.db)
      console.log('Successfully connected to MongoDB using Mongoose')
    } catch (error) {
      console.error('Could not connect to MongoDB using Mongoose: ' + error)
      process.exit()
    }
  }
}