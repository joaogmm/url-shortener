import { DataMongoRepository } from '../../infra/db/mongodb/data-repository/data'
import { DeleteURLController } from '../../presentation/controllers/delete/deleteURL-Controller'
import { DbDeleteData } from '../../data/usecases/db-delete-data'

export const makeDeleteController = (): DeleteURLController => {
  const dataMongoRepository = new DataMongoRepository()
  const dbDeleteData = new DbDeleteData(dataMongoRepository)
  return new DeleteURLController(dbDeleteData)
}
