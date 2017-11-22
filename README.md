# Object-Transform

This library is designed to facilitate the mapping of data into an arbitrary shape defined by the user by creating a mapper from a schema.

in practise this looks something like the following:

```javascript
import create_mapper, { get, each, join, shape, using } from 'object-forge'


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

    const mapper = create_mapper(schema)

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
})
```

The schema is an object of key, value pairs where the keys are the values you want in your final object and the value can be anything.

If the value is *anything other than a function* then it will just be set as value of the corresponding key in the final object.

If the value is a function then the value in the final object will be the result of applying that function to the input data. 

You can set this to be any function you want, but the only argument it will receive is the input data.

You can define whatever functions you like, which makes this schema very flexible, however this library provides a handful of helper functions to create functions that perform common operations.

### get

````javascript
get: (path: string, notSetValue?: any) => fn: (input: object) => value: any
````

Returns a function that accepts an object and returns the value found at the path, or the notSetValue, if nothing is found.

The path is a string of dot seperated values to sequentially look up in the input object:

#### Usage

````javascript
describe('Get', () => {
  it('returns a function that takes a property from an input', () => {
    const input = {
      name: 'sally',
      age: 20,
    }
    const getName = get('name')
    expect(
      getName(input)
    ).toEqual('sally')
  })
  it('can read nested properties with dot notation', () => {
    const input = {
      name: 'sally',
      age: 20,
      job: {
        name: 'scientist',
        salary: 50000,
      }
    }
    const getSalary = get('job.salary')
    expect(getSalary(input)).toEqual(50000)
  })
})
````

### cast
````javascript
cast: (path: string) => {
  asString: fn: (input: object) => value: string,
  asNumber: fn: (input: object) => value: number,
  asBool: fn: (input: object) => value: boolean
}
````

Returns an object that contains functions which casts the value on the input found at the path specificed by path as the associated type

#### Usage
````javascript
describe('cast', () => {
  const input = {
    age: '67'
    money: 4000,
    children: 0,
  }
  it('asNumber works', () => {
    const ageAsNumber = cast('age').asNumber
    expect(ageAsNumber(input)).toEqual(67)
  })
  it('asString works', () => {
    const moneyAsString = cast('money').asString
    expect(moneyAsString(input)).toEqual('4000')
  })
  it('asBool works', () => {
    const childrenAsBool = cast('children').asBool
    expect(childrenAsBool(input)).toEqual(false)
  })
})
````
### join
```javascript
join: (pathList: <string>, separator?: string) => fn: (input: object) => value: string
```

Accepts a list of attr paths and an optional separator string, returns a function that accepts an input the joins the results of looking up those attr paths on the input and joining with the provided separator which defaults to a space.

The attr path is a list of strings of the same format you would use for get, you can use dot notation to get nested attributes.
#### Usage

```javascript
describe('Join', () => {
  it('returns a function that joins fields', () => {
    const input = {
      firstName: 'sally',
      middleName: 'mary',
      lastName: 'albright',
    }
    const getName = join(['firstName', 'lastName'])
    expect(getName(input)).toEqual('sally albright')
  })
})
```
### Shape
````javascript
shape: (schema: object) => fn: (input: object) => result: object
````

Accepts a sub-schema and returns a function with accepts an input and returns an object defined by that schema.


#### Usage

```javascript
describe('shape', () => {
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
```
### using
````javascript
using: (path: string) => {
  get: fn: (attr: string) => fn: (input: object) => value: any,
  do: fn: (operator: (value: any) => modifiedValue: any) => fn: (input: object) => modifiedValue: any,
  shape: fn: (schema: object) => fn: (input: object) => value: object,
  using: fn: (string: object) => self
}
````

Accepts an attr path string and returns an object which contains methods that return functions which allow you to operate on what is at that location in the input, instead of the whole input.

using can also be chained with itself to access nested attributes if you so wish.

Sound confusing, but in practice its dead simple, the best plan might be to go [look at the tests](https://github.com/quirkles/object-transform/blob/master/test/using.spec.js) 

#### Usage

````javascript
describe('Using', () => {
  it('do works nested', () => {
    const input = {
      subsection: {
        numbers: [1, 2, 3]
      }
    }  
    const sum = list => list.reduce((total, num) => total + num)
    const sumNumbers = using('subsection').using('numbers').do(sum)
    expect(sumNumbers(input)).toEqual(6)
  })  
})
````
### each
````javascript
each: (path: string) => {
  get : fn: (attr: string) => fn: (input: object) => values: <any>,,
  map: fn: (operator: (value: any) => modifiedValue: any) => fn: (input: object) => modifiedValues: <any>,
  join: fn: (pathList: <string>, separator?: string) => fn: (input: object) => values: <string>
  where: fn: (predicate: fn: (item: any) => result: boolean) => self,
  shape: fn: (schema: object) => fn: (input: object) => values: <any>,
  each: fn: (path: string) => self,
}
````
Accepts a path which corresponds to an array on the input object and returns an object which performs operations on each element in that array.

get: gets the named attribute of each item found

map: performs an arbitraty operation on each item found

join: joins the paths given for each item found

shape: applies the specified sub schema to each item found

where: applies the specified filter predicate to each item found before doing one of the above

each: Each can be chained and the results will be concatenated.

#### Usage

It really is best to [read the tests](https://github.com/quirkles/object-transform/blob/master/test/each.spec.js) for this one

Note: any null values will be stripped form the final result.

### concat

````javascript
concat: fn (fns: <function>) => fn: (input: object) => results: <any>
````

Accepts list of functions and returns a function that accepts an input and then returns the results of applying the functions to the inpit concatenated together

#### Usage

```javascript
describe('concat', () => {
  it('joins together lists', () => {
    const input = {
      partner: {
        name: 'Stephanie Miles',
      },
      kids:
        [
          {
            firstName: 'Pete',
            lastName: 'Miles',
          },
          {
            firstName: 'Alice',
            lastName: 'Miles',
          },
        ],
    }
    const getNameFromKid = kid => `${kid.firstName} ${kid.lastName}`
    const familyNames = concat(
      get('partner.name'),
      each('kids').map(getNameFromKid),
    )
    expect(familyNames(input)).toEqual(['Stephanie Miles', 'Pete Miles', 'Alice Miles'])
  })
})
```