import { Router } from 'express'
import { makeShortenController } from '../factories/shorten'
import { adaptRoute } from '../adapters/exporess-route-adapter'
import { makeRetrieveController } from '../factories/retrieve'

export default (router: Router): void => {
  router.post('/enshort', adaptRoute(makeShortenController()))
  router.get('/retrieve', adaptRoute(makeRetrieveController()))
}
