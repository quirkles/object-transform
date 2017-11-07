import same from '../src/same'

describe('Same', () => {
  it('returns an object with the expected properties', () => {
    expect(same()).toEqual({
      is_object_mapper_take_same_operator: true,
      default_value: null
    })
  })
  it('Accepts an optional argument that creates a default if not set', () => {
    expect(same('bananas')).toEqual({
      is_object_mapper_take_same_operator: true,
      default_value: 'bananas'
    })
  })
})
