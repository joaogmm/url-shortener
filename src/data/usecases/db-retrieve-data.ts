import { RetrieveData } from '../../domain/usescases/retrieve-data'
import { RetrieveDataRepository } from '../protocols/db/retrieve-data-repository'
import { InputDataModel } from '../../domain/models/input-data'

export class DbRetrieveData implements RetrieveData {
  constructor (private readonly retrieveDataRepository: RetrieveDataRepository) {
    this.retrieveDataRepository = retrieveDataRepository
  }

  async retrieve (shortedUrl: InputDataModel): Promise<string> {
    const result = await this.retrieveDataRepository.retrieve(shortedUrl)
    return result
  }
}
