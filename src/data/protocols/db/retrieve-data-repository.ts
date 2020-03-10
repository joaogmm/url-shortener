import { InputDataModel } from '../../../domain/models/input-data'

export interface RetrieveDataRepository {
  retrieve (shortUrl: InputDataModel): Promise<string>
}
