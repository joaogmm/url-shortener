
import { Request, Response } from 'express'
import { HttpRequest } from '../../presentation/protocols/http'
import { Controller } from '../../presentation/protocols/controller'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params
    }
    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else if (httpResponse.statusCode === 301) {
      console.log('No redirect: ', httpResponse.body.url)
      res.redirect(httpResponse.body.url)
    } else {
      res.status(httpResponse.statusCode).json({
        errorCode: httpResponse.statusCode,
        error: httpResponse.body.message
      })
    }
  }
}
