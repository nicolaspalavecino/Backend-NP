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

  sendRestorePassword = async (email, link) => {
    try {
      const mailOptions = {
        from: 'Coder TEST' + config.gmailAccount,
        to: email,
        subject: 'Restauración de contraseña - PROYECTO BACKEND NP!',
        html: 
          `<div>
            <p> Toque el siguiente botón para restaurar la contraseña de su cuenta: </p>
            <button><a href='${ link }'> Restaurar contraseña </a></button>
            <p> Si usted no solicitó esta acción, ignore este mensaje.</p>
          </div>`,
      }
      transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
          return {message: 'Error', payload: error}
        }
        return {message: 'Success', payload: info}
      })
    } catch (error) {
      return { message: 'Email could not be sent to: ' + email, detail: error }
    }
  }

  sendDeletedNotification = async (users) => {
    try {
      let mailing = []
      users.forEach((user, index) => {
        const mailOptions = {
          from: 'Coder TEST' + config.gmailAccount,
          to: user.email,
          subject: 'Account DELETED',
          html: 
            `<div>
              <h2> Your account has been deleted </h2>
              <p> Dear user, we are sorry to inform you that your account has been removed from 'Proyecto NP' due to a period of 48hs or more of inactivity.</p>
              <p> We hope to see you again soon! </p>
            </div>`,
        }
        transporter.sendMail(mailOptions, (error, info) => {
          if(error) {
            return {message: 'Error', payload: error}
          }
          return {message: 'Success', payload: info}
        })
        mailing.push(user.email)
      })
      return mailing
    } catch (error) {
      return { message: 'An error ocurred while trying to send the email!', detail: error }
    }
  }

  sendDeleteProduct = async (email, product) => {
    try {
      const mailOptions = {
        from: 'Coder TEST' + config.gmailAccount,
        to: email,
        subject: 'Su producto ha sido eliminado!',
        html: 
          `<div>
            <p> Hola! Nos comunicamos con usted para informarle que su poducto con el nombre ${product} ha sido eliminado </p>
            </br>
            <p> Saludos cordiales, </p>
            <p> La administración <3 </p>
          </div>`,
      }
      transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
          return {message: 'Error', payload: error}
        }
        return {message: 'Success', payload: info}
      })
      return email
    } catch (error) {
      return { message: 'An error ocurred while trying to send the email!', detail: error }
    }
  }

}