import { Router } from "express"
import { authorization, createHash, validPassword } from "../utils.js"
import passport from "passport"

const router = Router()

// SESSION:
router.get('/session', (req, res) => {
  if(req.session.counter) {
    req.session.counter++
    res.send(`This site was visited ${req.session.counter} times`)
  } else {
    req.session.counter = 1
    res.send('Welcome human?')
  }
})

// REGISTER:
router.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/fail-register' }), 
  async (req, res) => {
    console.log('New user successfylly created')
    res.status(201).send({status: "success", msg: 'User created successfully created'})
  }
)

// LOGIN:
router.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/fail-login' }), 
  async (req, res) => {
    console.log('User found to login:')
    const user = req.user
    console.log(user)
    if(!user) return res.status(401).send({status: "error", msg: "Incorrect credentials"}) 
    req.session.user = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age,
      role: 'user',
      isAdmin: false
    }
    res.send({status: "success", payload: req.session.user, msg:"First login completed!"})
  }
)

// LOGIN WITH GITHUB:
router.get('/github', passport.authenticate('github', { scope:['user:email']}), async (req, res) => {})

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/github/error'}), 
  async (req, res) => {
    const user = req.user;
    req.session.user= {
      name : `${user.first_name}`,
      email: user.email,
      age: user.age
    }
    req.session.admin = true;
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
router.get('/logout', async (req, res) => {
  req.session.destroy(error => {
    if(error) {
      res.json({ error: 'Logout error', message: 'An error has occurred when logging out' })
    }
    res.send('The session was successfully ended!')
  })
})

// PRIVATE:
router.get('/private', authorization, (req, res) => {
  res.send('If you are reading this it means you are blessed with the name Pepe')
})

export default router