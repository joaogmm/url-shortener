import { DbAddData } from './db-add-data'
import { DataModel } from '../models/add-url'
import { AddDataRepository } from '../protocols/add-data-repository'

const makeAddDataRepository = (): AddDataRepository => {
  class AddDataRepositoryStub implements AddDataRepository {
    async add (data: DataModel): Promise<DataModel> {
      const fakeReturn = {
        _id: 'valid_id',
        originalUrl: 'original_url',
        shortedUrl: 'shorted_url'
      }
      return new Promise(resolve => resolve(fakeReturn))
    }
  }
  return new AddDataRepositoryStub()
}

interface SutTypes {
  sut: DbAddData
  addDataRepositoryStub: AddDataRepository
}

const makeSut = (): SutTypes => {
  const addDataRepositoryStub = makeAddDataRepository()
  const sut = new DbAddData(addDataRepositoryStub)
  return {
    sut,
    addDataRepositoryStub
  }
}

describe('DbAddData usecase', () => {
  test('Should return call addDataRepository with correct value', async () => {
    const { sut, addDataRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addDataRepositoryStub, 'add')
    const data = {
      originalUrl: 'valid_url',
      shortedUrl: 'valid_hash'
    }
    await sut.add(data)
    expect(addSpy).toHaveBeenCalledWith({
      originalUrl: 'valid_url',
      shortedUrl: 'valid_hash'
    })
  })
})
