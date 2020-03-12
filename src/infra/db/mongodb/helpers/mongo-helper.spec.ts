import { MongoHelper as sut, MongoHelper } from './mongo-helper'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })

  beforeAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongodb is down', async () => {
    let dataCollection = await sut.getCollection('data')
    expect(dataCollection).toBeTruthy()
    await sut.disconnect()
    dataCollection = await sut.getCollection('data')
    expect(dataCollection).toBeTruthy()
  })

  test('Should return only the url', () => {
    const collection = {
      _id: 53535213,
      shortedUrl: 'any_hash',
      url: 'www.google.com'
    }
    const url = MongoHelper.mapLeaveUrl(collection)
    expect(url).toEqual({
      url: 'www.google.com'
    })
  })
})
