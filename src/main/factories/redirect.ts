import { DataMongoRepository } from '../../infra/db/mongodb/data-repository/data'
import { DbRetrieveData } from '../../data/usecases/db-retrieve-data'
import { RedirectURLController } from '../../presentation/controllers/redirect/redirectURL-controller'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log'
import { LogControllerDecorator } from '../decorator/log'
import { Controller } from '../../presentation/protocols/controller'

export const makeRedirectController = (): Controller => {
  // Data
  const dataMongoRepository = new DataMongoRepository()
  const dbRetrieveData = new DbRetrieveData(dataMongoRepository)

  // Build the controller
  const redirectURLController = new RedirectURLController(dbRetrieveData)

  // Log
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(redirectURLController, logMongoRepository)
}
