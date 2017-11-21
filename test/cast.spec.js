import cast from '../src/cast'

describe('cast', () => {
  describe('When operating on data', () => {
    const input = {
      age: '67',
      money: 4000,
      children: 0,
    }
    it('asNumber works', () => {
      const ageAsNumber = cast('age').asNumber
      expect(ageAsNumber(input)).toEqual(67)
    })
    it('asString', () => {
      const moneyAsString = cast('money').asString
      expect(moneyAsString(input)).toEqual('4000')
    })
    it('asBool', () => {
      const childrenAsBool = cast('children').asBool
      expect(childrenAsBool(input)).toEqual(false)
    })
  })
  describe('Works on empty dicts', () => {
    const input = {}
    it('asNumber works', () => {
      const ageAsNumber = cast('age').asNumber
      expect(ageAsNumber(input)).toEqual(0)
    })
    it('asString', () => {
      const moneyAsString = cast('money').asString
      expect(moneyAsString(input)).toEqual('null')
    })
    it('asBool', () => {
      const childrenAsBool = cast('children').asBool
      expect(childrenAsBool(input)).toEqual(false)
    })
  })
})
