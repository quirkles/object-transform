import join from '../src/join'

describe('join', () => {
  it('returns a function that joins fields', () => {
    const input = {
      firstName: 'sally',
      middleName: 'mary',
      lastName: 'albright',
    }
    const getName = join(['firstName', 'lastName'])
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
    const getName = join(['name.firstName', 'name.lastName'])
    expect(getName(input)).toEqual('sally albright')
  })
  it('Accepts a second argument that creates a default if not set, handles missing props', () => {
    const input = {
      firstName: 'sally',
      middleName: 'mary',
      lastName: 'albright',
    }
    const getName = join(['firstName', 'missingName'])
    expect(getName(input)).toEqual('sally')
  })
  it('Accepts a second argument that creates a default if not set, handles optional separator', () => {
    const input = {
      firstName: 'sally',
      middleName: 'mary',
      lastName: 'albright',
    }
    const getName = join(['firstName', 'middleName', 'lastName'], '-')
    expect(getName(input)).toEqual('sally-mary-albright')
  })
})
