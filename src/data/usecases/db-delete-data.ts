import { DeleteData } from '../../domain/usescases/delete-data'
import { DeleteDataRepository } from '../protocols/delete-date-repository'

export class DbDeleteData implements DeleteData {
  constructor (private readonly deleteDataRepository: DeleteDataRepository) {
    this.deleteDataRepository = deleteDataRepository
  }

  async delete (shortedUrl: DeleteData): Promise<string> {
    const result = await this.deleteDataRepository.delete(shortedUrl)
    return result
  }
}
