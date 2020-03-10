export interface HttpResponse {
  statusCode: number
  body: any
}

export interface HttpRequest {
  body?: any // Optional
  params?: any
}
