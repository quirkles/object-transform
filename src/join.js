import { pipe, applyTo, map, join } from 'ramda'

import { filterNulls, fMap, doIfNotEmpty } from './utils'
import get from './get'

const getValues = attrList => fMap(map(get, attrList))

export default (attrs = [], separator = ' ') => pipe(applyTo, getValues(attrs), filterNulls, doIfNotEmpty(join(separator)))
