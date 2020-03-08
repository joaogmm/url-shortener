import { URLValidator } from '../presentation/protocols/url-validator'
import validator from 'validator'

export class URLValidatorAdapter implements URLValidator {
  isValid (url: string): boolean {
    return validator.isURL(url)
  }
}
