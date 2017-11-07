import from_schema from '../src/from_schema'
import take from '../src/take'

describe('from_schema', () => {
  it('returns a function that creates an object from an input', () => {
    const input = {
      f_nm: 'danny',
      l_nm: 'smith',
    }
    const get_better_name = from_schema({
      first_name: take('f_nm'),
      last_name: take('l_nm'),
    })
    expect(get_better_name(input)).toEqual({
      first_name: 'danny',
      last_name: 'smith',
    })
  })
})
