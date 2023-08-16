
import { Router } from 'express'
import { uploader } from '../utils.js'
import { upgradeUser, restorePassword, uploadDocuments, getAndDeleteIdleUsers, updateRole, deleteUser, uploadProfilePic } from '../controllers/users.controller.js'
import { sendDeletedNotification, sendRestorePassword } from '../controllers/emails.controller.js'

const router = Router()

router.delete('/', getAndDeleteIdleUsers, sendDeletedNotification)
router.delete('/:email', deleteUser)
router.post('/:email/documents', uploader.any(), uploadDocuments)
router.post('/:email/profilepic', uploader.single('profile-pic'), uploadProfilePic)
router.post('/premium/:email', upgradeUser)
router.post('/restore/:email', sendRestorePassword)
router.put('/restore/password', restorePassword)
router.put('/update', updateRole)

export default router
