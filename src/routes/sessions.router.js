import { Router } from "express"
import { authorization, createHash, generateJWToken, validPassword } from "../utils.js"
import passport from "passport"
import cookieParser from "cookie-parser"
import UserService from "../services/user.service.js"

const router = Router()
let userService = new UserService()

// REGISTER:
router.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/fail-register' }), 
  async (req, res) => {
    console.log('New user successfylly created')
    res.status(201).send({status: "success", msg: 'User created successfully created'})
  }
)

// LOGIN using jwt:
router.post('/login', async (req, res)=>{
  const {email, password} = req.body
  try {
    const user = await userService.getUser(email)
    console.log('User found to login:')
    console.log(user)
    if (!user) {
      console.warn('User does not exist with username: ' + email)
      return res.status(204).send({ error: 'Not found', message: 'User does not exist with username: ' + email })
    }
    if (!validPassword(user, password)) {
      console.warn('Invalid credentials for user: ' + email)
      return res.status(401).send({ status: 'error', error: 'User and password do not match!' })
    }
    const tokenUser = {
      name : `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age,
      role: user.role
    }
    const access_token = generateJWToken(tokenUser)
    res.cookie('jwtCookieToken', access_token, { maxAge: 60000, httpOnly: false }) // 1 min
    res.send({message: 'Login successful!', jwt: access_token })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ status:'error', error:'Internal application error'})
  }
})

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
    res.redirect('/github')
  }
)

router.get('/fail-register', (req, res) => {
  res.status(401).send({ error: "Failed to process register!" })
})

router.get('/fail-login', (req, res) => {
  res.status(401).send({ error: "Failed to process login!" })
})

// LOGOUT:
router.get('/logout', (req, res) => {
  res.clearCookie('jwtCookieToken').status(200).send('Session was successfully ended')
})

export default router

// LOGIN:
// router.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/fail-login' }), 
//   async (req, res) => {
//     console.log('User found to login:')
//     const user = req.user
//     console.log(user)
//     if(!user) return res.status(401).send({status: "error", msg: "Incorrect credentials"}) 
//     // req.session.user = {
//     //   name: `${user.first_name} ${user.last_name}`,
//     //   email: user.email,
//     //   age: user.age,
//     //   role: 'user',
//     //   isAdmin: false
//     // }
//     const access_token = generateJWToken(user)
//     // res.send({status: "success", payload: req.session.user, msg:"First login completed!"})
//     res.send({access_token: access_token})
//   }
// )

// LOGOUT:
// router.get('/logout', async (req, res) => {
//   req.session.destroy(error => {
//     if(error) {
//       res.json({ error: 'Logout error', message: 'An error has occurred when logging out' })
//     }
//     res.send('The session was successfully ended!')
//   })
// })


// SESSION:
// router.get('/session', (req, res) => {
//   if(req.session.counter) {
//     req.session.counter++
//     res.send(`This site was visited ${req.session.counter} times`)
//   } else {
//     req.session.counter = 1
//     res.send('Welcome human?')
//   }
// })

// PRIVATE:
// router.get('/private', authorization, (req, res) => {
//   res.send('If you are reading this it means you are blessed with the name Pepe')
// })