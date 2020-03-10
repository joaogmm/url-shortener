import { DataModel } from '../../../../data/models/add-url'
import { AddDataRepository } from '../../../../data/protocols/add-data-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { RetrieveDataRepository } from '../../../../data/protocols/retrieve-data-repository'
import { RetrieveData } from '../../../../domain/usescases/retrieve-data'
import { DeleteData } from '../../../../domain/usescases/delete-data'

export class DataMongoRepository implements AddDataRepository, RetrieveDataRepository {
  async add (data: DataModel): Promise<DataModel> {
    const dataCollection = await MongoHelper.getCollection('urls')
    const result = await dataCollection.insertOne(data)
    const urls = result.ops[0]
    console.log(urls)
    return MongoHelper.map(data)
  }

  async retrieve (input: RetrieveData): Promise<string> {
    const dataCollection = await MongoHelper.getCollection('urls')
    console.log('input no retrieve', input)
    const data = await dataCollection.findOne(MongoHelper.map({ shortedUrl: input }))
    console.log(MongoHelper.map(data))
    return MongoHelper.mapLeaveUrl(data)
  }

  async delete (input: DeleteData): Promise<number> {
    const dataCollection = await MongoHelper.getCollection('urls')
    const data = await dataCollection.deleteOne({ shortedUrl: input })
    return data.deletedCount
  }
}
