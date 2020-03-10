import { DeleteData } from '../../domain/usescases/delete-data'
import { DeleteDataRepository } from '../protocols/db/delete-date-repository'
import { InputDataModel } from '../../domain/models/input-data'

export class DbDeleteData implements DeleteData {
  constructor (private readonly deleteDataRepository: DeleteDataRepository) {
    this.deleteDataRepository = deleteDataRepository
  }

  async delete (shortedUrl: InputDataModel): Promise<string> {
    const result = await this.deleteDataRepository.delete(shortedUrl)
    return result
  }
}
