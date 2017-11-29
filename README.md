# Object-Transform

This library is designed to facilitate the mapping of data into an arbitrary shape defined by the user by creating a mapper from a schema.

## Why would I need this?

Lets say you have some data stored somewhere and you want to get some subsection of it of it, and maybe modify it too. An obvious example would be in a mapStateToProps function in a react/redux component. Or if you were writting some kind of interface to sit in front of a legacy backend and wanted to modify the data before passing it on.

## Ok, how do I use it?

On a high level:
1. Create a Schema
2. Create a mapper from that schema
3. Call your mapper on the data you want to transform

## Ok, whats a schema?

A schema is a dictionary of keys and functions, the schema keys will match the keys in your final, mapped data. The schema values are functions that map the expected input data to the desired final values. Heres an example, say your input data looks like this

````javascript
{
    /* Some other data  */
    owner: {
        firstName: "Alice",
        lastName: "Jones"
    }
}
````

And you're writing a react component to display the owners name. 

You'd write a function that gets the owners full name from the above object:

````javascript
const getOwnerName = input => `${input.owner.firstName} ${input.owner.lastName}`
````

Then your schema just looks like

````javascript
const ownerFullNameMapperSchema = {
    ownerFullName: getOwnersName
}
````

## Ok...and then I make a mappper?

Yup, you import the default export from this package and call it with a schema

```javascript
import createMapper from 'object-forge'

...

const ownerFullNameMapper = createMapper(ownerNameMapperSchema)
````

## Looks easy, and then what?

Your mapper is a function, just call it on your input data, lets put it all together:

```javascript
import createMapper from 'object-forge'

const inputData = {
    owner: {
        firstName: "Alice",
        lastName: "Jones"
    }
}

const getOwnerFullName = input => `${input.owner.firstName} ${input.owner.lastName}`

const ownerFullNameMapperSchema = {
    ownerFullName: getOwnerFullName
}

const ownerFullNameMapper = createMapper(ownerFullNameMapperSchema)

const transformedData = ownerFullNameMapper(inputData) // { ownerFullName: 'Alice Jones' }
````

## So, I still have to write all these functions? Isn't that what I have to do anyway?

Aha! I was hoping you'd ask (I mean, I'm the one writing these questions so...) this library provides a bunch of helpers which makes writing those functions you need super easy and super concise!

A quick note here too, If the value is *anything other than a function* then it will just be set as value of the corresponding key in the final object.

### get

````javascript
get: (path: string) => fn: (input: object) => value: any
````

Returns a function that accepts an object and returns the value found at the path, or null, if nothing is found.

The path is a string of dot separated values to sequentially look up in the input object:

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

### getOr  

````javascript
getOr: (notSetValue: any, path: string) => fn: (input: object) => value: any
````

Returns a function that accepts an object and returns the value found at the path, or the notSetValue, if nothing is found.

The path is a string of dot separated values to sequentially look up in the input object.

getOr is curried.

#### Usage

````javascript
describe('GetOr', () => {
  it('returns a function that takes a property from an input', () => {
    const input = {
      name: 'sally',
      age: 20,
    }
    const getNameOrNukk = get(null, 'name')
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
    const getSalaryOrNull = get(null, 'job.salary')
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
join: (separator: string, pathList: <string>) => fn: (input: object) => value: string
```

Accepts a list of attr paths and an separator string, returns a function that accepts an input the joins the results of looking up those attr paths on the input and joining with the provided separator.

The attr path is a list of strings of the same format you would use for get, you can use dot notation to get nested attributes.

Join is curried
#### Usage

```javascript
describe('Join', () => {
  it('returns a function that joins fields', () => {
    const input = {
      firstName: 'sally',
      middleName: 'mary',
      lastName: 'albright',
    }
    const getName = join(' ', ['firstName', 'lastName'])
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
### Extend
````javascript
extend: (schema: object) => fn: (input: object) => result: object
````

Very similar to shape only instead extends the input and does to replace it. Conflicting values WILL be over written


#### Usage

```javascript
describe('extend', () => {
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
  join: fn: (separator: string, pathList: <string>) => fn: (input: object) => values: <string>
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

## createMapper
````javascript
concat: fn (schema: object, ?onTransform: fn: ({input: object, schema: object, result: object}) => output: any) => fn: (input: object) => result: object
````

Accepts a schema and an optional callBack that will be executed after the transform operation. Returns a function that accepts input data and performs the mapping described by the schema, returning the result.

The callBack will receive one argument, a dictionary containing the input the mapper was called with, the schema used to validate it, and the result of the transform. This could be useful if you want to validate your data and log any differences, for example.

## Summary

Create a schema of key/value pairs.

The keys define the data shape of your final data, the values are either functions or values, values will be simply set on the final output. Functions will be called on the input data and the result set to that value.

Object-forge provides a handful of helpers documented above but you pass any function you want. Remember though that the only argument it will receive is the input data.

Let's look at a more complicated schema/mapper to see what we can do with it.

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
      age: get('currentAge'),
      contact_information: shape({
        email: get('email'),
        street_address: join(' ', ['address.streetNumber', 'address.streetName', 'address.city']),
      }),
      dogAges: each('pets').where(isType('dog')).get('age'),
      modifiedCats: each('pets').where(isType('cat')).shape({
        description: cat => `${cat.name} the ${cat.age} year old cat`,
        belongsToPete: true,
      }),
      modified: true,
      name: join('_', ['firstName', 'lastName']),
      occupation: get('occupation'),
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
      modified: true,
      name: 'pete_jones',
      occupation: 'Retail',
    })
  })
})
```
