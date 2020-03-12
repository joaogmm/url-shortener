import { MissingParamError } from '../../errors/missing-param-error'
import { badRequest, serverError, ok, notFound } from '../../helpers/http-helper'
import { RetrieveData } from '../../../domain/usescases/retrieve-data'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { NotFoundParamError } from '../../errors/notfound-param-error'

export class RetrieveURLController implements Controller {
  constructor (private readonly retrieveData: RetrieveData) {
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.params.shortUrl) {
        return badRequest(new MissingParamError('URL'))
      }
      const url = await this.retrieveData.retrieve(httpRequest.params.shortUrl)
      if (typeof url === 'undefined' || url === null) {
        return notFound(new NotFoundParamError(httpRequest.params.shortUrl))
      }
      return ok({ url })
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}
