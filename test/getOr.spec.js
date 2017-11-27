import getOr from '../src/getOr'

describe('GetOr', () => {
  it('returns a function that takes a property and a default from an input', () => {
    const input = {
      name: 'sally',
      age: 20,
    }
    const getName = getOr('not_found', 'name')
    expect(getName(input)).toEqual('sally')
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
    const getSalary = getOr(null, 'job.salary')
    expect(getSalary(input)).toEqual(50000)
  })
  it('Returns default if it is set and path does not exist', () => {
    const input = {
      name: 'sally',
      age: 20,
    }
    const getName = getOr('uh oh!', 'something')
    expect(getName(input)).toEqual('uh oh!')
  })
  it('Can be initialized with a default value', () => {
    const input = {
      name: 'sally',
      age: 20,
    }
    const getOrError = getOr('error')
    const getNameOrError = getOrError('something')
    expect(getNameOrError(input)).toEqual('error')
  })
  it('Can be initialized with a default value, dot notation', () => {
    const input = {
      name: 'sally',
      age: 20,
      job: {
        name: 'scientist',
        salary: 50000,
      },
    }
    const getOrNull = getOr(null)
    const getSalaryOrNull = getOrNull('job.salary')
    expect(getSalaryOrNull(input)).toEqual(50000)
  })
  it('Can be initialized with a default value, dot notation', () => {
    const input = {
      name: 'sally',
      age: 20,
      job: {
        name: 'scientist',
        salary: 50000,
      },
    }
    const getOrNull = getOr(null)
    const getVacationOrNull = getOrNull('job.vacation')
    expect(getVacationOrNull(input)).toEqual(null)
  })
})
