import { HttpResponse, HttpRequest } from '../protocols/http'

export class ShortenerController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.url) {
      return {
        statusCode: 400,
        body: new Error('Missing param: url')
      }
    }
  }
}
