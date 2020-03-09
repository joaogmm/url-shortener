import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'
import { DataMongoRepository } from './data'

let accountCollection: Collection

describe('Account Mongo Repository', () => {
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

  const makeSut = (): any => {
    const sut = new DataMongoRepository()
    return sut
  }

  test('Should return a dataModel on success', async () => {
    const sut = makeSut()
    const data = await sut.add({
      originalUrl: 'any_url',
      shortedUrl: 'any_url'
    })
    expect(data).toBeTruthy()
    expect(data.originalUrl).toBe('any_url')
    expect(data.shortedUrl).toBe('any_url')
  })
})
