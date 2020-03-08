export interface HashGenerator {
  genHash (): Promise<string>
}
