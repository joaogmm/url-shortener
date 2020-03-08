import { ShortenURLController } from './shortenURL-controller'
import { MissingParamError } from '../errors/missing-param-error'
import { URLValidator } from '../protocols/url-validator'
import { InvalidParamError } from '../errors/invalid-param-error'
import { ServerError } from '../errors/server-error'
import { AddData, AddDataModel } from '../../domain/usescases/add-url'
import { DataModel } from '../../domain/models/data'

const makeAddData = (): AddData => {
  class AddDataStub implements AddData {
    async add (data: AddDataModel): Promise<DataModel> {
      const fakeData = {
        id: 'valid_id',
        url: 'valid_url',
        hashedUrl: 'hashed_url'
      }
      return new Promise(resolve => resolve(fakeData))
    }
  }
  return new AddDataStub()
}

interface SutTypes {
  sut: ShortenURLController
  urlValidatorStub: URLValidator
  addDataStub: AddData
}

const makeSut = (): SutTypes => {
  class URLValidatorStub implements URLValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  const urlValidatorStub = new URLValidatorStub()
  const addDataStub = makeAddData()
  const sut = new ShortenURLController(urlValidatorStub, addDataStub)
  return {
    sut,
    urlValidatorStub,
    addDataStub
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

  test('Should call URLValidator with correct email', async () => {
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
    expect(addSpy).toBeCalledWith({
      url: 'valid_url'
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
      id: 'valid_id',
      url: 'valid_url',
      hashedUrl: 'hashed_url'
    })
  })
})
