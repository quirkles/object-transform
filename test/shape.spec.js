import shape from '../src/shape'

describe('shape', () => {
  it('creates a mapper from a schema, curried', () => {
    const input = {
      type: 'cat',
      age: 13,
      name: 'bruce',
    }
    const schema = {
      description: pet => `${pet.name} the ${pet.age} year old ${pet.type}`
    }
    const shaper = shape(schema)
    expect(shaper(input)).toEqual({
      description: 'bruce the 13 year old cat',
    })
  })
  it('creates a mapper from a schema, accepts both arguments at once', () => {
    const input = {
      type: 'cat',
      age: 13,
      name: 'bruce',
    }
    const schema = {
      description: pet => `${pet.name} the ${pet.age} year old ${pet.type}`
    }
    expect(shape(schema, input)).toEqual({
      description: 'bruce the 13 year old cat',
    })
  })
})
