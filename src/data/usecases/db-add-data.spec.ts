import { DbAddData } from './db-add-data'
import { HashGenerator } from '../protocols/hashGenerator'

describe('DbAddData usecase', () => {
  test('Should return call hashGenerator with correct value', async () => {
    class HashGeneratorStub implements HashGenerator {
      async genHash (hashSize: number): Promise<string> {
        return new Promise(resolve => resolve('hashed_password'))
      }
    }
    const hashGeneratorStub = new HashGeneratorStub()
    const sut = new DbAddData(hashGeneratorStub)
    const hashGenSpy = jest.spyOn(hashGeneratorStub, 'genHash')
    const data = {
      url: 'www.google.com'
    }
    await sut.add(data)
    expect(hashGenSpy).toHaveBeenCalledWith(8)
  })
})
