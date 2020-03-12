import { HttpResponse } from '../protocols/http'
import { ServerError } from '../errors/server-error'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const redirect = (data: any): HttpResponse => ({
  statusCode: 301,
  body: data
})

export const deleteNoContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})

export const notFound = (data: any): HttpResponse => ({
  statusCode: 404,
  body: data
})
