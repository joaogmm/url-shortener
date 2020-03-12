import { InputDataModel } from '../../../domain/models/input-data'

export interface DataOperationsRepository {
  retrieve (shortUrl: InputDataModel): Promise<string>
  delete (shortedUrl: InputDataModel): Promise<number>
}
