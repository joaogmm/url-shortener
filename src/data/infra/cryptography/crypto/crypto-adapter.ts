import { HashGenerator } from '../../../protocols/hashGenerator'
import crypto from 'crypto'

export class CryptoAdapter implements HashGenerator {
  private readonly encryptation: string
  constructor (encryptation: string) {
    this.encryptation = encryptation
  }

  async createHash (): Promise<string> {
    const hash = await crypto.createHash(this.encryptation).toString().substr(0, 8)
    return hash
  }
}
