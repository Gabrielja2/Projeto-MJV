import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import app from '../app'

chai.use(chaiHttp)

describe('POST /user/login', () => {
  it('Verifica se retorna a mensagem correta caso o campo email não seja um email válido', async () => {
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

  it('Verifica se retorna a mensagem correta caso o campo email não seja fornecido', async () => {
    const response = await chai
      .request(app)
      .post('/user/login')
      .send({
        password: 'Testando123'
      })

    expect(response.status).to.be.equal(400)
    expect(response.body).to.be.deep.equal({ message: 'Email field is required' })
  })

  it('Verifica se retorna a mensagem correta caso o password não tenha pelo menos 8 caracteres', async () => {
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

  it('Verifica se retorna a mensagem correta caso o password não tenha pelo menos 1 caractere normal e 1 Uppercase', async () => {
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

  it('Verifica se retorna a mensagem correta caso o campo password não seja fornecido', async () => {
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

describe('POST /user/register', () => {
  it('Verifica se retorna a mensagem correta caso o campo email não seja fornecido', async () => {
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

  it('Verifica se retorna a mensagem correta caso o campo email não seja um email válido', async () => {
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

  it('Verifica se retorna a mensagem correta caso o password não tenha pelo menos 8 caracteres', async () => {
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

  it('Verifica se retorna a mensagem correta caso o password não tenha pelo menos 1 caractere normal e 1 Uppercase', async () => {
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

  it('Verifica se retorna a mensagem correta caso o campo password não seja fornecido', async () => {
    const response = await chai
      .request(app)
      .post('/user/register')
      .send({
        email: 'test@example.com'

      })

    expect(response.status).to.be.equal(400)
    expect(response.body).to.be.deep.equal({ message: 'Password field is required' })
  })

  it('Verifica se retorna a mensagem correta caso o campo username não seja fornecido', async () => {
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

  it('Verifica se retorna a mensagem correta caso o campo username não tenha pelo menos 3 caracteres', async () => {
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
