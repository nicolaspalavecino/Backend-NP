import UserService from "../services/user.service.js"
import jwt from 'jsonwebtoken'
import { PRIVATE_KEY, createHash, validPassword} from "../utils.js"
import CustomError from "../services/errors/customError.js"
import { createPasswordError, expiredLinkError } from "../services/errors/messages/password-error.message.js"
import EErrors from "../services/errors/error-enum.js"

const userService = new UserService()

export const upgradeUser = async (req, res) => {
  try {
    let email = req.params.email
    let update = await userService.upgradeUser(email)
    res.status(201).send(update)
  } catch (error) {
    res.send({ status: 'Error', message: 'User could not be upgrated!', detail: error})
  }
}

export const restorePassword = async (req, res) => {
  try {
    let token = req.query.token
    console.log(token)
    if ( !token ) {
      CustomError.createError({
        name: 'Expired link error',
        cause: expiredLinkError(),
        message: 'The link you are using is already expired. Please, try again and generate a new link',
        code: EErrors.INVALID_CREDENTIALS
      })
    }
    try {
      let decoded = jwt.verify(token, PRIVATE_KEY)
      let emailToken = decoded.email
      let { newPassword, repeatPassword } = req.body
      if ( newPassword === '') {
        CustomError.createError({
          name: 'Password change error',
          cause: createPasswordError(),
          message: 'You must complete the password field!',
          code: EErrors.INVALID_TYPE_ERROR
        })
      }
      if ( newPassword !== repeatPassword ) {
        CustomError.createError({
          name: 'Password change error',
          cause: createPasswordError(),
          message: 'Password fields must match! Please, try again',
          code: EErrors.INVALID_CREDENTIALS
        })
      }
      let user = await userService.getUser(emailToken)
      if(validPassword(user, newPassword)) {
        CustomError.createError({
          name: 'Password change error',
          cause: createPasswordError(),
          message: 'Password must must be different from the current one! Please, try another one!',
          code: EErrors.INVALID_CREDENTIALS
        })
      }
      await userService.updatePassword(emailToken, createHash(newPassword))
      res.status(201).json({ status: 'Success', message: 'Password was successfully restored!'})
    } catch (error) {
      res.status(400).json({ status: 'Error', message: error.message, detail: error.cause })
    }
  } catch (error) {
    res.status(500).json({ status: 'Error', message: error.message, detail: error.cause })
  }
}

export const uploadDocuments = async (req, res) => {
  try {
      let email = req.params.email
      let files = []
      req.files.forEach( file => {
        let doc = { name: file.originalname, reference: file.path }
        files.push(doc)
      })
    let upload = await userService.uploadDocuments(files, email)
    res.status(201).json({ status: 'Success', message: 'Documents were successfully uploaded!', payload: upload})
  } catch (error) {
    res.status(500).json({ status: 'Error', message: 'Documents could not be uploaded', detail: error})
  }
}