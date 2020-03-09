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
      if (!httpRequest.body.url) {
        return badRequest(new MissingParamError('url'))
      }
      const isValid = this.urlValidator.isValid(httpRequest.body.url)
      if (!isValid) {
        return badRequest(new InvalidParamError('url'))
      }
      const { url } = httpRequest.body
      let shortedUrl = await this.hashGenerator.createHash()
      await this.addData.add({
        url,
        shortedUrl
      })
      shortedUrl = 'www.curtin.com/' + shortedUrl
      return ok({
        url,
        shortedUrl
      })
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
