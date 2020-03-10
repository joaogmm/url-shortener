import { Response } from 'express'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest, serverError } from '../helpers/http-helper'
import { RetrieveData } from '../../domain/usescases/retrieve-data'

export class RedirectURLController {
  constructor (private readonly retrieveData: RetrieveData) {
  }

  async handle (hash: string): Promise<Response> {
    try {
      if (!hash) {
        return badRequest(new MissingParamError('hash'))
      }
      const data = await this.retrieveData.retrieve(hash)
      return data
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
