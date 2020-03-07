import { HttpResponse, HttpRequest } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest, serverError } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { URLValidator } from '../protocols/url-validator'
import { InvalidParamError } from '../errors/invalid-param-error'

export class ShortenURLController implements Controller {
  constructor (private readonly urlValidator: URLValidator) {
    this.urlValidator = urlValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      if (!httpRequest.body.url) {
        return badRequest(new MissingParamError('url'))
      }
      const isValid = this.urlValidator.isValid(httpRequest.body.url)
      if (!isValid) {
        return badRequest(new InvalidParamError('url'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
