import each from '../src/each'

describe('each', () => {
  describe('returns an operator object', () => {
    const input = {
      numbers: [1, 2, 3],
      objects: [
        {first_name: 'alex', lastName: 'smith', age: 20},
        {first_name: 'lisa', lastName: 'baker', age: 19},
        {first_name: 'danny', lastName: 'jones', age: 16},
      ]
    }
    it('returns an operator object container the expected modifiers', () => {
      expect(each('numbers')).toEqual(expect.objectContaining({
        do: expect.any(Function)
      }))
    })
    it('contains a "where" modifier for filtering', () => {
      const is_teenage = person => person.age < 20
      expect(each('objects').where(is_teenage).take('first_name')(input)).toEqual(['lisa', 'danny'])
    })

    it('contains a "do" modifier for arbitrary transforms', () => {
      expect(each('numbers').do(num => num * 2)(input)).toEqual([2, 4, 6])
    })
    it('contains a "take" modifier that plucks out one field from an object', () => {
      expect(each('objects').take('first_name')(input)).toEqual(['alex', 'lisa', 'danny'])
    })
  })
})
