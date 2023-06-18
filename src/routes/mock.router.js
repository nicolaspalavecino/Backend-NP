import { Router } from "express"
import { generateProducts } from "../services/mock/products.mock.js"

const router = new Router()

router.get('/', (req, res) => {
  const mockProducts = generateProducts()
  res.status(201).json( { mockProducts })
})

export default router