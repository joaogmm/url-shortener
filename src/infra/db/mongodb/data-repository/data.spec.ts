import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'
import { DataMongoRepository } from './data'

let dataCollection: Collection

describe('data Mongo Repository', () => {
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

  const makeSut = (): any => {
    const sut = new DataMongoRepository()
    return sut
  }

  test('Should return a dataModel on success', async () => {
    const sut = makeSut()
    const data = ({
      shortedUrl: 'any_url',
      url: 'any_url'
    })
    const response = await sut.add(data)
    expect(response).toBeTruthy()
    expect(response.url).toBe('any_url')
    expect(response.shortedUrl).toBe('any_url')
  })

  test('Should return a URL on success', async () => {
    const sut = makeSut()
    const data = ({
      shortedUrl: 'any_url',
      url: 'any_url'
    })
    await sut.add(data)
    const response = await sut.retrieve('any_url')
    expect(response).toBe('any_url')
  })
})
