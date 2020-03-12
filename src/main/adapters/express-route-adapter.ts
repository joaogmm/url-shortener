
import { Request, Response } from 'express'
import { HttpRequest } from '../../presentation/protocols/http'
import { Controller } from '../../presentation/protocols/controller'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        errorCode: httpResponse.statusCode,
        error: httpResponse.body.message
      })
    }
  }
}
