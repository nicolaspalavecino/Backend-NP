import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import { __dirname } from './utils.js'
import { routerProducts, routerCarts, routerViews, routerSessions, routerUsers, routerGithub, routerMessages, routerEmails } from './routes/index.router.js'
import mongoose from 'mongoose'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import initializePassport from './config/passport.config.js'
import Handlebars from 'handlebars'
import { isAdmin } from './helpers/handlebars.helpers.js'
import config from './config/config.js'


const app = express()
const PORT = config.port

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Handlebars Helper for role login:
Handlebars.registerHelper('isAdmin', isAdmin)

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + "/views/")
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))

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

//Routes: 
app.use('/api/products', routerProducts)
app.use('/api/carts', routerCarts)
app.use('/', routerViews)
app.use('/api/sessions', routerSessions)
app.use('/users', routerUsers)
app.use('/github', routerGithub)
app.use('/api/messages', routerMessages)
app.use('/api/emails', routerEmails)

//Conexión con BD:
const connectMongoDB = async() => {
  try {
    await mongoose.connect(config.db)
    console.log('Successfully connected to MongoDB using Mongoose')
  } catch (error) {
    console.error('Could not connect to MongoDB using Mongoose:' + error)
    process.exit()
  }
}
connectMongoDB()

const httpServer = app.listen(PORT, () => {
	console.log('Server listening on port: ' + PORT)
})

const socketServer = new Server(httpServer)
let messages = []

socketServer.on('connection', socket => {
  console.log('New client online')
  // socket.emit('products', { productsList } )
  socket.on('message', data => {
    messages.push(data)
    socketServer.emit('messageLogs', messages)
  })
})
