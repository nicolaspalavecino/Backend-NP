import config from "../config/config.js"
import EmailService from "../services/email.service.js"
import UserService from "../services/user.service.js"
import { generateJWTokenLink } from "../utils.js"

const emailService = new EmailService()
const userService = new UserService()

export const sendRestorePassword = async (req, res) => {
  try {
    let email = req.params.email
    let token = generateJWTokenLink(email)
    let link = `http://localhost:${config.port}/restorePassword?token=${encodeURIComponent(token)}`
    await emailService.sendRestorePassword(email, link)
    res.status(201).send({ status: 'Success', message: 'Mail was sent!'})
  } catch (error) {
    res.status(500).send({ status: 'Error', message: `Restore password Email could not be sent to: ${email}`})
  }
}

export const sendDeletedNotification = async (req, res) => {
  try {
    let idleUsers = await userService.getIdleUsers()
    let result = await emailService.sendDeletedNotification(idleUsers)
    if (typeof(result) == 'object') {
      res.status(201).json({ status: 'Success', message: `All idle accounts were successfully deleted and an notification was sent to the following users: ${result}`})
    } else {
      res.status(404).send(result)
    }
  } catch (error) {
    res.status(500).send({ status: 'Error', message: `The user/s account/s were successfully deleted, but email could not be sent: ${result}`})
  }
}