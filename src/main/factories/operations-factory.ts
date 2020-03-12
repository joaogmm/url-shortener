import { DataMongoRepository } from '../../infra/db/mongodb/data-repository/data'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log'
import { LogControllerDecorator } from '../decorator/log'
import { Controller } from '../../presentation/protocols/controller'
import { OperationsController } from '../../presentation/controllers/operations/operations-controller'
import { DbOperationsData } from '../../data/usecases/db-operations-data'

export const makeGenericController = (opt: string): Controller => {
  // Data
  const dataMongoRepository = new DataMongoRepository()
  const dbOperationsData = new DbOperationsData(dataMongoRepository)

  // Build the controller
  const opsController = new OperationsController(dbOperationsData, opt)

  // Log
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(opsController, logMongoRepository)
}
