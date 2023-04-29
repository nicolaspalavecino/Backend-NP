import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import { __dirname, productsList } from './utils.js'
import { routerProducts, routerCarts, routerViews, routerSessions, routerUsers } from './routes/index.router.js'
import mongoose from 'mongoose'
import session from 'express-session'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + "/views/")
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))

//Sessions:
app.use(session({
  secret: 'secretNP',
  resave: true,
  saveUninitialized: true
}))

app.use('/api/products', routerProducts)
app.use('/api/carts', routerCarts)
app.use('/', routerViews)
app.use('/api/sessions', routerSessions)
app.use('/users', routerUsers)

//Conexión con BD:
const DB = 'mongodb+srv://nmpalav:palavecino@cluster0.eg4rgxx.mongodb.net/ecommerce'
const connectMongoDB = async() => {
  try {
    await mongoose.connect(DB)
    console.log('Successfully connected to MongoDB using Mongoose')
  } catch (error) {
    console.error('Could not connect to MongoDB using Mongoose:' + error)
    process.exit()
  }
}
connectMongoDB()

const httpServer = app.listen(PORT, () => {
	console.log('Server listening on port: ' + PORT);
})

const socketServer = new Server(httpServer)
socketServer.on('connection', socket => {
  console.log('New client online')
  socket.emit('products', { productsList } )
})