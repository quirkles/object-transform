import get from '../src/get'

describe('Get', () => {
  it('returns a function that takes a property from an input', () => {
    const input = {
      name: 'sally',
      age: 20,
    }
    const get_name = get('name')
    expect(get_name(input)).toEqual('sally')
  })
  it('can read nested properties with dot notation', () => {
    const input = {
      name: 'sally',
      age: 20,
      job: {
        name: 'scientist',
        salary: 50000,
      },
    }
    const getSalary = get('job.salary')
    expect(getSalary(input)).toEqual(50000)
  })
  it('Accepts a second argument that creates a default if not set', () => {
    const input = {
      name: 'sally',
      age: 20,
    }
    const get_name = get('something', 'default')
    expect(get_name(input)).toEqual('default')
  })
  it('Returns null if no default is set', () => {
    const input = {
      name: 'sally',
      age: 20,
    }
    const get_name = get('something')
    expect(get_name(input)).toEqual(null)
  })
})
