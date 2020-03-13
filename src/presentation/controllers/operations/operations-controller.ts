import { DataOperations } from '../../../domain/usescases/ops-data'
import { Controller } from '../../protocols/controller'
import { HttpResponse, HttpRequest } from '../../protocols/http'
import { deleteNoContent, badRequest, notFound, serverError, redirect, ok } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors/missing-param-error'
import { NotFoundParamError } from '../../errors/notfound-param-error'

export class OperationsController implements Controller {
  constructor (
    private readonly manageData: DataOperations,
    private readonly opt: string) {
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (this.opt === 'delete') {
      return this.delete(httpRequest)
    } else if (this.opt === 'retrieve') {
      return this.retrieve(httpRequest)
    } else {
      return this.redirect(httpRequest)
    }
  }

  async delete (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const shortUrl = httpRequest.params.shortUrl
      if (!shortUrl) {
        return badRequest(new MissingParamError('shortUrl'))
      }
      const result = await this.manageData.delete(shortUrl)
      /* istanbul ignore next */ if (result > 0) {
        return deleteNoContent()
      }
      /* istanbul ignore next */ return notFound(new NotFoundParamError('shortUrl'))
    } catch (error) {
      return serverError(error)
    }
  }

  async redirect (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.params.hash) {
        return badRequest(new MissingParamError('URL'))
      }
      let url = await this.manageData.retrieve(httpRequest.params.hash)
      if (typeof url === 'undefined') {
        return notFound(new NotFoundParamError(httpRequest.params.hash))
      } else
      /* istanbul ignore next */ if (!url.startsWith('https://') && (!url.startsWith('http://'))) {
        url = decodeURI('https://' + url)
      }
      return redirect(url)
    } catch (error) {
      return serverError(error)
    }
  }

  async retrieve (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.params.hash) {
        return badRequest(new MissingParamError('URL'))
      }
      const url = await this.manageData.retrieve(httpRequest.params.hash)
      if (typeof url === 'undefined' || url === null) {
        return notFound(new NotFoundParamError(httpRequest.params.hash))
      }
      return ok({ url })
    } catch (error) {
      return serverError(error)
    }
  }
}
