import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import { Server } from 'socket.io'
import routerProducts from './routes/products.router.js'
import routerCarts from './routes/cart.router.js'
import routerViews from './routes/views.router.js'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + "/views/")
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))


app.use('/api/products', routerProducts)
app.use('/api/carts', routerCarts)
app.use('/', routerViews)


//Websockets:
const httpServer = app.listen(PORT, () => {
	console.log('Servidor escuchando por el puerto: ' + PORT);
})

const socketServer = new Server(httpServer)
socketServer.on('connection', socket => {
  console.log('New client online')

  socket.on('message-1', data => { console.log(data) })
  socket.emit('message-2', 'Welcome to the app!')
})