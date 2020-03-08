import { DataModel } from '../models/add-url'

export interface AddDataRepository {
  add (url: DataModel): Promise<DataModel>
}
