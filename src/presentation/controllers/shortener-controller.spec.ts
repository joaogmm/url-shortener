import { ShortenerController } from './shortener-controller'

describe('Shortener Controller', () => {
  test('Should return 400 if no url is provided', () => {
    const sut = new ShortenerController()
    const httpRequest = {}
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
