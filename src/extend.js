import { merge, curry } from 'ramda'

import shape from './shape'

const extend = (schema, input) => merge(input, shape(schema, input))

export default curry(extend)
