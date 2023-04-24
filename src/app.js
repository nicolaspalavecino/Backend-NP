import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import { __dirname, productsList } from './utils.js'
import { routerProducts, routerCarts, routerViews } from './routes/index.router.js'
import mongoose from 'mongoose'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + "/views/")
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))

app.use('/api/products', routerProducts)
app.use('/api/carts', routerCarts)
app.use('/', routerViews)

//Conexión con BD:
const DB = 'mongodb+srv://nmpalav:palavecino@cluster0.eg4rgxx.mongodb.net/ecommerce'
const connectMongoDB = async() => {
  try {
    await mongoose.connect(DB)
    console.log('Conectado con éxito a MongoDB usando Mongoose')
  } catch (error) {
    console.error('No se pudo conectar a la DB usando Mongoose:' + error)
    process.exit()
  }
}
connectMongoDB()

const httpServer = app.listen(PORT, () => {
	console.log('Servidor escuchando por el puerto: ' + PORT);
})

const socketServer = new Server(httpServer)
socketServer.on('connection', socket => {
  console.log('New client online')
  socket.emit('products', { productsList } )
})