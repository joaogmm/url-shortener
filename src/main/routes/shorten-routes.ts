import { Router } from 'express'
import { makeShortenController } from '../factories/shorten'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeRetrieveController } from '../factories/retrieve'
import { makeRedirectController } from '../factories/redirect'
import { makeDeleteController } from '../factories/delete'

export default (router: Router): void => {
  router.get('/:hash', adaptRoute(makeRedirectController()))
  // API
  router.delete('/delete/www.curtin.com/:shortUrl', adaptRoute(makeDeleteController()))
  router.post('/enshort', adaptRoute(makeShortenController()))
  router.get('/retrieve/www.curtin.com/:shortUrl', adaptRoute(makeRetrieveController()))
}
