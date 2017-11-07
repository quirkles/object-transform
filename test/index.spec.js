import create_mapper, { take, each, concat, same, from_schema } from '../src/index'

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


    const is_dog = ({ type }) => type === 'dog';
    const schema = {
      name: concat(['first_name', 'last_name'], '_'),
      age: take('current_age'),
      occupation: same(),
      pet_names: each('pets').take('name'),
      dog_ages: each('pets').where(is_dog).take('age'),
      contact_information: from_schema({
        email: same(),
        street_address: concat(['address.street_number', 'address.street_name', 'address.city'], ' '),
      }),
    }

    const mapper = create_mapper(schema)

    expect(mapper(input)).toEqual({
      name: 'pete_jones',
      age: 15,
      occupation: 'Retail',
      pet_names: ['bruce', 'pickles', 'buddy'],
      dog_ages: [9],
      contact_information: {
        email: 'pjones@gmail.com',
        street_address: '55 Queen St Toronto',
      },
    })
  })
})

