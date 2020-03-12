import { MissingParamError } from '../../errors/missing-param-error'
import { InputDataModel } from '../../../domain/models/input-data'
import { ServerError } from '../../errors/server-error'
import { RetrieveData } from '../../../domain/usescases/retrieve-data'
import { RetrieveURLController } from '../redirect/retrieveURL-controller'

const makeRetrieveData = (): RetrieveData => {
  class RetrieveDataStub implements RetrieveData {
    async retrieve (shortUrl: InputDataModel): Promise<string> {
      return new Promise(resolve => resolve('any_url'))
    }
  }
  return new RetrieveDataStub()
}

interface SutTypes {
  sut: RetrieveURLController
  retrieveDataStub: RetrieveData
}

const makeSut = (): SutTypes => {
  const retrieveDataStub = makeRetrieveData()
  const sut = new RetrieveURLController(retrieveDataStub)
  return {
    sut,
    retrieveDataStub
  }
}

describe('RetrieveURL Controller', () => {
  test('Should return 400 if no shortUrl is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: { }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('URL'))
  })

  test('Should return 200 if retrieve succeed', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {
        shortUrl: 'any_url'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({ url: 'any_url' })
  })

  test('Should return 500 if Retrieve Data throws', async () => {
    const { sut, retrieveDataStub } = makeSut()
    jest.spyOn(retrieveDataStub, 'retrieve').mockImplementationOnce(async () => {
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
