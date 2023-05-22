import userModel from './models/users.models.js'

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
        let result = await userModel.findOne({ email: email})
        return result
      } else if (id) {
        let result = await userModel.findById(id)
        return result
      } 
    } catch (error) {
      `An error has occurred by consulting user database. Error detail: ${error}`
    }
  }
}