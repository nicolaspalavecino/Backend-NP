import passport from 'passport'
import passportLocal from 'passport-local'
import GitHubStrategy from 'passport-github2'
import jwtStrategy from 'passport-jwt'
import userModel from '../services/models/users.models.js'
import { createHash, validPassword, PRIVATE_KEY, cookieExtractor } from '../utils.js'

const localStrategy = passportLocal.Strategy
const JWTStrategy = jwtStrategy.Strategy
const ExtractJWT = jwtStrategy.ExtractJwt

const initializePassport = () => {
  
  // REGISTER STRATEGY: 
  passport.use('register', new localStrategy (
    { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
      const { first_name, last_name, email, age } = req.body
      try {
        if (!first_name || !last_name || !email || !age || !password) {
          console.log('Please, complete all the fields!')
          return done(null, false)
        } else {
          let exists = await userModel.findOne({email})
          if (exists) {
            console.log('An user with this email already exists')
            return done(null, false)
          }
          let user = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password)
          }
          let result = await userModel.create(user)
          return done(null, result)
        }
      } catch (error) {
        return done(`An error occured while creating a new user. Check for ${error}`)
      }
    }
  ))
  
  //LOGIN STRATEGY using jwt:
  passport.use('login', new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
      secretOrKey: PRIVATE_KEY
    }, 
    async (jwt_payload, done) => {
      try {
        console.log(jwt_payload)
        return done(null, jwt_payload.user)
      } catch (error) {
        return done(`An error occured. Check for ${error}`)
      }
    }
  ))

  //LOGIN WITH GITHUB STRATEGY:
  passport.use('github', new GitHubStrategy(
    {
      clientID: 'Iv1.9d757b46824fdf62',
      clientSecret: '36d50ed28b9f42c395ec0519cbc526aaa2d425b0',
      callbackUrl: 'http://localhost:8080/api/sessions/githubcallback'
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log('Profile obtenido del usuario:')
      console.log(profile)
      try {
        const user = await userModel.findOne({ email: profile._json.email })
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
          const result = await userModel.create(newUser)
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
      let user = await userModel.findById(id)
      done(null, user)
    } catch (error) {
      console.error('An error ocurred while deserealizing the user:' + error)
    }
  })
}

export default initializePassport

  // LOGIN STRATEGY:
  // passport.use('login', new localStrategy(
  //   { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
  //     try {
  //       let user = await userModel.findOne({ email: username })
  //       console.log(user)
  //       if (!user) {
  //         console.warn('User does not exist with user name: ' + username)
  //         return done(null, false)
  //       }
  //       if (!validPassword(user, password)) {
  //         console.warn('Invalid credentials for user: ' + username)
  //         return done(null, false)
  //       }
  //       return done(null, user)
  //     } catch (error) {
  //       return done(error)
  //     }
  //   }
  // ))