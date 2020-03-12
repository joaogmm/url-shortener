import { DataOperations } from '../../domain/usescases/ops-data'
import { InputDataModel } from '../../domain/models/input-data'
import { DataOperationsRepository } from '../protocols/db/data-ops-repository'

export class DbOperationsData implements DataOperations {
  constructor (private readonly dataOperationsRepository: DataOperationsRepository) {
    this.dataOperationsRepository = dataOperationsRepository
  }

  async delete (shortedUrl: InputDataModel): Promise<number> {
    const result = await this.dataOperationsRepository.delete(shortedUrl)
    return result
  }

  async retrieve (hash: InputDataModel): Promise<string> {
    const result = await this.dataOperationsRepository.retrieve(hash)
    return result
  }
}
