import { Router } from "express"
import { generateMockProducts } from "../controllers/mock.controller.js"

const router = new Router()

router.get('/', generateMockProducts)

export default router