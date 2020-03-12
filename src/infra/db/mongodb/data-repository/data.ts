import { DataModel } from '../../../../data/models/add-url'
import { AddDataRepository } from '../../../../data/protocols/db/add-data-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { DataOperationsRepository } from '../../../../data/protocols/db/data-ops-repository'
import { InputDataModel } from '../../../../domain/models/input-data'

export class DataMongoRepository implements AddDataRepository, DataOperationsRepository {
  async add (data: DataModel): Promise<DataModel> {
    const dataCollection = await MongoHelper.getCollection('urls')
    await dataCollection.insertOne(data)
    return MongoHelper.map(data)
  }

  async retrieve (shortUrl: InputDataModel): Promise<string> {
    try {
      const dataCollection = await MongoHelper.getCollection('urls')
      const data = await dataCollection.findOne({ shortedUrl: shortUrl })
      return data.url
    } catch (e) {
    }
  }

  async delete (shortUrl: InputDataModel): Promise<number> {
    const dataCollection = await MongoHelper.getCollection('urls')
    const data = await dataCollection.deleteOne({ shortedUrl: shortUrl })
    return data.deletedCount
  }
}
