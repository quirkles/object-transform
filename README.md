# Object-Transform

Transforms one object into another by creating a mapper from a schema.

```javascript
import create_mapper, {take, each, concat} from '../src/index'

describe('Create mapper', () => {
  it('maps correctly', () => {
    const input_data = {
      first_name: "pete",
      last_name: "jones",
      current_age: 5,
      pets: [
        {
          type: 'cat',
          name: 'bruce',
          age: 13
        },
        {
          type: 'cat',
          name: 'pickles',
          age: 4
        },
        {
          type: 'dog',
          name: 'buddy',
          age: 9
        }
      ]
    }


    const is_dog = ({type}) => type === 'dog';
    
    const schema = {
      name: concat(['first_name', 'last_name'], '<>'),
      age: take('current_age'),
      pet_names: each('pets').take('name'),
      dog_ages: each('pets').where(is_dog).take('age')
    }

    const mapper = create_mapper(schema)

    expect(mapper(input)).toEqual({
      name: 'pete<>jones',
      age: 5,
      pet_names: ["bruce", "pickles", "buddy"],
      dog_ages: [9]
    })
  })
})
```

## Api


### concat
### take
### each
### where