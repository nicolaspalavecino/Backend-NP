import { Router } from "express"
import userModel from "../dao/models/users.models.js"
import { authorization, createHash, validPassword } from "../utils.js"
import passport from "passport"

const routerSessions = Router()

// SESSION:
routerSessions.get('/session', (req, res) => {
  if(req.session.counter) {
    req.session.counter++
    res.send(`This site was visited ${req.session.counter} times`)
  } else {
    req.session.counter = 1
    res.send('Welcome human?')
  }
})

// REGISTER:
routerSessions.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/fail-register' }), 
  async (req, res) => {
    console.log('New user successfylly created')
    res.status(201).send({status: "success", msg: 'User created successfully created'})
  }
)

// routerSessions.post('/register', async (req, res) => {
//   try {
//     const {first_name, last_name, email, age, password} = req.body
//     if(!first_name || !last_name || !email || !age || !password) {
//       console.log('Please, complete all the fields!')
//       return res.status(401).send({status: "error", msg: "Please, complete all the fields"})
//     } else {
//       let exists = await userModel.findOne({email})
//       if (exists) {
//         console.log('An user with this email already exists')
//         return res.status(400).send({status: "error", msg: "Already existing user"})
//       }
//       let user = {
//         first_name: first_name,
//         last_name: last_name,
//         email: email,
//         age: age,
//         password: createHash(password)
//       }
//       let result = await userModel.create(user)
//       console.log(("Registrando a:"));
//       console.log(req.body)
//       res.status(201).send({status: "success", msg: `User created successfully. ID: ${user.id}`, user: result})
//     }
//   }
//   catch (error) {
//     return new Error (`An error occured while creating a new user. Check for ${error}`)
//   }
// })

// LOGIN:
routerSessions.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/fail-login' }), 
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

// routerSessions.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/fail-login' }), 
//   async (req, res) => {
//     console.log('User found to login:')
//     const user = req.user
//     console.log(user)
//     if(!user) return res.status(401).send({status: "error", msg: "Incorrect credentials"}) 
//     req.session.user = {
//       name: `${user.first_name} ${user.last_name}`,
//       email: user.email,
//       age: user.age,
//       role: 'user',
//       isAdmin: false
//     }
//     res.send({status: "success", payload: req.session.user, msg:"First login completed!"})
//   }
// )

// routerSessions.post('/login', async (req, res) => {
//   const { email, password } = req.body
//   if(req.body.email === 'adminCoder@coder.com' && req.body.password === 'adminCod3r123') {
//     req.session.user = {
//       name: 'Coderhouse',
//       email: 'adminCoder@coder.com',
//       age: 9,
//       role: 'admin',
//       isAdmin: true
//     }
//   } else {
//     const user = await userModel.findOne({email})
//     if(!user) return res.status(401).send({status: "error", msg: "Incorrect credentials"})
//     if(!validPassword(user,password)) {return res.status(401).send({status:"error", msg: "Incorrect credentials"})}
//     req.session.user = {
//       name: `${user.first_name} ${user.last_name}`,
//       email: user.email,
//       age: user.age,
//       role: 'user',
//       isAdmin: false
//     }
//   }
//   res.send({status: "success", payload: req.session.user, msg:"First login completed!"})
// })

// LOGIN WITH GITHUB:
routerSessions.get('/github', passport.authenticate('github', { scope:['user:email']}), async(req, res) => {})

routerSessions.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/github/error'}), 
  async (req, res) => {
    const user = req.user;
    req.session.user= {
      name : `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age
    }
    req.session.admin = true;
    res.redirect('/github')
  }
)

routerSessions.get('/fail-register', (req, res) => {
  res.status(401).send({ error: "Failed to process register!" })
})

routerSessions.get('/fail-login', (req, res) => {
  res.status(401).send({ error: "Failed to process login!" })
})

// LOGOUT:
routerSessions.get('/logout', async (req, res) => {
  req.session.destroy(error => {
    if(error) {
      res.json({ error: 'Logout error', message: 'An error has occurred when logging out' })
    }
    res.send('The session was successfully ended!')
  })
})

// PRIVATE:
routerSessions.get('/private', authorization, (req, res) => {
  res.send('If you are reading this it means you are blessed with the name Pepe')
})

export default routerSessions


