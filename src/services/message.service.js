import messageModel from './models/messages.models.js'
import UserService from './user.service.js'

const userService = new UserService()

export default class MessageService {

  sendMessage = async (email, message) => {
    try {
      let msg = {
        user: email,
        message: message
      } 
      await messageModel.create(msg)
      let user = userService.getUser(email)
      return user
    } catch (error) {
      return `An error has ocurred by sending a message. Error detail ${error}`
    }
  }
}