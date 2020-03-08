import { URLValidatorAdapter } from './url-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isURL (): boolean {
    return true
  }
}))

describe('URL Validator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = new URLValidatorAdapter()
    jest.spyOn(validator, 'isURL').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_url')
    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const sut = new URLValidatorAdapter()
    const isValid = sut.isValid('www.google.com')
    expect(isValid).toBe(true)
  })

  test('Should call validator with correct url', () => {
    const sut = new URLValidatorAdapter()
    const isURLSpy = jest.spyOn(validator, 'isURL')
    sut.isValid('www.google.com')
    expect(isURLSpy).toHaveBeenCalledWith('www.google.com')
  })
})
