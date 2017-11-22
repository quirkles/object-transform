import createMapper, { get, each, join, shape, using } from '../src/index'

describe('Create mapper', () => {
  it('maps correctly', () => {
    const input = {
      firstName: 'pete',
      lastName: 'jones',
      currentAge: 15,
      occupation: 'Retail',
      email: 'pjones@gmail.com',
      pets: [
        {
          type: 'cat',
          name: 'bruce',
          age: 13,
        },
        {
          type: 'cat',
          name: 'pickles',
          age: 4,
        },
        {
          type: 'dog',
          name: 'buddy',
          age: 9,
        },
      ],
      address: {
        streetNumber: '55',
        streetName: 'Queen St',
        city: 'Toronto',
      },
    }

    const isType = type => pet => pet.type === type

    const schema = {
      name: join(['firstName', 'lastName'], '_'),
      age: get('currentAge'),
      occupation: get('occupation'),
      dogAges: each('pets').where(isType('dog')).get('age'),
      modifiedCats: each('pets').where(isType('cat')).shape({
        description: cat => `${cat.name} the ${cat.age} year old cat`,
        belongsToPete: true,
      }),
      contact_information: shape({
        email: get('email'),
        street_address: join(['address.streetNumber', 'address.streetName', 'address.city'], ' '),
      }),
    }

    const mapper = createMapper(schema)

    expect(mapper(input)).toEqual({
      age: 15,
      contact_information: {
        email: 'pjones@gmail.com',
        street_address: '55 Queen St Toronto',
      },
      dogAges: [9],
      modifiedCats: [
        {
          belongsToPete: true,
          description: 'bruce the 13 year old cat',
        },
        {
          belongsToPete: true,
          description: 'pickles the 4 year old cat',
        },
      ],
      name: 'pete_jones',
      occupation: 'Retail',
    })
  })
  it('lets you set a non fn as a value, handles null input', () => {
    const toUpper = str => str.toUpperCase()
    const schema = {
      name: 'fees',
      cost: 70,
      occupation: using('occupation').do(toUpper),
    }
    const mapper = createMapper(schema)
    expect(mapper({})).toEqual({
      name: 'fees',
      cost: 70,
      occupation: null,
    })
  })
  it('lets you set a non fn as a value, handles null input', () => {
    const input = {
      occupation: 'baller',
    }
    const toUpper = str => str.toUpperCase()
    const transform = shape({
      occupation: using('occupation').do(toUpper),
      balls: true,
    })
    expect(transform(input)).toEqual({
      occupation: 'BALLER',
      balls: true,
    })
  })
})

