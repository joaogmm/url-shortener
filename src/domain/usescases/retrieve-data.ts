export interface RetrieveDataModel {
  shortedUrl: string
}

export interface RetrieveData {
  retrieve (shortedUrl: RetrieveDataModel): Promise<string>
}
