import { MissingParamError } from '../../errors/missing-param-error'
import { InputDataModel } from '../../../domain/models/input-data'
import { ServerError } from '../../errors/server-error'
import { RetrieveData } from '../../../domain/usescases/retrieve-data'
import { RedirectURLController } from './redirectURL-controller'

const makeRedirectData = (): RetrieveData => {
  class RedirectDataStub implements RetrieveData {
    async retrieve (shortUrl: InputDataModel): Promise<string> {
      return new Promise(resolve => resolve('https://www.google.com/'))
    }
  }
  return new RedirectDataStub()
}

interface SutTypes {
  sut: RedirectURLController
  redirectDataStub: RetrieveData
}

const makeSut = (): SutTypes => {
  const redirectDataStub = makeRedirectData()
  const sut = new RedirectURLController(redirectDataStub)
  return {
    sut,
    redirectDataStub
  }
}

describe('RedirectURL Controller', () => {
  test('Should return 400 if no shortUrl is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: { }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('URL'))
  })

  test('Should return 302 if redirect succeed', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {
        hash: 'any_hash'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(301)
  })

  test('Should return 500 if Redirect Data throws', async () => {
    const { sut, redirectDataStub } = makeSut()
    jest.spyOn(redirectDataStub, 'retrieve').mockImplementationOnce(async () => {
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
