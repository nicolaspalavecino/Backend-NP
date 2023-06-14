import { Router } from "express"
import { sendEmail, sendEmailWithAttachments } from '../controllers/emails.controller.js'

const router = new Router()

router.get('/', sendEmail)
router.get('/attachments', sendEmailWithAttachments)

export default router