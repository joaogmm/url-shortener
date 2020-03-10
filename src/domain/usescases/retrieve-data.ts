export interface RetrieveData {
  retrieve (hash: string): Promise<string>
}
