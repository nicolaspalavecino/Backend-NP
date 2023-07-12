import UserService from "../services/user.service.js"
import jwt from 'jsonwebtoken'
import { PRIVATE_KEY, createHash, validPassword} from "../utils.js"

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
      return res.status(401).send({ status: 'Error', message: 'Expired link. Please, generate a new restore password link!'})
    }
    try {
      let decoded = jwt.verify(token, PRIVATE_KEY)
      let emailToken = decoded.email
      let { newPassword, repeatPassword } = req.body
      if ( newPassword !== repeatPassword ) {
        res.status(501).send({ status: 'Error', message: 'Password fields must match! Please, try again'})
      }
      let user = await userService.getUser(emailToken)
      if(validPassword(user, newPassword)) {
        res.status(502).send({ status: 'Error', message: 'Password must must be different from the current one! Please, try another one!'})
      }
      await userService.updatePassword(emailToken, createHash(newPassword))
      res.status(201).send({ status: 'Success', message: 'Password was successfully restored!'})
    } catch (error) {
      res.status(401).send({ status: 'Error', message: 'Invalid authentication token!', detail: error})
    }
  } catch (error) {
    res.status(500).send({ status: 'Error', message: 'Password could not be updated', detail: error})
  }
}