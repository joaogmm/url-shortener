export interface HashGenerator {
  createHash (): Promise<string>
}
