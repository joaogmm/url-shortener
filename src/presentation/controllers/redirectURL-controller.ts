import { MissingParamError } from '../errors/missing-param-error'
import { badRequest, serverError, redirect } from '../helpers/http-helper'
import { RetrieveData } from '../../domain/usescases/retrieve-data'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class RedirectURLController {
  constructor (private readonly retrieveData: RetrieveData) {
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.params.hash) {
        return badRequest(new MissingParamError('hash'))
      }
      const data = await this.retrieveData.retrieve(httpRequest.params.hash)
      console.log(data)
      return redirect(data)
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
