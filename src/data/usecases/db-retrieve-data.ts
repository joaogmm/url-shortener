import { RetrieveData, RetrieveDataModel } from '../../domain/usescases/retrieve-data'
import { RetrieveDataRepository } from '../protocols/retrieve-data-repository'

export class DbRetrieveData implements RetrieveData {
  constructor (private readonly retrieveDataRepository: RetrieveDataRepository) {
    this.retrieveDataRepository = retrieveDataRepository
  }

  async retrieve (shortedUrl: RetrieveDataModel): Promise<string> {
    const result = await this.retrieveDataRepository.retrieve(shortedUrl)
    return result
  }
}
