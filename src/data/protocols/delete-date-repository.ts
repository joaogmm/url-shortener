import { DeleteData } from '../../domain/usescases/delete-data'

export interface DeleteDataRepository {
  delete (shortedUrl: DeleteData): Promise<string>
}
