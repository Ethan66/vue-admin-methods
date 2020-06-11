import utils from '../../src/index'

describe('Is test', () => {
  test('isArray must return a boolean', () => {
    expect(utils.isArray([])).toBe(true)
    expect(utils.isArray(1)).toBe(false)
  })
})