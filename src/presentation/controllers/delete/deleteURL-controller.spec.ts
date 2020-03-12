import { MissingParamError } from '../../errors/missing-param-error'
import { DeleteData } from '../../../domain/usescases/delete-data'
import { InputDataModel } from '../../../domain/models/input-data'
import { DeleteURLController } from './deleteURL-Controller'
import { ServerError } from '../../errors/server-error'

const makeDeleteData = (): DeleteData => {
  class DeleteDataStub implements DeleteData {
    async delete (data: InputDataModel): Promise<number> {
      return new Promise(resolve => resolve(1))
    }
  }
  return new DeleteDataStub()
}

interface SutTypes {
  sut: DeleteURLController
  deleteDataStub: DeleteData
}

const makeSut = (): SutTypes => {
  const deleteDataStub = makeDeleteData()
  const sut = new DeleteURLController(deleteDataStub)
  return {
    sut,
    deleteDataStub
  }
}

describe('DeleteURL Controller', () => {
  test('Should return 400 if no shortUrl is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: { }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('shortUrl'))
  })

  test('Should return 204 if deletion succeed', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {
        shortUrl: 'any_value'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(204)
  })

  test('Should return 500 if Delete Data throws', async () => {
    const { sut, deleteDataStub } = makeSut()
    jest.spyOn(deleteDataStub, 'delete').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = {
      body: {
        shortUrl: 'any_url'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError(null))
  })
})
