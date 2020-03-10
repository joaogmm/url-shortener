export interface DataModel {
  url: string
  shortedUrl: string
}

export interface AddData {
  add (data: DataModel): Promise<DataModel>
}
