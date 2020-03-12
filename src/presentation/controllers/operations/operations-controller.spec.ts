import { MissingParamError } from '../../errors/missing-param-error'
import { DataOperations } from '../../../domain/usescases/ops-data'
import { InputDataModel } from '../../../domain/models/input-data'
import { ServerError } from '../../errors/server-error'
import { OperationsController } from './operations-controller'

const makeDataOperations = (): DataOperations => {
  class DataOperationsStub implements DataOperations {
    async delete (data: InputDataModel): Promise<number> {
      return new Promise(resolve => resolve(1))
    }

    async retrieve (shortUrl: InputDataModel): Promise<string> {
      return new Promise(resolve => resolve('any_url'))
    }
  }
  return new DataOperationsStub()
}

interface SutTypes {
  sut: OperationsController
  dataOperationsStub: DataOperations
}

const makeSut = (opt: string): SutTypes => {
  const dataOperationsStub = makeDataOperations()
  const sut = new OperationsController(dataOperationsStub, opt)
  return {
    sut,
    dataOperationsStub
  }
}

describe('Delete URL', () => {
  test('Should return 400 if no shortUrl is provided', async () => {
    const { sut } = makeSut('delete')
    const httpRequest = {
      params: {}
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('shortUrl'))
  })

  test('Should return 204 if deletion succeed', async () => {
    const { sut } = makeSut('delete')
    const httpRequest = {
      params: {
        shortUrl: 'any_value'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(204)
  })

  test('Should return 500 if Delete Data throws', async () => {
    const { sut, dataOperationsStub } = makeSut('delete')
    jest.spyOn(dataOperationsStub, 'delete').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = {
      body: {
        shortUrl: 'any_url'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError(null))
  })
})

describe('RedirectURL Controller', () => {
  test('Should return 400 if no shortUrl is provided', async () => {
    const { sut } = makeSut('redirect')
    const httpRequest = {
      params: {}
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('URL'))
  })

  test('Should return 302 if redirect succeed', async () => {
    const { sut } = makeSut('redirect')
    const httpRequest = {
      params: {
        hash: 'any_hash'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(301)
  })

  test('Should return 500 if Redirect Data throws', async () => {
    const { sut, dataOperationsStub } = makeSut('redirect')
    jest.spyOn(dataOperationsStub, 'retrieve').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = {
      body: {
        shortUrl: 'any_url'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError(null))
  })
})

describe('RetrieveURL Controller', () => {
  test('Should return 400 if no shortUrl is provided', async () => {
    const { sut } = makeSut('retrieve')
    const httpRequest = {
      params: {}
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('URL'))
  })

  test('Should return 200 if retrieve succeed', async () => {
    const { sut } = makeSut('retrieve')
    const httpRequest = {
      params: {
        hash: 'any_url'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.body).toEqual({ url: 'any_url' })
    expect(httpResponse.statusCode).toBe(200)
  })

  test('Should return 500 if Retrieve Data throws', async () => {
    const { sut, dataOperationsStub } = makeSut('retrieve')
    jest.spyOn(dataOperationsStub, 'retrieve').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = {
      body: {
        shortUrl: 'any_url'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError(null))
  })

  test('Should be correctly treated if it returns undefined', async () => {
    const { sut, dataOperationsStub } = makeSut('retrieve')
    jest.spyOn(dataOperationsStub, 'retrieve').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => resolve(undefined))
    })
    const httpRequest = {
      params: {
        hash: 'https://www.google.com/'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(404)
    expect(httpResponse.body).toBeTruthy()
  })
})
