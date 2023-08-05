import chai from 'chai'
import supertest from 'supertest'

const expect = chai.expect

let cookie =''
let userCartId = ''
let productId = ''
let requester = supertest('http://localhost:8080')

describe('Testing CARTS Module', () => {
  
  before(
    async function() {
    this.user = { email: 'jocoos@gmail.com', password: 'cochico'}
    const { _body, headers, ok, statusCode } = await requester.post('/api/sessions/login').send(this.user)
    cookie = headers['set-cookie'][0]
  })

  it('Get user cart: API GET /carts/:cid', async function () {
    userCartId = '6487971f639b89c30e285338'
    const { _body, ok, statusCode } = await requester.get(`/carts/${userCartId}`).set('Cookie', cookie)
    expect(_body).ok
    expect(_body.payload.cart).to.have.property('products')
    expect(statusCode).is.equal(200)
  })

  it('Add a product to cart: API POST /api/carts/:cid/products/:pid', async function () {
    productId = '644312fd755d80621018a4c4'
    const { _body, ok, statusCode } = await requester.post(`/api/carts/${userCartId}/products/${productId}`).send(userCartId, productId).set('Cookie', cookie)
    expect(_body).ok
    expect(_body).to.have.property('status', 'Success')
    expect(statusCode).is.equal(201)
  })

  it('Delete a product from cart: API DELETE /api/carts/:cid/products/:pid', async function () {
    const { _body, ok, statusCode } = await requester.delete(`/api/carts/${userCartId}/products/${productId}`).send(userCartId, productId).set('Cookie', cookie)
    expect(_body).ok
    expect(_body).to.have.property('status', 'Success')
    expect(statusCode).is.equal(201)
  })
})