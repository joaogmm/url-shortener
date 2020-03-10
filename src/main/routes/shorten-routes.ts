import { Router } from 'express'
import { makeShortenController } from '../factories/shorten'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeRetrieveController } from '../factories/retrieve'
import { makeRedirectController } from '../factories/redirect'

export default (router: Router): void => {
  router.post('/enshort', adaptRoute(makeShortenController()))
  router.get('/retrieve/:shortedUrl', async function (req, res) { res.send(await makeRetrieveController().handle(req)) })
  router.get('/:hash', async function (req, res) {
    const result = await makeRedirectController().handle(req, res)
    console.log('Return is ', result)
    res.redirect(result.url)
  })
}
