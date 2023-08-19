import { Router } from "express"
import passport from "passport"
import { loginUser, logoutUser, registerUser } from "../controllers/sessions.controller.js"

const router = Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)

// LOGIN WITH GITHUB:
router.get('/github', passport.authenticate('github', { scope:['user:email']}), async (req, res) => {})

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/github/error'}), 
  async (req, res) => {
    const user = req.user
    req.session.user = {
      name : `${user.first_name}`,
      email: user.email,
      age: user.age,
      role: user.role
    }
    req.session.admin = true
    res.redirect('/products')
  }
)

export default router


