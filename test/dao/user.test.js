import chai from 'chai'
import supertest from 'supertest'

const expect = chai.expect

let cookie =''
let requester = supertest('http://localhost:8080')

describe('Testing SESSIONS Module', () => {

  it('User register: API POST /api/sessions/register', async function () {
    let mockUser = {
      first_name: 'User',
      last_name: 'Test',
      email: 'usertest@gmail.com',
      age: 23,
      password: 'password'
    }
    const { _body ,ok, statusCode } = await requester.post('/api/sessions/register').send(mockUser)
    expect(_body).ok
    expect(statusCode).is.equal(201)
    expect(_body).to.have.property('status', 'Success')
  })

  it('User login: API POST /api/sessions/login', async function () {
    let mockLogin = {
      email: 'usertest@gmail.com',
      password: 'password'
    }
    const { _body, headers, ok, statusCode } = await requester.post('/api/sessions/login').send(mockLogin)
    cookie = headers['set-cookie'][0]
    expect(_body).ok
    expect(statusCode).is.equal(201)
    expect(_body).to.have.property('status', 'Success')
  })

  it('User logout: API GET api/sessions/logout', async function () {
    const { _body, ok, statusCode } = await requester.get('/api/sessions/logout').set('Cookie', cookie)
    expect(_body).ok
    expect(statusCode).is.equal(200)
    expect(_body).to.have.property('status', 'Success')
  })

})