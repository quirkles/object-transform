import create_mapper, { get, each, join, shape } from '../src/index'

describe('Create mapper', () => {
  it('maps correctly', () => {
    const input = {
      first_name: 'pete',
      last_name: 'jones',
      current_age: 15,
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
        street_number: '55',
        street_name: 'Queen St',
        city: 'Toronto',
      },
    }

    const schema = {
      name: join(['first_name', 'last_name'], '_'),
      age: get('current_age'),
      occupation: get('occupation'),
      contact_information: shape({
        email: get('email'),
        street_address: join(['address.street_number', 'address.street_name', 'address.city'], ' '),
      }),
    }

    const mapper = create_mapper(schema)

    expect(mapper(input)).toEqual({
      name: 'pete_jones',
      age: 15,
      occupation: 'Retail',
      contact_information: {
        email: 'pjones@gmail.com',
        street_address: '55 Queen St Toronto',
      },
    })
  })
})

