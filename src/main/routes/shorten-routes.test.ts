import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import env from '../config/env'

let dataCollection: Collection

describe('Shorten Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  beforeEach(async () => {
    dataCollection = await MongoHelper.getCollection('urls')
    await dataCollection.deleteMany({})
  })
  test('Should return 200 on success', async () => {
    await request(app)
      .post('/enshort')
      .send({
        url: 'www.google.com'
      })
      .expect(200)
  })
  test('Should return 404 on delete failure', async () => {
    dataCollection = await MongoHelper.getCollection('urls')
    await request(app)
      .delete(`/delete/http://localhost:${env.port}/` + 'any_hash')
      .expect(404)
  })
  test('Should return 204 on deletion success', async () => {
    dataCollection = await MongoHelper.getCollection('urls')
    await dataCollection.insertOne({
      url: 'www.google.com',
      shortedUrl: 'any_hash',
      _id: 123456
    })
    await request(app)
      .delete('/delete/' + 'any_hash')
      .expect(204)
  })
  test('Should return 204 on retrieve success', async () => {
    dataCollection = await MongoHelper.getCollection('urls')
    await dataCollection.insertOne({
      url: 'www.google.com',
      shortedUrl: 'any_hash',
      _id: 123456
    })
    const httpResponse = await request(app)
      .get('/retrieve/' + 'any_hash')
      .expect(200)
    expect(httpResponse.body.url).toEqual('www.google.com')
  })
  test('Should return 302 on redirect success', async () => {
    dataCollection = await MongoHelper.getCollection('urls')
    await dataCollection.insertOne({
      url: 'www.google.com',
      shortedUrl: 'any_hash',
      _id: 123456
    })
    await request(app)
      .get('/' + 'any_hash')
      .expect(302) // 302 - Page Found
  })

  test('Should return 404 on redirect fails', async () => {
    dataCollection = await MongoHelper.getCollection('urls')
    await dataCollection.insertOne({
      url: 'www.google.com',
      shortedUrl: 'other_hash',
      _id: 123456
    })
    await request(app)
      .get('/' + 'any_hash')
      .expect(404) // 302 - Page Found
  })
})
