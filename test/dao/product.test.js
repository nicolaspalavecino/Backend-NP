import chai from 'chai'
import supertest from 'supertest'

const expect = chai.expect

let cookie =''
let requester = supertest('http://localhost:8080')

describe('Testing PRODUCTS Module', () => {
  
  before(
    async function() {
    this.admin = { email: 'adminCoder@coder.com', password: 'adminCod3r123'}
    const { _body, headers, ok, statusCode } = await requester.post('/api/sessions/login').send(this.admin)
    cookie = headers['set-cookie'][0]
  })

  it('Get all products: API GET /products', async function () {
    const { _body, ok, statusCode } = await requester.get('/products').set('Cookie', cookie)
    expect(_body).ok
    expect(_body.payload.products).to.have.property('status', 'success')
    expect(_body.payload.user).to.have.property('role', 'admin')
    expect(statusCode).is.equal(200)
  })

  it('Create new product: API POST /api/products', async function () {
    let mockProduct = {
      title: 'Test Product',
      category: 'terror',
      description: 'Testing product router',
      price: 100,
      thumbnail: 'url-test',
      code: 1234,
      stock: 100
    }
    const { _body, ok, statusCode } = await requester.post('/api/products').send(mockProduct).set('Cookie', cookie)
    expect(_body).ok
    expect(statusCode).is.equal(201)
    expect(_body.payload).to.have.property('status', true)
  })
})