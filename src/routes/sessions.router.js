import { Router } from "express"
import { authorization, createHash, generateJWToken, validPassword } from "../utils.js"
import passport from "passport"
import cookieParser from "cookie-parser"
import UserService from "../services/user.service.js"
import userDTO from "../services/DTO/users.dto.js"
import CustomError from "../services/errors/customError.js"
import EErrors from "../services/errors/error-enum.js"

const router = Router()
let userService = new UserService()

//REGISTER:
router.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/fail-register' }), 
  async (req, res) => {
    req.logger.info('New user successfylly created')
    res.status(201).send({status: "success", msg: 'User created successfully created'})
  }
)

// LOGIN using jwt:
router.post('/login', async (req, res)=>{
  const {email, password} = req.body
  try {
    const user = await userService.getUser(email)
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
    const tokenUser = new userDTO(user)
    const access_token = generateJWToken(tokenUser)
    res.cookie('jwtCookieToken', access_token, { maxAge: 600000, httpOnly: false }) // 10 minutos
    res.send({message: 'Login successful!', jwt: access_token })
  } catch (error) {
    req.logger.error(error.message)
    res.status(400).json({ status: 'Error', message: error.message })
  }
})

// LOGIN WITH GITHUB:
router.get('/github', passport.authenticate('github', { scope:['user:email']}), async (req, res) => {})

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/github/error'}), 
  async (req, res) => {
    const user = req.user
    req.session.user = {
      name : `${user.first_name}`,
      email: user.email,
      age: user.age,
      role: user.role
    }
    req.session.admin = true
    res.redirect('/github')
  }
)

router.get('/fail-register', (req, res) => {
  req.logger.error('Failed to process register')
  res.status(401).send({ status: 'Error', message: 'Failed to process register!' })
})

router.get('/fail-login', (req, res) => {
  req.logger.error('Failed to process login')
  res.status(401).send({ error: "Failed to process login!" })
})

// LOGOUT:
router.get('/logout', (req, res) => {
  res.clearCookie('jwtCookieToken').status(200).send('Session was successfully ended')
})

export default router
