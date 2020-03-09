import { ShortenURLController } from '../../presentation/controllers/shortenURL-controller'
import { URLValidatorAdapter } from '../../utils/url-validator-adapter'
import { DbAddData } from '../../data/usecases/db-add-data'
import { CryptoAdapter } from '../../infra/cryptography/crypto/crypto-adapter'
import { DataMongoRepository } from '../../infra/db/mongodb/data-repository/data'

export const makeShortenController = (): ShortenURLController => {
  const encryptation = ('sha-1')
  const urlValidatorAdapter = new URLValidatorAdapter()
  const cryptoAdapter = new CryptoAdapter(encryptation)
  const dataMongoRepository = new DataMongoRepository()
  const dbAddData = new DbAddData(dataMongoRepository)
  return new ShortenURLController(urlValidatorAdapter, dbAddData, cryptoAdapter)
}
