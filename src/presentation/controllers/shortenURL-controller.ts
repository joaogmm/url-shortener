import { HttpResponse, HttpRequest } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest, serverError, ok } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { URLValidator } from '../protocols/url-validator'
import { InvalidParamError } from '../errors/invalid-param-error'
import { AddData } from '../../domain/usescases/add-url'

export class ShortenURLController implements Controller {
  constructor (private readonly urlValidator: URLValidator, private readonly addData: AddData) {
    this.urlValidator = urlValidator
    this.addData = addData
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
      const { url } = httpRequest.body
      const data = this.addData.add({
        url
      })
      return ok(data)
    } catch (error) {
      return serverError()
    }
  }
}
