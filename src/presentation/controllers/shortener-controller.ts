import { Controller } from '../protocols/controller'

export class ShortenerController implements Controller {
  handle (httpRequest: any): any {
    return {
      statusCode: 400
    }
  }
}
