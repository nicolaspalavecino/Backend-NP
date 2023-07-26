// import chai from "chai"
// import supertest from "supertest"

// const expect = chai.expect

// const requester = supertest("http://localhost:8080")

// describe('Testing Sessions Router', () => {

//     before(function () {
//       this.cookie
//       this.mockUser = {
//           first_name: "Usuario de prueba 2",
//           last_name: "Apellido de prueba 2",
//           age: 23,
//           email: "correodeprueba2@gmail.com",
//           password: "123456"
//       }
//   })

//   it('Register new user - API POST /api/sessions/register', async function () {
//     const {
//       statusCode,
//       ok,
//       _body
//     } = await requester.post('/api/sessions/register').send(this.mockUser)

//     expect(statusCode).is.equal(201)
//   })

//   // it('Register new user - API POST /api/sessions/register', async () => {

//   //   //Given
//   //   let mockUser = {
//   //     first_name: 'User',
//   //     last_name: 'Test',
//   //     email: 'usertest@gmail.com',
//   //     age: 25,
//   //     password: 'password'
//   //   }

//   //   //Then
//   //   let { _body, ok, statusCode } = await requester.post('/api/sessions/register').send(mockUser)

//   //   //Assert that
//   //   expect(_body).to.be.ok
//   //   expect(statusCode).to.be.deep.equal(201)
//   //   expect(_body).to.have.property('status', 'Success')
//   // })

//   // it('Log in user - API POST /api/sessions/login', async() => {

//   //   //Given
//   //   let mockLogin = {
//   //     email: 'jocoos@gmail.com',
//   //     password: 'cochico'
//   //   }

//   //   //Then
//   //   let { _body, ok, statusCode } = await requester.post('/api/sessions/login').send(mockLogin)
//   //   token = _body.access_token
//   //   cookie = headers['set-cookie'][0]

//   //   //Assert that
//   //   expect(_body).to.be.ok
//   //   expect(statusCode).to.be.deep.equal(201)
//   //   expect(_body).to.have.property('status', 'Success')
//   // })

//   // it('Log out user - API GET /api/sessions/logout', async() => {

//   //   //Then
//   //   let { _body, ok, statusCode } = await requester.get('/api/sessions/logout').set('Cookie', cookie)

//   //   //Assert that
//   //   expect(_body).to.be.ok
//   //   expect(statusCode).to.be.deep.equal(200)
//   //   expect(_body).to.have.property('status', 'Success')
//   // })

// })

import chai from "chai"
import supertest from 'supertest'

const expect = chai.expect

let token=""
let cookie =""
let requester = supertest("http://localhost:8080")


describe("Testing de router de session", () => {

  it("User register: API POST /api/sessions/register", async () => {
      
      // Given
      let mockUser = {
          first_name: "User",
          last_name: "Test",
          email: "usertest@gmail.com",
          age: "23",
          password: "1234"
      }
      //Then
      const { _body ,ok, statusCode } = await requester.post("/api/sessions/register").send(mockUser)
      // Assert that
      expect(_body).to.be.ok
      expect(statusCode).to.be.deep.equal(201)
      expect(_body).to.have.property('status', 'Success')
  })

  it("User login: API POST /api/sessions/login", async () => {
      
      // Given
      let mockLogin = {
          email: "usertest@gmail.com",
          password: "1234"
      }
      //Then
      const { _body, headers, ok, statusCode } = await requester.post("/api/sessions/login").send(mockLogin)
      token= _body.access_token
      cookie = headers['set-cookie'][0]
      // Assert that
      expect(_body).to.be.ok
      expect(statusCode).to.be.deep.equal(201)
      expect(_body).to.have.property('status', 'Success')
  })

  it("User logout: API GET api/sessions/logout", async () => {
      
      // Given

      //Then
      const { _body, ok, statusCode } = await requester.get("/api/sessions/logout").set('Cookie', cookie)
      console.log(_body)
      console.log(ok)
      console.log(statusCode)
      // Assert that
      expect(_body).to.be.ok
      expect(statusCode).to.be.deep.equal(200)
      expect(_body).to.have.property('status', 'Success')
  })

})