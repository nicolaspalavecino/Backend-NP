import { Router } from "express"
import { getProducts, addProduct, getProductById, updateProduct, deleteProduct } from "../controllers/products.controller.js"
import { authorization, passportCall } from "../utils.js"

const router = Router()

router.get('/', passportCall('login'), authorization(['user', 'premium', 'admin']), getProducts)
router.post('/', passportCall('login'), authorization(['premium', 'admin']), addProduct)
router.get('/:pid', getProductById)
router.put('/:pid', passportCall('login'), authorization(['premium', 'admin']), updateProduct)
router.delete('/:pid', deleteProduct)

export default router