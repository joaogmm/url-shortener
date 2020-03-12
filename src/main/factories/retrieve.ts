import { DataMongoRepository } from '../../infra/db/mongodb/data-repository/data'
import { RetrieveURLController } from '../../presentation/controllers/retrieve/retrieveURL-controller'
import { DbRetrieveData } from '../../data/usecases/db-retrieve-data'
import { Controller } from '../../presentation/protocols/controller'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log'
import { LogControllerDecorator } from '../decorator/log'

export const makeRetrieveController = (): Controller => {
  // Data
  const dataMongoRepository = new DataMongoRepository()
  const dbRetrieveData = new DbRetrieveData(dataMongoRepository)

  // Build the controller
  const retrieveURLController = new RetrieveURLController(dbRetrieveData)

  // Log
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(retrieveURLController, logMongoRepository)
}
