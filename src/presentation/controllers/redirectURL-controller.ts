import { MissingParamError } from '../errors/missing-param-error'
import { badRequest, serverError, redirect, notFound } from '../helpers/http-helper'
import { RetrieveData } from '../../domain/usescases/retrieve-data'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { NotFoundParamError } from '../errors/notfound-param-error'

export class RedirectURLController {
  constructor (private readonly retrieveData: RetrieveData) {
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.params.hash) {
        return badRequest(new MissingParamError('hash'))
      }
      let url = await this.retrieveData.retrieve(httpRequest.params.hash)
      if (typeof url === 'undefined') {
        return notFound(new NotFoundParamError(httpRequest.params.hash))
      }
      if (!url.startsWith('https://') && (!url.startsWith('http://'))) {
        url = decodeURI('https://' + url)
      }
      return redirect(url)
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
