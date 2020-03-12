import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeGenericController } from '../factories/operations-factory'
import { makeShortenController } from '../factories/shorten'

export default (router: Router): void => {
  router.post('/enshort', adaptRoute(makeShortenController()))
  // API
  router.delete('/delete/www.curtin.com/:shortUrl', adaptRoute(makeGenericController('delete')))
  router.get('/:hash', adaptRoute(makeGenericController('redirect')))
  router.get('/retrieve/www.curtin.com/:hash', adaptRoute(makeGenericController('retrieve')))
}
