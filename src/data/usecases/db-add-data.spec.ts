import { DbAddData } from './db-add-data'
import { DataModel } from '../models/add-url'
import { AddDataRepository } from '../protocols/db/add-data-repository'

const makeAddDataRepository = (): AddDataRepository => {
  class AddDataRepositoryStub implements AddDataRepository {
    async add (data: DataModel): Promise<DataModel> {
      const fakeReturn = {
        url: 'valid_url',
        shortedUrl: 'valid_hash'
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
      url: 'valid_url',
      shortedUrl: 'valid_hash'
    }
    await sut.add(data)
    expect(addSpy).toHaveBeenCalledWith({
      url: 'valid_url',
      shortedUrl: 'valid_hash'
    })
  })

  test('Should return an DataModel on success', async () => {
    const { sut } = makeSut()
    const data = {
      url: 'valid_url',
      shortedUrl: 'valid_hash'
    }
    const DataModel = await sut.add(data)
    expect(DataModel).toEqual({
      url: 'valid_url',
      shortedUrl: 'valid_hash'
    })
  })
})
