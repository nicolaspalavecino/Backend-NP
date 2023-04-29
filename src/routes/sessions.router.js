import { Router } from "express"
import userModel from "../dao/models/users.models.js"
import { authorization, createHash, validPassword } from "../utils.js"

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
routerSessions.post('/register', async (req, res) => {
  try {
    const {first_name, last_name, email, age, password} = req.body
    console.log(("Registrando a:"));
    console.log(req.body);

    let exists = await userModel.findOne({email})
    if (exists) {
      return res.status(400).send({status: "error", msg: "Already existing user"})
    }
    let user = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      age: age,
      password: createHash(password)
    }
    let result = await userModel.create(user)
    res.status(201).send({status: "success", msg: `User created successfully. ID: ${user.id}`, user: result})
  }
  catch (error) {
    return new Error (`An error occured while creating a new user. Check for ${error}`)
  }
})

// LOGIN:
routerSessions.post('/login', async (req, res) => {
  const { email, password } = req.body
  if(req.body.email === 'adminCoder@coder.com' && req.body.password === 'adminCod3r123') {
    req.session.user = {
      name: 'Coderhouse',
      email: 'adminCoder@coder.com',
      age: 9,
      role: 'admin',
      isAdmin: true
    }
  } else {
    const user = await userModel.findOne({email})
    if(!user) return res.status(401).send({status: "error", msg: "Incorrect credentials"})
    if(!validPassword(user,password)) {return res.status(401).send({status:"error", msg: "Incorrect credentials"})}
    req.session.user = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age,
      role: 'user',
      isAdmin: false
    }
  }
  res.send({status: "success", payload: req.session.user, msg:"First login completed!"})
})

// routerSessions.post('/login', async (req, res) => {
//   const { email, password } = req.body
//   const user = await userModel.findOne({email})
//   if(!user) return res.status(401).send({status: "error", msg: "Incorrect credentials"})
//   if(!validPassword(user,password)) {return res.status(401).send({status:"error", msg: "Incorrect credentials"})}
//   req.session.user = {
//     name: `${user.first_name} ${user.last_name}`,
//     email: user.email,
//     age: user.age,
//   }
//   res.send({status: "success", payload: req.session.user, msg:"First login completed!"})
// })

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
