
import { Router } from 'express'
import { authToken, passportCall, authorization, uploader } from '../utils.js'
import { upgradeUser, restorePassword, uploadDocuments, getAndDeleteIdleUsers } from '../controllers/users.controller.js'
import { sendDeletedNotification, sendRestorePassword } from '../controllers/emails.controller.js'

const router = Router()

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.delete('/', getAndDeleteIdleUsers, sendDeletedNotification)

// router.get('/', (req, res) => {
//   res.render('profile', { user: req.session.user})
// })

router.post('/:email/documents', uploader.any(), uploadDocuments)

router.post('/premium/:email', upgradeUser)

router.post('/restore/:email', sendRestorePassword)

router.put('/restore/password', restorePassword)

router.get('/error', (req, res) => {
  res.render('error')
})

export default router
