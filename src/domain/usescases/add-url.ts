import { DataModel } from '../models/data'

export interface AddDataModel {
  url: string
}

export interface AddData {
  add (url: AddDataModel): Promise<DataModel>
}
