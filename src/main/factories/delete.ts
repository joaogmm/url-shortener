import { DataMongoRepository } from '../../infra/db/mongodb/data-repository/data'
import { DeleteURLController } from '../../presentation/controllers/delete/deleteURL-Controller'
import { DbDeleteData } from '../../data/usecases/db-delete-data'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log'
import { LogControllerDecorator } from '../decorator/log'
import { Controller } from '../../presentation/protocols/controller'

export const makeDeleteController = (): Controller => {
  // Data
  const dataMongoRepository = new DataMongoRepository()
  const dbDeleteData = new DbDeleteData(dataMongoRepository)

  // Build the controller
  const deleteURLController = new DeleteURLController(dbDeleteData)

  // Log
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(deleteURLController, logMongoRepository)
}
