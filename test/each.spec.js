import each from '../src/each'
import get from '../src/get'

describe('each', () => {
  const input = {
    numbers: [1, 2, 3],
    subsection: {
      numbers: [10, 20, 30],
    },
    people: [
      {
        firstName: 'alex',
        lastName: 'smith',
        age: 20,
        pets: [{
          name: 'barney',
          type: 'cat',
          toys: [{
            type: 'string',
            cost: 0,
          }, {
            type: 'scratching post',
            cost: 15,
          }],
        }],
      },
      {
        firstName: 'lisa',
        lastName: 'baker',
        age: 19,
        pets: [{
          name: 'spot',
          type: 'dog',
          toys: [{
            type: 'bone',
            cost: 5,
          }],
        }, {
          name: 'cipher',
          type: 'cat',
          toys: [{
            type: 'mouse toy',
            cost: 1,
          },
          {
            type: 'climbing tree',
            cost: 100,
          }],
        }],
      },
      {
        firstName: 'danny',
        lastName: 'jones',
        age: 16,
      },
    ],
  }
  describe('map', () => {
    it('returns an operator with a map object', () => {
      const doubleNumbers = each('numbers').map(n => n * 2)
      expect(doubleNumbers(input)).toEqual([2, 4, 6])
    })
    it('can get nested lists with a map object', () => {
      const doubleNumbers = each('subsection.numbers').map(n => n * 2)
      expect(doubleNumbers(input)).toEqual([20, 40, 60])
    })
    it('map works with nested each and wheres', () => {
      const isTeenage = person => person.age < 20
      const isCat = pet => pet.type === 'cat'
      const teenagersCatsNames = each('people')
        .where(isTeenage)
        .each('pets')
        .where(isCat)
        .each('toys')
        .map(toy => ({
          modified: true,
          ...toy,
        }))
      expect(teenagersCatsNames(input)).toEqual([
        {
          modified: true,
          type: 'mouse toy',
          cost: 1,
        },
        {
          modified: true,
          type: 'climbing tree',
          cost: 100,
        },
      ])
    })
  })
  describe('get', () => {
    it('returns an operator with a get object', () => {
      const ages = each('people').get('age')
      expect(ages(input)).toEqual([20, 19, 16])
    })
    it('can iterate over and concatenate lists within lists', () => {
      const petNames = each('people').each('pets').get('name')
      expect(petNames(input)).toEqual(['barney', 'spot', 'cipher'])
    })
    it('lists within lists within lists...why not?', () => {
      const petToyCosts = each('people').each('pets').each('toys').get('cost')
      expect(petToyCosts(input)).toEqual([0, 15, 5, 1, 100])
    })
    it('contains a "where" modifier for filtering', () => {
      const isTeenage = person => person.age < 20
      const teenagersFirstNames = each('people').where(isTeenage).get('firstName')
      expect(teenagersFirstNames(input)).toEqual(['lisa', 'danny'])
    })
    it('chains where and each', () => {
      const isTeenage = person => person.age < 20
      const isCat = pet => pet.type === 'cat'
      const teenagersCatsNames = each('people')
        .where(isTeenage)
        .each('pets')
        .where(isCat)
        .get('name')
      expect(teenagersCatsNames(input)).toEqual(['cipher'])
    })
    it('chains where and each even deeper', () => {
      const isTeenage = person => person.age < 20
      const isCat = pet => pet.type === 'cat'
      const isCheap = item => item.cost < 10
      const teenagersCatsCheapToyNames = each('people')
        .where(isTeenage)
        .each('pets')
        .where(isCat)
        .each('toys')
        .where(isCheap)
        .get('type')
      expect(teenagersCatsCheapToyNames(input)).toEqual(['mouse toy'])
    })
  })
  describe('shape', () => {
    it('Allows for calling shape to map easily', () => {
      const isTeenage = person => person.age < 20
      const isCat = pet => pet.type === 'cat'
      const teenagersCatsNames = each('people')
        .where(isTeenage)
        .each('pets')
        .where(isCat)
        .each('toys')
        .shape({
          toyName: get('type'),
          price: get('cost'),
        })
      expect(teenagersCatsNames(input)).toEqual([
        {
          toyName: 'mouse toy',
          price: 1,
        },
        {
          toyName: 'climbing tree',
          price: 100,
        },
      ])
    })
  })
  describe('join', () => {
    it('contains a join modifier to join attribues', () => {
      const getNames = each('people').join(['firstName', 'lastName'])
      expect(getNames(input)).toEqual(['alex smith', 'lisa baker', 'danny jones'])
    })
    it('separator can be specified', () => {
      const getNames = each('people').join(['firstName', 'lastName'], '-')
      expect(getNames(input)).toEqual(['alex-smith', 'lisa-baker', 'danny-jones'])
    })
  })
})
