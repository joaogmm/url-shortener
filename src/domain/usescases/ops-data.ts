import { InputDataModel } from '../models/input-data'

export interface DataOperations {
  delete (hash: InputDataModel): Promise<number>
  retrieve (hash: InputDataModel): Promise<string>
}
