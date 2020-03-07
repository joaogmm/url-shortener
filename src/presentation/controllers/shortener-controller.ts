import { HttpResponse, HttpRequest } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'

export class ShortenerController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.url) {
      return badRequest(new MissingParamError('url'))
    }
  }
}
