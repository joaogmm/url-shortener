import { Router } from 'express'
import { makeShortenController } from '../factories/shorten'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeRetrieveController } from '../factories/retrieve'
import { makeRedirectController } from '../factories/redirect'

export default (router: Router): void => {
  router.post('/enshort', adaptRoute(makeShortenController()))
  router.get('/retrieve/:shortedUrl', adaptRoute(makeRetrieveController()))
  router.get('/:hash', adaptRoute(makeRedirectController()))
}
