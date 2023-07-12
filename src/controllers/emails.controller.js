import config from "../config/config.js"
import EmailService from "../services/email.service.js"
import { generateJWTokenLink } from "../utils.js"

const emailService = new EmailService()

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