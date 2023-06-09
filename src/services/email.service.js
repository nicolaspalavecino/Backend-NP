import nodemailer from 'nodemailer'
import config from '../config/config.js'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: config.gmailAccount,
    pass: config.gmailAppPassword
  }
})

transporter.verify(function (error, success) {
  if (error) {
    console.log(error)
  } else {
    console.log('Server is ready to take our messages')
  }
})

export default class EmailService {

  sendEmail = async (data) => {
    try {
      const mailOptions = {
        from: 'Coder TEST' + config.gmailAccount,
        to: data.purchaser,
        subject: 'Confirmación de pago - PROYECTO BACKEND NP!',
        html: 
          `<div>
            <h1> Ticket de compra: #${data.code} </h1>
            <h2> Muchas gracias por su compra! </h2>
            <p>TOTAL: $ ${data.amount}</p>
          </div>`,
        attachments: []
      }
      transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
          return {message: 'Error', payload: error}
        }
        return {message: 'Success', payload: info}
      })
    } catch (error) {
      return { message: 'Email could not be sent to: ' + data.purchaser, detail: error}
    }
  }
}