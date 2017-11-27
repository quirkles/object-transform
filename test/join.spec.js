import join from '../src/join'

describe('join', () => {
  it('returns a function that joins fields', () => {
    const input = {
      firstName: 'sally',
      middleName: 'mary',
      lastName: 'albright',
    }
    const getName = join(' ', ['firstName', 'lastName'])
    expect(getName(input)).toEqual('sally albright')
  })
  it('returns a function that joins fields, looks up nested values', () => {
    const input = {
      name: {
        firstName: 'sally',
        middleName: 'mary',
        lastName: 'albright',
      },
    }
    const getName = join('-', ['name.firstName', 'name.lastName'])
    expect(getName(input)).toEqual('sally-albright')
  })
  it('Handles missing props', () => {
    const input = {
      firstName: 'sally',
      middleName: 'mary',
      lastName: 'albright',
    }
    const getName = join('shouldnt-show-up', ['firstName', 'missingName'])
    expect(getName(input)).toEqual('sally')
  })
  it('Accepts a second argument that creates a default if not set, handles optional separator', () => {
    const input = {
      firstName: 'sally',
      middleName: 'mary',
      lastName: 'albright',
    }
    const getName = join('-', ['firstName', 'middleName', 'notThere', 'lastName'])
    expect(getName(input)).toEqual('sally-mary-albright')
  })
  it('Can be initialized with a separator and reused', () => {
    expect.assertions(4)
    const person = {
      firstName: 'sally',
      middleName: 'mary',
      lastName: 'albright',
    }
    const address = {
      streetName: 'Main st',
      city: 'Toronto',
      province: 'ON',
    }
    const joinSpace = join(' ')
    const joinDash = join('-')
    const getNameDashed = joinDash(['firstName', 'middleName', 'notThere', 'lastName'])
    const getNameSpaced = joinSpace(['firstName', 'middleName', 'notThere', 'lastName'])
    const getAddressDashed = joinDash(['streetName', 'city', 'province'])
    const getAddressSpaced = joinSpace(['streetName', 'city', 'province'])
    expect(getNameDashed(person)).toEqual('sally-mary-albright')
    expect(getNameSpaced(person)).toEqual('sally mary albright')
    expect(getAddressDashed(address)).toEqual('Main st-Toronto-ON')
    expect(getAddressSpaced(address)).toEqual('Main st Toronto ON')
  })
})
