export interface HashGenerator {
  genHash (hashSize: number): Promise<string>
}
