import { InputDataModel } from '../models/input-data'

export interface RetrieveData {
  retrieve (hash: InputDataModel): Promise<string>
}
