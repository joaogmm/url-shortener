export interface DeleteDataModel {
  shortedUrl: string
}

export interface DeleteData {
  delete (hash: DeleteData): Promise<string>
}
