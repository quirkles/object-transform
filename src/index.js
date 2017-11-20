import { applyTo, pipe } from 'ramda'

import { fMap } from './utils'
import _take from './get'
import _each from './each'
import _join from './join'

const create_mapper = schema => pipe(applyTo, fMap(schema))

export default create_mapper

export const get = _take
export const each = _each
export const join = _join
export const shape = create_mapper
