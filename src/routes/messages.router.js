import { Router } from "express"
import { sendMessage } from "../controllers/messages.controller.js"

const router = new Router()

router.post('/:email/:message', sendMessage)

export default router