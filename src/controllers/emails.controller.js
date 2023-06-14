import nodemailer from 'nodemailer'
import config from '../config/config.js'
import { __dirname } from '../utils.js'

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

const mailOptions = {
  from: 'Coder TEST' + config.gmailAccount,
  to: config.gmailAccount,
  subject: 'Correo de Prueba!',
  html: 
    `<div>
      <h1> PRUEBA DE NODEMAILER! </h1>
    </div>`,
  attachments: []
}

const mailOptionsWithAttachments = {
  from: 'Coder TEST' + config.gmailAccount,
  to: config.gmailAccount,
  subject: 'Correo de Prueba!',
  html: 
  `<div>
    <h1> PRUEBA DE NODEMAILER! </h1>
    <p>PRUEBA 2 con ATTACHMENTS</p>
    <img src="cid:sadcat"/>
  </div>`,
  attachments: [
    {
      filename: 'Sad cat',
      path: __dirname + "/public/images/sadcat.png",
      cid: 'sadcat'
    }
  ]
}

export const sendEmail = (req, res) => {
  try {
    let result = transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error)
        res.status(400).send({ message: 'Error', payload: error })
      }
      console.log('Message sent: ', info.messageId)
      res.send({ message: 'Success', payload: info })
    })
    console.log(result)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: error, message: 'Email could not be sent to: ' + config.gmailAccount})
  }
}

export const sendEmailWithAttachments = (req, res) => {
  try {
    let result = transporter.sendMail(mailOptionsWithAttachments, (error, info) => {
      if (error) {
        console.log(error)
        res.status(400).send({ message: 'Error', payload: error })
      }
      console.log('Message sent: ', info.messageId)
      res.send({ message: 'Success', payload: info })
    })
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: error, message: 'Email could not be sent to: ' + config.gmailAccount})
  }
}
