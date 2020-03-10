import { DataModel } from '../../models/add-url'

export interface AddDataRepository {
  add (data: DataModel): Promise<DataModel>
}
