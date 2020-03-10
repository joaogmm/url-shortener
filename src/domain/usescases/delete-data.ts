import { InputDataModel } from '../models/input-data'

export interface DeleteData {
  delete (hash: InputDataModel): Promise<string>
}
