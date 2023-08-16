import UserService from "../services/user.service.js"
import userDTO from "../services/DTO/users.dto.js"
import CustomError from "../services/errors/customError.js"
import EErrors from "../services/errors/error-enum.js"
import { generateJWToken, validPassword } from "../utils.js"
import passport from "passport"

let userService = new UserService()

export const registerUser = (req, res, next) => {
  passport.authenticate('register', (error, result, info) => {
    try {
      if (result) {
        res.status(201).json({ status: 'Success', message: 'New user successfully creater!'})
      } else if (info) {
        res.status(400).json({ status: 'Error', message: info.message })
      } else {
        res.status(500).json({ status: 'Error', detail: error })
      }
    } catch (error) {
      res.staus(500).json({ status: 'Error', message: 'An error ocurred while registering user', detail: error})
    }
  })(req, res, next)
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    let user = await userService.getUser(email)
    if (!user) {
      CustomError.createError({
        name: 'User login error',
        cause: 'User does not exist',
        message: `User does not exist with username '${email}'. Please verify your email or register first if you don't have an account on this site.`,
        code: EErrors.NOT_FOUND
      })
    }
    if (!validPassword(user, password)) {
      CustomError.createError({
        name: 'User login error',
        cause: 'Invalid credentials',
        message: `Username ${email} and password do not match! Please, try again.`,
        code: EErrors.INVALID_CREDENTIALS
      })
    }
    await userService.updateLastConection(email)
    const tokenUser = new userDTO(user)
    const access_token = generateJWToken(tokenUser)
    res.cookie('jwtCookieToken', access_token, { maxAge: 1800000, httpOnly: false }) // 30 minutos
    res.status(201).send({ status: 'Success', message: 'Login successful!', jwt: access_token })
  } catch (error) {
    req.logger.error(error.message)
    res.status(400).json({ status: 'Error', message: error.message })
  }
}

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie('jwtCookieToken').status(200).send({ status: 'Success', message: 'Session was successfully ended'})
  } catch (error) {
    res.status(500).json({ status: 'Error', message: error})
  }
}