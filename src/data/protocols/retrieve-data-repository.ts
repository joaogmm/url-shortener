import { RetrieveDataModel } from '../../domain/usescases/retrieve-data'

export interface RetrieveDataRepository {
  retrieve (shortedUrl: RetrieveDataModel): Promise<string>
}
