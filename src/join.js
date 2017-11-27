import { map, join, curry, __ } from 'ramda'

import { filterNulls } from './utils'
import get from './get'

const getValues = (attrs, input) => map(get(__, input), attrs)

const myJoin = (separator, attrs, input) => join(separator, filterNulls(getValues(attrs, input)))

export default curry(myJoin)
