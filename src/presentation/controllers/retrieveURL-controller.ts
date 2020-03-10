import { MissingParamError } from '../errors/missing-param-error'
import { badRequest, serverError, ok } from '../helpers/http-helper'
import { RetrieveData } from '../../domain/usescases/retrieve-data'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class RetrieveURLController implements Controller {
  constructor (private readonly retrieveData: RetrieveData) {
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.params.shortedUrl) {
        return badRequest(new MissingParamError('hash'))
      }
      const data = await this.retrieveData.retrieve(httpRequest.params.shortedUrl)
      return ok(data)
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
