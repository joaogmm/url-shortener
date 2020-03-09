export interface DataModel {
  originalUrl: string
  shortedUrl: string
}

export interface AddData {
  add (data: DataModel): Promise<DataModel>
}
