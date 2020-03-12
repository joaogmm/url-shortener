import { DataMongoRepository } from '../../infra/db/mongodb/data-repository/data'
import { RetrieveURLController } from '../../presentation/controllers/retrieve/retrieveURL-controller'
import { DbRetrieveData } from '../../data/usecases/db-retrieve-data'

export const makeRetrieveController = (): RetrieveURLController => {
  const dataMongoRepository = new DataMongoRepository()
  const dbRetrieveData = new DbRetrieveData(dataMongoRepository)
  return new RetrieveURLController(dbRetrieveData)
}
