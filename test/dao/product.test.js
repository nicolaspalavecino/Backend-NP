import chai from 'chai'
import supertest from 'supertest'

const expect = chai.expect

let token=''
let cookie =''
let requester = supertest('http://localhost:8080')

describe('Testing PRODUCTS Module', () => {

  before(async function() {
    let admin = { email: 'adminCoder@coder.com', password: 'adminCod3r123'}
    const { _body, headers, ok, statusCode } = await requester.post('/api/sessions/login').send(mockLogin)
    token= _body.access_token
    cookie = headers['set-cookie'][0]
  })

  it('')
})