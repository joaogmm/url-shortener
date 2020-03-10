import { Response, Request } from 'express'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest, serverError } from '../helpers/http-helper'
import { RetrieveData } from '../../domain/usescases/retrieve-data'

export class RetrieveURLController {
  constructor (private readonly retrieveData: RetrieveData) {
  }

  async handle (req: Request): Promise<Response> {
    try {
      if (!req.params.shortedUrl) {
        return badRequest(new MissingParamError('hash'))
      }
      const data = await this.retrieveData.retrieve(req.params.shortedUrl)
      return data
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
