import { ShortenURLController } from './shortenURL-controller'
import { MissingParamError } from '../errors/missing-param-error'
import { URLValidator } from '../protocols/url-validator'
import { InvalidParamError } from '../errors/invalid-param-error'
import { ServerError } from '../errors/server-error'
import { AddData } from '../../domain/usescases/add-data'
import { DataModel } from '../../domain/models/data'
import { HashGenerator } from '../../data/protocols/cryptography/hashGenerator'

const makeAddData = (): AddData => {
  class AddDataStub implements AddData {
    async add (data: DataModel): Promise<DataModel> {
      const fakeData = {
        url: 'valid_url',
        shortedUrl: 'hashed_url'
      }
      return new Promise(resolve => resolve(fakeData))
    }
  }
  return new AddDataStub()
}

const makeHashGenerator = (): HashGenerator => {
  class HashGeneratorStub implements HashGenerator {
    async createHash (): Promise<string> {
      const fakeData = ('valid_hash')
      return new Promise(resolve => resolve(fakeData))
    }
  }
  return new HashGeneratorStub()
}

interface SutTypes {
  sut: ShortenURLController
  urlValidatorStub: URLValidator
  addDataStub: AddData
  hashGeneratorStub: HashGenerator
}

const makeSut = (): SutTypes => {
  class URLValidatorStub implements URLValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  const urlValidatorStub = new URLValidatorStub()
  const addDataStub = makeAddData()
  const hashGeneratorStub = makeHashGenerator()
  const sut = new ShortenURLController(urlValidatorStub, addDataStub, hashGeneratorStub)
  return {
    sut,
    urlValidatorStub,
    addDataStub,
    hashGeneratorStub
  }
}

describe('ShortenURL Controller', () => {
  test('Should return 400 if no url is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: { }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('url'))
  })

  test('Should return 400 if an invalid url is provided', async () => {
    const { sut, urlValidatorStub } = makeSut()
    jest.spyOn(urlValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        url: 'invalid_url'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('url'))
  })

  test('Should call URLValidator with correct url', async () => {
    const { sut, urlValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(urlValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        url: 'any_url'
      }
    }
    await sut.handle(httpRequest)
    expect(isValidSpy).toBeCalledWith('any_url')
  })

  test('Should return 500 if URLValidator throws', async () => {
    const { sut, urlValidatorStub } = makeSut()
    jest.spyOn(urlValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        url: 'any_url'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should call AddData with correct values', async () => {
    const { sut, addDataStub } = makeSut()
    const addSpy = jest.spyOn(addDataStub, 'add')
    const httpRequest = {
      body: {
        url: 'valid_url'
      }
    }
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      url: 'valid_url',
      shortedUrl: 'valid_hash'
    })
  })

  test('Should return 500 if AddData throws', async () => {
    const { sut, addDataStub } = makeSut()
    jest.spyOn(addDataStub, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = {
      body: {
        url: 'any_url'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        url: 'valid_url'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      url: 'valid_url',
      shortedUrl: 'www.curtin.com/valid_hash'
    })
  })
})
