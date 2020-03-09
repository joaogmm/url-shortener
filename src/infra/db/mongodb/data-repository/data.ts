import { DataModel } from '../../../../data/models/add-url'
import { AddDataRepository } from '../../../../data/protocols/add-data-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { RetrieveDataRepository } from '../../../../data/protocols/retrieve-data-repository'
import { RetrieveDataModel } from '../../../../domain/usescases/retrieve-data'

export class DataMongoRepository implements AddDataRepository, RetrieveDataRepository {
  async add (data: DataModel): Promise<DataModel> {
    const dataCollection = await MongoHelper.getCollection('urls')
    const result = await dataCollection.insertOne(data)
    const urls = result.ops[0]
    console.log(urls)
    return MongoHelper.map(data)
  }

  async retrieve (input: RetrieveDataModel): Promise<string> {
    const dataCollection = await MongoHelper.getCollection('urls')
    console.log(input)
    const parts = input.shortedUrl.split('/')
    input.shortedUrl = parts[1]
    const data = await dataCollection.findOne(MongoHelper.map(input))
    console.log(MongoHelper.map(data))
    return MongoHelper.mapLeaveUrl(data)
  }
}
