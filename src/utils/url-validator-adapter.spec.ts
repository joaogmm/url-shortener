import { URLValidatorAdapter } from './url-validator-adapter'

describe('URL Validator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = new URLValidatorAdapter()
    const isValid = sut.isValid('invalid_url')
    expect(isValid).toBe(false)
  })
})
