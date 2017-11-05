import take from '../src/take'

describe('Take', () => {
  it('returns a function that takes a property from an input', () => {
    const input = {
      name: 'sally',
      age: 20
    }
    const get_name = take('name')
    expect(get_name(input)).toEqual('sally')
  })
  it('Accepts a second argument that creates a default if not set', () => {
    const input = {
      name: 'sally',
      age: 20
    }
    const get_name = take('something', 'default')
    expect(get_name(input)).toEqual('default')
  })
  it('Returns null if no default is set', () => {
    const input = {
      name: 'sally',
      age: 20
    }
    const get_name = take('something')
    expect(get_name(input)).toEqual(null)
  })
})
