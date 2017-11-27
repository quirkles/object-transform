import extend from '../src/extend'

describe('extend', () => {
  it('extends an object from a schema, curried', () => {
    const input = {
      type: 'cat',
      age: 13,
      name: 'bruce',
    }
    const schema = {
      description: pet => `${pet.name} the ${pet.age} year old ${pet.type}`
    }
    const extender = extend(schema)
    expect(extender(input)).toEqual({
      type: 'cat',
      age: 13,
      name: 'bruce',
      description: 'bruce the 13 year old cat',
    })
  })
  it('extends an object from a schema, accepts both arguments at once', () => {
    const input = {
      type: 'cat',
      age: 13,
      name: 'bruce',
    }
    const schema = {
      description: pet => `${pet.name} the ${pet.age} year old ${pet.type}`
    }
    expect(extend(schema, input)).toEqual({
      type: 'cat',
      age: 13,
      name: 'bruce',
      description: 'bruce the 13 year old cat',
    })
  })
  it('overwrites coflicts, prefers the schema value', () => {
    const input = {
      enhanced: false,
      type: 'cat',
      age: 13,
      name: 'bruce',
    }
    const schema = {
      enhanced: true,
      description: pet => `${pet.name} the ${pet.age} year old ${pet.type}`
    }
    const extender = extend(schema)
    expect(extender(input)).toEqual({
      enhanced: true,
      type: 'cat',
      age: 13,
      name: 'bruce',
      description: 'bruce the 13 year old cat',
    })
  })
})
