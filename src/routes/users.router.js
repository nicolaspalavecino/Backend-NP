
import { Router } from 'express'
import { authToken, passportCall, authorization } from '../utils.js'
import { upgradeUser, restorePassword} from '../controllers/users.controller.js'
import { sendRestorePassword } from '../controllers/emails.controller.js'

const router = Router()

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.get('/', (req, res) => {
  res.render('profile', { user: req.session.user})
})

router.post('/premium/:email', upgradeUser)

router.post('/restore/:email', sendRestorePassword)

router.put('/restore/password', restorePassword)

router.get('/error', (req, res) => {
  res.render('error')
})

export default router
