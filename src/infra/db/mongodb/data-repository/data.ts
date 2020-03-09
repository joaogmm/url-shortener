import { DataModel } from '../../../../data/models/add-url'
import { AddDataRepository } from '../../../../data/protocols/add-data-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class DataMongoRepository implements AddDataRepository {
  async add (data: DataModel): Promise<DataModel> {
    const dataCollection = await MongoHelper.getCollection('urls')
    const result = await dataCollection.insertOne(data)
    const urls = result.ops[0]
    console.log(urls)
    return MongoHelper.map(data)
  }
}
