import using from '../src/using'
import join from '../src/join'
import get from '../src/get'

describe('using', () => {
  const input = {
    numbers: [1, 2, 3],
    subsection: {
      numbers: [10, 20, 30],
    },
    secretValue: 'bananas',
    family: {
      surname: 'miles',
      car: {
        make: 'toyota',
        model: 'corolla',
        distanceCovered: 99999,
        heating: {
          broke: true,
        },
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
    },
  }
  describe('get', () => {
    it('has a get method that takes a property from that object', () => {
      const familyName = using('family').get('surname')
      expect(familyName(input)).toEqual('miles')
    })
    it('can be called on itself', () => {
      const carModel = using('family').using('car').get('make')
      expect(carModel(input)).toEqual('toyota')
    })
    it('can be called on itself again', () => {
      const carModel = using('family').using('car').using('heating').get('broke')
      expect(carModel(input)).toEqual(true)
    })
  })
  describe('do', () => {
    it('has a do method that allows performing arbitrary operations', () => {
      const mask = str => str.split('').map((char, i) => ((i === 0 || i === str.length - 1) ? char : '#')).join('')
      const maskSecret = using('secretValue').do(mask)
      expect(maskSecret(input)).toEqual('b#####s')
    })
    it('do works nested', () => {
      const sum = list => list.reduce((total, num) => total + num)
      const maskSecret = using('subsection').using('numbers').do(sum)
      expect(maskSecret(input)).toEqual(60)
    })
    it('do works nested with dot notation', () => {
      const sum = list => list.reduce((total, num) => total + num)
      const maskSecret = using('subsection.numbers').do(sum)
      expect(maskSecret(input)).toEqual(60)
    })
  })
  describe('shape', () => {
    it('has a shape method that allows easy mapping', () => {
      const newCarSchema = {
        description: join(['make', 'model']),
        mileage: get('distanceCovered'),
      }
      const car = using('family.car').shape(newCarSchema)
      expect(car(input)).toEqual({
        description: 'toyota corolla',
        mileage: 99999,
      })
    })
  })
})
