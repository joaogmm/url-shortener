import { InputDataModel } from '../../../domain/models/input-data'

export interface DeleteDataRepository {
  delete (shortedUrl: InputDataModel): Promise<number>
}
