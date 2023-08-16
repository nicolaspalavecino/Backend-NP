import passport from 'passport'
import passportLocal from 'passport-local'
import GitHubStrategy from 'passport-github2'
import jwtStrategy from 'passport-jwt'
import UserService from '../services/user.service.js'
import CartService from '../services/cart.service.js'
import { createHash, validPassword, PRIVATE_KEY, cookieExtractor } from '../utils.js'
import config from './config.js'

const localStrategy = passportLocal.Strategy
const JWTStrategy = jwtStrategy.Strategy
const ExtractJWT = jwtStrategy.ExtractJwt

let userService = new UserService()
let cartService = new CartService()

const initializePassport = () => {
  
  //REGISTER STRATEGY: 
  passport.use('register', new localStrategy (
    { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
      const { first_name, last_name, email, age } = req.body
      try {
        if (!first_name || !last_name || !email || !age || !password) {
          req.logger.warning('Please, complete all the fields!')
          console.log('Complete all fields!')
          return done(null, false, { message: 'Please, complete all the fields!'})
        } else {
          let exists = await userService.getUser(email)
          if (exists) {
            req.logger.warning('An user with this email already exists')
            return done(null, false, { message: 'An user with this email already exists!'})
          }
          let newCart = await cartService.addCart()
          let newUser = {
            first_name,
            last_name,
            email,
            age,
            cartId: newCart.id,
            password: createHash(password)
          }
          let result = await userService.createUser(newUser)
          return done(null, result)
        }
      } catch (error) {
        return done(error, false, { message: 'Error connecting to database'})
      }
    }
  ))
  
  //LOGIN STRATEGY using jwt:
  passport.use('login', new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
      secretOrKey: config.privateKey
    }, 
    async (jwt_payload, done) => {
      try {
        return done(null, jwt_payload.user)
      } catch (error) {
        return done(`An error occured. Check for ${error}`)
      }
    }
  ))

  //LOGIN WITH GITHUB STRATEGY:
  passport.use('github', new GitHubStrategy(
    {
      clientID: config.githubClientId,
      clientSecret: config.githubClientSecret,
      callbackUrl: config.githubCallbackUrl
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log('Profile obtenido del usuario: ' + profile)
      try {
        const user = await userService.getUser(profile._json.email)
        console.log('User was found to login with GITHUB (passport.config.js):')
        console.log(user)
        if (!user) {
          console.warn('User does not exist with username: ' + profile._json.email)
          let newUser = {
            first_name: profile._json.name,
            last_name: '-',
            age: 18, 
            email: profile._json.email,
            password: '-',
            loggedBy: 'GitHub'
          }
          const result = await userService.createUser(newUser)
          return done(null, result)
        } else {
          console.log('user encontrado con GITHUB')
          console.log(user)
          return done(null, user)
        }
      } catch (error) {
        return done(null, error)
      }
    }
  ))

  //SERIALIZE AND DESERIALIZE FUNCTIONS:
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await userService.getUser(id)
      done(null, user)
    } catch (error) {
      console.error('An error ocurred while deserealizing the user:' + error)
    }
  })
}

export default initializePassport
