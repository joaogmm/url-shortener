import { ShortenURLController } from '../../presentation/controllers/shorten/shortenURL-controller'
import { URLValidatorAdapter } from '../../utils/url-validator-adapter'
import { DbAddData } from '../../data/usecases/db-add-data'
import { CryptoAdapter } from '../../infra/cryptography/crypto/crypto-adapter'
import { DataMongoRepository } from '../../infra/db/mongodb/data-repository/data'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log'
import { LogControllerDecorator } from '../decorator/log'
import { Controller } from '../../presentation/protocols/controller'

export const makeShortenController = (): Controller => {
  const encryptation = ('md5')
  // Adapters
  const urlValidatorAdapter = new URLValidatorAdapter()
  const cryptoAdapter = new CryptoAdapter(encryptation)

  // Data
  const dataMongoRepository = new DataMongoRepository()
  const dbAddData = new DbAddData(dataMongoRepository)

  // Build the controller
  const shortenURLController = new ShortenURLController(urlValidatorAdapter, dbAddData, cryptoAdapter)

  // Log
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(shortenURLController, logMongoRepository)
}
