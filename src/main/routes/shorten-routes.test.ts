import request from 'supertest'
import app from '../config/app'

describe('Shorten Routes', () => {
  test('Should return 200', async () => {
    await request(app)
      .post('/curtin/enshort')
      .send({
        originalUrl: 'www.google.com'
      })
      .expect(200)
  })
})
