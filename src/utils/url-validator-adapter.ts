import { URLValidator } from '../presentation/protocols/url-validator'

export class URLValidatorAdapter implements URLValidator {
  isValid (url: string): boolean {
    return false
  }
}
