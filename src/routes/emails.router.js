import { Router } from "express"
import { sendDeleteProduct } from "../controllers/emails.controller.js"

const router = Router()

router.post('/:email/:product', sendDeleteProduct)

export default router