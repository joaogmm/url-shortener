import { HttpResponse, HttpRequest } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'

export class ShortenerController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.url) {
      return {
        statusCode: 400,
        body: new MissingParamError('url')
      }
    }
  }
}
