import concat from '../src/concat'

describe('Concat', () => {
  it('returns a function that concats fields', () => {
    const input = {
      first_name: 'sally',
      middle_name: 'mary',
      last_name: 'albright',
    }
    const get_name = concat(['first_name', 'last_name'])
    expect(get_name(input)).toEqual('sally albright')
  })
  it('returns a function that concats fields, looks up nested values', () => {
    const input = {
      name: {
        first_name: 'sally',
        middle_name: 'mary',
        last_name: 'albright',
      },
    }
    const get_name = concat(['name.first_name', 'name.last_name'])
    expect(get_name(input)).toEqual('sally albright')
  })
  it('Accepts a second argument that creates a default if not set, handles missing props', () => {
    const input = {
      first_name: 'sally',
      middle_name: 'mary',
      last_name: 'albright',
    }
    const get_name = concat(['first_name', 'missing_name'])
    expect(get_name(input)).toEqual('sally')
  })
  it('Accepts a second argument that creates a default if not set, handles optionsal separator', () => {
    const input = {
      first_name: 'sally',
      middle_name: 'mary',
      last_name: 'albright',
    }
    const get_name = concat(['first_name', 'middle_name', 'last_name'], '-')
    expect(get_name(input)).toEqual('sally-mary-albright')
  })
})
