import concat from '../src/concat'
import get from '../src/get'
import each from '../src/each'

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
