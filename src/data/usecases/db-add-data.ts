import { AddData } from '../../domain/usescases/add-url'
import { InputDataModel } from '../../domain/models/input-data'
import { HashGenerator } from '../protocols/hashGenerator'
import { DataModel } from '../../domain/models/data'

export class DbAddData implements AddData {
  constructor (private readonly hashGenerator: HashGenerator) {
    this.hashGenerator = hashGenerator
  }

  async add (url: InputDataModel): Promise<DataModel> {
    await this.hashGenerator.genHash(8)
    return new Promise(resolve => resolve(null))
  }
}
