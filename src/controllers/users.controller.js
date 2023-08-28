import UserService from "../services/user.service.js"
import jwt from 'jsonwebtoken'
import { PRIVATE_KEY, createHash, validPassword} from "../utils.js"
import CustomError from "../services/errors/customError.js"
import { createPasswordError, expiredLinkError } from "../services/errors/messages/password-error.message.js"
import EErrors from "../services/errors/error-enum.js"

const userService = new UserService()

export const getAndDeleteIdleUsers = async (req, res, next) => {
  try {
    let idleUsers = await userService.getIdleUsers()
    if (idleUsers.length < 1) {
      res.status(201).json({ status: 'Success', message: 'No user has been inactive for two or more days.'})
    } else {
      await userService.deleteIdleUsers(idleUsers)
      next()
    }
  } catch (error) {
    res.status(500).json({ status: 'Error', message: error.message, detail: error.cause })
  }
}

export const deleteUser = async (req, res) => {
  try {
    let result = await userService.deleteUser(req.params.email)
    res.status(201).json({ status: 'Success', message: `User with email: ${result.email} was successfully deleted`})
  } catch (error) {
    res.status(500).json({ status: 'Error', message: 'User could not be deleted from de BD', detail: error})
  }
}

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

export const updateRole = async (req, res) => {
  try {
    let result = await userService.updateRole(req.body.email, req.body.role)
    if (typeof(result) == 'object') {
      res.status(201).json({ status: 'Success', message: `User role was successfully updated! Now ${result.email} is ${result.role}`})
    } else {
      res.status(400).json({ status: 'Error', message: result })
    }
  } catch (error) {
    res.status(500).json({ status: 'Error', message: 'Documents could not be uploaded', detail: error})
  }
}

export const uploadProfilePic = async (req, res) => {
  try {
    let email = req.params.email
    let document = { name: req.file.originalname, reference: req.file.path }
    if (document) {
      let upload = await userService.uploadProfilePic(email, document)
      res.status(201).json({ status: 'Success', message: 'Profile pic was successfully uploaded!', payload: upload })
    } else {
      res.status(400).json({ status: 'Error', message: 'No profile pic uploaded!'})
    }
} catch (error) {
  res.status(500).json({ status: 'Error', message: 'Documents could not be uploaded', detail: error})
}
}