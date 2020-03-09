import crypto from 'crypto'

jest.mock('crypto', () => ({
  async createHash (): Promise<string> {
    return new Promise(resolve => resolve('any_value'))
  }
}))

export interface HashGeneratorStub {
  createHash (): Promise<Object>
}

const makeSut = (): HashGeneratorStub => {
  class CryptoAdapter implements HashGeneratorStub {
    private readonly encryptation: string
    constructor (encryptation: string) {
      this.encryptation = encryptation
    }

    async createHash (): Promise<Object> {
      const hash = await crypto.createHash(this.encryptation)
      return hash
    }
  }
  return new CryptoAdapter('any_value')
}

describe('Crypto Adapter', () => {
  test('Should call hash with correct value ', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(crypto, 'createHash')
    await sut.createHash()
    expect(hashSpy).toHaveBeenCalledWith('any_value')
  })
})
