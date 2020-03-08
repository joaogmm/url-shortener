import crypto from 'crypto'
import { CryptoAdapter } from './crypto-adapter'

jest.mock('crypto', () => ({
  async createHash (): Promise<string> {
    return new Promise(resolve => resolve('createHash'))
  }
}))

const encryptation = 'any_value'
const makeSut = (): CryptoAdapter => {
  return new CryptoAdapter(encryptation)
}

describe('Crypto Adapter', () => {
  test('Should call hash with correct value ', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(crypto, 'createHash')
    await sut.createHash()
    expect(hashSpy).toHaveBeenCalledWith('any_value')
  })
})
