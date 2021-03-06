import { fMap, fChain, filterNulls, arrWrap, replaceLast, doIfNotEmpty, doIfNotNull } from '../src/utils'

describe('fMap', () => {
  const double = n => 2 * n
  const numbers = [2, 3, 4, 5]
  it('Flips map', () => {
    expect(fMap(numbers, double)).toEqual([4, 6, 8, 10])
  })
  it('Flips map, curries', () => {
    const mapOverNumbers = fMap(numbers)
    expect(mapOverNumbers(double)).toEqual([4, 6, 8, 10])
  })
})

describe('fChain', () => {
  const doubleAndWrapInArray = n => [n * 2]
  const numbers = [2, 3, 4, 5]
  it('Flips chain', () => {
    expect(fChain(numbers, doubleAndWrapInArray)).toEqual([4, 6, 8, 10])
  })
  it('Flips map, curries', () => {
    const mapOverNumbers = fChain(numbers)
    expect(mapOverNumbers(doubleAndWrapInArray)).toEqual([4, 6, 8, 10])
  })
})

describe('filterNulls', () => {
  it('filters as expected', () => {
    const values = [1, 2, null, 'yes', {}, undefined]
    expect(filterNulls(values)).toEqual([1, 2, 'yes', {}])
  })
})

describe('arrWrap', () => {
  it('wraps anything that is not an array', () => {
    expect.assertions(6)
    const values = [1, 'hello', null, undefined, {}, true]
    values.forEach((value) => {
      expect(arrWrap(value)).toEqual([value])
    })
  })
  it('doesnt affect arrays', () => {
    expect.assertions(7)
    const values = [[], [1], ['hello'], [null], [undefined], [{}], [true]]
    values.forEach((value) => {
      expect(arrWrap(value)).toEqual(value)
    })
  })
})

describe('replaceLast', () => {
  it('doesnt affect empty array', () => {
    const original = []
    expect(replaceLast(true, original)).toEqual([])
  })
  it('replaces single element in array', () => {
    const original = [false]
    expect(replaceLast(true, original)).toEqual([true])
  })
  it('works on list', () => {
    const original = [false, false, false]
    expect(replaceLast(true, original)).toEqual([false, false, true])
  })
})


describe('doIfNotNull', () => {
  it('Does a function on a thing, if that thing is not null', () => {
    const double = n => n * 2
    const doubleIfNotNull = doIfNotNull(double)
    expect(doubleIfNotNull(5)).toEqual(10)
    expect(doubleIfNotNull(111)).toEqual(222)
    expect(doubleIfNotNull(null)).toEqual(null)
  })
})

describe('doIfNotEmpty', () => {
  it('Does a function on an array, if that array is not empty', () => {
    const sum = arr => arr.reduce((total, n) => total + n)
    const sumIfNotEmpty = doIfNotEmpty(sum)
    expect(sumIfNotEmpty([1, 2, 3])).toEqual(6)
    expect(sumIfNotEmpty([6, 7, 8])).toEqual(21)
    expect(sumIfNotEmpty([])).toEqual(null)
  })
})

