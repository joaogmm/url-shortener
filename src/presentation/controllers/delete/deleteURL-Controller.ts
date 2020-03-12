import { MissingParamError } from '../../errors/missing-param-error'
import { badRequest, serverError, deleteNoContent, notFound } from '../../helpers/http-helper'
import { DeleteData } from '../../../domain/usescases/delete-data'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { NotFoundParamError } from '../../errors/notfound-param-error'

export class DeleteURLController implements Controller {
  constructor (private readonly deleteData: DeleteData) {
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const shortUrl = httpRequest.params.shortUrl
      if (!shortUrl) {
        return badRequest(new MissingParamError('shortUrl'))
      }
      const result = await this.deleteData.delete(shortUrl)
      if (result > 0) {
        return deleteNoContent()
      }
      return notFound(new NotFoundParamError('shortUrl'))
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}