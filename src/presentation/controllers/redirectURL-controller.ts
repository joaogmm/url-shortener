import { Response, Request } from 'express'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest, serverError } from '../helpers/http-helper'
import { RetrieveData } from '../../domain/usescases/retrieve-data'

export class RedirectURLController {
  constructor (private readonly retrieveData: RetrieveData) {
  }

  async handle (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.params.hash) {
        return badRequest(new MissingParamError('hash'))
      }
      const data = await this.retrieveData.retrieve(req.params.hash)
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
