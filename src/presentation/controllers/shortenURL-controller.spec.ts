import { ShortenerController } from './shortenURL-controller'
import { MissingParamError } from '../errors/missing-param-error'

describe('ShortenURL Controller', () => {
  test('Should return 400 if no url is provided', () => {
    const sut = new ShortenerController()
    const httpRequest = { body: {} }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('url'))
  })
})