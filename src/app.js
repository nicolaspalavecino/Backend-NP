import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import { __dirname } from './utils.js'
import { routerProducts, routerCarts, routerViews, routerSessions, routerUsers, routerMessages, routerMocks, routerEmails } from './routes/index.router.js'
import mongoose from 'mongoose'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import initializePassport from './config/passport.config.js'
import Handlebars from 'handlebars'
import { hasProfilePic, isAdmin, isBasic, isClient, isCreator, isIdle, isOwner, isPremium } from './helpers/handlebars.helpers.js'
import config from './config/config.js'
import { addLogger } from './config/logger.js'
import MongoSingleton from './config/mongodb-singleton.js'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUIExpress from 'swagger-ui-express'
import cors from 'cors'


const app = express()
const PORT = config.port

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Handlebars Helper for user roles:
Handlebars.registerHelper('isCreator', isCreator)
Handlebars.registerHelper('isClient', isClient)
Handlebars.registerHelper('isAdmin', isAdmin)
Handlebars.registerHelper('isPremium', isPremium)
Handlebars.registerHelper('isBasic', isBasic)
Handlebars.registerHelper('isOwner', isOwner)
Handlebars.registerHelper('isIdle', isIdle)
Handlebars.registerHelper('hasProfilePic', hasProfilePic)

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + "/views/")
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))

// Swagger Configuration:
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation - Proyecto Backend NP',
      description: 'API Documentation for Proyecto Backend NP - Swagger'
    }
  },
  apis: [`./src/docs/**/*.yaml`]
}

const specs = swaggerJSDoc(swaggerOptions)
app.use('/apidocs', swaggerUIExpress.serve, swaggerUIExpress.setup(specs))

//Cors:
app.use(cors())

//Cookies:
app.use(cookieParser('ProyectoBackendNPSecreto'))

//Sessions:
app.use(session({
  secret: 'secretNP',
  resave: true,
  saveUninitialized: true
}))

//Passport:
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//Loggers:
app.use(addLogger)
app.get('/loggerTest', (req, res) => {
  req.logger.fatal('Testing FATAL level log')
  req.logger.error('Testing ERROR level log')
  req.logger.warning('Testing WARNING level log')
  req.logger.info('Testing INFO level log')
  req.logger.http('Testing HTTP level log')
  req.logger.debug('Testing DEBUG level log')
  res.send('Testing for /logger endpoint. Check console!')
})

//Routes: 
app.use('/api/products', routerProducts)
app.use('/api/carts', routerCarts)
app.use('/api/sessions', routerSessions)
app.use('/api/users', routerUsers)
app.use('/api/messages', routerMessages)
app.use('/api/emails', routerEmails)
app.use('/mockingproducts', routerMocks)
app.use('/', routerViews)


const httpServer = app.listen(PORT, () => {
	console.log('Server listening on port: ' + PORT)
})

// Conexión a BD según entorno:
const mongoInstance = async () => {
  try {
    await MongoSingleton.getInstance()
  } catch (error) {
    console.error(error)
  }
}
mongoInstance()

// Socket
const socketServer = new Server(httpServer)
let messages = []

socketServer.on('connection', socket => {
  console.log('New client online')
  socket.on('message', data => {
    messages.push(data)
    socketServer.emit('messageLogs', messages)
  })
})
