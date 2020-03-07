import { ShortenURLController } from './shortenURL-controller'
import { MissingParamError } from '../errors/missing-param-error'
import { URLValidator } from '../protocols/url-validator'
import { InvalidParamError } from '../errors/invalid-param-error'
import { ServerError } from '../errors/server-error'

interface SutTypes {
  sut: ShortenURLController
  urlValidatorStub: URLValidator
}

const makeSut = (): SutTypes => {
  class URLValidatorStub implements URLValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  const urlValidatorStub = new URLValidatorStub()
  const sut = new ShortenURLController(urlValidatorStub)
  return {
    sut,
    urlValidatorStub
  }
}

describe('ShortenURL Controller', () => {
  test('Should return 400 if no url is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: { }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('url'))
  })

  test('Should return 400 if an invalid url is provided', () => {
    const { sut, urlValidatorStub } = makeSut()
    jest.spyOn(urlValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        url: 'invalid_url'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('url'))
  })

  test('Should call URLValidator with correct email', () => {
    const { sut, urlValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(urlValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        url: 'any_url'
      }
    }
    sut.handle(httpRequest)
    expect(isValidSpy).toBeCalledWith('any_url')
  })

  test('Should return 500 if URLValidator throws', () => {
    class URLValidatorStub implements URLValidator {
      isValid (email: string): boolean {
        throw new Error()
      }
    }
    const urlValidatorStub = new URLValidatorStub()
    const sut = new ShortenURLController(urlValidatorStub)
    const httpRequest = {
      body: {
        url: 'invalid_url'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
