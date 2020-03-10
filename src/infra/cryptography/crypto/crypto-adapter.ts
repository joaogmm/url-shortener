import { HashGenerator } from '../../../data/protocols/cryptography/hashGenerator'
import crypto from 'crypto'

export class CryptoAdapter implements HashGenerator {
  private readonly encryptation: string
  constructor (encryptation: string) {
    this.encryptation = encryptation
  }

  async createHash (): Promise<string> {
    var currentDate = (new Date()).valueOf().toString()
    var random = Math.random().toString()
    const hash = await crypto.createHash(this.encryptation).update(currentDate + random).digest('hex').substr(0, 8)
    return hash
  }
}
