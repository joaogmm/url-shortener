import { Router } from 'express'
import { makeShortenController } from '../factories/shorten'
import { adaptRoute } from '../adapters/exporess-route-adapter'

export default (router: Router): void => {
  router.post('/enshort', adaptRoute(makeShortenController()))
}
