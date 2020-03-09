import { HttpResponse, HttpRequest } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest, serverError, ok } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { URLValidator } from '../protocols/url-validator'
import { InvalidParamError } from '../errors/invalid-param-error'
import { AddData } from '../../domain/usescases/add-data'
import { HashGenerator } from '../../data/protocols/hashGenerator'

export class ShortenURLController implements Controller {
  constructor (
    private readonly urlValidator: URLValidator,
    private readonly addData: AddData,
    private readonly hashGenerator: HashGenerator) {
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.body.originalUrl) {
        return badRequest(new MissingParamError('originalUrl'))
      }
      const isValid = this.urlValidator.isValid(httpRequest.body.originalUrl)
      if (!isValid) {
        return badRequest(new InvalidParamError('originalUrl'))
      }
      const { originalUrl } = httpRequest.body
      const shortedUrl = await this.hashGenerator.createHash()
      const data = await this.addData.add({
        originalUrl,
        shortedUrl
      })
      return ok(data)
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
