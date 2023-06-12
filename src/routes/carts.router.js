import { Router } from "express"
import { addCart, getCartById, addProductToCart, updateProductQuantity, deleteProductFromCart, deleteAllFromCart, purchaseCart} from "../controllers/carts.controller.js"

const router = Router()

router.post('/', addCart)
router.get('/:cid', getCartById)
router.post('/:cid/products/:pid', addProductToCart)
router.put('/:cid/products/:pid', updateProductQuantity)
router.delete('/:cid/products/:pid', deleteProductFromCart)
router.delete('/:cid', deleteAllFromCart)
router.post('/:cid/purchase', purchaseCart)

export default router