import userModel from './models/users.models.js'
import { periodTime, timeNow } from '../utils.js'

export default class UserService {

  createUser = async (user) => {
    try {
      let result = await userModel.create(user)
      return result
    } catch (error) {
      `An error has occurred by creating a new user. Error detail: ${error}`
    }
  }

  getUser = async (email = null, id = null) => {
    try {
      if (email) {
        let result = await userModel.findOne({ email: email })
        return result
      } else if (id) {
        let result = await userModel.findById(id)
        return result
      } 
    } catch (error) {
      `An error has occurred by consulting user database. Error detail: ${error}`
    }
  }

  getAllUsers = async () => {
    try {
      let result = await userModel.find().lean()
      return result
    } catch (error) {
      `An error has occurred by consulting user database. Error detail: ${error}`
    }
  }

  getIdleUsers = async () => {
    try {
      console.log('GET IDLE USERS - SERVICE')
      let users = await userModel.find({'role':{$not:{$eq: 'admin'}}}, {'_id': 0, 'email': 1, 'last_connection': 1, 'cartId': 1})
      let idleUsers = []
      console.log(users)
      let nowTime = timeNow()
      console.log(nowTime)
      users.forEach((user) => {
        console.log('DENTRO DEL FOREACH')
        let difference = periodTime(user.last_connection, nowTime)
        console.log(difference)
        if (difference >= 48) {
          idleUsers.push(user)
        }
      })
      console.log('HOLA')
      console.log(idleUsers)
      return idleUsers
    } catch (error) {
      `An error has occurred by consulting user database. Error detail: ${error}`
    }
  }

  deleteIdleUsers = async (users) => {
    try {
      users.forEach(async (user) => {
        let deletedUser = await userModel.findOneAndRemove({ email: user.email })
        console.log(deletedUser)
        await userModel.insertMany(deletedUser) // AGREGA EL USUARIO ELIMINADO! BORRAR LÍNEA
      })
      return
    } catch (error) {
      `An error has occurred by consulting user database. Error detail: ${error}`
    }
  }

  upgradeUser = async (email) => {
    try {
      await userModel.findOneAndUpdate({ email: email }, { role: 'premium' })
      let updatedUser = await userModel.findOne({ email: email })
      return updatedUser
    } catch (error) {
      return `An error has ocurred by consulting user database. Error detail: ${error}`
    }
  }

  updatePassword = async (email, password) => {
    try {
      await userModel.findOneAndUpdate({ email: email }, { password: password })
      let updatedUser = await userModel.findOne({ email: email })
      return updatedUser
    } catch (error) {
      return `An error has ocurred by consulting user database. Error detail: ${error}`
    }
  }

  uploadDocuments = async (files, email) => {
    try {
      await userModel.findOneAndUpdate({ email: email }, { 
        documents: files,
        status: true
      })
      let updatedUser = await userModel.findOne({ email: email})
      return updatedUser
    } catch (error) {
      return `An error has ocurred by consulting user database. Error detail: ${error}`
    }
  }

  updateLastConection = async (email) => {
    try {
      await userModel.findOneAndUpdate({ email: email }, { last_connection: timeNow() })
      let updatedUser = await userModel.findOnE({ email: email })
      return updatedUser
    } catch (error) {
      return `An error has ocurred by consulting user database. Error detail: ${error}`
    }
  }
}