import { Router } from "express"
import { addCart, getCartById, addProductToCart, updateProductQuantity, deleteProductFromCart, deleteAllFromCart, purchaseCart} from "../controllers/carts.controller.js"
import { authorization, passportCall } from "../utils.js"

const router = Router()

router.post('/', addCart)
router.get('/:cid', getCartById)
router.post('/:cid/products/:pid', passportCall('login'), authorization(['user', 'premium']), addProductToCart)
router.put('/:cid/products/:pid', passportCall('login'), authorization(['user', 'premium']), updateProductQuantity)
router.delete('/:cid/products/:pid', passportCall('login'), authorization(['user', 'premium']), deleteProductFromCart)
router.delete('/:cid', passportCall('login'), authorization(['user', 'premium']), deleteAllFromCart)
router.post('/:cid/purchase', passportCall('login'), authorization(['user', 'premium']), purchaseCart)

export default router