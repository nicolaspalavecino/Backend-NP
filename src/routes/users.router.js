
import { Router } from 'express'
import { authToken, passportCall, authorization } from '../utils.js'

const router = Router()

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.get('/', passportCall('login'), authorization('user'), (req, res) => {
  res.render('profile', { user: req.user})
}) // ERROR: Login GITHUB me redirige acá y como no tiene auth da usuario no encontrado!

router.get('/error', (req, res) => {
  res.render('error')
})

export default router

// router.get('/', (req, res)=>{
//   res.render('profile', {
//     user: req.session.user
//   })
// })