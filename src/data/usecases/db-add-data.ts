import { AddData } from '../../domain/usescases/add-data'
import { AddDataRepository } from '../protocols/add-data-repository'
import { DataModel } from '../models/add-url'

export class DbAddData implements AddData {
  constructor (private readonly addDataRepository: AddDataRepository) {
    this.addDataRepository = addDataRepository
  }

  async add (data: DataModel): Promise<DataModel> {
    const result = await this.addDataRepository.add(data)
    return result
  }
}
