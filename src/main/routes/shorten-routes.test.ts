import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'

let accountCollection: Collection

describe('Shorten Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('urls')
    await accountCollection.deleteMany({})
  })
  test('Should return 200', async () => {
    await request(app)
      .post('/curtin/enshort')
      .send({
        originalUrl: 'www.google.com'
      })
      .expect(200)
  })
})
