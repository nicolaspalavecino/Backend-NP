import e from 'express'
import userModel from './models/users.models.js'
import { timeNow } from '../utils.js'

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
      await userModel.findOneAndUpdate({ email: email }, { last_conection: timeNow() })
      let updatedUser = await userModel.findOnE({ email: email })
      return updatedUser
    } catch (error) {
      return `An error has ocurred by consulting user database. Error detail: ${error}`
    }
  }
}