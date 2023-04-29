
import {Router} from 'express';

const routerUsers = Router();

routerUsers.get('/login', (req, res) => {
  res.render('login')
})

routerUsers.get('/register', (req, res) => {
  res.render('register')
})

routerUsers.get('/', (req, res)=>{
  res.render('profile', {
    user: req.session.user
  });
})

export default routerUsers