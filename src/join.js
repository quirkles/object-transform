import { pipe, applyTo, map, join } from 'ramda'

import { filterNulls, fMap } from './utils'
import get from './get'

const getValues = attrList => fMap(map(get, attrList))

export default (attrs = [], separator = ' ') => pipe(applyTo, getValues(attrs), filterNulls, join(separator))
