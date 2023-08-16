import { Router } from "express"
import { authorization, passportCall } from "../utils.js"
import { renderCart, renderChat, renderLogin, renderPremium, renderProducts, renderProfile, renderRegister, renderRestorePassword, renderUsers } from "../controllers/views.controller.js"

const router = Router()

router.get('/users/login', renderLogin)
router.get('/users/register', renderRegister)
router.get('/restorePassword', renderRestorePassword)
router.get('/current', passportCall('login'), authorization(['user', 'premium', 'admin']), renderProfile)
router.get('/products', passportCall('login'), authorization(['user', 'premium', 'admin']), renderProducts)
router.get('/carts/:cid', passportCall('login'), authorization(['user', 'premium', 'admin']), renderCart)
router.get('/messages/:uid', passportCall('login'), authorization(['user', 'premium', 'admin']), renderChat)
router.get('/premium', passportCall('login'), authorization(['user']), renderPremium)
router.get('/users', passportCall('login'), authorization(['admin']), renderUsers)


export default router 