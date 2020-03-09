import { Router } from 'express'

export default (router: Router): void => {
  router.post('/enshort', (req, res) => {
    res.json({ ok: 'ok' })
  })
}
