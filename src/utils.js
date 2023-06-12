import { fileURLToPath } from 'url'
import { dirname } from 'path'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import config from './config/config.js'

const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

// Concatenación de FILTROS en links: 
export const readLinkFilter = (filter) => {
  let filterLinkString = ''
  filter.page ? delete filter.page : {}
  let filter_keys = Object.keys(filter)
  let filter_values = Object.values(filter)
  let filter_pairs = filter_keys.concat(filter_values)
  if (filter_pairs != []) {
      for (let i=0; i< (filter_pairs.length/2); i++){
          let string = `${filter_pairs[i]}=${filter_pairs[i+filter_pairs.length/2]}&`
          filterLinkString += string
      }
      return filterLinkString
  }
}

// JWT functions:
export const PRIVATE_KEY = config.privateKey
export const generateJWToken = (user) => {
  return jwt.sign({user}, PRIVATE_KEY, {expiresIn: '24h'})
}

export const authToken = (req, res, next) => {
  let authHeader = req.headers.authorization
  if(!authHeader) {
    return res.status(401).send({error: "User not authenticated or missing token."})
  }
  let token = authHeader.split(' ')[1]
  jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
    if (error) return res.status(403).send({error: "Token invalid, Unauthorized!"})
    req.user = credentials.user
    next()
  })
}

// Create Hash:
export const createHash = password =>  bcrypt.hashSync(password, bcrypt.genSaltSync(10))

// Validate Password:
export const validPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password)
}

// Cookie Extractor:
export const cookieExtractor = req => {
  let token = null
  if (req && req.cookies) { 
    token = req.cookies['jwtCookieToken']
  }
  return token
}

// PassportCall:
export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (err, user, info) {
      if (err) return next(err)
      if (!user) {
        return res.status(401).send({error: info.messages?info.messages:info.toString()})
      }
      req.user = user
      next()
    }) (req, res, next)
  }
}

// Authorization:
export const authorization = (roles) => {
  return async (req, res, next) => {
    if (!req.user) return res.status(401).send('Unauthorized: User not found in JWT')
    if (!roles.includes(req.user.role)) {
      return res.status(403).send('Forbidden: User has not permissions')
    }
    next()
  }
}
