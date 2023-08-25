
import { Router } from 'express'
import { authorization, passportCall, uploader } from '../utils.js'
import { upgradeUser, restorePassword, uploadDocuments, getAndDeleteIdleUsers, updateRole, deleteUser, uploadProfilePic } from '../controllers/users.controller.js'
import { sendDeletedNotification, sendRestorePassword } from '../controllers/emails.controller.js'

const router = Router()

router.delete('/', passportCall('login'), authorization(['admin']), getAndDeleteIdleUsers, sendDeletedNotification)
router.delete('/:email', passportCall('login'), authorization(['admin']), deleteUser)
router.post('/:email/documents', passportCall('login'), authorization(['user']), uploader.any(), uploadDocuments)
router.post('/:email/profilepic', passportCall('login'), authorization(['user', 'premium', 'admin']), uploader.single('profile-pic'), uploadProfilePic)
router.post('/premium/:email', passportCall('login'), authorization(['user']), upgradeUser)
router.post('/restore/:email', passportCall('login'), authorization(['user', 'premium', 'admin']), sendRestorePassword)
router.put('/restore/password', passportCall('login'), authorization(['user', 'premium', 'admin']), restorePassword)
router.put('/update', passportCall('login'), authorization(['admin']), updateRole)

export default router
