import { DataMongoRepository } from '../../infra/db/mongodb/data-repository/data'
import { DbRetrieveData } from '../../data/usecases/db-retrieve-data'
import { RedirectURLController } from '../../presentation/controllers/redirectURL-controller'

export const makeRedirectController = (): RedirectURLController => {
  const dataMongoRepository = new DataMongoRepository()
  const dbRetrieveData = new DbRetrieveData(dataMongoRepository)
  return new RedirectURLController(dbRetrieveData)
}
