import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import sinon from 'sinon'
import app from '../app'
import UserService from '../services/user.service'

chai.use(chaiHttp)

const validLoginMock = {
  email: 'admin@admin.com',
  password: 'Admin123'
}

const validLoginResponse = {
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIn0sImlhdCI6MTY2NjM3NzY4MiwiZXhwIjoxNjY2NTUwNDgyfQ.PD_TDSPj-EwMFBesgRIuVZH5FyFOGvhrl0W4OpVB0ew'
}

const validRegisterMock = {
  username: 'Test',
  email: 'test@test.com',
  password: 'Testando123'
}

const validRegisterResponse = {
  id: '6439b6f7439d0f020593bd9a',
  email: 'test@test.com',
  password: 'Testando123',
  username: 'Test',
  role: 'customer',
  created_at: '14/04/2023 16:52:42',
  updated_at: '14/04/2023 16:52:42'
}

describe('/user endpoint', () => {
  beforeEach(() => {
    sinon.restore()
  })

  describe('[POST /user/login]', () => {
    it('should return a token and correct status if login successfully', async () => {
      sinon.stub(UserService.prototype, 'login').resolves(validLoginResponse.token)

      const response = await chai
        .request(app)
        .post('/user/login')
        .send(validLoginMock)

      expect(response.status).to.be.equal(200)
      expect(response.body).to.haveOwnProperty('token')
    })

    it('should return correct message when email field its not valid email', async () => {
      const response = await chai
        .request(app)
        .post('/user/login')
        .send({
          email: 'testexample.com',
          password: 'Testando123'
        })

      expect(response.status).to.be.equal(400)
      expect(response.body).to.be.deep.equal({ message: 'Must be a valid email address' })
    })

    it('should return correct message when email field is not provided', async () => {
      const response = await chai
        .request(app)
        .post('/user/login')
        .send({
          password: 'Testando123'
        })

      expect(response.status).to.be.equal(400)
      expect(response.body).to.be.deep.equal({ message: 'Email field is required' })
    })

    it('should return the correct message if the password is not at least 8 characters long', async () => {
      const response = await chai
        .request(app)
        .post('/user/login')
        .send({
          email: 'test@example.com',
          password: 'test'
        })

      expect(response.status).to.be.equal(400)
      expect(response.body).to.be.deep.equal({ message: 'Must have at least 8 characters' })
    })

    it('should return the correct message if the password does not have at least 1 Uppercase and 1 lowercase letter', async () => {
      const response = await chai
        .request(app)
        .post('/user/login')
        .send({
          email: 'test@example.com',
          password: 'testando'
        })

      expect(response.status).to.be.equal(400)
      expect(response.body).to.be.deep.equal({ message: 'Must have at least one uppercase character and a number' })
    })

    it('should return correct message when password field is not provided', async () => {
      const response = await chai
        .request(app)
        .post('/user/login')
        .send({
          email: 'test@example.com'

        })

      expect(response.status).to.be.equal(400)
      expect(response.body).to.be.deep.equal({ message: 'Password field is required' })
    })
  })

  describe('[POST /user/register', () => {
    it('should return a user if create a newUser successfully', async () => {
      sinon.stub(UserService.prototype, 'create').resolves(validRegisterResponse as any)

      const response = await chai
        .request(app)
        .post('/user/register')
        .send(validRegisterMock)

      expect(response.status).to.be.equal(201)
      expect(response.body).to.be.deep.equal(validRegisterResponse)
    })

    it('should return correct message when email field its not valid email', async () => {
      const response = await chai
        .request(app)
        .post('/user/register')
        .send({
          username: 'testname',
          email: 'testexample.com',
          password: 'Testando123'
        })

      expect(response.status).to.be.equal(400)
      expect(response.body).to.be.deep.equal({ message: 'Must be a valid email address' })
    })

    it('should return correct message when email field is not provided', async () => {
      const response = await chai
        .request(app)
        .post('/user/register')
        .send({
          password: 'Testando123',
          username: 'test'

        })

      expect(response.status).to.be.equal(400)
      expect(response.body).to.be.deep.equal({ message: 'Email field is required' })
    })

    it('should return the correct message if the password is not at least 8 characters long', async () => {
      const response = await chai
        .request(app)
        .post('/user/register')
        .send({
          username: 'testname',
          email: 'teste@example.com',
          password: 'Te1'
        })

      expect(response.status).to.be.equal(400)
      expect(response.body).to.be.deep.equal({ message: 'Must have at least 8 characters' })
    })

    it('should return the correct message if the password does not have at least 1 Uppercase and 1 lowercase letter', async () => {
      const response = await chai
        .request(app)
        .post('/user/register')
        .send({
          username: 'testname',
          email: 'test@example.com',
          password: 'testando'
        })

      expect(response.status).to.be.equal(400)
      expect(response.body).to.be.deep.equal({ message: 'Must have at least one uppercase character and a number' })
    })

    it('should return correct message when password field is not provided', async () => {
      const response = await chai
        .request(app)
        .post('/user/register')
        .send({
          email: 'test@example.com'

        })

      expect(response.status).to.be.equal(400)
      expect(response.body).to.be.deep.equal({ message: 'Password field is required' })
    })

    it('should return correct message when username field is not provided', async () => {
      const response = await chai
        .request(app)
        .post('/user/register')
        .send({
          email: 'test@example.com',
          password: 'Testando123'

        })

      expect(response.status).to.be.equal(400)
      expect(response.body).to.be.deep.equal({ message: 'Username field is required' })
    })

    it('should return the correct message if the username is not at least 3 characters long', async () => {
      const response = await chai
        .request(app)
        .post('/user/register')
        .send({
          username: 'te',
          email: 'test@example.com',
          password: 'Testando123'
        })

      expect(response.status).to.be.equal(400)
      expect(response.body).to.be.deep.equal({ message: 'Must have at least 3 characters' })
    })
  })
})
